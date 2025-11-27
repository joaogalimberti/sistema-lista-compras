# 🛒 Sistema de Lista de Compras - Projeto Acadêmico

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![MockAPI](https://img.shields.io/badge/MockAPI-00C853?style=for-the-badge&logo=api&logoColor=white)

## 📋 Sobre o Projeto

Sistema completo de gerenciamento de lista de compras desenvolvido como trabalho acadêmico da disciplina **Tecnologia WEB**. O projeto implementa operações CRUD, persistência de dados e integração com API REST, utilizando exclusivamente **HTML, CSS e JavaScript vanilla** (sem frameworks ou bibliotecas).

### 🎯 Requisitos Atendidos

| Requisito | Status | Implementação |
|-----------|--------|---------------|
| HTML, CSS e JS puro | ✅ | Sem uso de frameworks |
| Duas páginas (cadastro e lista) | ✅ | `cadastro.html` e `lista.html` |
| CSS e JS externos | ✅ | `styles.css` e arquivos `.js` |
| CRUD de produtos | ✅ | Create, Read, Update, Delete |
| Validação de campos | ✅ | Campos obrigatórios e formatos |
| LocalStorage | ✅ | `listaProdutos` e `listaCompras` |
| Integração com API | ✅ | MockAPI com relacionamentos |
| Envio ao servidor | ✅ | POST com todos os itens coletados |

---

## 🏗️ Arquitetura do Sistema

### Estrutura de Arquivos
```
projeto/
├── cadastro.html       # Página de gerenciamento de produtos
├── cadastro.js         # Lógica CRUD e validações
├── lista.html          # Página de lista de compras
├── lista.js            # Controle de compras e integração API
└── styles.css          # Estilização completa
```

### Fluxo de Dados
```
┌─────────────────┐
│  cadastro.html  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│  cadastro.js    │─────▶│ localStorage │
└─────────────────┘      │ listaProdutos│
                         └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │ localStorage │
                         │ listaCompras │
                         └──────┬───────┘
                                │
                                ▼
┌─────────────────┐      ┌──────────────┐
│   lista.html    │◀─────│   lista.js   │
└─────────────────┘      └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │   MockAPI    │
                         │  /Compras    │
                         │  /produtos   │
                         └──────────────┘
```

---

## 💾 Sistema de Persistência

### LocalStorage - Estrutura de Dados

#### 1. listaProdutos
Armazena todos os produtos cadastrados no sistema.
```javascript
// Estrutura: Array de objetos
[
  {
    codProduto: 1,           // Number (auto-incremento)
    nome: "Arroz",           // String (obrigatório)
    unidade: "kg",           // String (un|kg|lt|mt|pc)
    quantidade: 5,           // Number (obrigatório, > 0)
    codigoBarra: "7891234567890"  // String (opcional, 13 dígitos)
  }
]
```

**Gerenciado por:** `cadastro.js`

#### 2. listaCompras
Sincronizada automaticamente com `listaProdutos`, adiciona controle de quantidades.
```javascript
// Estrutura: Array de objetos
[
  {
    codProduto: 1,              // Referência ao produto
    nome: "Arroz",              // Copiado de listaProdutos
    unidade: "kg",              // Copiado de listaProdutos
    quantidadeNecessaria: 5,    // Quantidade a comprar
    quantidadeComprada: 3,      // Quantidade já coletada
    coletado: false             // true quando qtdComprada >= qtdNecessaria
  }
]
```

**Gerenciado por:** `lista.js`

#### 3. historicoEnvios
Registra todas as tentativas de envio ao servidor.
```javascript
// Estrutura: Array de objetos
[
  {
    id: "1",                    // CodCompras retornado pela API
    data: "2025-11-26T19:42:15.276Z",  // ISO 8601
    itens: 2,                   // Quantidade de produtos enviados
    sucesso: true               // true = sucesso, false = erro
  },
  {
    data: "2025-11-26T20:15:30.123Z",
    itens: 3,
    sucesso: false,
    erro: "Network Error"       // Mensagem de erro (quando sucesso = false)
  }
]
```

**Gerenciado por:** `lista.js`

---

## 🔌 Integração com MockAPI

### Arquitetura REST

O sistema utiliza a MockAPI como backend, implementando uma arquitetura REST com relacionamento entre recursos.
```
MockAPI URL Base: https://69264c8426e7e41498f9efaa.mockapi.io/

Recursos:
├── /Compras              (Resource principal)
│   └── /{id}/produtos    (Resource aninhado - relacionamento Parent-Child)
```

### Schema dos Recursos

#### Recurso: Compras
```javascript
// POST /Compras - Criar nova compra
{
  "data": "2025-11-26T19:42:15.276Z"  // ISO 8601 timestamp
}

// Response
{
  "CodCompras": "1",                   // ID gerado pela API
  "data": "2025-11-26T19:42:15.276Z",
  "produtos": []                        // Array vazio inicialmente
}
```

**Campos:**
- `CodCompras` (Object ID): Gerado automaticamente pela API
- `data` (Date): Timestamp de quando a compra foi criada
- `produtos` (Array): Relacionamento com produtos (preenchido automaticamente)

#### Recurso: produtos
```javascript
// POST /Compras/{id}/produtos - Adicionar produto à compra
{
  "CodProduto": 1,
  "Nome": "Arroz",
  "Unidade": "kg",
  "Quantidade": 5,
  "CodigoBarra": "7891234567890",
  "Ativo": false,
  "QuantComprada": 5
}

// Response
{
  "id": "1",                 // ID gerado pela API
  "CodProduto": 1,
  "CompraId": "1",          // Relacionamento automático (Parent ID)
  "Nome": "Arroz",
  "Unidade": "kg",
  "Quantidade": 5,
  "CodigoBarra": "7891234567890",
  "Ativo": false,
  "QuantComprada": 5
}
```

**Campos:**
- `id` (Object ID): Gerado pela API
- `CodProduto` (Number): Código do produto no sistema local
- `CompraId` (Parent ID): Vinculação automática com a compra (gerado pela URL)
- `Nome` (String): Nome do produto
- `Unidade` (String): Unidade de medida
- `Quantidade` (Number): Quantidade necessária
- `CodigoBarra` (String): Código de barras EAN-13
- `Ativo` (Boolean): `false` = produto já foi comprado
- `QuantComprada` (Number): Quantidade efetivamente coletada

### Relacionamento Parent-Child

O MockAPI cria automaticamente o relacionamento quando usamos a URL aninhada:
```javascript
// URL: /Compras/{id}/produtos
// O campo CompraId é preenchido automaticamente com o {id} da URL
```

---

## 📡 Sistema de Requisições HTTP

### Tecnologia: Fetch API

O projeto utiliza a **Fetch API** nativa do JavaScript para comunicação assíncrona com o servidor (AJAX).
```javascript
// Exemplo de requisição básica
const response = await fetch(url, {
  method: 'POST',                          // Método HTTP
  headers: {
    'Content-Type': 'application/json'     // Tipo do conteúdo
  },
  body: JSON.stringify(data)               // Dados em JSON
});

// Tratamento da resposta
if(!response.ok) {
  throw new Error('Erro na requisição');
}

const resultado = await response.json();   // Parse do JSON
```

### Fluxo Completo de Envio

#### Passo 1: Criar Compra
```javascript
// Criar objeto com data atual
const dataCompra = new Date().toISOString();
const compra = { data: dataCompra };

// Enviar requisição POST
const responseCompra = await fetch(
  'https://69264c8426e7e41498f9efaa.mockapi.io/Compras',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(compra)
  }
);

// Validar resposta
if(!responseCompra.ok) {
  throw new Error('Erro ao criar compra no servidor');
}

// Extrair ID da compra criada
const compraResult = await responseCompra.json();
const codCompra = compraResult.CodCompras;  // "1", "2", "3"...
```

**O que acontece:**
1. Sistema cria timestamp atual
2. Envia POST para `/Compras`
3. MockAPI cria registro e retorna com ID
4. Sistema extrai o `CodCompras` para próximo passo

#### Passo 2: Enviar Produtos
```javascript
// Buscar produtos completos do localStorage
const produtos = JSON.parse(localStorage.getItem('listaProdutos'));

// Iterar sobre cada item da lista de compras
for(const item of lista) {
  // Encontrar produto original para pegar código de barras
  const produto = produtos.find(p => p.codProduto === item.codProduto);
  
  // Montar objeto do produto
  const produtoData = {
    CodProduto: item.codProduto,
    Nome: item.nome,
    Unidade: item.unidade,
    Quantidade: item.quantidadeNecessaria,
    CodigoBarra: produto?.codigoBarra || '',
    Ativo: false,                          // Marcar como comprado
    QuantComprada: item.quantidadeComprada
  };
  
  // Enviar produto vinculado à compra
  const responseProduto = await fetch(
    `https://69264c8426e7e41498f9efaa.mockapi.io/Compras/${codCompra}/produtos`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produtoData)
    }
  );
  
  if(!responseProduto.ok) {
    throw new Error('Erro ao enviar produto');
  }
}
```

**O que acontece:**
1. Para cada produto na lista
2. Busca informações completas do produto
3. Monta objeto com todos os dados
4. Envia POST para `/Compras/{id}/produtos`
5. MockAPI vincula automaticamente via `CompraId`

#### Passo 3: Finalizar
```javascript
// Salvar no histórico local
const hist = JSON.parse(localStorage.getItem('historicoEnvios') || '[]');
hist.push({
  id: codCompra,
  data: dataCompra,
  itens: lista.length,
  sucesso: true
});
localStorage.setItem('historicoEnvios', JSON.stringify(hist));

