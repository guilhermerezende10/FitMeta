import supabase from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function register({ email, password, nome }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    // FM-05: o nome de usuário era coletado no cadastro e descartado.
    // Guardado aqui, é o que a barra lateral exibe.
    options: { data: { nome } },
  });

  if(error) throw new Error(error.message);

  return data;
}

/**
 * Reenvia o e-mail de confirmacao de cadastro (gh#1).
 *
 * Unica adicao ao modulo: nenhuma funcao vizinha muda de assinatura ou de
 * comportamento. O Supabase impoe rate limit proprio, e o erro dele sobe no
 * mesmo padrao das demais.
 */
export async function resendConfirmation({ email }) {
  const { error } = await supabase.auth.resend({ type: "signup", email });

  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

/**
 * O erro era descartado: qualquer falha ao iniciar o fluxo — provedor
 * desabilitado, redirect fora da allow list, rede — resolvia em silêncio, e o
 * clique em "Continuar com Google" não produzia nada. Nem tela, nem aviso.
 */
export async function registerGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw new Error(error.message);
}

/**
 * Sair não pode depender do servidor responder.
 *
 * `signOut` já descartou a sessão local antes de chamar a API, então falhar
 * aqui não significa que o usuário continua autenticado neste navegador —
 * significa que o servidor não confirmou. Lançar deixava o redirecionamento
 * sem executar: o botão "Sair" não fazia nada visível, e a rejeição ficava sem
 * tratamento. Em máquina compartilhada isso é o pior desfecho possível.
 */
/**
 * Nome de exibição da conta.
 *
 * Devolve o usuário atualizado para quem chamou poder gravar direto no cache de
 * `["user"]`, o mesmo atalho que o login já usa.
 */
export async function atualizarNome({ nome }) {
  const { data, error } = await supabase.auth.updateUser({ data: { nome } });

  if (error) throw new Error(error.message);

  return data?.user;
}

/**
 * Pede a troca de e-mail.
 *
 * O Supabase **não** troca o endereço aqui: manda um link e só efetiva quando
 * ele é aberto. Com "Secure email change" ligado — o padrão — a confirmação vai
 * para o endereço antigo e para o novo. Quem chama precisa dizer isso na tela;
 * prometer troca imediata seria mentira, e o usuário tentaria entrar com um
 * e-mail que ainda não existe.
 */
export async function atualizarEmail({ email }) {
  const { error } = await supabase.auth.updateUser(
    { email },
    { emailRedirectTo: `${window.location.origin}/auth/callback` }
  );

  if (error) throw new Error(error.message);
}

/**
 * Troca a senha, conferindo a atual antes.
 *
 * Não existe API para "conferir a senha atual", então conferimos entrando com
 * ela. Isso resolve duas coisas de uma vez: impede que uma sessão esquecida
 * aberta troque a senha da conta, e renova o token — que é justamente o que
 * `updateUser({ password })` exige de uma operação sensível.
 */
export async function atualizarSenha({ email, senhaAtual, novaSenha }) {
  const { error: erroDeLogin } = await supabase.auth.signInWithPassword({
    email,
    password: senhaAtual,
  });

  if (erroDeLogin) throw new Error(erroDeLogin.message);

  const { error } = await supabase.auth.updateUser({ password: novaSenha });

  if (error) throw new Error(error.message);
}

export async function handleLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) console.error("Falha ao encerrar a sessão no servidor:", error.message);

  window.location.href = "/login";
}
