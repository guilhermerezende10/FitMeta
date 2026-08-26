# FitMeta — Sistema de Design v1

Aplicativo web de treino e nutrição. React + Vite + TailwindCSS + Supabase.
Interface em **português do Brasil**. Tema **escuro apenas** (não existe tema claro).

Este documento é a fonte da verdade. Toda tela nova usa **exclusivamente** os
valores abaixo. Nada de cor, tamanho de fonte, raio ou espaçamento inventado.

---

## 1. Princípios

1. **Refinamento, não rebranding.** O roxo, o cinza-carvão e o logo continuam.
   O que muda é contraste, hierarquia e consistência.
2. **Desktop primeiro** (1440×900 de referência), com a barra lateral tratada
   como coluna real do layout — não como um deslocamento à direita do conteúdo.
3. **Uma identidade só.** O app hoje tem quatro: escura, branca, branca-roxa e
   card-escuro-com-barra-branca. Tudo converge para a escura.

---

## 2. Cores

### Superfícies

| Token | Hex | Uso |
|---|---|---|
| `surface-sunken` | `#0B0F12` | poços, véus sobre foto |
| `canvas` | `#10161A` | **fundo da página** |
| `surface` | `#192126` | **card** — a cor histórica do app |
| `surface-raised` | `#232C32` | linha de lista, cabeçalho de card, hover |
| `accent-surface` | `#241A33` | estado selecionado, chip de destaque |

> **Regra dura:** fundo da página e card **nunca** têm a mesma cor. Hoje ambos são
> `#192126`, por isso os cards somem. `canvas` é `#10161A`.

### Bordas

| Token | Hex |
|---|---|
| `border` | `#2C353B` |
| `border-strong` | `#3D474E` |
| `border-accent` | `#8B45E0` |

### Texto

| Token | Hex | Contraste sobre `#192126` |
|---|---|---|
| `text-primary` | `#F2F5F7` | 15.1:1 |
| `text-secondary` | `#A8B2B9` | 7.7:1 |
| `text-muted` | `#8E979E` | 4.6:1 — **piso para qualquer texto** |
| `text-faint` | `#7A858C` | 3.2:1 — **só** placeholder e rótulo de eixo |

> Nada abaixo de `#8E979E` carrega frase. `#6F7A82` e `#4E585F` estão proibidos
> para texto.

### Acento (roxo da marca)

| Token | Hex | Nota |
|---|---|---|
| `accent` | `#8B45E0` | base — foco, link, borda ativa |
| `accent-hover` | `#9E63E8` | usar **só** sobre `canvas` (4.7:1) |
| `accent-on-card` | `#B78AE2` | usar sobre `surface` e `accent-surface` (6.1:1) |
| `accent-press` | `#7C29C9` | |
| `danger` | `#DA5B5B` sobre canvas · `#E07070` sobre card | |

**Gradiente do botão primário:** `linear-gradient(135deg, #9450E4, #7C29C9)`

> O gradiente atual do app (`#3F2B57 → #2B1546`) tem 1.3:1 e 1.0:1 contra o fundo —
> a forma do botão é invisível. O novo tem 3.5:1 contra o fundo e 4.6:1 no texto branco.
> Mesmo matiz (H≈305), duas paradas mais claro. **Não escurecer de volta.**

### Cores de dados (macros)

| Macro | Hex |
|---|---|
| Proteína | `#9956D6` |
| Carboidrato | `#00A99D` |
| Gordura | `#E46D00` |

Validadas para daltonismo (pior par adjacente ΔE 15.8 deutan, alvo ≥ 8) e todas
≥ 3:1 contra `#192126`. **Ordem fixa** — proteína, carboidrato, gordura, sempre.
Cor nunca é o único identificador: todo elemento colorido vem acompanhado de rótulo.

---

## 3. Tipografia

- **Display / títulos:** `Barlow Condensed`, pesos 600 e 700
- **Corpo e interface:** `Poppins`, pesos 400 / 500 / 600
- Números em contexto de dado usam `font-variant-numeric: tabular-nums`

| Papel | Tamanho / entrelinha | Peso | Família |
|---|---|---|---|
| `display-xl` | 56 / 52 | 700 | Barlow Condensed |
| `display-l` | 40 / 40 | 700 | Barlow Condensed |
| `display-m` | 28 / 32 | 700 | Barlow Condensed |
| `title` | 20 / 28 | 600 | Poppins |
| `body-l` | 16 / 24 | 400 | Poppins |
| `body` | 15 / 24 | 400 | Poppins |
| `label` | 13 / 16 | 500 | Poppins |
| `caption` | 12 / 16 | 600, `letter-spacing: 0.1em`, MAIÚSCULAS | Poppins |

Número herói (kcal, total de séries): Barlow Condensed 700, 48–76px, tabular.

---

## 4. Geometria

- **Espaçamento:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96. Nada fora da escala.
- **Raio:** 8 (campo pequeno) · 10 (campo) · 12 (linha, card pequeno) · 20 (card) · 999 (pílula)
- **Elevação:**
  - `e1` `0 1px 2px rgba(0,0,0,.4)`
  - `e2` `0 4px 16px rgba(0,0,0,.45)`
  - `e3` `0 12px 32px rgba(0,0,0,.55)`
  - brilho do botão primário: `0 6px 20px rgba(139,69,224,.28)`
- **Altura de controle:** 48px no desktop, 44px mínimo no toque.
- Sempre `box-sizing: border-box`.
- Agrupamento com `display:flex` / `display:grid` + `gap`. **Nunca** margem entre
  irmãos, nunca espaçamento por nó de texto.

---

## 5. Componentes

