import { useState } from "react";

import { mensagemDeErroDeEmail } from "../authentication/mensagemDeErro";
import { emailValido } from "../authentication/validarEmail";
import { useAtualizarEmail } from "./useConta";
import Alert from "../../ui/Alert";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import Field from "../../ui/Field";

/**
 * Troca de e-mail da conta.
 *
 * O Supabase não troca o endereço na hora: manda um link e só efetiva quando
 * ele é aberto. A tela precisa dizer isso — se prometesse troca imediata, o
 * usuário tentaria entrar com um e-mail que ainda não existe e ficaria de fora
 * da própria conta. Por isso o endereço atual continua visível o tempo todo, e
 * o estado pendente substitui o formulário em vez de conviver com ele.
 *
 * Quem entra pelo Google não vê formulário: o e-mail da conta é o do Google, e
 * trocá-lo aqui faria o app exibir um endereço que o próximo login contradiz.
 */
function ContaEmail({ user, podeAlterar }) {
  const atualizar = useAtualizarEmail();

  const [email, setEmail] = useState("");
  const [erroCampo, setErroCampo] = useState("");
  const [erroServidor, setErroServidor] = useState("");
  const [enviadoPara, setEnviadoPara] = useState("");

  const atual = user?.email ?? "";
  const alterado = email.trim().length > 0;

  async function handleEnviar() {
    if (atualizar.isPending) return;

    const limpo = email.trim();

    if (!emailValido(limpo)) {
      setErroCampo("Informe um e-mail válido.");
      return;
    }

    if (limpo.toLowerCase() === atual.toLowerCase()) {
      setErroCampo("O novo e-mail precisa ser diferente do atual.");
      return;
    }

    setErroCampo("");
    setErroServidor("");

    try {
      await atualizar.mutateAsync({ email: limpo });
    } catch (e) {
      console.error(e.message, e);
      setErroServidor(mensagemDeErroDeEmail(e));
      return;
    }

    setEnviadoPara(limpo);
  }

  function usarOutro() {
    setEnviadoPara("");
    setErroServidor("");
  }

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-[20px] font-bold leading-6 text-primary">
          E-mail
        </h2>
        <p className="text-body text-secondary">
          Você entra hoje com{" "}
          <strong className="font-semibold text-primary">{atual}</strong>.
        </p>
      </div>

      {!podeAlterar && (
        <p className="max-w-[62ch] text-body text-secondary">
          Sua conta entra pelo Google, então o e-mail é o da conta Google e é
          gerenciado por lá.
        </p>
      )}

      {podeAlterar && enviadoPara && (
        <div className="flex flex-col items-start gap-4">
          <div className="flex max-w-[62ch] flex-col gap-2 rounded-row border border-accent bg-accent-surface p-4">
            <p className="text-body text-primary">
              Enviamos um link de confirmação para{" "}
              <strong className="font-semibold">{enviadoPara}</strong>.
            </p>
            <p className="text-[12px] leading-4 text-secondary">
              Seu e-mail só muda depois que você abrir esse link — e, por
              segurança, confirmar também pelo endereço atual. Até lá, continue
              entrando com {atual}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleEnviar}
              loading={atualizar.isPending}
            >
              Enviar de novo
            </Button>
            <button
              type="button"
              onClick={usarOutro}
              className="text-body font-medium text-accent-on-card underline underline-offset-2 outline-none hover:text-accent-hover focus-visible:shadow-focus"
            >
              Usar outro e-mail
            </button>
          </div>
        </div>
      )}

      {podeAlterar && !enviadoPara && (
        <>
          {erroServidor && <Alert>{erroServidor}</Alert>}

          <Field
            className="max-w-form"
            tone="card"
            label="Novo e-mail"
            id="conta-email"
            type="email"
            autoComplete="email"
            placeholder="voce@exemplo.com"
            value={email}
            disabled={atualizar.isPending}
            onChange={(e) => {
              setEmail(e.target.value);
              setErroCampo("");
            }}
            error={erroCampo}
            hint="Enviamos um link de confirmação para o novo endereço."
          />

          <div className="flex justify-end">
            <Button
              onClick={handleEnviar}
              loading={atualizar.isPending}
              disabled={!alterado}
              className="w-full sm:w-auto sm:min-w-[200px]"
            >
              Enviar confirmação
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}

export default ContaEmail;
