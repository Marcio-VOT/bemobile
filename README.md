# Documentação da API Be Mobile

 - Este projeto se trata de uma API RESTful para o gerenciamento de clientes, produtos (livros), vendas e suas relações.
 
 ## Features
- cadastro de usuário do sistema (signup)
- login com JWT de usuário cadastrado (login)
- clientes:
    - listar todos os clientes cadastrados (index)
        - apenas dados principais devem vir aqui;
        - ordenar pelo id.
    - detalhar um(a) cliente e vendas a ele(a) (show)
        - trazer as vendas mais recentes primeiro;
        - possibilidade de filtrar as vendas por mês + ano.
    - adicionar um(a) cliente (store)
    - editar um(a) cliente (update)
    - excluir um(a) cliente e vendas a ele(a) (delete)
- produtos:
    - listar todos os produtos cadastrados (index)
        - apenas dados principais devem vir aqui;
        - ordenar alfabeticamente.
    - detalhar um produto (show)
    - criar um produto (store)
    - editar um produto (update)
    - exclusão lógica ("soft delete") de um produto (delete)
- vendas:
    - registrar venda de 1 produto a 1 cliente (store)

## Pré-requisitos

Antes de executar um projeto de API AdonisJS, você precisa ter o seguinte software instalado em seu sistema:

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) 
- [AdonisJS CLI](https://adonisjs.com) 

## Instalação

Para instalar o projeto, primeiro clone o repositório:

```bash
git clone https://github.com/Marcio-VOT/bemobile.git
```

Em seguida, navegue até o diretório do projeto e instale as dependências:

```bash
cd seu-projeto
npm install
```

## Configuração

Antes de executar o projeto, você precisa configurar a conexão com o banco de dados. Copie o arquivo .env.example para .env:

```bash
cp .env.example .env
```

Em seguida, abra o arquivo .env e defina as variáveis DB_CONNECTION, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD e DB_DATABASE para corresponder à configuração do seu banco de dados.

## Iniciando o Servidor

Para iniciar o servidor, execute o seguinte comando:

```bash
npm run build
npm run start
OU 
npm run dev
```

Isso iniciará o servidor na porta 3333. Você pode então usar uma ferramenta como o Postman para enviar solicitações para a API.


**Nota Importante**: Todos os recursos, com exceção dos recursos de usuários, são rotas autorizadas. Isso significa que apenas usuários autenticados têm acesso a esses recursos.

## Rotas de Autenticação

### Cadastro de Usuário do Sistema (Signup)

- **Rota**: `/signup`
- **Método HTTP**: POST
- **Descrição**: Permite que um usuário se cadastre no sistema.
- **Parâmetros de entrada**:
  - `email: string`
  - `password: string`
- **Retorno**: Token JWT para autenticação subsequente.

### Login com JWT de Usuário Cadastrado (Login)

- **Rota**: `/login`
- **Método HTTP**: POST
- **Descrição**: Permite que um usuário se autentique no sistema.
- **Parâmetros de entrada**:
  - `email: string`
  - `password: string`
- **Retorno**: Token JWT para autenticação subsequente.

## Recursos de Clientes

### Listar Todos os Clientes Cadastrados (Index)

- **Rota**: `/clientes`
- **Método HTTP**: GET
- **Descrição**: Retorna a lista de todos os clientes cadastrados no sistema.
- **Parâmetros de entrada**: Nenhum.
- **Retorno**: Dados principais de clientes ordenados pelo ID.

### Detalhar um(a) Cliente e suas Vendas (Show)

- **Rota**: `/clientes/{id}`
- **Método HTTP**: GET
- **Descrição**: Retorna informações detalhadas de um(a) cliente e suas vendas associadas, com as vendas mais recentes listadas primeiro.
- **Parâmetros de entrada**:
  - `id: number` (ID do cliente)
- **Possibilidade de filtrar as vendas por mês e ano através de query string.

### Adicionar um(a) Cliente (Store)

- **Rota**: `/clientes`
- **Método HTTP**: POST
- **Descrição**: Permite adicionar um novo(a) cliente ao sistema.
- **Parâmetros de entrada**:
  - `client: { name: string, cpf: string }`
  - `phone: string`
  - `address: {
      zip_code: string,
      country: string,
      state: string,
      city: string,
      street: string,
      neighborhood: string,
      number: number,
      complement: string | undefined
    }`
- **Apenas acessível por usuário logado.**

### Editar um(a) Cliente (Update)

- **Rota**: `/clientes/{id}`
- **Método HTTP**: PUT
- **Descrição**: Permite atualizar informações de um(a) cliente existente no sistema.
- **Parâmetros de entrada**:
  - `id: number` (ID do cliente)
  - `{
    client: { name: string | undefined, cpf: string | undefined } | undefined,
    phone: string | undefined,
    address: {
        zip_code: string | undefined,
        country: string | undefined,
        state: string | undefined,
        city: string | undefined,
        street: string | undefined,
        neighborhood: string | undefined,
        number: number | undefined,
        complement: string | undefined
    } | undefined
  }`
- **Apenas acessível por usuário logado.**

### Excluir um(a) Cliente e suas Vendas (Delete)

- **Rota**: `/clientes/{id}`
- **Método HTTP**: DELETE
- **Descrição**: Exclui um(a) cliente e todas as suas vendas associadas do sistema.
- **Parâmetros de entrada**:
  - `id: number` (ID do cliente)
- **Apenas acessível por usuário logado.**

## Recursos de Produtos

### Listar Todos os Produtos Cadastrados (Index)

- **Rota**: `/produtos`
- **Método HTTP**: GET
- **Descrição**: Retorna a lista de todos os produtos cadastrados no sistema.
- **Parâmetros de entrada**: Nenhum.
- **Retorno**: Dados principais dos produtos ordenados alfabeticamente.

### Detalhar um Produto (Show)

- **Rota**: `/produtos/{id}`
- **Método HTTP**: GET
- **Descrição**: Retorna informações detalhadas de um produto.
- **Parâmetros de entrada**:
  - `id: number` (ID do produto)

### Criar um Produto (Store)

- **Rota**: `/produtos`
- **Método HTTP**: POST
- **Descrição**: Permite adicionar um novo produto ao sistema.
- **Parâmetros de entrada**:
  - `{
    title: string,
    author: string,
    description: string,
    isbn: string,
    image: string,
    price: number,
    stock: number,
    category: string,
    published_at: DateTime
  }`
- **Apenas acessível por usuário logado.**

### Editar um Produto (Update)

- **Rota**: `/produtos/{id}`
- **Método HTTP**: PUT
- **Descrição**: Permite atualizar informações de um produto existente no sistema.
- **Parâmetros de entrada**:
  - `id: number` (ID do produto)
  - `{
    title: string | undefined,
    author: string | undefined,
    description: string | undefined,
    isbn: string | undefined,
    image: string | undefined,
    price: number | undefined,
    stock: number | undefined,
    category: string | undefined,
    published_at: DateTime | undefined,
    deleted_at: DateTime | null | undefined
  }`
- **Apenas acessível por usuário logado.**

### Exclusão Lógica ("Soft Delete") de um Produto (Delete)

- **Rota**: `/produtos/{id}`
- **Método HTTP**: DELETE
- **Descrição**: Realiza uma exclusão lógica de um produto no sistema.
- **Parâmetros de entrada**:
  - `id: number` (ID do produto)
- **Apenas acessível por usuário logado.**

## Recursos de Vendas

### Registrar Venda de um Produto a um Cliente (Store)

- **Rota**: `/vendas`
- **Método HTTP**: POST
- **Descrição**: Registra uma nova venda de um produto a um cliente.
- **Parâmetros de entrada**:
  - `{
    client_id: number,
    product_id: number,
    quantity: number
  }`
- **Apenas acessível por usuário logado.**

Esta API oferece funcionalidades para gerenciar usuários, clientes, produtos e vendas de forma segura, com autenticação adequada. Certifique-se de estar autenticado para acessar os recursos apropriados.
