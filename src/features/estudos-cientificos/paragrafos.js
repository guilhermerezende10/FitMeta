/**
 * A copy dos estudos usa `<br>` como separador de parágrafo, que o React
 * renderiza como literal. Aqui vira uma lista de parágrafos de verdade, sem
 * que o texto de origem mude.
 *
 * Em arquivo próprio porque exportar isto do componente dispara a regra
 * `react-refresh/only-export-components`.
 */
export function paragrafos(texto = "") {
  return texto
    .split(/<br\s*\/?>/i)
    .map((parte) => parte.trim())
    .filter(Boolean);
}
