/**
 * De onde sai o nome que o app mostra, e em que ordem.
 *
 * `info_basica.nome` vem primeiro porque é o que a etapa 1 do questionário
 * preenche e o que a tela de conta grava (gh#25). `user_metadata.nome` é a
 * única casa do nome de quem entrou pelo Google e nunca respondeu
 * questionário.
 *
 * Em módulo próprio porque três lugares precisam da mesma ordem — a barra
 * lateral, o cartão de identidade e o campo que edita o nome — e uma ordem
 * divergente faria a barra exibir um nome diferente do que o campo mostra.
 */

/** Só as duas fontes reais. Vazio quando não há nome gravado em lugar nenhum. */
export function nomeGravado(infoBasica, user) {
  return infoBasica?.nome?.trim() || user?.user_metadata?.nome || "";
}

/**
 * Para exibir. Cai no trecho antes do @ e depois num rótulo genérico, porque
 * um espaço vazio no lugar do nome parece defeito.
 */
export function nomeExibido(infoBasica, user) {
  const email = user?.email ?? "";
  return nomeGravado(infoBasica, user) || email.split("@")[0] || "Sua conta";
}
