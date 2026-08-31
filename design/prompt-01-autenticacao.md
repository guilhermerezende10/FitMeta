# Prompt 1 — Autenticação (Login + Cadastro)

Estou redesenhando o **FitMeta**, um app web de treino e nutrição em português.
Anexei o arquivo `fitmeta-design-system.md` — ele é a fonte da verdade. Use
**exclusivamente** os tokens, tipos, raios e espaçamentos dele. Não invente cor,
tamanho de fonte nem raio.

## O que quero

Um **protótipo clicável** do fluxo de autenticação: as telas de **Login** e
**Cadastro**, funcionando de verdade (dá para digitar, alternar entre elas,
mostrar/esconder senha, ver validação e ver o estado de carregamento).

Formato: **desktop 1440×900**. Faça também a versão **mobile 390×844** de cada
uma, em pranchas separadas.

## O problema que estou resolvendo

As telas atuais são **fundo branco com logo roxo escuro** — o resto do app inteiro
é escuro. É a quebra de identidade mais grave que existe hoje. Além disso tudo fica
espremido numa coluna de ~420px no meio de uma tela de 1870px, e os rótulos dos
campos são só placeholder (somem quando você digita).

## Layout

Divida a tela em duas colunas:

- **Esquerda (~45%)** — painel de marca. Foto de academia em preto e branco com o
  véu escuro do sistema por cima, o logo do FitMeta, e uma frase curta de
  posicionamento. Sem formulário aqui. (Use um bloco de cor sólida ou gradiente
  escuro como marcador de foto — eu troco pela imagem real depois.)
- **Direita (~55%)** — o formulário, centrado verticalmente, com largura máxima
  de 420px dentro da coluna.

No mobile o painel de marca vira uma faixa de ~200px no topo e o formulário ocupa
o resto.

## Conteúdo exato

**Login**
- Título: "Entre em sua conta"
- Campo: `E-MAIL` (rótulo acima, sempre visível)
- Campo: `SENHA`, com botão de olho para mostrar/esconder
- Botão primário largura total: "Entrar"
- Divisor: "ou conecte com"
- Botão de largura total com o G do Google + o texto "Continuar com Google"
  (hoje é só um círculo com um G preto, sem rótulo — parece inacabado)
- Rodapé: "Ainda não possui uma conta? **Cadastre-se**"

**Cadastro**
- Título: "Crie sua conta"
- Campos: `NOME DE USUÁRIO`, `E-MAIL`, `SENHA` (com olho)
- Checkbox desenhado (não o nativo): "Li e concordo com a Política de Privacidade
  e os Termos de Uso", com os dois links em `accent`. Precisa caber em uma linha
  na largura de 420px.
- Botão primário largura total: "Cadastrar"
- Mesmo bloco do Google
- Rodapé: "Já possui uma conta? **Faça login**"

## Estados que preciso ver

Mostre-os funcionando no protótipo, não como pranchas separadas:

1. **Vazio** — botão primário desabilitado (fundo `#232C32`, borda `#3D474E`,
   texto `#8E979E`), com uma linha abaixo dizendo o que falta preencher.
2. **Foco** — borda `#8B45E0` + anel `0 0 0 3px rgba(139,69,224,.25)`, rótulo em `accent`.
3. **Erro de campo** — borda `#DA5B5B` e mensagem específica abaixo do campo
   ("Informe um e-mail válido", "A senha precisa de pelo menos 6 caracteres").
4. **Erro de credencial** — faixa acima do formulário com fundo `#192126`,
   borda 1px `#DA5B5B` e ícone de alerta: "E-mail ou senha incorretos."
5. **Carregando** — o botão vira spinner e fica inerte por ~1,2s antes de "entrar".

## Interatividade

- Digitar nos campos funciona de verdade.
- O olho alterna a visibilidade da senha.
- "Cadastre-se" e "Faça login" alternam entre as duas telas dentro do protótipo.
- O botão primário só habilita quando os campos obrigatórios estão preenchidos
  (e, no cadastro, com o checkbox marcado).
- Clicar em "Entrar" mostra o estado de carregamento e depois o estado de sucesso.

## Não faça

- Nada de fundo branco em lugar nenhum.
- Nada de emoji — todos os ícones são SVG de traço 2px.
- Nada de rótulo que vive só no placeholder.
- Nada de "Bem-vindo de volta!", "Que bom te ver!" ou qualquer texto de marketing.
  O tom é direto.
- Não invente "esqueci minha senha", login por telefone, nem qualquer campo que
  não esteja listado acima — o backend é Supabase e só tem o que está aqui.

## Tokens críticos (caso o anexo não carregue)

```
canvas    #10161A     surface   #192126     surface-raised #232C32
border    #2C353B     border-strong #3D474E accent-surface #241A33
texto     #F2F5F7 / #A8B2B9 / #8E979E (piso) / #7A858C (só placeholder)
accent    #8B45E0     sobre card #B78AE2    danger #DA5B5B
botão primário  linear-gradient(135deg, #9450E4, #7C29C9)
títulos   Barlow Condensed 700   ·   corpo Poppins 400/500/600
controle 48px de altura · raio 10 (campo), 999 (botão), 20 (card)
espaçamento 4 8 12 16 24 32 48 64
```

Comece pelo desktop do Login. Me mostre antes de seguir para o Cadastro.
