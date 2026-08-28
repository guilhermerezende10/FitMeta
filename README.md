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
git clone https://github.com/guilhermerezende10/FitMeta.git

# Entre na pasta
cd FitMeta

# Instale as dependências
npm install

# Crie o .env a partir do template e preencha os valores
cp .env.example .env

# Rode o projeto
npm run dev
```

O app não sobe sem o `.env`. As duas variáveis são obrigatórias:

| Variável | Onde encontrar |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → Data API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API Keys → `anon` / `public` |

Nunca comite o `.env`. Ele está no `.gitignore`, e o hook de pre-commit
(`.githooks/pre-commit`, instalado pelo `npm install`) recusa o commit caso
ele entre no stage.

> **Atenção:** o prefixo `VITE_` faz o Vite substituir a variável pelo valor
> literal **dentro do bundle entregue ao navegador** — tudo com esse prefixo é
> público. Nunca coloque senha de banco nem a chave `service_role` ali. E como
> o valor entra em tempo de build, trocá-lo exige um build novo: alterar a
> variável no painel da Vercel sem redeploy não muda nada.
