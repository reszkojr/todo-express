
# Todo Express API

Este é um projeto de API de gerenciamento de tarefas (Todo) construído com Node.js, Express, PostgreSQL e Drizzle ORM para o desafio de candidatura da **mosaicQ**. 
A API permite criar, ler, atualizar e excluir tarefas, além de gerenciar usuários e autenticação.

## Configuração do Projeto

### Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Passos para Configuração

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/reszkojr/todo-express
   cd todo-express
   ```

2. **Inicie os containers Docker:**

   ```sh
   docker-compose up --build
   ```

   O servidor estará disponível em `http://localhost:3000`.


## O que o Docker faz

O `docker-compose.yaml` define os serviços necessários para a aplicação, como o banco de dados PostgreSQL e o Express.js em Node.

O `Dockerfile` contém as instruções para criar a imagem Docker da aplicação Node, incluindo a instalação das dependências e a definição do comando de inicialização.

Rodando o comando `docker-compose up --build`, é exposta a porta 5432, que roda o banco do PostgreSQL e a porta 3000, que roda o *backend* em si.

### Inicialização das Tabelas

As tabelas do banco de dados são iniciadas automaticamente com o Drizzle quando os containers Docker são iniciados.

Ao realizar a *build* da imagem, o Drizzle espera o banco do PostgreSQL iniciar para gerar as migrações e, então, aplicá-las ao banco. Nesse momento, são criadas as tabelas `user` e `todo`.


## Rotas da API

### Documentação da API

A documentação da API é gerada automaticamente usando Swagger. É possível acessa-la em `http://localhost:3000/api-docs/`.

### Autenticação

- **Registrar Usuário**
  - **POST** `/api/register`
  - Corpo da Requisição:
    ```json
    {
      "username": "novo_usuario",
      "email": "novo_usuario@example.com",
      "password": "senha123"
    }
    ```

- **Login de Usuário**
  - **POST** `/api/login`
  - Corpo da Requisição:
    ```json
    {
      "email": "usuario@example.com",
      "password": "senha123"
    }
    ```

-  **Token Refresh**
    - **POST** `/api/refresh-token`
    - Corpo da Requisição:
        ```json
        {
        "refreshToken": "seu_refresh_token"
        }
        ```

### Tarefas (To-dos)

- **Obter Todas as Tarefas**
    - **GET** `/api/todos`

        Exemplo de comando `curl`:
        ```sh
        curl -X GET http://localhost:3000/api/todos
        ```

- **Obter Tarefa por ID**
    - **GET** `/api/todos/:id`

        Exemplo de comando `curl`:
        ```sh
        curl -X GET http://localhost:3000/api/todos/1
        ```

- **Criar Nova Tarefa**
  - **POST** `/api/todos`
  - Corpo da Requisição:
    ```json
    {
      "title": "Nova Tarefa",
      "description": "Descrição da nova tarefa",
      "status": "pending"
    }
    ```

- **Atualizar Tarefa**
  - **PUT** `/api/todos/:id`
  - Corpo da Requisição:
    ```json
    {
      "title": "Tarefa Atualizada",
      "description": "Descrição atualizada",
      "status": "in progress"
    }
    ```

- **Deletar Tarefa**
  - **DELETE** `/api/todos/:id`

## Importando Collections do Bruno e Postman

### Collection do Bruno

1. **Abra o Bruno**.
2. **Clique em** "*Import Collection*".
3. **Selecione o arquivo `todo-bruno-api-client.json`**.
4. **Configure a variável `host` para `http://localhost:3000`**.

### Collection do Postman

1. **Abra o Postman**.
2. **Clique em "Import"**.
3. **Selecione o arquivo `todo-postman-api-client.json`**.
4. **Configure a variável `host` para `http://localhost:3000`**.

## Estrutura do Projeto

- **src/**: Contém o código-fonte do projeto.
  - **controllers/**: Controladores que contêm a lógica das rotas.
  - **db/**: Configuração do banco de dados e esquemas.
  - **middleware/**: Middlewares para autenticação e outras funcionalidades.
  - **routes/**: Definição das rotas da API.
  - **utils/**: Utilitários e funções auxiliares.
- **.env**: Arquivo de configuração de variáveis de ambiente.
- **docker-compose.yaml**: Configuração do Docker Compose.
- **package.json**: Dependências e scripts do projeto.

## Testando a API

É possível testar a API usando ferramentas como Postman ou Bruno utilizando as configurações passadas anteriormente ou utilizando o `curl`.

Aqui estão alguns exemplos utilizando o `curl` para testar as rotas:

### Obter Todas as Tarefas
```sh
curl -X GET http://localhost:3000/api/todos
```

### Obter Tarefa por ID
```sh
curl -X GET http://localhost:3000/api/todos/1
```

### Criar Nova Tarefa
```sh
curl -X POST http://localhost:3000/api/todos \
     -H "Content-Type: application/json" \
     -d '{
           "title": "Nova Tarefa",
           "description": "Descrição da nova tarefa",
           "status": "pending"
         }'
```

### Atualizar Tarefa
```sh
curl -X PUT http://localhost:3000/api/todos/1 \
     -H "Content-Type: application/json" \
     -d '{
           "title": "Tarefa Atualizada",
           "description": "Descrição atualizada",
           "status": "in progress"
         }'
```

### Deletar Tarefa
```sh
curl -X DELETE http://localhost:3000/api/todos/1
```