import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "./useLogin";
import { registerGoogle } from "../../services/apiAuth";
import Field, { PasswordToggle } from "../../ui/Field";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";
import GoogleButton from "./GoogleButton";
import {
  mensagemDeErroDeLogin,
  mensagemDeErroDoGoogle,
} from "./mensagemDeErro";
import { EMAIL_RE } from "./validarEmail";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({ email: "", senha: "" });

  const { login, isLoading, isError, error } = useLogin();
  const [erroGoogle, setErroGoogle] = useState("");

  // Validação só no blur, e só se o campo tiver conteúdo — não punir quem
  // ainda está preenchendo.
  function validarEmail() {
    if (!email.trim()) return;
    setErrors((e) => ({
      ...e,
      email: EMAIL_RE.test(email.trim()) ? "" : "Informe um e-mail válido.",
    }));
  }

  function validarSenha() {
    if (!senha) return;
    setErrors((e) => ({
      ...e,
      senha:
        senha.length >= 6 ? "" : "A senha precisa de pelo menos 6 caracteres.",
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const emailError = EMAIL_RE.test(email.trim())
      ? ""
      : "Informe um e-mail válido.";
    const senhaError =
      senha.length >= 6 ? "" : "A senha precisa de pelo menos 6 caracteres.";

    if (emailError || senhaError) {
      setErrors({ email: emailError, senha: senhaError });
      return;
    }

    login({ email: email.trim(), password: senha });
  }

  const vazio = !email.trim() || !senha.trim();

  // O botão desabilitado sempre vem acompanhado da linha que diz o que falta.
  let falta = "";
  if (!email.trim() && !senha.trim())
    falta = "Preencha e-mail e senha para continuar.";
  else if (!email.trim()) falta = "Falta o e-mail.";
  else if (!senha.trim()) falta = "Falta a senha.";

  /**
   * O início do fluxo do Google pode falhar antes de qualquer navegação. Sem
   * capturar aqui, o clique não produzia nada.
   */
  async function handleGoogle() {
    setErroGoogle("");
    try {
      await registerGoogle();
    } catch (e) {
      setErroGoogle(mensagemDeErroDoGoogle(e));
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-display-l text-primary">
          Entre em sua conta
        </h1>
        <p className="text-body text-secondary">
          Use o e-mail cadastrado no FitMeta.
        </p>
      </div>

      {isError && <Alert>{mensagemDeErroDeLogin(error)}</Alert>}

      <div className="flex flex-col gap-4">
        <Field
          label="E-mail"
          id="fm-email"
          type="email"
          name="email"
          autoComplete="username"
          placeholder="voce@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validarEmail}
          error={errors.email}
          disabled={isLoading}
        />

        <Field
          label="Senha"
          id="fm-senha"
          type={showPw ? "text" : "password"}
          name="password"
          autoComplete="current-password"
          placeholder="Mínimo de 6 caracteres"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onBlur={validarSenha}
          error={errors.senha}
          disabled={isLoading}
          trailing={
            <PasswordToggle
              visible={showPw}
              onToggle={() => setShowPw((v) => !v)}
            />
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button type="submit" disabled={vazio} loading={isLoading} className="w-full">
          Entrar
        </Button>
        {falta && !isLoading && <p className="text-label text-muted">{falta}</p>}
      </div>

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-line" />
        <span className="text-caption uppercase text-muted">ou conecte com</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      {erroGoogle && <Alert>{erroGoogle}</Alert>}

      <GoogleButton onClick={handleGoogle} />

      <p className="flex gap-2 text-body text-secondary">
        Ainda não possui uma conta?
        <Link
          to="/registrar"
          className="font-semibold text-accent-on-card outline-none hover:text-accent-hover focus-visible:shadow-focus"
        >
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
