import { treinos } from "../../data/data-recomendacao-treino";

/**
 * Casa as respostas do questionário com um dos 9 planos do catálogo.
 *
 * As respostas são gravadas como o rótulo que o usuário escolheu — "Posso
 * treinar 3 vezes por semana", "60 minutos" — então o número precisa ser
 * extraído do texto. Era código solto dentro do MeuTreino; em módulo próprio
 * fica testável sem montar a tela nem tocar no Supabase (gh#16).
 *
 * Devolve `null` quando não há resposta ou quando nenhum plano casa, para que
 * a tela mostre o estado vazio em vez de quebrar.
 */
export function planoDoUsuario(respostas) {
  if (!respostas) return null;

  const diasDeTreino = parseInt(
    String(respostas.freq_treino ?? "").replace(/\D/g, ""),
    10
  );
  const duracao = parseInt(String(respostas.duracao ?? "").replace(/\D/g, ""), 10);

  if (Number.isNaN(diasDeTreino) || Number.isNaN(duracao)) return null;

  return (
    treinos.find((t) => t.duracao === duracao && t.diasDeTreino === diasDeTreino) ??
    null
  );
}