// Limpar lista atual
localStorage.removeItem('listaCompras');

// Exibir notificação de sucesso ao usuário
mostrarNotificacao('Enviado com Sucesso!', `CodCompra: ${codCompra}`, '✓');
```

### Tratamento de Erros
```javascript
try {
  // Tentativa de envio
  await criarCompra();
  await enviarProdutos();
  finalizarEnvio();
  
} catch(error) {
  // Captura QUALQUER erro (rede, servidor, parsing...)
  
  // Registrar erro no histórico
  const hist = JSON.parse(localStorage.getItem('historicoEnvios') || '[]');
  hist.push({
    data: new Date().toISOString(),
    itens: lista.length,
    sucesso: false,
    erro: error.message
  });
  localStorage.setItem('historicoEnvios', JSON.stringify(hist));
  
  // Feedback ao usuário
  mostrarNotificacao('Erro ao Enviar!', error.message, '❌');
}
```

**Possíveis erros:**
- `400 Bad Request`: Dados inválidos ou campos faltando
- `404 Not Found`: URL da API incorreta
- `Network Error`: Sem conexão com internet
- `TypeError`: Erro de parsing do JSON

---

## 🔧 Principais Funcionalidades do Código

### 1. Geração Automática de Código
```javascript
function gerarProximoCodigo() {
  // Buscar todos os produtos
  const produtos = JSON.parse(localStorage.getItem('listaProdutos') || '[]');
  
  // Se não há produtos, começar do 1
  if(produtos.length === 0) return 1;
  
  // Encontrar o maior código existente
  const maxCod = Math.max(...produtos.map(p => p.codProduto || 0));
  
  // Retornar próximo código (incremento)
  return maxCod + 1;
}

