/**
 * `nutricao_answers.frequencia` é gravado como número (1, 3 ou 5), enquanto
 * os demais campos são texto. A verificação antiga chamava `.trim()` em
 * todos, então estourava `frequencia.trim is not a function` — e como isso
 * acontecia dentro de um async sem captura, a checagem morria calada.
 *
 * Mora fora do RecomendadoList porque o componente importa o cliente Supabase.
 */
export function preenchido(valor) {
  return valor !== null && valor !== undefined && String(valor).trim() !== "";
}
