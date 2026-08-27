# Issues de implementação — backlog da Fase 4

Registro vivo dos problemas encontrados no código enquanto o redesign é
desenhado. **Nada aqui é resolvido agora** — a fase atual é só design. Este
arquivo existe para que, quando abrirmos o Claude Code para implementar, a
lista já esteja pronta e nada se perca no caminho.

Regras deste arquivo:

- Um arquivo só, atualizado no lugar. Novas descobertas entram como novas
  linhas, não como novos arquivos.
- Toda issue tem ID fixo (`FM-NN`). O ID nunca é reciclado.
- Toda issue diz **onde**, **o que acontece**, **o que fazer** e **qual tela do
  redesign depende disso**.
- Esforço: `P` (uma linha ou poucos minutos) · `M` (um componente) · `G`
  (refatoração que atravessa telas).

Status: `aberto` · `em andamento` · `resolvido` (com o commit) · `descartado`
(com o motivo).

---

## Resumo

| ID | Área | Título | Esforço | Status |
|---|---|---|---|---|
| FM-01 | Identidade | `bg-white` espalhado por 8 telas | G | aberto |
| FM-02 | Bug | Gradiente do botão sem prefixo `brand-` | P | aberto |
| FM-03 | Semântica | `<button>` dentro de `<NavLink>` | M | aberto |
| FM-04 | Bug | `@import` de fontes depois do `@tailwind` | P | aberto |
| FM-05 | Dados | Nome de usuário coletado e descartado | P | aberto |
| FM-06 | Fluxo | Cadastro sem estado de confirmação de e-mail | M | aberto |
| FM-07 | Dados | `nome` e `faixaRep` do plano nunca chegam à tela | P | aberto |
| FM-08 | Conteúdo | `<br>` literal aparecendo como texto | M | aberto |
| FM-09 | Cálculo | Macros não fecham com as calorias | M | aberto |
| FM-10 | Layout | Overflow horizontal em Login e Cadastro | P | aberto |
| FM-11 | Layout | Desktop é o mobile com deslocamentos mágicos | G | aberto |
| FM-12 | Acessibilidade | Texto branco sobre foto sem véu | M | aberto |
| FM-13 | Acessibilidade | Rótulo que vive só no placeholder | M | aberto |
| FM-14 | Design system | `tailwind.config.js` sem escalas | M | aberto |
| FM-15 | Segurança | `.env` versionado no git | P | **urgente** |
| FM-16 | Conteúdo | Políticas citam login que não existe | P | aberto |
| FM-17 | Acessibilidade | Botão de voltar é uma `div` com `onClick` | P | aberto |
| FM-18 | Layout | Políticas e Termos herdam o layout de autenticação | M | aberto |
| FM-19 | Conteúdo | Emoji embutido no título de todo estudo | P | aberto |
| FM-20 | Dados | Campo `source` nunca é renderizado | P | aberto |
| FM-21 | Débito | Dois componentes duplicados para o mesmo card | M | aberto |
| FM-22 | Conteúdo | "5 min" idêntico e imagens sem relação com o estudo | P | aberto |
| FM-23 | Navegação | Estudos não existe na barra lateral | P | aberto |
| FM-24 | Bug | Card de nutrição aparece antes da verificação | P | aberto |
| FM-25 | Conteúdo | Categoria de nutrição tem um único item, fora do formato | P | aberto |
| FM-26 | Conteúdo | Markdown literal na área motivacional | P | aberto |

---

## FM-01 · `bg-white` espalhado por 8 telas
**Onde:** `LoginRegisterLayout.jsx:8`, `FormLayout.jsx:17`, `TreinoSelect.jsx:110`,
`TreinoResult.jsx:10`, `NutricaoSelect.jsx:110`, `NutricaoResult.jsx:20`,
`MinhaRecomendacaoNutri.jsx:91`, mais `bg-white` como cor de botão em
`EstudosCientificosList.jsx:40`, `Estudo.jsx:31`, `Item.jsx:65`.
**O que acontece:** o app tem quatro identidades visuais convivendo. O fundo
branco no meio de um fluxo escuro é o problema mais visível hoje.
**O que fazer:** trocar por `canvas` (`#10161A`) e deixar os cards em `surface`
(`#192126`). Os três últimos casos são botões brancos que viram botão primário
ou secundário do sistema, conforme a hierarquia da tela.
**Depende do redesign de:** todas as telas. Fazer por fluxo, um branch cada.

