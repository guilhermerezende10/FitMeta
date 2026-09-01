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

/** O valor novo é igual ao que já está gravado. */
const IGUAL_AO_ATUAL = /should be different|same as the (old|current)|same_password/i;

/** O e-mail pedido já pertence a outra conta. */
const EMAIL_EM_USO = /already registered|already exists|email_exists|user_already_exists/i;

/** A sessão não serve mais para uma operação sensível. */
const SESSAO = /reauthentication|session (not found|expired)|jwt|not authenticated/i;

/** Abaixo do mínimo que o Supabase aceita. */
const SENHA_FRACA = /password should be at least|weak.?password/i;

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

/** Troca de e-mail na tela de conta. */
export function mensagemDeErroDeEmail(erro) {
  const texto = erro?.message ?? "";

  if (REDE.test(texto))
    return "Não foi possível falar com o servidor. Verifique sua conexão e tente de novo.";

  if (MUITAS_TENTATIVAS.test(texto))
    return "Muitas tentativas seguidas. Aguarde um instante e tente de novo.";

  if (EMAIL_EM_USO.test(texto))
    return "Este e-mail já está cadastrado em outra conta.";

  if (IGUAL_AO_ATUAL.test(texto))
    return "O novo e-mail precisa ser diferente do atual.";

  if (SESSAO.test(texto))
    return "Sua sessão expirou. Entre de novo para trocar o e-mail.";

  return texto || "Não foi possível trocar o e-mail. Tente de novo.";
}

/**
 * Troca de senha na tela de conta.
 *
 * `CREDENCIAL` vem antes de tudo que não seja rede ou rate limit porque aqui
 * ela tem outro significado: quem confere a senha atual é um `signInWithPassword`
 * feito por baixo, e o erro que ele devolve é o mesmo do login. Reusar a frase
 * do login — "E-mail ou senha incorretos" — mandaria a pessoa conferir um
 * e-mail que ela nem digitou nesta tela.
 */
export function mensagemDeErroDeSenha(erro) {
  const texto = erro?.message ?? "";

  if (REDE.test(texto))
    return "Não foi possível falar com o servidor. Verifique sua conexão e tente de novo.";

  if (MUITAS_TENTATIVAS.test(texto))
    return "Muitas tentativas seguidas. Aguarde um instante e tente de novo.";

  if (CREDENCIAL.test(texto)) return "Senha atual incorreta.";

  if (SENHA_FRACA.test(texto))
    return "A senha precisa de pelo menos 6 caracteres.";

  if (IGUAL_AO_ATUAL.test(texto))
    return "A nova senha precisa ser diferente da atual.";

  if (SESSAO.test(texto))
    return "Sua sessão expirou. Entre de novo para trocar a senha.";

  return texto || "Não foi possível trocar a senha. Tente de novo.";
}
