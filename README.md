
# Todo Express API

Este é um projeto de API de gerenciamento de tarefas (Todo) construído com Node.js, Express, PostgreSQL e Drizzle ORM para o desafio de candidatura da **mosaicQ**. 
A API permite criar, ler, atualizar e excluir tarefas, além de gerenciar usuários e autenticação.

## Configuração do Projeto

Por conta de problemas ao realizar a build na Dockerfile no Windows (e apenas no Windows. Testei com duas máquinas Linux e o build funciona normalmente.), há duas opções:
 - Configurar o projeto com Docker
 - Configurar o projeto nativa e localmente

## Opção 1: Configuração com Docker (recomendado para ambientes Linux)
#### Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina para a configuração com Docker.

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/reszkojr/todo-express
   cd todo-express
   ```


2. **Inicie os contêineres Docker:**

   ```sh
   docker-compose up --build
   ```

   O servidor estará disponível em `http://localhost:3000`.


### O que o Docker faz

O docker-compose.yaml define os serviços necessários para a aplicação, como o banco de dados PostgreSQL e o Express.js em Node.

O Dockerfile contém as instruções para criar a imagem Docker da aplicação Node, incluindo a instalação das dependências e a definição do comando de inicialização.

Rodando o comando `docker-compose up --build`, é exposta a porta 5432, que roda o banco do PostgreSQL e a porta 3000, que roda o *backend* em si.

## Opção 2: Configuração Local (recomendado para ambientes Windows)

#### Pré-requisitos


Para a configuração local, certifique-se de ter o Node.js e o PostgreSQL instalados.

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/pt/next/installation)
- [PostgreSQL](https://www.postgresql.org/)


1. **Clone o repositório:**

   ```sh
   git clone https://github.com/reszkojr/todo-express
   cd todo-express
   ```

2. **Instale as dependências:**

   ```sh
   pnpm install
   ```

3. **Configure o arquivo [`.env`](.env) :**

   Crie um arquivo [`.env`](.env) (ou renomeie o arquivo `.env.example` para `.env`) na raiz do projeto e adicione as seguintes variáveis de ambiente:

   ```properties
   DATABASE_URL=postgresql://postgres:pgpassword@localhost:5432/todos
   DATABASE_URL_TEST=postgresql://postgres:pgpassword@localhost:5433/todos
   PORT=3000
   JWT_SECRET_KEY=sua_chave_secreta_jwt
   JWT_REFRESH_SECRET_KEY=sua_chave_secreta_refresh_jwt
   ```

4. **Inicie o PostgreSQL:**

   Certifique-se de que o PostgreSQL está em execução e que você criou os bancos de dados `todos`.

5. **Crie as migrações do banco de dados:**

   ```sh
   pnpm run db:generate
   ```


6. **Execute as migrações do banco de dados:**

   ```sh
   pnpm run db:migrate
   ```

7. **Inicie o servidor:**

   ```sh
   pnpm run dev
   ```

   O servidor estará disponível em `http://localhost:3000`.

### Inicialização das Tabelas

As tabelas do banco de dados são iniciadas automaticamente com o Drizzle quando os containers Docker são iniciados.

Ao realizar a *build* da imagem, o Drizzle espera o banco do PostgreSQL iniciar para gerar as migrações e, então, aplicá-las ao banco. Nesse momento, são criadas as tabelas `user` e `todo`.

## Testando a Aplicação
### Testando em Ambientes Docker
Para testar a API em um ambiente Docker, primeiro, certifique-se de que ela está em execução. Em seguida, execute o seguinte comando para rodar os testes:

```sh
sudo docker-compose exec -it backend pnpm run test
```

Este comando irá executar os testes definidos no projeto dentro do container Docker do backend.

## Testando em Ambientes Locais
Para testar a API em um ambiente local, primeiro, certifique-se de que ela está em execução. Em seguida, 
crie um novo servidor de banco de dados na porta 5433 ou modifique o arquivo `.env` para que a URL do banco de teste utilize a porta do seu banco de teste.

É importante que ele esteja vazio, para não haver conflitos nos testes.

Com tudo configurado, execute o seguinte comando para rodar os testes:

```sh
pnpm run test
```


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

## Consumindo a API

É possível consumir a API usando ferramentas como Postman ou Bruno utilizando as configurações passadas anteriormente ou utilizando o `curl`.

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


## Decisões Técnicas

### Drizzle
Escolhi o Drizzle para simplificar a interação com o banco. Ele, por ser uma ORM, oferece uma camada de abstração que facilita muito a definição de esquemas, migrações e consultas, reduzindo a quantidade de código repetitivo, minimizando erros comuns em operações de banco de dados e aumentando muito a segurança das operações do banco.

### pnpm
Optei pelo pnpm como gerenciador de pacotes devido à velocidade. Ele é muito mais rápido que o npm no que tange a instalação de pacotes e muio mais eficiente para gerenciar o tamanho do `node_modules`, pois todos eles são armazenados em uma pasta geral e, em projetos específicos, caso o pacote já exista, só é criado um *symlink* da pasta geral para o `node_modules` do projeto.

### TypeScript
A utilização do TypeScript foi uma escolha para aumentar a produtividade e conseguir desenvolver o projeto com mais rapidez e deixá-lo mais "manutenível", pois certamente é uma linguagem extremamente importante de se utilizar em projetos de larga escala por conta de sua tipagem. O Intellisense do Typescript junto a um *linter* tornam o desenvolvimento muito mais fluido e *gostosinho*.

### Docker
O Docker foi escolhido para isolar cada módulo da aplicação, como o banco de dados e o próprio back-end, a fim de se manter organização no meu espaço de trabalho pessoal — pois tenho mais de um PostgreSQL rodando na minha máquina — e para facilitar a configuração do projeto por pessoas de fora. 

### ts-jest
Optei pelo ts-jest em vez do jest normal para facilitar a integração com o TypeScript e manter a consistência com o projeto pois permite que os testes sejam escritos diretamente em TypeScript.