// Uso no cadastro
const novoProduto = {
  codProduto: gerarProximoCodigo(),  // 1, 2, 3, 4...
  nome: "Arroz",
  // ...
};
```

**Por que isso é importante:**
- Evita códigos duplicados
- Mantém sequência numérica
- Funciona mesmo após exclusões

### 2. Sincronização Automática
```javascript
function sincronizarListaCompras(produtos) {
  let lista = JSON.parse(localStorage.getItem('listaCompras') || '[]');
  
  // ETAPA 1: Remover produtos excluídos
  lista = lista.filter(item => 
    produtos.some(p => p.codProduto === item.codProduto)
  );
  
  // ETAPA 2: Adicionar novos produtos e atualizar existentes
  produtos.forEach(produto => {
    const existe = lista.find(item => item.codProduto === produto.codProduto);
    
    if(!existe) {
      // Produto novo - adicionar
      lista.push({
        codProduto: produto.codProduto,
        nome: produto.nome,
        unidade: produto.unidade,
        quantidadeNecessaria: produto.quantidade,
        quantidadeComprada: 0,
        coletado: false
      });
    } else {
      // Produto existe - atualizar informações
      existe.nome = produto.nome;
      existe.unidade = produto.unidade;
      existe.quantidadeNecessaria = produto.quantidade;
      // Mantém quantidadeComprada e coletado
    }
  });
  
  // Salvar lista sincronizada
  localStorage.setItem('listaCompras', JSON.stringify(lista));
}
```

**Quando é executada:**
- Ao carregar `lista.html`
- Após cadastrar novo produto
- Após editar produto
- Após excluir produto

**O que faz:**
1. Remove itens de produtos excluídos
2. Adiciona novos produtos à lista
3. Atualiza informações de produtos editados
4. Preserva progresso de compra (quantidadeComprada)

### 3. Controle de Estado do Botão
```javascript
function atualizarBotao() {
  const lista = JSON.parse(localStorage.getItem('listaCompras') || '[]');
  const btnEnviar = document.getElementById('btnEnviar');
  
  // Verificar se TODOS os itens foram coletados
  const todosColetados = lista.length > 0 && lista.every(i => i.coletado);
  
  // Habilitar/desabilitar botão
  btnEnviar.disabled = !todosColetados;
}
```

**Quando é chamada:**
- Ao renderizar a lista
- Ao aumentar/diminuir quantidade
- Ao digitar quantidade manualmente

**Lógica:**
- Lista vazia → botão desabilitado
- Algum item não coletado → botão desabilitado
- Todos coletados → botão habilitado

### 4. Marcação Automática de Coletado
```javascript
function atualizarQuantidade(codProduto, valor) {
  const lista = JSON.parse(localStorage.getItem('listaCompras') || '[]');
  const item = lista.find(i => i.codProduto === codProduto);
  
  if(item) {
    // Atualizar quantidade (mínimo 0)
    item.quantidadeComprada = Math.max(0, Number(valor) || 0);
    
    // Marcar como coletado automaticamente
    item.coletado = item.quantidadeComprada >= item.quantidadeNecessaria;
    
    // Salvar e re-renderizar
    localStorage.setItem('listaCompras', JSON.stringify(lista));
    renderLista();
  }
}
```

**Regra de negócio:**
```
SE quantidadeComprada >= quantidadeNecessaria
  ENTÃO coletado = true