## FM-02 · Gradiente do botão sem prefixo `brand-`
**Onde:** `src/ui/Button.jsx` — `from-brand-button1Violet to-button2Purple`.
**O que acontece:** falta `brand-` na segunda cor, o Tailwind descarta a classe
e o botão fica sem cor final de gradiente. É por isso que o CTA da Home parece
chapado e o do Treino não.
**O que fazer:** corrigir o prefixo — mas, na prática, esse componente será
reescrito com o gradiente do sistema
(`linear-gradient(135deg, #9450E4, #7C29C9)`).

## FM-03 · `<button>` dentro de `<NavLink>`
**Onde:** `src/ui/Button.jsx`.
**O que acontece:** HTML inválido; quebra semântica de teclado e de leitor de
tela; `disabled` não impede a navegação — os chamadores contornam com
`page={isValid && "..."}`.
**O que fazer:** separar em dois componentes, `Button` (ação) e `ButtonLink`
(navegação, `NavLink` estilizado). Remover os contornos nos chamadores.

## FM-04 · `@import` de fontes depois do `@tailwind`
**Onde:** `src/styles/index.css`.
**O que acontece:** CSS exige que todo `@import` venha antes de qualquer outra
regra. Como está depois das diretivas do Tailwind, a Poppins provavelmente
nunca carrega e o app renderiza numa fonte de fallback.
**O que fazer:** mover o `@import` para a primeira linha (ou carregar as fontes
via `<link>` no `index.html`). **Confirmar no DevTools antes** — se for isso, a
tipografia do app inteiro muda no dia em que for corrigido.

## FM-05 · Nome de usuário coletado e descartado
**Onde:** `RegisterForm.jsx` → `handleSubmit` chama `signup({ email, password })`;
`apiAuth.js` → `register()` repassa só isso ao Supabase.
**O que acontece:** o campo `NOME DE USUÁRIO` existe na tela, é validado como
obrigatório e nunca é salvo. O app não sabe o nome de ninguém.
**O que fazer:** `supabase.auth.signUp({ email, password, options: { data: { username } } })`
e ler de `user.user_metadata.username` onde for exibir.
**Depende do redesign de:** Cadastro (o campo continua na tela) e de qualquer
saudação por nome que venhamos a desenhar no dashboard.

## FM-06 · Cadastro sem estado de confirmação de e-mail
**Onde:** `useRegister.js` — `onSuccess` dá um toast e `navigate("/login")`.
**O que acontece:** se a confirmação de e-mail estiver ligada no Supabase (é o
padrão), a pessoa se cadastra, é jogada na tela de login e não consegue entrar,
sem nenhuma explicação. Se estiver desligada, o toast some antes de ser lido.
**O que fazer:** ler `data.session` da resposta do `signUp` — se vier `null`, a
confirmação está ativa: renderizar o painel "Confirme seu e-mail" (com reenvio
via `supabase.auth.resend`); se vier sessão, seguir direto.
**Depende do redesign de:** Cadastro — os dois estados de sucesso estão
desenhados justamente para cobrir os dois casos.

## FM-07 · `nome` e `faixaRep` do plano nunca chegam à tela
**Onde:** `data-recomendacao-treino.js` (todo plano tem `nome` e
`faixaRep: "5 a 9"`) e `TreinoResultTable.jsx`, que lê só `treinoFinal[0][dia]`.
**O que acontece:** o usuário nunca descobre qual divisão recebeu
("PPL / UP-LW (5x) / 90min") nem quantas repetições fazer — o dado mais
acionável do plano.
**O que fazer:** exibir ambos no cabeçalho de Meu Treino. Zero dado novo.
**Depende do redesign de:** Meu Treino (já contempla os dois campos).

