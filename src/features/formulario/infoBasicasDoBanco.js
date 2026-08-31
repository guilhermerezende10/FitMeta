/**
 * Converte uma linha de `info_basica` nos valores que a etapa 1 espera.
 *
 * Os campos são inputs controlados e `completo` chama `.trim()` em todos, mas
 * idade, peso e altura voltam do banco como número. Semear sem converter
 * derrubaria a etapa com `idade.trim is not a function` — o mesmo tipo de bug
 * que já apareceu em `preenchido`.
 *
 * Coluna ausente ou nula vira string vazia, para que o campo apenas fique em
 * branco e o usuário preencha.
 */
export function infoBasicasDoBanco(row) {
  const texto = (v) => (v === null || v === undefined ? "" : String(v));

  return {
    nome: texto(row?.nome),
    idade: texto(row?.idade),
    sexo: texto(row?.sexo),
    peso: texto(row?.peso),
    altura: texto(row?.altura),
  };
}