SENÃO
  coletado = false
```

**Exemplo:**
- Necessário: 5kg de arroz
- Comprado: 3kg → `coletado = false`
- Comprado: 5kg → `coletado = true`
- Comprado: 7kg → `coletado = true` (comprou a mais)

### 5. Validação de Código de Barras
```javascript
function validarCodigoBarra(codigo) {
  // Se vazio, é válido (campo opcional)
  if(!codigo) return true;
  
  // Regex: exatamente 13 dígitos numéricos
  return /^\d{13}$/.test(codigo);
}

// Uso no formulário
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const codigoBarra = document.getElementById('codigoBarra').value.trim();
  
  if(codigoBarra && !validarCodigoBarra(codigoBarra)) {
    mostrarNotificacao(
      'Código de Barra Inválido!',
      'O código deve ter exatamente 13 dígitos numéricos.',
      '⚠️'
    );
    return;
  }
  
  // Continuar salvamento...
});
```

**Regex explicada:**
- `^` = início da string
- `\d` = dígito (0-9)
- `{13}` = exatamente 13 vezes
- `$` = fim da string

---

## 🎯 Fluxo de Uso Completo

### 1. Cadastrar Produtos
```
Usuario abre cadastro.html
        ↓
Preenche formulário (nome, unidade, quantidade, código de barras)
        ↓
Clica em "Salvar Produto"
        ↓
cadastro.js valida os campos
        ↓
Gera codProduto automaticamente
        ↓
Salva em localStorage.listaProdutos
        ↓
Adiciona em localStorage.listaCompras (sincronização)
        ↓
Exibe notificação de sucesso
        ↓
Atualiza lista de produtos na tela
```

### 2. Fazer Compras
```
Usuario abre lista.html
        ↓
lista.js sincroniza com listaProdutos
        ↓
Renderiza todos os produtos ativos
        ↓
Usuario clica no botão "+" para aumentar quantidade
        ↓
