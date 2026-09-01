/**
 * Formato de e-mail aceito nos formulários.
 *
 * Estava copiado em LoginForm e RegisterForm, e a tela de conta seria a
 * terceira cópia. Regex duplicada é a que diverge: basta um ajuste em um dos
 * lados para o mesmo endereço passar numa tela e falhar na outra.
 *
 * Deliberadamente frouxa. Validar e-mail por regex não decide se o endereço
 * existe — quem decide é o e-mail de confirmação. O papel daqui é só pegar o
 * erro de digitação óbvio antes de gastar uma ida ao servidor.
 */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function emailValido(valor) {
  return EMAIL_RE.test(String(valor ?? "").trim());
}