## FM-08 · `<br>` literal aparecendo como texto
**Onde:** `data-estudos-cientificos.js` (ex.: linha 112) e `src/ui/Estudo.jsx`.
**O que acontece:** as descrições trazem `<br>` dentro da string; o React
escapa e o usuário lê "`<br>`" no meio da frase. Pior nos Estudos de Nutrição.
**O que fazer:** tirar o HTML dos dados — quebrar em array de parágrafos e
renderizar cada um em seu `<p>`. Não usar `dangerouslySetInnerHTML`.
**Depende do redesign de:** páginas de detalhe dos Estudos Científicos.

## FM-09 · Macros não fecham com as calorias
**Onde:** `calculadorMacros.js`.
**O que acontece:** 184 g de proteína + 226 g de carboidrato + 83 g de gordura
somam 2387 kcal, mas a tela informa 2384. Os gramas são arredondados
independentemente da meta calórica, então as partes nunca reconciliam com o
todo. `TMB: 2077.44` também aparece como float cru.
**O que fazer:** arredondar os gramas e **recalcular** o total a partir deles,
exibindo a soma real; arredondar a TMB para inteiro.
**Depende do redesign de:** Minha Recomendação — a tela mostra parte e todo
lado a lado, e a inconsistência fica evidente.

## FM-10 · Overflow horizontal em Login e Cadastro
**Onde:** telas de autenticação.
**O que acontece:** barra de rolagem horizontal visível.
**O que fazer:** cai sozinho na reconstrução em duas colunas, mas confirmar
depois de migrar.

## FM-11 · Desktop é o mobile com deslocamentos mágicos
**Onde:** `lg:pl-56`, `lg:left-72 lg:top-12` e afins, espalhados pelas telas.
**O que acontece:** a barra lateral não é uma coluna do layout, é um empurrão
no conteúdo. Qualquer mudança de largura desalinha tudo.
**O que fazer:** grid real de duas colunas no nível do layout, sidebar como
primeira coluna. É a mudança estrutural mais cara da Fase 4 — fazer antes de
migrar as telas internas.

## FM-12 · Texto branco sobre foto sem véu
**Onde:** cards do dashboard, hub de Estudos, fundos das páginas de detalhe.
**O que acontece:** texto branco sobre foto clara, sem gradiente nem
sobreposição — falha de contraste que muda conforme a imagem.
**O que fazer:** véu obrigatório (`surface-sunken` a 70–85%, ou gradiente de
baixo para cima) atrás de qualquer texto sobre imagem. Vira regra do componente,
não decisão por tela.

## FM-13 · Rótulo que vive só no placeholder
**Onde:** `LoginRegisterInput.jsx` e os formulários de treino/nutrição.
**O que acontece:** o rótulo some quando a pessoa começa a digitar; quem
volta ao campo não sabe mais o que ele pede.
**O que fazer:** rótulo persistente acima do campo (padrão já desenhado na
autenticação) e placeholder só como exemplo.

## FM-14 · `tailwind.config.js` sem escalas
**Onde:** `tailwind.config.js`.
**O que acontece:** seis rampas de cor definidas, poucas usadas, e nenhuma
escala de tipo, espaçamento ou raio — cada tela reinventa os valores.
**O que fazer:** primeiro passo da Fase 4 — traduzir
`design/fitmeta-design-system.md` em tokens do Tailwind e só então mexer nas
telas. As rampas roxo/teal/laranja já existentes viram as cores de macro.

## FM-15 · `.env` versionado no git — **urgente**
**Onde:** raiz do repositório. Confirmado: `git ls-files` lista `.env`, apesar
de ele constar no `.gitignore` (foi adicionado antes da regra).
**O que acontece:** as chaves do Supabase estão no histórico público do
repositório.
**O que fazer:** `git rm --cached .env`, commitar, **rotacionar a chave no
painel do Supabase** (remover do histórico não basta — o que vazou, vazou) e
reconfigurar as variáveis no Netlify. Independe do redesign; pode ser feito
hoje.

