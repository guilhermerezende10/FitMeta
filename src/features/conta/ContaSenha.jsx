import { useState } from "react";

import { mensagemDeErroDeSenha } from "../authentication/mensagemDeErro";
import { useAtualizarSenha } from "./useConta";
import Alert from "../../ui/Alert";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import Confirmacao from "../../ui/Confirmacao";
import Field, { PasswordToggle } from "../../ui/Field";

/**
 * Troca de senha.
 *
 * Pede a senha atual porque não existe API para conferi-la: quem confere é um
 * login feito por baixo, em `atualizarSenha`. Isso impede que uma sessão
 * esquecida aberta troque a senha da conta, e de quebra renova o token, que é o
 * que o Supabase exige para uma operação sensível.
 *
 * O mínimo de 6 caracteres é o do Supabase, e a frase é a mesma do cadastro —
 * duas telas dizendo a mesma regra com palavras diferentes confundem.
 */
const MINIMO = 6;

function ContaSenha({ user, podeAlterar }) {
  const atualizar = useAtualizarSenha();

  const [atualSenha, setAtualSenha] = useState("");
  const [nova, setNova] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [visivel, setVisivel] = useState(false);
  const [erros, setErros] = useState({});
  const [erroServidor, setErroServidor] = useState("");
  const [salvo, setSalvo] = useState(false);

  function editar(setter) {
    return (e) => {
      setter(e.target.value);
      setErros({});
      setSalvo(false);
    };
  }

  async function handleSalvar() {
    if (atualizar.isPending) return;

    const encontrados = {};
    if (!atualSenha) encontrados.atual = "Informe sua senha atual.";
    if (nova.length < MINIMO)
      encontrados.nova = `A senha precisa de pelo menos ${MINIMO} caracteres.`;
    else if (nova !== confirmacao)
      encontrados.confirmacao = "As senhas não coincidem.";

    if (Object.keys(encontrados).length > 0) {
      setErros(encontrados);
      return;
    }

    setErroServidor("");

    try {
      await atualizar.mutateAsync({
        email: user?.email,
        senhaAtual: atualSenha,
        novaSenha: nova,
      });
    } catch (e) {
      console.error(e.message, e);
      setErroServidor(mensagemDeErroDeSenha(e));
      return;
    }

    // Nunca deixar senha parada no DOM depois que a troca terminou.
    setAtualSenha("");
    setNova("");
    setConfirmacao("");
    setSalvo(true);
  }

  return (
    <Card className="flex flex-col gap-6">
      <h2 className="font-display text-[20px] font-bold leading-6 text-primary">
        Senha
      </h2>

      {!podeAlterar && (
        <p className="text-body text-secondary">
          Sua conta entra pelo Google, então não há senha do FitMeta para
          trocar. A senha é gerenciada na sua conta Google.
        </p>
      )}

      {podeAlterar && (
        <>
          {erroServidor && <Alert>{erroServidor}</Alert>}

          <Field
            tone="card"
            label="Senha atual"
            id="conta-senha-atual"
            type={visivel ? "text" : "password"}
            autoComplete="current-password"
            value={atualSenha}
            disabled={atualizar.isPending}
            onChange={editar(setAtualSenha)}
            error={erros.atual}
            trailing={
              <PasswordToggle
                visible={visivel}
                onToggle={() => setVisivel((v) => !v)}
              />
            }
          />

          <Field
            tone="card"
            label="Nova senha"
            id="conta-senha-nova"
            type={visivel ? "text" : "password"}
            autoComplete="new-password"
            placeholder={`Mínimo de ${MINIMO} caracteres`}
            value={nova}
            disabled={atualizar.isPending}
            onChange={editar(setNova)}
            error={erros.nova}
          />

          <Field
            tone="card"
            label="Confirmar nova senha"
            id="conta-senha-confirmacao"
            type={visivel ? "text" : "password"}
            autoComplete="new-password"
            value={confirmacao}
            disabled={atualizar.isPending}
            onChange={editar(setConfirmacao)}
            error={erros.confirmacao}
          />

          <div className="flex flex-wrap items-center justify-between gap-4">
            {salvo ? <Confirmacao>Senha atualizada</Confirmacao> : <span />}

            <Button
              onClick={handleSalvar}
              loading={atualizar.isPending}
              className="w-full sm:w-auto sm:min-w-[180px]"
            >
              Trocar senha
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}

export default ContaSenha;
