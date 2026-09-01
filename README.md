# 🏋️ Plataforma Web de Treinos e Nutrição

> Aplicação web que monta um plano de treino e uma recomendação nutricional a partir de um questionário curto, e guarda as respostas de cada usuário.  
> Construída com foco em **boas práticas de arquitetura, componentização e experiência do usuário**.

---

## 🌐 Deploy

🔗 **Acesse a aplicação:**  
👉 https://www.fitmeta.com.br

O deploy é feito pela **Vercel**, automaticamente a cada push na `main`.
As variáveis de ambiente (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`)
ficam em *Settings → Environment Variables* no painel do projeto — e só
entram no bundle em tempo de build, então trocá-las exige um redeploy.

---

## 🚀 Tecnologias Utilizadas

### 🖥️ Front-end
- React  
- TailwindCSS  
- React Router  
- React Query  
- Context API  

### 🗄️ Back-end & Banco de Dados
- Supabase (Autenticação e Banco de Dados)

### 🛠️ Ferramentas e Qualidade
- React Hot Toast  
- ESLint  

---

## ✨ Funcionalidades

- ✅ Cadastro e login de usuários  
- ✅ Controle e persistência de sessão  
- ✅ Proteção de rotas privadas  
- ✅ Questionário que seleciona um plano de treino a partir de um catálogo  
- ✅ Recomendação nutricional calculada (TMB e macros)  
- ✅ Respostas persistidas por usuário  
- ✅ Validação de formulários  
- ✅ Feedback visual para ações do usuário  
- ✅ Interface totalmente responsiva  

---

## 🧠 Arquitetura e Boas Práticas

- Estrutura baseada em **componentização**
- Separação clara de responsabilidades
- Gerenciamento de estado global com **Context API**
- **React Query** em toda busca e gravação de dados: autenticação
  (`useLogin`, `useRegister`, `useUser`) e planos (`services/usePlanos.js`).
  Nenhuma tela busca por conta própria
- Tratamento de erros e estados de carregamento vindos dos próprios hooks
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

## 🗂️ Como o plano é gerado

O usuário não monta o treino manualmente. Ele responde um questionário curto
e o app devolve um resultado, que fica salvo na conta.

**Treino** — três etapas (*Sobre você*, *Frequência*, *Duração*). A resposta
seleciona um entre os **9 planos pré-definidos** de
`src/data/data-recomendacao-treino.js`, casados por duração e dias de treino.

**Nutrição** — três etapas (*Sobre você*, *Frequência*, *Objetivo*). Aqui o
resultado é calculado, não escolhido de um catálogo:
`src/features/recomendacao-nutricional/calculadorMacros.js` estima a taxa
metabólica basal pelas equações da FAO/OMS e deriva os macros a partir dela.

**Persistência** — as respostas vão para o Supabase por `upsert`, com uma
linha por usuário: dados básicos em `info_basica`, respostas em
`treino_answers` e `nutricao_answers`. As telas *Meu treino* e *Minha
nutrição* leem de lá.

> Não há edição nem exclusão de planos. Refazer o questionário sobrescreve a
> resposta anterior — é o que o `upsert` faz. Uma tela de perfil para editar
> os dados básicos está prevista na issue #25.

---

## 🎨 Interface

- Desenvolvida com **TailwindCSS**
- Layout responsivo: a área logada usa sidebar fixa a partir de `lg` e vira
  drawer abaixo disso, com fechamento por Esc e foco preso enquanto aberto
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
