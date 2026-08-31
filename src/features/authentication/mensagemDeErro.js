/**
 * Traduz o erro do Supabase Auth na frase que o usuário lê.
 *
 * O formulário de login mostrava "E-mail ou senha incorretos" para qualquer
 * falha — inclusive e-mail não confirmado, rate limit e queda de rede. Quem
 * tinha o cadastro pendente de confirmação trocava a senha várias vezes sem
 * entender, porque o app estava dizendo a coisa errada.
 *
 * Em módulo próprio para ser testável sem montar o formulário, e para que os
 * dois fluxos de autenticação usem o mesmo vocabulário.
 */

/** Credencial inválida — a mensagem original é genérica demais para exibir. */
const CREDENCIAL = /invalid login|invalid credentials|invalid grant/i;

/** Cadastro existe, mas o e-mail nunca foi confirmado. */
const NAO_CONFIRMADO = /not confirmed|email not confirmed|confirm your email/i;

/** Rate limit do próprio Supabase. */
const MUITAS_TENTATIVAS = /rate limit|too many requests|over_request_rate/i;

/** Sem resposta do servidor: `fetch` rejeitado, não um erro da API. */
const REDE = /failed to fetch|network|networkerror|load failed/i;

export function mensagemDeErroDeLogin(erro) {
  const texto = erro?.message ?? "";

  if (NAO_CONFIRMADO.test(texto))
    return "Confirme seu e-mail antes de entrar. Procure a mensagem que enviamos ao criar a conta.";

  if (MUITAS_TENTATIVAS.test(texto))
    return "Muitas tentativas seguidas. Aguarde um instante e tente de novo.";

  if (REDE.test(texto))
    return "Não foi possível falar com o servidor. Verifique sua conexão e tente de novo.";

  if (CREDENCIAL.test(texto)) return "E-mail ou senha incorretos.";

  // Erro que não sabemos classificar: mostrar o texto do servidor é melhor do
  // que afirmar uma causa errada.
  return texto || "Não foi possível entrar. Tente de novo.";
}

/**
 * O início do fluxo do Google falha antes de qualquer navegação — provedor
 * desabilitado, redirect fora da allow list, rede. Sem isto, o clique não
 * produzia nada: nem tela, nem aviso.
 */
export function mensagemDeErroDoGoogle(erro) {
  const texto = erro?.message ?? "";

  if (REDE.test(texto))
    return "Não foi possível falar com o servidor. Verifique sua conexão e tente de novo.";

  return texto
    ? `Não foi possível entrar com o Google: ${texto}`
    : "Não foi possível entrar com o Google. Tente de novo.";
}
