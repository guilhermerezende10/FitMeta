import { useCallback, useEffect, useState } from "react";

import { resendConfirmation } from "../../services/apiAuth";
import Alert from "../../ui/Alert";
import Button from "../../ui/Button";

/**
 * Tela de sucesso do cadastro (gh#1).
 *
 * Duas variantes, escolhidas pelo retorno de `signUp` e não por suposição:
 *
 * - `precisaConfirmar` — o projeto Supabase exige confirmação de e-mail
 *   (`data.session === null`). Mostra "Confirme seu e-mail" com o reenvio.
 * - caso contrário — a conta já está ativa e o caminho é o login.
 *
 * Antes desta tela, o cadastro navegava direto para /login com um toast: não
 * havia nenhuma indicação de que um e-mail tinha sido enviado, nem forma de
 * pedir o reenvio se ele não chegasse.
 */

const ESPERA_SEGUNDOS = 60;

function IconeEnvelope() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-surface-raised">
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="text-accent-on-card"
      >
        <rect x="2.5" y="5" width="19" height="14" rx="2" />
        <path d="m3 6.5 9 6 9-6" />
      </svg>
    </span>
  );
}

function RegistroSucesso({ email, precisaConfirmar }) {
  const [restam, setRestam] = useState(precisaConfirmar ? ESPERA_SEGUNDOS : 0);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [reenviado, setReenviado] = useState(false);

  // Um passo por vez, sempre com cleanup: sair da tela antes de a contagem
  // zerar não deixa timer órfão, e não há intervalo sobrevivendo à desmontagem.
  useEffect(() => {
    if (restam <= 0) return;

    const id = setTimeout(() => setRestam((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [restam]);

  const handleReenviar = useCallback(async () => {
    setEnviando(true);
    setErro("");
    setReenviado(false);

    try {
      await resendConfirmation({ email });
      setReenviado(true);
      setRestam(ESPERA_SEGUNDOS);
    } catch (err) {
      // Rate limit do Supabase cai aqui. A tela continua utilizável.
      setErro(err.message || "Não foi possível reenviar agora. Tente mais tarde.");
    } finally {
      setEnviando(false);
    }
  }, [email]);

  if (!precisaConfirmar) {
    return (
      <div className="flex flex-col items-start gap-6">
        <IconeEnvelope />

        <div className="flex flex-col gap-2">
          <h1 className="font-display text-display-l text-primary">
            Conta criada
          </h1>
          <p className="text-body text-secondary">
            Sua conta já está ativa. É só entrar.
          </p>
        </div>

        <Button to="/login" className="w-full">
          Ir para o login
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-6">
      <IconeEnvelope />

      <div className="flex flex-col gap-2">
        <h1 className="font-display text-display-l text-primary">
          Confirme seu e-mail
        </h1>
        <p className="text-body text-secondary">
          Enviamos um link de confirmação para{" "}
          <span className="font-semibold text-primary">{email}</span>.
        </p>
      </div>

      {erro && <Alert>{erro}</Alert>}

      {reenviado && !erro && (
        <p role="status" className="text-body text-accent-on-card">
          Link reenviado.
        </p>
      )}

      <Button
        variant="secondary"
        onClick={handleReenviar}
        disabled={restam > 0 || enviando}
        loading={enviando}
        className="w-full"
      >
        {restam > 0 ? `Reenviar link (${restam}s)` : "Reenviar link"}
      </Button>

      <p className="text-caption text-muted">
        Não chegou? Verifique o spam.
      </p>
    </div>
  );
}

export default RegistroSucesso;
