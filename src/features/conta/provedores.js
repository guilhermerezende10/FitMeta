/**
 * Quais provedores autenticam esta conta.
 *
 * Quem entrou pelo Google não tem senha do FitMeta para trocar, e trocar o
 * e-mail por aqui não muda o e-mail da conta Google — no melhor caso o app
 * passaria a exibir um endereço que o próximo login contradiz. A tela precisa
 * dizer isso, em vez de oferecer um formulário que não faz o que promete.
 *
 * `app_metadata.provider` guarda só o último provedor usado; `identities`
 * guarda todos e é o que vale quando existe. As três leituras moram aqui, em
 * módulo puro, porque a forma do objeto de usuário varia entre versões do
 * supabase-js e isso precisa ser testável sem ambiente.
 */
export function provedoresDaConta(user) {
  const identidades = user?.identities;
  if (Array.isArray(identidades) && identidades.length > 0)
    return identidades.map((i) => i?.provider).filter(Boolean);

  const lista = user?.app_metadata?.providers;
  if (Array.isArray(lista) && lista.length > 0) return lista.filter(Boolean);

  const unico = user?.app_metadata?.provider;
  return unico ? [unico] : [];
}

/**
 * Na dúvida, mostrar o formulário.
 *
 * Esconder o campo de senha de quem tem senha é um beco sem saída: a pessoa
 * fica sem nenhum caminho para trocá-la. Mostrá-lo para quem não tem produz um
 * erro que ela consegue ler e entender. Por isso lista vazia devolve `true`.
 */
export function ehLoginPorSenha(user) {
  const provedores = provedoresDaConta(user);
  return provedores.length === 0 || provedores.includes("email");
}