## FM-16 · Políticas citam login que não existe
**Onde:** `src/pages/PoliticasPrivacidade.jsx` (seções 1 e 3) e
`src/pages/TermosDeUso.jsx` (seção 4).
**O que acontece:** o texto legal diz que a plataforma coleta dados via
"Google, Facebook, Apple ID" e cita o Google Analytics. O app só tem login
Google (`registerGoogle` em `apiAuth.js`) e não tem Analytics instalado.
Documento legal descrevendo prática que não existe — e, na direção oposta, ele
não menciona o Supabase, que é onde os dados de fato ficam.
**O que fazer:** decisão do Rafael, não do redesign. O texto é copiado
literalmente nas telas; qualquer correção é de conteúdo, não de UI.
**Depende do redesign de:** nada — mas as telas de Políticas e Termos exibem
esse texto, então vale resolver antes de publicar.

## FM-17 · Botão de voltar é uma `div` com `onClick`
**Onde:** `PoliticasPrivacidade.jsx` e `TermosDeUso.jsx` — `<div onClick={handleBackPage}>`
com um ícone dentro.
**O que acontece:** não recebe foco de teclado, não tem `aria-label`, não
responde a Enter/Espaço. Além disso `navigate(-1)` falha quando a página é
aberta direto pelo link (sem histórico): o usuário fica preso.
**O que fazer:** `<button type="button">` com rótulo acessível e um destino
explícito de fallback (voltar para `/registrar` quando não houver histórico).
**Depende do redesign de:** Políticas e Termos — o cabeçalho desenhado já
prevê o botão como controle real.

## FM-18 · Políticas e Termos herdam o layout de autenticação
**Onde:** `App.jsx` — as duas rotas estão dentro de `<Route element={<LoginRegisterLayout />}>`.
**O que acontece:** hoje herdam o `bg-white` do layout de login (FM-01).
Quando a autenticação virar a tela escura de duas colunas, herdarão também o
painel de marca — que não faz sentido para um documento longo.
**O que fazer:** tirar as duas rotas do `LoginRegisterLayout` e criar um
`DocumentLayout` próprio (coluna de leitura + cabeçalho fixo), usado pelas duas
páginas.
**Depende do redesign de:** Políticas e Termos.

## FM-19 · Emoji embutido no título de todo estudo
**Onde:** `src/data/data-estudos-cientificos.js` — todos os títulos começam com
emoji (⏱️, 💪, 🔁, 🕑, 🐀, 📚, 📘…).
**O que acontece:** o emoji está **no dado**, não na apresentação. Some do
design, mas volta assim que a tela ler o arquivo. O 🐀 no estudo com ratos
também é escolha editorial discutível numa seção que quer soar científica.
**O que fazer:** limpar os títulos no arquivo de dados. Se quiser ícone por
categoria, ele vira SVG no componente.
**Depende do redesign de:** Estudos Científicos (detalhe).

## FM-20 · Campo `source` nunca é renderizado
**Onde:** `data-estudos-cientificos.js` traz `source` em todo estudo
("Grgic et al. 2017 – PubMed 29253297"); `Estudo.jsx` e
`EstudosCientificosList.jsx` renderizam só título, imagem, descrição e link.
**O que acontece:** a citação — o elemento que dá credibilidade a uma seção
chamada "Estudos Científicos" — existe no dado e nunca chega à tela.
**O que fazer:** exibir a citação no card. Zero dado novo. Mesmo caso do FM-07.
**Depende do redesign de:** Estudos Científicos (detalhe) — o card redesenhado
já reserva a linha da citação.

## FM-21 · Dois componentes duplicados para o mesmo card
**Onde:** `src/ui/Estudo.jsx` e `src/features/estudos-cientificos/EstudosCientificosList.jsx`.
**O que acontece:** renderizam o mesmo card com estilos diferentes
(`bg-darkblue-150/85` vs `bg-graydark-400/85`, `text-justify` nos dois, barra
branca "Link do estudo" em ambos). Em `EstudosCientificosList` o `<a>` está
**dentro** do `<Link>`, aninhando âncoras.
**O que fazer:** um componente `EstudoCard` só, usado por todas as categorias.
As descrições também precisam de padronização editorial: algumas começam com
"1." / "2." (sobra de numeração), outras trazem a citação inteira dentro do
texto, outras são resumos curtos.
**Depende do redesign de:** Estudos Científicos (detalhe).

