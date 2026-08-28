/**
 * Definição dos dois fluxos de formulário.
 *
 * As perguntas, as opções e a ordem são exatamente as que já existiam em
 * TreinoSelect e NutricaoSelect — só saíram de dentro dos componentes.
 *
 * As telas intersticiais ("Monte seu treino" e "Recomendação Nutricional",
 * que eram foto grande com um botão só) deixaram de existir: o título delas
 * virou o título da etapa 1.
 *
 * A pergunta de experiência saiu em gh#13: era coletada e gravada, mas não
 * influenciava nada — os 9 planos têm a mesma faixa de repetições e a seleção
 * casa só por duração e dias de treino. O stepper deriva de `etapas`, então
 * acompanha sozinho.
 */

export const FLUXO_TREINO = {
  id: "treino",
  titulo: "Monte seu treino",
  base: "/recomendacao-treino/formulario",
  resultado: "/recomendacao-treino/formulario/resultado",
  etapas: ["Sobre você", "Frequência", "Duração"],
  perguntas: [
    {
      index: 1,
      titulo: "Frequência de Treino",
      options: [
        "Posso treinar 3 vezes por semana",
        "Posso treinar 4 vezes por semana",
        "Posso treinar 5 vezes por semana",
      ],
    },
    {
      index: 2,
      titulo: "Duração de Treino",
      options: [
        "Até 45 minutos",
        "Até 60 minutos",
        "Até 90 minutos",
        "Mais de 90 minutos",
      ],
    },
  ],
};

export const FLUXO_NUTRICAO = {
  id: "nutricao",
  titulo: "Recomendação nutricional",
  base: "/recomendacao-nutricional/formulario",
  resultado: "/recomendacao-nutricional/formulario/resultado",
  etapas: ["Sobre você", "Frequência", "Objetivo"],
  perguntas: [
    {
      index: 1,
      titulo: "Quantas vezes você vai a academia na semana?",
      label: "frequencia",
      options: ["1x por semana", "2 a 3x por semana", "4 a 5x por semana"],
    },
    {
      index: 2,
      titulo: "Qual é o seu objetivo?",
      label: "objetivo",
      options: ["Ganhar peso", "Manter peso", "Perder peso"],
    },
  ],
};

/** Descobre o fluxo pela rota atual. */
export function fluxoDaRota(pathname) {
  return pathname.startsWith("/recomendacao-nutricional")
    ? FLUXO_NUTRICAO
    : FLUXO_TREINO;
}
