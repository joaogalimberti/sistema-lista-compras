/*
Cadastro de produtos
- Armazena em localStorage com tag 'listaProdutos'
- Permite cadastrar, alterar e excluir produtos
- Validações conforme requisitos do trabalho
*/
(function(){
  const form = document.getElementById('formCadastro');
  const btnCancelar = document.getElementById('btnCancelar');
  const listaProdutosCadastrados = document.getElementById('listaProdutosCadastrados');
  
  let editandoId = null;

  if(!form) return;

  // Funções de localStorage
  function carregarProdutos(){
    const data = localStorage.getItem('listaProdutos');
    return data ? JSON.parse(data) : [];
  }

  function salvarProdutos(lista){
    localStorage.setItem('listaProdutos', JSON.stringify(lista));
  }

  function gerarProximoCodigo(){
    const produtos = carregarProdutos();
    if(produtos.length === 0) return 1;
    const maxCod = Math.max(...produtos.map(p => p.codProduto || 0));
    return maxCod + 1;
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
  function mostrarNotificacao(titulo, mensagem, icone = '✓') {
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
  }

  window.fecharNotificacao = function() {
    const overlay = document.getElementById('overlay');
    const notification = document.getElementById('notification');
    
    overlay.classList.remove('show');
    notification.classList.remove('show');
  }

  // Renderizar lista de produtos cadastrados
  function renderizarProdutos(){
    const produtos = carregarProdutos();
    listaProdutosCadastrados.innerHTML = '';

    if(produtos.length === 0){
      listaProdutosCadastrados.innerHTML = '<div class="empty-state">Nenhum produto cadastrado ainda...</div>';
      return;
    }

    produtos.forEach(produto => {
      const div = document.createElement('div');
      div.className = 'produto-item';
      
      div.innerHTML = `
        <div class="produto-info">
          <div class="produto-nome">
            <strong>${produto.nome}</strong>
          </div>
          <div class="produto-detalhes">
            Cód: ${produto.codProduto} | 
            ${produto.quantidade} ${getDescricaoUnidade(produto.unidade)}
            ${produto.codigoBarra ? ' | EAN: ' + produto.codigoBarra : ''}
          </div>
        </div>
        <div class="produto-acoes">
          <button class="btn-editar" onclick="editarProduto(${produto.codProduto})">✏️ Editar</button>
          <button class="btn-excluir" onclick="excluirProduto(${produto.codProduto})">🗑️ Excluir</button>
        </div>
      `;
      
      listaProdutosCadastrados.appendChild(div);
    });
  }

  // Editar produto
  window.editarProduto = function(codProduto){
    const produtos = carregarProdutos();
    const produto = produtos.find(p => p.codProduto === codProduto);
    
    if(!produto) return;

    editandoId = codProduto;
    
    document.getElementById('codProduto').value = produto.codProduto;
    document.getElementById('nomeProduto').value = produto.nome;
    document.getElementById('unidadeProduto').value = produto.unidade;
    document.getElementById('quantProduto').value = produto.quantidade;
    document.getElementById('codigoBarra').value = produto.codigoBarra || '';
    
    btnCancelar.style.display = 'inline-block';
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Excluir produto
  window.excluirProduto = function(codProduto){
    if(!confirm('Deseja realmente excluir este produto?')) return;

    const produtos = carregarProdutos();
    const novaLista = produtos.filter(p => p.codProduto !== codProduto);
    salvarProdutos(novaLista);

    // Remover da lista de compras também
    const listaCompras = JSON.parse(localStorage.getItem('listaCompras') || '[]');
    const novaListaCompras = listaCompras.filter(item => item.codProduto !== codProduto);
    localStorage.setItem('listaCompras', JSON.stringify(novaListaCompras));

    mostrarNotificacao(
      'Produto Excluído! 🗑️',
      'O produto foi removido com sucesso.',
      '✓'
    );

    renderizarProdutos();
  }

  // Cancelar edição
  btnCancelar.addEventListener('click', function(){
    limparFormulario();
  });

  function limparFormulario(){
    editandoId = null;
    form.reset();
    document.getElementById('codProduto').value = '';
    btnCancelar.style.display = 'none';
  }

  // Validar código de barras
  function validarCodigoBarra(codigo){
    if(!codigo) return true; // Campo opcional
    return /^\d{13}$/.test(codigo);
  }

  // Submit do formulário
  form.addEventListener('submit', function(e){
    e.preventDefault();
    
    const nome = document.getElementById('nomeProduto').value.trim();
    const unidade = document.getElementById('unidadeProduto').value;
    const quantidade = Number(document.getElementById('quantProduto').value);
    const codigoBarra = document.getElementById('codigoBarra').value.trim();

    // Validações
    if(!nome || !unidade || !quantidade){
      mostrarNotificacao(
        'Campos Obrigatórios! ⚠️',
        'Preencha todos os campos marcados com * antes de salvar.',
        '⚠️'
      );
      return;
    }

    if(codigoBarra && !validarCodigoBarra(codigoBarra)){
      mostrarNotificacao(
        'Código de Barra Inválido! ⚠️',
        'O código de barras deve conter exatamente 13 dígitos numéricos.',
        '⚠️'
      );
      return;
    }

    const produtos = carregarProdutos();

    if(editandoId){
      // Atualizar produto existente
      const index = produtos.findIndex(p => p.codProduto === editandoId);
      if(index >= 0){
        produtos[index] = {
          ...produtos[index],
          nome,
          unidade,
          quantidade,
          codigoBarra
        };

        // Atualizar na lista de compras também
        const listaCompras = JSON.parse(localStorage.getItem('listaCompras') || '[]');
        const itemCompra = listaCompras.find(item => item.codProduto === editandoId);
        if(itemCompra){
          itemCompra.nome = nome;
          itemCompra.unidade = unidade;
          itemCompra.quantidadeNecessaria = quantidade;
          localStorage.setItem('listaCompras', JSON.stringify(listaCompras));
        }

        salvarProdutos(produtos);

        mostrarNotificacao(
          'Produto Atualizado! ✏️',
          `<strong>${nome}</strong> foi atualizado com sucesso.`,
          '✓'
        );
      }
    } else {
      // Criar novo produto
      const novoProduto = {
        codProduto: gerarProximoCodigo(),
        nome,
        unidade,
        quantidade,
        codigoBarra
      };

      produtos.push(novoProduto);
      salvarProdutos(produtos);

      // Adicionar automaticamente à lista de compras
      const listaCompras = JSON.parse(localStorage.getItem('listaCompras') || '[]');
      listaCompras.push({
        codProduto: novoProduto.codProduto,
        nome: novoProduto.nome,
        unidade: novoProduto.unidade,
        quantidadeNecessaria: novoProduto.quantidade,
        quantidadeComprada: 0,
        coletado: false
      });
      localStorage.setItem('listaCompras', JSON.stringify(listaCompras));

      mostrarNotificacao(
        'Produto Cadastrado! 🎉',
        `<strong>${nome}</strong> foi cadastrado e adicionado à lista de compras.`,
        '✓'
      );
    }

    limparFormulario();
    renderizarProdutos();
  });

  // Inicialização
  renderizarProdutos();
  document.getElementById('codProduto').value = '';
})();