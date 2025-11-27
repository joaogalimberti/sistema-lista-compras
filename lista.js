/* Iniciar módulo de lista de compras */
(function(){

  /* Selecionar elementos principais da página */
  const container = document.getElementById('listaItens');
  const btnEnviar = document.getElementById('btnEnviar');
  const historicoList = document.getElementById('historicoLista');

  if(!container || !btnEnviar) return;

  /* Carregar lista de compras do localStorage */
  function carregarLista(){
    const data = localStorage.getItem('listaCompras');
    return data ? JSON.parse(data) : [];
  }

  /* Salvar lista de compras no localStorage */
  function salvarLista(lista){
    localStorage.setItem('listaCompras', JSON.stringify(lista));
  }

  /* Carregar produtos cadastrados */
  function carregarProdutos(){
    const data = localStorage.getItem('listaProdutos');
    return data ? JSON.parse(data) : [];
  }

  /* Carregar histórico de envios */
  function carregarHistorico(){
    const data = localStorage.getItem('historicoEnvios');
    return data ? JSON.parse(data) : [];
  }

  /* Salvar histórico de envios */
  function salvarHistorico(h){
    localStorage.setItem('historicoEnvios', JSON.stringify(h));
  }

  /* Obter descrição da unidade */
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

  /* Mostrar notificação na tela */
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

  /* Fechar notificação */
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

  /* Renderizar lista de compras na tela */
  function renderLista(){
    const lista = carregarLista();
    const produtos = carregarProdutos();
    
    container.innerHTML = '';

    /* Exibir mensagem se não houver produtos */
    if(produtos.length === 0){
      container.innerHTML = '<div class="empty-state">Nenhum produto cadastrado...<br>Vá em "Gerenciar Produtos"! ✏️</div>';
      atualizarBotao();
      return;
    }

    /* Sincronizar lista de compras com produtos cadastrados */
    sincronizarListaCompras(produtos);
    const listaAtualizada = carregarLista();

    /* Exibir mensagem se lista estiver vazia */
    if(listaAtualizada.length === 0){
      container.innerHTML = '<div class="empty-state">Sua lista está vazia...<br>Adicione produtos! ✏️</div>';
      atualizarBotao();
      return;
    }

    /* Montar itens na tela */
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

  /* Sincronizar lista de compras com produtos cadastrados */
  function sincronizarListaCompras(produtos){
    let lista = carregarLista();
    
    /* Remover produtos que foram apagados */
    lista = lista.filter(item => 
      produtos.some(p => p.codProduto === item.codProduto)
    );

    /* Inserir ou atualizar produtos na lista */
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

  /* Aumentar quantidade comprada */
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

  /* Diminuir quantidade comprada */
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

  /* Atualizar quantidade digitada */
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

  /* Atualizar botão de envio */
  function atualizarBotao(){
    const lista = carregarLista();
    const todos = lista.length > 0 && lista.every(i => i.coletado);
    btnEnviar.disabled = !todos;
  }

  /* Enviar lista para MockAPI */
  btnEnviar.addEventListener('click', async function(){
    const lista = carregarLista();
    
    /* Bloquear envio se lista estiver vazia */
    if(lista.length === 0){
      mostrarNotificacao(
        'Lista Vazia 📝',
        'Não há itens para enviar.',
        '⚠️'
      );
      return;
    }

    /* Bloquear envio se nem todos estiverem coletados */
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
      /* Criar compra no servidor */
      const dataCompra = new Date().toISOString();
      const compra = { data: dataCompra };

      const responseCompra = await fetch('https://69264c8426e7e41498f9efaa.mockapi.io/Compras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compra)
      });

      if(!responseCompra.ok){
        throw new Error('Erro ao criar compra no servidor');
      }

      const compraResult = await responseCompra.json();
      const codCompra = compraResult.CodCompras;

      /* Enviar produtos da compra usando relacionamento correto */
      const produtos = carregarProdutos();
      
      for(const item of lista) {
        const produto = produtos.find(p => p.codProduto === item.codProduto);
        
        const produtoData = {
          CodProduto: item.codProduto,
          Nome: item.nome,
          Unidade: item.unidade,
          Quantidade: item.quantidadeNecessaria,
          CodigoBarra: produto?.codigoBarra || '',
          Ativo: false,
          QuantComprada: item.quantidadeComprada
        };
        
        const responseProduto = await fetch(`https://69264c8426e7e41498f9efaa.mockapi.io/Compras/${codCompra}/produtos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(produtoData)
        });
        
        if(!responseProduto.ok){
          const errorText = await responseProduto.text();
          throw new Error(`Erro ao enviar produto: ${errorText}`);
        }
      }

      /* Salvar envio no histórico */
      const hist = carregarHistorico();
      hist.push({
        id: codCompra,
        data: dataCompra,
        itens: lista.length,
        sucesso: true
      });
      salvarHistorico(hist);

      /* Limpar lista após envio */
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

  /* Renderizar histórico de envios */
  function renderHistorico(){
    const hist = carregarHistorico();
    historicoList.innerHTML = '';

    if(hist.length === 0){
      historicoList.innerHTML = '<li class="historico-item" style="cursor: default; color: #999;">Nenhum envio realizado ainda...</li>';
      return;
    }

    /* Montar cada item do histórico */
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

  /* Iniciar renderização inicial */
  renderLista();
  renderHistorico();
})();
