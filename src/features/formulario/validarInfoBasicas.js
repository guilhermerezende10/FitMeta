/**
 * Faixas do design. Sem isso, idade 999 ou peso 5 entram no cálculo de
 * macros e produzem um resultado sem sentido.
 *
 * Mora fora do InfoBasicasStep porque o componente importa o cliente Supabase,
 * e a validação precisa ser testável sem ambiente.
 */

/** Ordem canônica das colunas de `info_basica`. */
export const CAMPOS = ["nome", "idade", "sexo", "peso", "altura"];

/**
 * `campos` diz quais estão na tela.
 *
 * Validar um campo que o usuário não vê produz um erro que ele não tem como
 * corrigir. A tela de dados corporais não mostra o nome, e sem este filtro
 * quem entrou pelo Google — que nunca respondeu questionário e por isso tem
 * nome vazio — ficaria impedido de corrigir o próprio peso por causa de um
 * campo invisível.
 *
 * O default é a lista inteira, então as chamadas que já existem não mudam.
 */
export function validar(valores, campos = CAMPOS) {
  const { nome, idade, sexo, peso, altura } = valores;
  const erros = {};
  const pede = (campo) => campos.includes(campo);

  if (pede("nome") && !String(nome ?? "").trim())
    erros.nome = "Informe seu nome.";

  /**
   * Sexo em branco não era acusado, e `calculadorMacros` cai no `else` — a
   * fórmula feminina — para qualquer valor que não seja masculino. Ou seja: a
   * recomendação saía calculada por uma fórmula que ninguém escolheu, sem nada
   * na tela indicando isso.
   */
  if (pede("sexo") && !String(sexo ?? "").trim())
    erros.sexo = "Informe seu sexo.";

  const n = { idade: Number(idade), peso: Number(peso), altura: Number(altura) };

  if (pede("idade") && (!n.idade || n.idade < 10 || n.idade > 100))
    erros.idade = "Informe uma idade entre 10 e 100.";
  if (pede("peso") && (!n.peso || n.peso < 30 || n.peso > 300))
    erros.peso = "Informe um peso entre 30 e 300 kg.";
  if (pede("altura") && (!n.altura || n.altura < 100 || n.altura > 250))
    erros.altura = "Informe uma altura entre 100 e 250 cm.";

  return erros;
}
