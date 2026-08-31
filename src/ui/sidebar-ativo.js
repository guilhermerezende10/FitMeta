/**
 * Definição da navegação lateral: os itens e, para cada um, as rotas em que ele
 * fica aceso.
 *
 * Os dois moram juntos porque um sem o outro quebra: acrescentar um item sem a
 * entrada correspondente em `ACTIVE_FOR` produz um item que nunca acende.
 */

/**
 * gh#46: Treino e Nutrição apontam para o plano salvo, e não para o
 * questionário. Quem já respondeu vem ver o resultado; o formulário fica a um
 * clique, por "Refazer questionário" ou pela ação do estado vazio.
 */
export const ITEMS = [
  { id: "home", label: "Home", to: "/recomendado" },
  { id: "treino", label: "Treino", to: "/meu-treino" },
  { id: "nutricao", label: "Nutrição", to: "/minha-nutricao" },
  { id: "estudos", label: "Estudos", to: "/estudos" },
  { id: "motivacao", label: "Motivação", to: "/motivacional" },
  { id: "perfil", label: "Perfil", to: "/perfil" },
];

// Qual item fica aceso em cada rota — o resultado do fluxo mantém o item do fluxo aceso.
export const ACTIVE_FOR = {
  home: ["/recomendado"],
  treino: ["/recomendacao-treino", "/meu-treino"],
  nutricao: ["/recomendacao-nutricional", "/minha-nutricao"],
  estudos: ["/estudos"],
  motivacao: ["/motivacional"],
  perfil: ["/perfil"],
};

/**
 * Mora fora do Sidebar porque o componente importa `useUser`, e com ele toda a
 * cadeia do cliente Supabase. Aqui a regra fica testável sem ambiente.
 */
export function isItemActive(id, pathname) {
  return (ACTIVE_FOR[id] || []).some(
    (base) => pathname === base || pathname.startsWith(`${base}/`)
  );
}
