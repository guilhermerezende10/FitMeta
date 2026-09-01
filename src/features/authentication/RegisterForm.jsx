import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "./useRegister";
import { registerGoogle } from "../../services/apiAuth";
import Field, { PasswordToggle } from "../../ui/Field";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";
import GoogleButton from "./GoogleButton";
import { mensagemDeErroDoGoogle } from "./mensagemDeErro";
import RegistroSucesso from "./RegistroSucesso";
import { EMAIL_RE } from "./validarEmail";

function RegisterForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [aceitou, setAceitou] = useState(false);
  const [errors, setErrors] = useState({ email: "", senha: "" });
  const [erroGoogle, setErroGoogle] = useState("");

  const { signup, isLoading, isError, error, sucesso, precisaConfirmar } =
    useRegister();

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

    // FM-05: o nome deixa de ser descartado — vai para o metadata do usuário,
    // que é de onde a barra lateral o lê.
    signup({ email: email.trim(), password: senha, nome: nome.trim() });
  }

  const completo = nome.trim() && email.trim() && senha.trim() && aceitou;

  // Supabase devolve mensagens diferentes conforme a versão; qualquer uma
  // delas significa a mesma coisa para quem está cadastrando.
  const emailJaExiste = /already|registered|exists/i.test(error?.message || "");

  // O início do fluxo do Google falha antes de qualquer navegação; sem
  // capturar, o clique não produzia nada.
  async function handleGoogle() {
    setErroGoogle("");
    try {
      await registerGoogle();
    } catch (e) {
      setErroGoogle(mensagemDeErroDoGoogle(e));
    }
  }

  // O cadastro deu certo: o design prevê tela de sucesso no lugar do
  // formulário, e não um redirecionamento silencioso para /login (gh#1).
  if (sucesso)
    return (
      <RegistroSucesso
        email={email.trim()}
        precisaConfirmar={precisaConfirmar}
      />
    );

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-display-l text-primary">
          Crie sua conta
        </h1>
        <p className="text-body text-secondary">Leva menos de um minuto.</p>
      </div>

      {isError &&
        (emailJaExiste ? (
          <Alert>
            Este e-mail já está cadastrado.
            <Link
              to="/login"
              className="font-semibold text-accent-on-card outline-none hover:text-accent-hover focus-visible:shadow-focus"
            >
              Fazer login
            </Link>
          </Alert>
        ) : (
          <Alert>{error?.message || "Não foi possível criar a conta."}</Alert>
        ))}

      <div className="flex flex-col gap-4">
        <Field
          label="Nome de usuário"
          id="fm-c-user"
          type="text"
          name="username"
          autoComplete="nickname"
          placeholder="como quer ser chamado"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={isLoading}
        />

        <Field
          label="E-mail"
          id="fm-c-email"
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
          id="fm-c-senha"
          type={showPw ? "text" : "password"}
          name="password"
          autoComplete="new-password"
          placeholder="Mínimo de 6 caracteres"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onBlur={validarSenha}
          error={errors.senha}
          hint="Pelo menos 6 caracteres."
          disabled={isLoading}
          trailing={
            <PasswordToggle
              visible={showPw}
              onToggle={() => setShowPw((v) => !v)}
            />
          }
        />
      </div>

      <div className="flex items-start gap-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={aceitou}
          aria-labelledby="fm-termos-label"
          onClick={() => setAceitou((v) => !v)}
          className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-[6px] border outline-none transition-colors focus-visible:shadow-focus ${
            aceitou
              ? "border-transparent bg-gradient-primary"
              : "border-strong bg-surface"
          }`}
        >
          {aceitou && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m5 12.5 4.5 4.5L19 7" />
            </svg>
          )}
        </button>

        <span id="fm-termos-label" className="text-body text-secondary">
          Li e concordo com a{" "}
          <Link
            to="/politicas-privacidade"
            className="text-accent-on-card underline underline-offset-2 outline-none hover:text-accent-hover focus-visible:shadow-focus"
          >
            Política de Privacidade
          </Link>{" "}
          e os{" "}
          <Link
            to="/termos-de-uso"
            className="text-accent-on-card underline underline-offset-2 outline-none hover:text-accent-hover focus-visible:shadow-focus"
          >
            Termos de Uso
          </Link>
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          disabled={!completo}
          loading={isLoading}
          className="w-full"
        >
          Cadastrar
        </Button>
        {!completo && !isLoading && (
          <p className="text-label text-muted">
            Preencha os campos e aceite os termos para continuar.
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-line" />
        <span className="text-caption uppercase text-muted">ou conecte com</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      {erroGoogle && <Alert>{erroGoogle}</Alert>}

      <GoogleButton onClick={handleGoogle} />

      <p className="flex gap-2 text-body text-secondary">
        Já possui uma conta?
        <Link
          to="/login"
          className="font-semibold text-accent-on-card outline-none hover:text-accent-hover focus-visible:shadow-focus"
        >
          Faça login
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
