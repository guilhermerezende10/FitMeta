import { useEffect, useState } from "react";

import { infoBasicasDoBanco } from "../formulario/infoBasicasDoBanco";
import { useInfoBasica, useSalvarInfoBasica } from "../../services/usePlanos";
import { useUser } from "../authentication/useUser";
import { useAtualizarNome } from "./useConta";
import Alert from "../../ui/Alert";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import Confirmacao from "../../ui/Confirmacao";
import Field from "../../ui/Field";

/**
 * Nome de exibição da conta.
 *
 * Grava em dois lugares, e nenhum dos dois é dispensável:
 *
 * - `info_basica.nome` tem precedência na barra lateral (gh#25) e é o que a
 *   etapa 1 do questionário preenche. Gravar só no metadado deixaria a barra
 *   exibindo o nome antigo — exatamente o bug que a gh#25 corrigiu, ao contrário.
 * - `user_metadata.nome` é a única casa do nome para quem entrou pelo Google e
 *   nunca respondeu questionário, porque essa pessoa não tem linha nenhuma.
 *
 * E `info_basica` só é tocada quando a linha **já existe**. `salvarInfoBasica`
 * faz `Number(idade)`, e `Number("")` é `0`: gravar um nome sozinho criaria uma
 * linha com idade, peso e altura zerados, que o `calculadorMacros` consumiria
 * como um corpo de 0 kg.
 */
function ContaNome() {
  const { user } = useUser();
  const { dados, carregando } = useInfoBasica();
  const salvarInfo = useSalvarInfoBasica();
  const atualizarNome = useAtualizarNome();

  const [nome, setNome] = useState(null);
  const [erroCampo, setErroCampo] = useState("");
  const [erroServidor, setErroServidor] = useState("");
  const [salvo, setSalvo] = useState(false);

  // Mesma precedência que a barra lateral usa, para o campo mostrar exatamente
  // o nome que o usuário vê lá.
  useEffect(() => {
    if (nome !== null || carregando) return;
    setNome(dados?.nome?.trim() || user?.user_metadata?.nome || "");
  }, [dados, carregando, nome, user]);

  const salvando = salvarInfo.isPending || atualizarNome.isPending;

  function handleCampo(valor) {
    setNome(valor);
    setErroCampo("");
    setSalvo(false);
  }

  async function handleSalvar() {
    if (salvando) return;

    const limpo = String(nome ?? "").trim();
    if (!limpo) {
      setErroCampo("Informe seu nome.");
      return;
    }

    setErroServidor("");

    try {
      /**
       * A ordem importa. Se a segunda chamada falhar, a barra lateral já mostra
       * o nome novo e só o metadado invisível fica atrasado. Na ordem inversa,
       * a falha deixaria a barra exibindo o nome antigo logo depois de a tela
       * dizer que salvou.
       */
      if (dados)
        await salvarInfo.mutateAsync({
          ...infoBasicasDoBanco(dados),
          nome: limpo,
        });

      await atualizarNome.mutateAsync({ nome: limpo });
    } catch (e) {
      console.error(e.message, e);
      setErroServidor("Não foi possível salvar seu nome.");
      return;
    }

    setSalvo(true);
  }

  return (
    <Card className="flex flex-col gap-6">
      <h2 className="font-display text-[20px] font-bold leading-6 text-primary">
        Nome
      </h2>

      {erroServidor && (
        <Alert
          action={
            <Button variant="secondary" size="sm" onClick={handleSalvar}>
              Tentar novamente
            </Button>
          }
        >
          {erroServidor}
        </Alert>
      )}

      <Field
        tone="card"
        label="Nome"
        id="conta-nome"
        type="text"
        placeholder="Como você se chama"
        value={nome ?? ""}
        disabled={carregando || salvando}
        onChange={(e) => handleCampo(e.target.value)}
        error={erroCampo}
        hint="É o nome que aparece na barra lateral."
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        {salvo ? <Confirmacao>Nome atualizado</Confirmacao> : <span />}

        <Button
          onClick={handleSalvar}
          loading={salvando}
          disabled={carregando}
          className="w-full sm:w-auto sm:min-w-[160px]"
        >
          Salvar
        </Button>
      </div>
    </Card>
  );
}

export default ContaNome;
