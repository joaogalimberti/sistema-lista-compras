/*
Lista de Compras com integração MockAPI
- Mostra produtos da listaCompras
- Permite marcar quantidade comprada
- Quando todos coletados, envia para MockAPI
- Produtos enviados são marcados como ativo:false no servidor
*/
(function(){
  const container = document.getElementById('listaItens');
  const btnEnviar = document.getElementById('btnEnviar');
  const historicoList = document.getElementById('historicoLista');

  if(!container || !btnEnviar) return;

  function carregarLista(){
    const data = localStorage.getItem('listaCompras');
    return data ? JSON.parse(data) : [];
  }

  function salvarLista(lista){
    localStorage.setItem('listaCompras', JSON.stringify(lista));
  }

  function carregarProdutos(){
    const data = localStorage.getItem('listaProdutos');
    return data ? JSON.parse(data) : [];
  }

  function carregarHistorico(){
    const data = localStorage.getItem('historicoEnvios');
    return data ? JSON.parse(data) : [];
  }

  function salvarHistorico(h){
    localStorage.setItem('historicoEnvios', JSON.stringify(h));
  }

  function getDescricaoUnidade(sigla){
    const unidades = {
      'un': 'Unidade',
      'kg': 'Quilograma',
      'lt': 'Litro',
      'mt': 'Metro',
      'pc': 'Pacote'
    };
    return unidades[sigla] || sigla;
  }

  // Sistema de notificações
  function mostrarNotificacao(titulo, mensagem, icone = '✓', callback = null) {
    const overlay = document.getElementById('overlay');
    const notification = document.getElementById('notification');
    const notifIcon = document.getElementById('notifIcon');
    const notifTitle = document.getElementById('notifTitle');
    const notifMessage = document.getElementById('notifMessage');
    
    notifIcon.textContent = icone;
    notifTitle.textContent = titulo;
    notifMessage.innerHTML = mensagem;
    
    overlay.classList.add('show');
    notification.classList.add('show');
    
    notification.dataset.callback = callback ? 'true' : 'false';
  }

  window.fecharNotificacao = function() {
    const overlay = document.getElementById('overlay');
    const notification = document.getElementById('notification');
    
    overlay.classList.remove('show');
    notification.classList.remove('show');
    
    if (notification.dataset.callback === 'true') {
      setTimeout(() => {
        renderLista();
        renderHistorico();
      }, 300);
    }
  }

  function renderLista(){
    const lista = carregarLista();
    const produtos = carregarProdutos();
    
    container.innerHTML = '';

    if(produtos.length === 0){
      container.innerHTML = '<div class="empty-state">Nenhum produto cadastrado...<br>Vá em "Gerenciar Produtos"! ✏️</div>';
      atualizarBotao();
      return;
    }

    sincronizarListaCompras(produtos);
    const listaAtualizada = carregarLista();

    if(listaAtualizada.length === 0){
      container.innerHTML = '<div class="empty-state">Sua lista está vazia...<br>Adicione produtos! ✏️</div>';
      atualizarBotao();
      return;
    }

    listaAtualizada.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'item-compra' + (item.coletado ? ' coletado' : '');
      
      div.innerHTML = `
        <div class="item-compra-info">
          <div class="item-compra-nome">${item.nome}</div>
          <div class="item-compra-detalhes">
            ${getDescricaoUnidade(item.unidade)}
          </div>
        </div>
        <div class="item-compra-quantidade">
          <div class="quantidade-controls">
            <button class="btn-qty" onclick="diminuirQuantidade(${item.codProduto})">−</button>
            <input type="number" 
                   class="input-qty" 
                   value="${item.quantidadeComprada}" 
                   min="0" 
                   data-cod="${item.codProduto}"
                   onchange="atualizarQuantidade(${item.codProduto}, this.value)">
            <button class="btn-qty" onclick="aumentarQuantidade(${item.codProduto})">+</button>
          </div>
          <div class="quantidade-info">
            ${item.quantidadeComprada} / ${item.quantidadeNecessaria}
          </div>
        </div>
      `;
      
      container.appendChild(div);
    });

    atualizarBotao();
  }

  function sincronizarListaCompras(produtos){
    let lista = carregarLista();
    
    lista = lista.filter(item => 
      produtos.some(p => p.codProduto === item.codProduto)
    );

    produtos.forEach(produto => {
      const existe = lista.find(item => item.codProduto === produto.codProduto);
      if(!existe){
        lista.push({
          codProduto: produto.codProduto,
          nome: produto.nome,
          unidade: produto.unidade,
          quantidadeNecessaria: produto.quantidade,
          quantidadeComprada: 0,
          coletado: false
        });
      } else {
        existe.nome = produto.nome;
        existe.unidade = produto.unidade;
        existe.quantidadeNecessaria = produto.quantidade;
      }
    });

    salvarLista(lista);
  }

  window.aumentarQuantidade = function(codProduto){
    const lista = carregarLista();
    const item = lista.find(i => i.codProduto === codProduto);
    if(item){
      item.quantidadeComprada++;
      item.coletado = item.quantidadeComprada >= item.quantidadeNecessaria;
      salvarLista(lista);
      renderLista();
    }
  }

  window.diminuirQuantidade = function(codProduto){
    const lista = carregarLista();
    const item = lista.find(i => i.codProduto === codProduto);
    if(item && item.quantidadeComprada > 0){
      item.quantidadeComprada--;
      item.coletado = item.quantidadeComprada >= item.quantidadeNecessaria;
      salvarLista(lista);
      renderLista();
    }
  }

  window.atualizarQuantidade = function(codProduto, valor){
    const lista = carregarLista();
    const item = lista.find(i => i.codProduto === codProduto);
    if(item){
      item.quantidadeComprada = Math.max(0, Number(valor) || 0);
      item.coletado = item.quantidadeComprada >= item.quantidadeNecessaria;
      salvarLista(lista);
      renderLista();
    }
  }

  function atualizarBotao(){
    const lista = carregarLista();
    const todos = lista.length > 0 && lista.every(i => i.coletado);
    btnEnviar.disabled = !todos;
  }

  // Enviar para MockAPI
  btnEnviar.addEventListener('click', async function(){
    const lista = carregarLista();
    
    if(lista.length === 0){
      mostrarNotificacao(
        'Lista Vazia 📝',
        'Não há itens para enviar.',
        '⚠️'
      );
      return;
    }

    const todos = lista.every(i => i.coletado);
    if(!todos){
      mostrarNotificacao(
        'Itens Não Coletados! ☑️',
        'Todos os itens devem estar coletados antes de enviar.',
        '⚠️'
      );
      return;
    }

    btnEnviar.disabled = true;
    btnEnviar.textContent = '⏳ Enviando...';

    try {
      const dataCompra = new Date().toISOString();
      
      // 1. Criar a compra
      const compra = {
        data: dataCompra
      };

      const responseCompra = await fetch('https://69264c8426e7e41498f9efaa.mockapi.io/Compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(compra)
      });

      if(!responseCompra.ok){
        throw new Error('Erro ao criar compra no servidor');
      }

      const compraResult = await responseCompra.json();
      const codCompra = compraResult.CodCompras;

      // 2. Enviar cada produto usando a URL de relacionamento correta
      const produtos = carregarProdutos();
      
      for(const item of lista) {
        const produto = produtos.find(p => p.codProduto === item.codProduto);
        
        // Dados do produto - SEM CompraId pois a URL já faz o relacionamento
        const produtoData = {
          CodProduto: item.codProduto,
          Nome: item.nome,
          Unidade: item.unidade,
          Quantidade: item.quantidadeNecessaria,
          CodigoBarra: produto?.codigoBarra || '',
          Ativo: false,
          QuantComprada: item.quantidadeComprada
        };
        
        // IMPORTANTE: usar a URL de relacionamento /Compras/{id}/produtos
        const responseProduto = await fetch(`https://69264c8426e7e41498f9efaa.mockapi.io/Compras/${codCompra}/produtos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(produtoData)
        });
        
        if(!responseProduto.ok){
          const errorText = await responseProduto.text();
          throw new Error(`Erro ao enviar produto: ${errorText}`);
        }
      }

      // 3. Salvar no histórico local
      const hist = carregarHistorico();
      hist.push({
        id: codCompra,
        data: dataCompra,
        itens: lista.length,
        sucesso: true
      });
      salvarHistorico(hist);

      // 4. Limpar lista de compras atual
      localStorage.removeItem('listaCompras');

      mostrarNotificacao(
        'Enviado com Sucesso! 🎊',
        `Sua compra foi enviada para o servidor!<br><br>` +
        `<em>CodCompra: ${codCompra}</em><br>` +
        `<em>Total: ${lista.length} ${lista.length === 1 ? 'item' : 'itens'}</em>`,
        '✓',
        true
      );

    } catch(error) {
      const hist = carregarHistorico();
      hist.push({
        data: new Date().toISOString(),
        itens: lista.length,
        sucesso: false,
        erro: error.message
      });
      salvarHistorico(hist);

      mostrarNotificacao(
        'Erro ao Enviar! ❌',
        `Não foi possível enviar para o servidor.<br><br>` +
        `<em>Erro: ${error.message}</em>`,
        '❌'
      );
    } finally {
      btnEnviar.disabled = false;
      btnEnviar.textContent = '📤 Enviar para o Servidor';
    }
  });

  // Renderizar histórico
  function renderHistorico(){
    const hist = carregarHistorico();
    historicoList.innerHTML = '';

    if(hist.length === 0){
      historicoList.innerHTML = '<li class="historico-item" style="cursor: default; color: #999;">Nenhum envio realizado ainda...</li>';
      return;
    }

    hist.slice().reverse().forEach((envio) => {
      const li = document.createElement('li');
      li.className = 'historico-item';
      
      const data = new Date(envio.data);
      const dataFormatada = data.toLocaleDateString('pt-BR') + ' às ' + data.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
      
      const statusIcon = envio.sucesso ? '✓' : '❌';
      const statusText = envio.sucesso ? 'Sucesso' : 'Erro';
      const statusColor = envio.sucesso ? 'green' : 'red';
      
      li.innerHTML = `
        <span style="color: ${statusColor}; font-weight: bold;">${statusIcon} ${statusText}</span><br>
        ${dataFormatada}
        ${envio.id ? ' • CodCompra: ' + envio.id : ''}
         • ${envio.itens} ${envio.itens === 1 ? 'item' : 'itens'}
        ${envio.erro ? '<br><small style="color: red;">Erro: ' + envio.erro + '</small>' : ''}
      `;
      
      historicoList.appendChild(li);
    });
  }

  // Inicialização
  renderLista();
  renderHistorico();
})();