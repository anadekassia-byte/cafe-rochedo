# Café Rochedo - POS System

Sistema de ponto de venda para o Café Rochedo com:
- Backend em Node.js/Express
- Frontend mobile em React Native
- Banco de dados SQLite (dev) / PostgreSQL (prod)
- Deployment no Render.com

## Instalação

```bash
npm install
npm start
```

## API Endpoints

- POST /api/auth/login
- POST /api/auth/register
- GET /api/cardapio
- GET /api/comanda
- POST /api/comanda
- POST /api/pdv/checkout

## Deployment no Render

O arquivo `render.yaml` contém a configuração de deployment.

Variáveis de ambiente necessárias:
- NODE_ENV=production
- DATABASE_URL (para PostgreSQL)