## FM-22 · "5 min" idêntico e imagens sem relação com o estudo
**Onde:** `EstudosCientificosCategorias.jsx` (`time: "5 min"` nas quatro
categorias) e os `imgSrc` de `data-estudos-cientificos.js`.
**O que acontece:** o tempo de leitura é o mesmo número fixo em todas as
categorias — informação decorativa. E há imagens reaproveitadas sem relação com
o conteúdo (`dropset.webp` ilustrando o estudo com ratos,
`atletafalha.webp` ilustrando descanso entre séries).
**O que fazer:** ou calcular o tempo de leitura de verdade, ou remover o selo.
As imagens precisam de curadoria — decisão de conteúdo, não de UI.
**Depende do redesign de:** hub de Estudos e páginas de detalhe.

## FM-23 · Estudos não existe na barra lateral
**Onde:** `src/ui/MainNav.jsx` — os itens são Home, Treino, Nutrição, Motivação.
**O que acontece:** `/estudos` só é alcançável por um card dentro do dashboard
(`RecomendadoList.jsx`). Estando numa página de estudos, não há como ir para
outra seção sem voltar à Home. O logout também vive só no dashboard
(`Recomendado.jsx`), então não há como sair da conta de dentro do app.
**O que fazer:** incluir Estudos na navegação e mover o logout para a barra
lateral, junto com a identificação do usuário.
**Depende do redesign de:** barra lateral (a desenhar junto com o dashboard).

## FM-24 · Card de nutrição aparece antes da verificação
**Onde:** `src/features/recomendado/RecomendadoList.jsx`.
**O que acontece:** três problemas encadeados no mesmo `useEffect`:
- `showMinhaNutricao` começa como `true` (o de treino começa como `false`), então
  quem nunca respondeu o formulário vê por um instante o card "Ver minha
  recomendação nutricional personalizada", que some em seguida.
- `setLoading(false)` é chamado **duas vezes**, a primeira antes da consulta de
  nutrição — a tela renderiza sem saber ainda o estado da nutrição, que é
  justamente o que produz o piscar.
- `treinoError` e `nutricaoError` são capturados e ignorados. Com `.single()`,
  ausência de linha retorna erro (PGRST116); hoje isso passa como "não
  respondeu", que é o resultado certo pelo motivo errado — qualquer falha real
  de rede vira silenciosamente "usuário sem plano".
**O que fazer:** iniciar os dois estados como `false`, aguardar as duas
consultas antes de um único `setLoading(false)`, usar `.maybeSingle()` e tratar
erro de rede como estado de erro, não como ausência de dado.
**Depende do redesign de:** Home (Recomendado) — os estados desenhados
(sem plano · com treino · com ambos · carregando) só funcionam se a checagem
resolver antes da renderização.

## FM-25 · Categoria de nutrição tem um único item, fora do formato
**Onde:** `data-estudos-cientificos.js` → `estudosNutricao`.
**O que acontece:** as outras categorias têm 5, 7 e 4 estudos; nutrição tem
**um**. E esse único item não segue o formato dos demais: o `description`
começa com um título de seção ("Fórmulas para Cálculo de Calorias"), emenda um
item numerado ("1.Equação de Mifflin-St Jeor") e só então traz o resumo, tudo
separado por `<br>` literal (FM-08). A citação também merece conferência: o
`source` diz "Grgic et al. 2022" enquanto o link aponta para o PubMed 33497853.
**O que fazer:** decisão de conteúdo do Rafael — ou a categoria ganha mais
estudos, ou vira uma página explicativa das fórmulas (formato documento, como
as páginas legais), e não uma lista com um card só. O texto precisa ser
quebrado em campos separados de qualquer forma.
**Depende do redesign de:** Estudos Científicos — a lista foi desenhada para
funcionar com um item, mas uma categoria de item único continua estranha.

## FM-26 · Markdown literal na área motivacional
**Onde:** `src/data/data-motivacional.js` — história do Ramon Dino.
**O que acontece:** o texto traz `**Mr. Olympia Classic Physique**`. Como o
React escapa a string, o usuário lê os asteriscos na tela. Mesmo problema do
`<br>` nos estudos (FM-08): marcação dentro do dado.
**O que fazer:** tirar a marcação do arquivo de dados. Se houver necessidade de
destaque, o dado precisa de um campo próprio, não de sintaxe embutida.
**Depende do redesign de:** Motivacional.
