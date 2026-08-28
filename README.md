# 🏋️ Plataforma Web de Treinos e Nutrição

> Aplicação web para responder questionários de treino e nutrição, receber
> recomendações personalizadas e consultar conteúdos sobre atividade física.
> Construída com foco em **componentização e experiência do usuário**.

---

## 🌐 Deploy

🔗 **Acesse a aplicação:**  
👉 https://fitmet.netlify.app/

---

## 🚀 Tecnologias Utilizadas

### 🖥️ Front-end

- React
- JavaScript
- TailwindCSS
- React Router
- React Query
- Context API

### 🗄️ Back-end & Banco de Dados

- Supabase (autenticação e banco de dados)

### 🛠️ Ferramentas e Qualidade

- React Hot Toast
- ESLint

---

## ✨ Funcionalidades

- ✅ Cadastro e login de usuários
- ✅ Controle e persistência de sessão
- ✅ Proteção de rotas privadas
- ✅ Questionário para recomendação de treino
- ✅ Cálculo de recomendação nutricional
- ✅ Persistência das respostas por usuário no Supabase
- ✅ Consulta das recomendações salvas
- ✅ Conteúdos sobre treino e nutrição
- ✅ Validação de formulários e feedback visual

---

## 🧠 Arquitetura e Boas Práticas

- Estrutura baseada em **componentização**
- Separação de responsabilidades por recursos
- Gerenciamento de estado compartilhado com **Context API**
- Gerenciamento de requisições assíncronas com **React Query**
- Tratamento de erros e estados de carregamento
- Padronização e qualidade de código com **ESLint**

---

## 🔐 Autenticação

A autenticação utiliza o Supabase e inclui:

- Registro de novos usuários
- Login
- Persistência de sessão
- Proteção de rotas privadas

---

## 🗂️ Como Funcionam as Recomendações

### Treino

O usuário informa seus dados básicos e responde a três perguntas sobre
frequência, duração e experiência de treino. As respostas são salvas por usuário
no Supabase, e a aplicação apresenta um plano compatível a partir do catálogo de
nove treinos disponíveis no projeto.

### Nutrição

O usuário informa seus dados básicos, frequência de treino e objetivo. A
aplicação calcula uma recomendação diária de calorias e macronutrientes e salva
as respostas no Supabase para consulta posterior.

---

## 🎨 Interface

- Desenvolvida com **TailwindCSS**
- Componentes reutilizáveis
- Feedback visual com **React Hot Toast**
- Fluxos de autenticação e documentos legais adaptados para telas menores
- Área autenticada atualmente direcionada à experiência desktop

---

## 📦 Como Rodar o Projeto Localmente

```bash
# Clone o repositório
git clone https://github.com/guilhermerezende10/FitMeta.git

# Entre na pasta
cd FitMeta

# Instale as dependências
npm install

# Crie o arquivo de ambiente
cp .env.example .env

# Preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env

# Rode o projeto
npm run dev
```

As variáveis com o prefixo `VITE_` ficam disponíveis no navegador. Use somente
a chave pública `anon` do Supabase e mantenha Row Level Security (RLS) habilitado
nas tabelas. Nunca use a chave `service_role` no front-end.
