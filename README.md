# 🍬 Power Gummy

Aplicação web de e-commerce voltada para conversão, desenvolvida como página de vendas com integração a pagamentos.

Totalmente responsiva, com suporte a dispositivos mobile (a partir de 320px) e desktop.

Conta com dashboard administrativo, captura e visualização de leads, checkout (Pix e cartão), administração de banners e cupons, integração com feed do Instagram e rastreamento de pedidos.

👉 https://powergummybr.com.br/

> Projeto desenvolvido como freelance, em colaboração com designer (UI/UX) e backend, com integração a gateway de pagamentos.


## 📸 Preview

<img src="./demo.gif" alt="Power Gummy Demo" />


## 📌 Sobre o projeto

O **Power Gummy** é uma aplicação web de e-commerce desenvolvida com foco em **performance, experiência do usuário e conversão**, contemplando todo o fluxo de vendas:

- Landing page otimizada para conversão
- Checkout com pagamentos reais (Pix e cartão)
- Sistema de autenticação de usuários
- Dashboard administrativo
- Captura e gestão de leads
- Administração de banners e cupons
- Rastreamento de pedidos (Total Express)

O projeto foi construído em parceria com designer (UI/UX) e backend, garantindo uma experiência completa desde a navegação até a finalização da compra.


## 🧠 Funcionalidades

### 🛍️ Loja / Landing Page
- Interface moderna, responsiva e focada em conversão
- Totalmente responsivo (mobile-first), com suporte a partir de 320px até desktop
- Carrinho em localstorage
- Seções estratégicas (benefícios, depoimentos, FAQ)
- Animações e carrosséis dinâmicos
- Carrinho de compras com drawer interativo
- Integração com Instagram

### 💳 Checkout
- Fluxo completo de compra
- Integração com pagamentos reais (**Pix e cartão**)
- Validação de formulários com **React Hook Form + Yup**
- Aplicação de cupons de desconto
- Captura de leads durante o processo
- Resumo do pedido em tempo real

### 🔐 Autenticação
- Sistema de login de usuários
- Proteção de rotas
- Controle de acesso ao dashboard

### 📊 Dashboard Administrativo
- Visualização de métricas de vendas
- Gestão de leads capturados

### 👥 Gestão
- Gerenciamento de cupons
- Visualização e acompanhamento de leads
- Administração de banners

### 📦 Pedidos
- Rastreamento de pedidos (Total Express)
- Status e detalhes das compras

## 🛠️ Tecnologias utilizadas

- React.js
- TypeScript
- Vite
- React Router DOM
- Context API
- React Hook Form
- Yup
- Styled Components


## ▶️ Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/brenolg/Power-Gummy.git

# Acesse a pasta
cd power-gummy

# Instale as dependências
npm install

# Inicie o projeto
npm run dev
