# 🏋️ Plataforma Web de Treinos e Nutrição

> Aplicação web desenvolvida para permitir que usuários montem treinos personalizados e acompanhem recomendações nutricionais diárias.  
> Construída com foco em **boas práticas de arquitetura, componentização e experiência do usuário**.

---

## 🌐 Deploy

🔗 **Acesse a aplicação:**  
👉 https://fitmeta.vercel.app/

O deploy é feito pela **Vercel**, automaticamente a cada push na `main`.
As variáveis de ambiente (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`)
ficam em *Settings → Environment Variables* no painel do projeto — e só
entram no bundle em tempo de build, então trocá-las exige um redeploy.

---

## 🚀 Tecnologias Utilizadas

### 🖥️ Front-end
- React  
- TypeScript  
- TailwindCSS  
- React Router  
- React Query  
- Context API  

### 🗄️ Back-end & Banco de Dados
- Supabase (Autenticação e Banco de Dados)

### 🛠️ Ferramentas e Qualidade
- React Hook Form  
- React Hot Toast  
- ESLint  

---

## ✨ Funcionalidades

- ✅ Cadastro e login de usuários  
- ✅ Controle e persistência de sessão  
- ✅ Proteção de rotas privadas  
- ✅ CRUD completo para gerenciamento de treinos  
- ✅ Recomendação nutricional diária  
- ✅ Validação de formulários  
- ✅ Feedback visual para ações do usuário  
- ✅ Interface totalmente responsiva  

---

## 🧠 Arquitetura e Boas Práticas

- Estrutura baseada em **componentização**
- Separação clara de responsabilidades
- Gerenciamento de estado global com **Context API**
- Gerenciamento de requisições assíncronas com **React Query**
- Tratamento de erros e estados de carregamento
- Padronização e qualidade de código com **ESLint**
- Organização de pastas voltada para escalabilidade

---

## 🔐 Autenticação

A autenticação foi implementada utilizando **Supabase**, incluindo:

- Registro de novos usuários  
- Login  
- Persistência de sessão  
- Proteção de rotas privadas  

---

## 🗂️ Funcionalidades do CRUD

O usuário pode:

- ➕ Criar novos treinos  
- 👀 Visualizar treinos cadastrados  
- ✏️ Editar treinos  
- ❌ Excluir treinos  

Todas as operações são integradas ao banco de dados via Supabase.

---

## 🎨 Interface

- Desenvolvida com **TailwindCSS**
- Layout responsivo (desktop e mobile)
- Componentes reutilizáveis
- Feedback visual com **React Hot Toast**

---

## 📦 Como rodar o projeto localmente

```bash
# Clone o repositório
git clone https://github.com/seuusuario/seurepositorio.git

# Entre na pasta
cd seurepositorio

# Instale as dependências
npm install

# Rode o projeto
npm run dev
