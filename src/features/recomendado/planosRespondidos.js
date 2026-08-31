import { preenchido } from "./preenchido";

/**
 * Quais questionários o usuário já respondeu, a partir das linhas das duas
 * tabelas de resposta.
 *
 * gh#13: a experiência saiu do questionário, então não serve mais como sinal
 * de "respondeu" — quem responder de agora em diante deixa a coluna vazia e
 * passaria por quem nunca preencheu nada. Por isso a checagem é sobre os
 * campos que o fluxo atual grava.
 *
 * Em módulo próprio para ser testável sem montar a lista nem tocar no
 * Supabase (gh#16).
 */
export function planosRespondidos(treino, nutricao) {
  const respondeuTreino =
    preenchido(treino?.freq_treino) && preenchido(treino?.duracao);

  const respondeuNutricao =
    preenchido(nutricao?.objetivo) && preenchido(nutricao?.frequencia);

  return [respondeuTreino && "treino", respondeuNutricao && "nutricao"].filter(
    Boolean
  );
}