### Botão
- **primary** — altura 48, raio 999, padding lateral 32, texto 15/500 branco,
  fundo `linear-gradient(135deg, #9450E4, #7C29C9)`, sombra `0 6px 20px rgba(139,69,224,.28)`
- **primary : hover** — `linear-gradient(135deg, #A66BEA, #8B45E0)`, sombra mais aberta
- **primary : disabled** — fundo `#232C32`, borda 1px `#3D474E`, texto `#8E979E`.
  Nunca cinza sólido. Sempre acompanhado de uma linha explicando o que falta.
- **secondary** — fundo transparente, borda 1px `#3D474E`, texto `#F2F5F7`
- **ghost** — só texto `accent` + ícone, sem fundo

O botão é sempre um `<button>` ou um `<a>` — **nunca** um dentro do outro.

### Campo de texto
- Rótulo **sempre visível acima do campo**, `caption` em `#8E979E`.
  Placeholder não substitui rótulo.
- Campo: altura 48, raio 10, fundo `#192126`, borda 1px `#2C353B`, texto 15px.
- Foco: borda `#8B45E0` + anel `0 0 0 3px rgba(139,69,224,.25)`; o rótulo vira `accent`.
- Erro: borda `#DA5B5B` + mensagem específica abaixo, `label` em `#DA5B5B`.
  Mensagem diz o que fazer ("Informe uma idade entre 14 e 90"), não "Campo inválido".
- Unidade (kg, cm) alinhada à direita dentro do campo, em `#8E979E`.

### Escolha entre opções
- 2 a 3 opções → **botões segmentados** de altura 48 lado a lado. Selecionado:
  fundo `#241A33`, borda `#8B45E0`, ícone de check `accent`.
- 4 a 8 opções curtas (números, dias) → **chips** de 48×48, raio 10.
  Selecionado recebe o gradiente primário.
- Nunca `<input type=radio>` nativo, nunca `<select>` nativo.

### Indicador de etapa
Barra segmentada acima do formulário: `ETAPA 2 DE 4` em `caption`, o nome da etapa
à direita, e N segmentos de 4px (`#8B45E0` cumpridos, `#2C353B` pendentes).
Substitui o cabeçalho em pílula, que não indica posição.

### Item de navegação (barra lateral, 240px)
Altura 44, raio 999, ícone 18px + rótulo 15px.
Ativo: gradiente primário, texto branco. Inativo: transparente, texto `#A8B2B9`.
Rótulo **sempre visível**, inclusive nos itens inativos.

### Card de conteúdo (com foto)
Raio 20, sombra `e3`, foto no topo.
**Véu obrigatório sobre a foto:**
`linear-gradient(180deg, rgba(11,15,18,.75) 0%, rgba(11,15,18,.25) 45%, rgba(11,15,18,.55) 100%)`
Título em `display-m` branco sobre o véu. Pílula de tempo no canto inferior esquerdo:
fundo `rgba(11,15,18,.7)`, borda `1px rgba(242,245,247,.18)`, ícone + texto 12px.

### Linha de dado (exercício, macro)
Fundo `#232C32`, raio 12, padding 15/18.
Índice tabular `#8E979E` à esquerda, nome 16/500 no meio (nunca quebra: `nowrap` +
elipse), valor à direita numa pílula `accent-surface` com texto `#B78AE2`.

### Bloco de estatística
`caption` em `#8E979E`, número herói em Barlow Condensed tabular, unidade em
`#A8B2B9` alinhada à base. Nunca número sem rótulo.

---

## 6. Regras que não se negociam

1. Fundo da página nunca igual ao fundo do card.
2. Texto sobre foto só existe com véu por baixo.
3. Ícones são **SVG inline de traço 2px**, grade 16/18/20/24. **Emoji nunca.**
4. Rótulo de campo sempre visível — nunca só placeholder.
5. Texto abaixo de 4.5:1 não existe; elemento de interface abaixo de 3:1 não existe.
6. Texto justificado nunca (`text-align: justify` está proibido — cria rios de espaço).
7. Ação secundária nunca é o elemento mais forte da tela. (Hoje "Link do estudo" é
   uma barra branca de largura total, mais forte que o título do estudo.)
8. Tela cujo único conteúdo é uma imagem e um botão não existe — vira a primeira
   etapa do fluxo que ela introduzia.
9. No desktop o conteúdo ocupa a largura disponível. Coluna estreita de celular
   centralizada em tela de 1440px não existe.
10. Toda tela tem estado vazio, de carregamento e de erro previstos.

---

## 7. Telas do app (inventário)

| Rota | Tela | Situação |
|---|---|---|
| `/login`, `/register` | Autenticação | fundo branco — precisa migrar para o escuro |
| `/home` | Boas-vindas | herói + 1 botão |
| `/recomendado` | Painel — 4 cards | mais próximo do certo |
| `/recomendacao-treino` | Intersticial de treino | **eliminar**, virar etapa 1 |
| `/recomendacao-treino/formulario` | Formulário de treino (4 etapas) | fundo branco |
| `/meu-treino` | Resultado do treino | redesenhado |
| `/recomendacao-nutricional` | Intersticial de nutrição | **eliminar**, virar etapa 1 |
| `/minha-nutricao` | Resultado nutricional | redesenhado |
| `/estudos` | Hub de estudos — 4 categorias | |
| `/estudos/:categoria` | Lista de estudos | pior layout do app |
| `/motivacional` | Carrossel de atletas | |

---

## 8. Voz

Português do Brasil, direto, segunda pessoa ("Seu treino", "Sua recomendação").
Nada de linguagem de marketing. Números sempre com unidade. Percentuais inteiros.
Termos de academia mantidos como estão (séries, faixa de repetições, PPL, TMB).
