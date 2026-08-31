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
