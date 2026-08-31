/**
 * O fluxo de nutrição guarda o valor normalizado, não o rótulo: a frequência
 * vira número (1, 3 ou 5) e o objetivo vira a chave em minúsculas que o
 * cálculo de macros espera. O fluxo de treino guarda o rótulo como está.
 *
 * Era uma função interna do PerguntasStep, fechada sobre `ehNutricao` e
 * `pergunta`. Recebe os dois por parâmetro para poder ser testada sem montar
 * o componente — que importa o cliente Supabase.
 */
export function valorGravado(opcao, ehNutricao, label) {
  if (!ehNutricao) return opcao;

  if (label === "frequencia") {
    if (opcao.includes("1x")) return 1;
    if (opcao.includes("2 a 3")) return 3;
    if (opcao.includes("4 a 5")) return 5;
  }

  if (label === "objetivo") {
    const o = opcao.toLowerCase();
    if (o.includes("ganhar")) return "ganhar";
    if (o.includes("manter")) return "manter";
    if (o.includes("perder")) return "perder";
  }

  return opcao;
}