Sistema verifica: qtdComprada >= qtdNecessaria?
        ↓
Se SIM: marca como coletado automaticamente
        ↓
Atualiza localStorage.listaCompras
        ↓
Re-renderiza lista (aplica estilo de riscado)
        ↓
Verifica se todos estão coletados
        ↓
Se TODOS coletados: habilita botão "Enviar para o Servidor"
```

### 3. Enviar para Servidor
```
Usuario clica em "Enviar para o Servidor"
        ↓
Sistema valida se todos os itens estão coletados
        ↓
POST /Compras { data: timestamp }
        ↓
MockAPI retorna { CodCompras: "1" }
        ↓
Para cada produto na lista:
  ├─ Monta objeto com todos os dados
  ├─ Define Ativo: false
  └─ POST /Compras/1/produtos
        ↓
MockAPI cria relacionamento automaticamente
        ↓
Salva em localStorage.historicoEnvios
        ↓
Remove localStorage.listaCompras
        ↓
Exibe notificação: "Enviado com sucesso! CodCompra: 1"
        ↓
Re-renderiza lista (agora vazia)
```

---

## 🚀 Como Configurar e Executar

### Passo 1: Configurar MockAPI

1. Acesse [mockapi.io](https://mockapi.io) e crie uma conta
2. Crie um novo projeto
3. Crie o recurso **Compras**:
   - Campo: `CodCompras` (Object ID)
   - Campo: `data` (Date)

4. Crie o recurso **produtos** com relacionamento:
   - Parent: Compras
   - Campo: `CodProduto` (Number)
   - Campo: `CompraId` (Parent ID)
   - Campo: `Nome` (String)
   - Campo: `Unidade` (String)
   - Campo: `Quantidade` (Number)
   - Campo: `CodigoBarra` (String)
   - Campo: `Ativo` (Boolean)
   - Campo: `QuantComprada` (Number)

### Passo 2: Configurar URLs no Código

Edite o arquivo `lista.js`:
```javascript
// Linha ~155 - Criar compra
const responseCompra = await fetch(
  'https://SUA_URL_AQUI.mockapi.io/Compras',  // ← Substituir
  { /* ... */ }
);

// Linha ~185 - Enviar produtos
const responseProduto = await fetch(
  `https://SUA_URL_AQUI.mockapi.io/Compras/${codCompra}/produtos`,  // ← Substituir
  { /* ... */ }
);
```

### Passo 3: Executar

Abra os arquivos HTML diretamente no navegador:
```bash
# Windows
start cadastro.html

# Mac
open cadastro.html

# Linux
xdg-open cadastro.html
```

Ou use um servidor local:
```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

---

## 📊 Tecnologias e Conceitos Aplicados

### JavaScript ES6+

- ✅ **Arrow Functions**: `() => {}`
- ✅ **Template Literals**: `` `texto ${variavel}` ``
- ✅ **Destructuring**: `const { id } = objeto`
- ✅ **Spread Operator**: `[...array]`
- ✅ **Array Methods**: `map`, `filter`, `find`, `every`, `some`
- ✅ **Async/Await**: `async function`, `await fetch()`
- ✅ **Optional Chaining**: `produto?.codigoBarra`
- ✅ **Nullish Coalescing**: `valor || 'padrão'`

### Web APIs

- ✅ **LocalStorage API**: Persistência de dados
- ✅ **Fetch API**: Requisições HTTP (AJAX)
- ✅ **DOM API**: Manipulação de elementos
- ✅ **Events API**: Event Listeners

### Padrões e Boas Práticas

- ✅ **IIFE**: `(function(){ ... })()`  - Isolamento de escopo
- ✅ **Try-Catch**: Tratamento de erros
- ✅ **Validação**: Client-side validation
- ✅ **Separação de Responsabilidades**: HTML/CSS/JS separados
- ✅ **Código Modular**: Funções específicas e reutilizáveis
- ✅ **Nomenclatura Semântica**: Nomes descritivos

---

## 📝 Licença

Projeto desenvolvido para fins acadêmicos - Disciplina de Tecnologia WEB.

---

## 👨‍💻 Autor

Desenvolvido como projeto acadêmico do curso de Análise e Desenvolvimento de Sistemas.
