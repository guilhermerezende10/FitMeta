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
 * da própria conta.
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

  async function handleSalvar() {
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
    setEmail("");
  }

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-[20px] font-bold leading-6 text-primary">
          E-mail
        </h2>
        <p className="text-body text-secondary">
          Você entra hoje com <strong className="text-primary">{atual}</strong>.
        </p>
      </div>

      {!podeAlterar && (
        <p className="text-body text-secondary">
          Sua conta entra pelo Google, então o e-mail é o da conta Google e é
          gerenciado por lá.
        </p>
      )}

      {podeAlterar && enviadoPara && (
        <div className="flex flex-col gap-2 rounded-row border border-accent bg-accent-surface px-4 py-3">
          <p className="text-body text-primary">
            Enviamos um link de confirmação para{" "}
            <strong>{enviadoPara}</strong>.
          </p>
          <p className="text-label text-secondary">
            Seu e-mail só muda depois que você abrir esse link — e, por
            segurança, confirmar também pelo endereço atual. Até lá, continue
            entrando com {atual}.
          </p>
        </div>
      )}

      {podeAlterar && !enviadoPara && (
        <>
          {erroServidor && <Alert>{erroServidor}</Alert>}

          <Field
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
          />

          <Button
            onClick={handleSalvar}
            loading={atualizar.isPending}
            className="w-full sm:w-auto sm:min-w-[200px] sm:self-end"
          >
            Enviar confirmação
          </Button>
        </>
      )}
    </Card>
  );
}

export default ContaEmail;
