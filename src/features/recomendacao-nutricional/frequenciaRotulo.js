/**
 * Caminho de volta do valor gravado para o rótulo que o usuário escolheu:
 * `nutricao_answers.frequencia` guarda 1, 3 ou 5, e a tela precisa exibir a
 * faixa correspondente. Devolve `null` para qualquer outro valor, para que a
 * tela possa omitir a linha em vez de mostrar algo inventado.
 *
 * Em arquivo próprio porque exportar isto do componente dispara a regra
 * `react-refresh/only-export-components`.
 */
export function frequenciaRotulo(freq) {
  const n = Number(freq);
  if (n === 1) return "1x por semana";
  if (n === 3) return "2 a 3x por semana";
  if (n === 5) return "4 a 5x por semana";
  return null;
}
