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

export async function registerGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}
export async function handleLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
  window.location.href = "/login";
}
