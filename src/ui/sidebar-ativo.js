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
];

// Qual item fica aceso em cada rota — o resultado do fluxo mantém o item do fluxo aceso.
export const ACTIVE_FOR = {
  home: ["/recomendado"],
  treino: ["/recomendacao-treino", "/meu-treino"],
  nutricao: ["/recomendacao-nutricional", "/minha-nutricao"],
  estudos: ["/estudos"],
  motivacao: ["/motivacional"],
};

/**
 * "Minha conta" saiu da lista de navegação e passou a viver no rodapé da barra,
 * acima de "Sair": é ação sobre a conta, vizinha de sair, e não um destino de
 * conteúdo como Treino ou Estudos.
 *
 * Fora de `ITEMS` e de `ACTIVE_FOR` de propósito. O invariante daqueles dois é
 * "um item da barra, uma entrada", e abrir exceção lá derrubaria a suíte que os
 * protege. A regra de aceso continua neste módulo para o componente não
 * duplicar o casamento de prefixo.
 */
export const CONTA = { id: "perfil", label: "Minha conta", to: "/perfil" };
export const DADOS = { id: "dados", label: "Meus dados", to: "/meus-dados" };

/**
 * Os dois destinos do menu do rodapé, na ordem em que aparecem.
 *
 * `/meus-dados` não tinha entrada nenhuma na navegação: só se chegava lá de
 * dentro do fluxo da Nutrição, mesmo o peso sendo a entrada mais importante do
 * produto.
 */
export const MENU_CONTA = [CONTA, DADOS];

/** O gatilho do menu fica aceso enquanto se está em qualquer destino dele. */
export function contaAtiva(pathname) {
  return MENU_CONTA.some((item) => rotaAtiva(item.to, pathname));
}

/**
 * Casa a rota exatamente ou como prefixo de segmento — `/estudos-x` não acende
 * `/estudos`, mas `/estudos/hipertrofia` acende.
 */
export function rotaAtiva(base, pathname) {
  return pathname === base || pathname.startsWith(`${base}/`);
}

/**
 * Mora fora do Sidebar porque o componente importa `useUser`, e com ele toda a
 * cadeia do cliente Supabase. Aqui a regra fica testável sem ambiente.
 */
export function isItemActive(id, pathname) {
  return (ACTIVE_FOR[id] || []).some((base) => rotaAtiva(base, pathname));
}
