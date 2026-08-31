/**
 * Os cards da home, e para onde cada um leva.
 *
 * Em módulo próprio para que os destinos sejam verificáveis por teste: a
 * distinção entre as duas seções é uma decisão de produto, e não um detalhe de
 * marcação (gh#46).
 */

/** "Seu plano" — leva ao resultado salvo. Só aparece para quem já respondeu. */
export const PLANOS = [
  {
    id: "treino",
    title: "Meu treino",
    description: "Seu plano de treino personalizado.",
    icon: "treino",
    to: "/meu-treino",
  },
  {
    id: "nutricao",
    title: "Minha nutrição",
    description: "Seus macros e calorias calculados.",
    icon: "nutricao",
    to: "/minha-nutricao",
  },
];

/**
 * "Explorar" — convida a *montar* o plano, então leva ao questionário, e não
 * ao resultado.
 *
 * gh#46: a URL passou a ser explícita porque `/recomendacao-treino` e
 * `/recomendacao-nutricional` deixaram de significar "o formulário" — hoje
 * levam ao plano salvo. Sem o caminho completo, estes cards teriam mudado de
 * destino junto, e passariam a prometer uma coisa entregando outra.
 */
export const EXPLORAR = [
  {
    id: "estudos",
    title: "Estudos científicos",
    meta: "10 min",
    to: "/estudos",
    image: "/images/estudos_cien.png",
  },
  {
    id: "montar",
    title: "Monte seu próprio treino",
    meta: "5 min",
    to: "/recomendacao-treino/formulario/iniciar",
    image: "/images/monte_treino.png",
  },
  {
    id: "nutri",
    title: "Descubra sua recomendação nutricional",
    meta: "3 min",
    to: "/recomendacao-nutricional/formulario/iniciar",
    image: "/images/recomendacao_nutri.png",
  },
  {
    id: "motivacional",
    title: "Área motivacional",
    meta: "8 min",
    to: "/motivacional",
    image: "/images/area_motiv.png",
  },
];

/** Quando o plano existe, o card que levaria ao formulário sai do Explorar. */
export const CARD_DO_PLANO = { treino: "montar", nutricao: "nutri" };
