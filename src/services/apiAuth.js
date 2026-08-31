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
export async function handleLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) console.error("Falha ao encerrar a sessão no servidor:", error.message);

  window.location.href = "/login";
}
