# 💸 API de Transações

Uma API REST para gerenciamento de transações financeiras pessoais, construída com Fastify, TypeScript e SQLite.

## 📋 Sobre

Esta API permite que usuários criem e consultem transações financeiras (crédito e débito). Cada usuário é identificado por um cookie de sessão, garantindo que cada pessoa visualize apenas suas próprias transações.

## 🚀 Tecnologias

- **[Fastify](https://fastify.dev/)** — Framework web rápido e de baixo overhead
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática para JavaScript
- **[Knex.js](https://knexjs.org/)** — Query builder SQL e migrations
- **[SQLite](https://www.sqlite.org/)** — Banco de dados relacional leve
- **[Zod](https://zod.dev/)** — Validação de esquemas em tempo de execução
- **[Vitest](https://vitest.dev/)** — Testes unitários e de integração
- **[dotenv](https://github.com/motdotla/dotenv)** — Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
src/
├── @types/
│   └── knex.d.ts          # Extensões de tipos do Knex
├── env/
│   └── index.ts           # Validação das variáveis de ambiente
├── middlewares/
│   └── check-session-id-exists.ts  # Middleware de autenticação por sessão
├── routes/
│   └── transactions.ts    # Rotas de transações
├── app.ts                 # Configuração do app Fastify
├── database.ts            # Configuração do Knex
└── server.ts              # Ponto de entrada do servidor

db/
└── migrations/            # Migrations do banco de dados

test/
└── transactions.spec.ts   # Testes automatizados
```

## ⚙️ Como Rodar

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/velosogustavo/02-api-rest-nodejs.git
cd 02-api-rest-nodejs

# Instale as dependências
npm install
```

### Variáveis de Ambiente

Copie o arquivo de exemplo e preencha os valores:

```bash
cp .env.example .env
```

Variáveis necessárias:

| Variável       | Descrição                                  | Exemplo       |
|----------------|--------------------------------------------|---------------|
| `NODE_ENV`     | Ambiente de execução                       | `development` |
| `DATABASE_URL` | Caminho para o arquivo do banco SQLite     | `./db/app.db` |
| `PORT`         | Porta em que o servidor irá rodar          | `3333`        |

### Executando as Migrations

```bash
npm run knex -- migrate:latest
```

### Rodando o Servidor

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build de produção
npm run build
node build/server.js
```

## 🧪 Testes

```bash
npm test
```

Os testes utilizam um banco de dados dedicado (`.env.test`) para não interferir nos dados de desenvolvimento. O banco é resetado antes de cada teste via `migrate:rollback` + `migrate:latest`.

Casos cobertos:

- Criação de uma nova transação
- Listagem de todas as transações da sessão
- Busca de uma transação específica por ID
- Resumo da conta com crédito e débito (ex: R$5000 de crédito − R$2000 de débito = saldo de R$3000)

## 📌 Rotas da API

Todas as rotas possuem o prefixo `/transactions`.

### Criar uma transação

```http
POST /transactions
```

**Body:**

```json
{
  "title": "Salário",
  "amount": 5000,
  "type": "credit"
}
```

> Um cookie de sessão (`sessionId`) é criado automaticamente na primeira transação e é válido por 7 dias.

---

### Listar todas as transações

```http
GET /transactions
```

> 🔒 Requer cookie de sessão válido.

---

### Buscar uma transação pelo ID

```http
GET /transactions/:id
```

> 🔒 Requer cookie de sessão válido.

---

### Resumo da conta

```http
GET /transactions/summary
```

Retorna a soma de todas as transações da sessão atual.

> 🔒 Requer cookie de sessão válido.

---

## 🔒 Autenticação

A autenticação é feita via cookie `sessionId`, criado automaticamente ao realizar a primeira transação (`POST /transactions`). Todas as rotas `GET` exigem esse cookie — requisições sem ele recebem uma resposta `401 Unauthorized`.

## 📜 Licença

ISC
