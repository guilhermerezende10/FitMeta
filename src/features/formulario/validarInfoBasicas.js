/**
 * Faixas do design. Sem isso, idade 999 ou peso 5 entram no cálculo de
 * macros e produzem um resultado sem sentido.
 *
 * Mora fora do InfoBasicasStep porque o componente importa o cliente Supabase,
 * e a validação precisa ser testável sem ambiente.
 */
export function validar({ nome, idade, peso, altura }) {
  const erros = {};

  if (!String(nome ?? "").trim()) erros.nome = "Informe seu nome.";

  const n = { idade: Number(idade), peso: Number(peso), altura: Number(altura) };

  if (!n.idade || n.idade < 10 || n.idade > 100)
    erros.idade = "Informe uma idade entre 10 e 100.";
  if (!n.peso || n.peso < 30 || n.peso > 300)
    erros.peso = "Informe um peso entre 30 e 300 kg.";
  if (!n.altura || n.altura < 100 || n.altura > 250)
    erros.altura = "Informe uma altura entre 100 e 250 cm.";

  return erros;
}
