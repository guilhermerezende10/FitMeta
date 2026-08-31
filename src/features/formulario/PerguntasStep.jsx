import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/useForm";
import { useSalvarRespostas } from "../../services/usePlanos";
import { useUser } from "../authentication/useUser";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";
import OptionList from "../../ui/OptionList";
import { valorGravado } from "./valorGravado";

/**
 * Etapas de pergunta dos dois formulários.
 *
 * A escolha deixa de ser uma pílula sem estado selecionado visível e passa
 * a ser a linha de opção do design, com marcador de rádio.
 *
 * O que é gravado, e como, é exatamente o que TreinoSelect e NutricaoSelect
 * já gravavam — inclusive a conversão de "2 a 3x por semana" para 3 e de
 * "Ganhar peso" para "ganhar", no fluxo de nutrição.
 */

function PerguntasStep({ fluxo }) {
  const { state, dispatch } = useForm();
  const navigate = useNavigate();
  const [salvando, setSalvando] = useState(false);
  const [erroServidor, setErroServidor] = useState(false);
  const { user } = useUser();
  const salvar = useSalvarRespostas();

  const ehNutricao = fluxo.id === "nutricao";
  const pergunta = fluxo.perguntas.find((q) => q.index === state.pageIndex);

  // Os dois fluxos compartilham o mesmo `pageIndex`. Vindo de um fluxo mais
  // longo, o índice pode cair fora do alcance deste — o que deixava a tela
  // em branco. Nesse caso volta para a primeira pergunta.
  useEffect(() => {
    if (!pergunta) dispatch({ type: "RESET_PAGE" });
  }, [pergunta, dispatch]);

  const respostas = ehNutricao ? state.nutricaoAnswers : state.treinoAnswers;
  const chave = ehNutricao ? pergunta?.label : pergunta?.index;

  // O fluxo de nutrição guarda o valor normalizado, não o rótulo.
  const gravado = (opcao) => valorGravado(opcao, ehNutricao, pergunta?.label);

  // …e para desenhar a seleção precisamos do caminho de volta.
  const selecionada = (() => {
    const guardado = respostas[chave];
    if (guardado === undefined || guardado === null) return "";
    if (!ehNutricao) return guardado;
    return (
      pergunta.options.find((o) => gravado(o) === guardado) ?? ""
    );
  })();

  function handleEscolha(opcao) {
    if (ehNutricao) {
      dispatch({
        type: "SET_NUTRICAO_ANSWER",
        payload: { label: pergunta.label, option: gravado(opcao) },
      });
    } else {
      dispatch({
        type: "SET_TREINO_ANSWER",
        payload: { questionIndex: pergunta.index, option: opcao },
      });
    }
  }

  function handleVoltar() {
    if (state.pageIndex > 1) dispatch({ type: "PREV_PAGE" });
    else navigate(`${fluxo.base}/iniciar`);
  }

  async function handleProximo() {
    if (!selecionada || salvando) return;

    const ultima = state.pageIndex === fluxo.perguntas.length;

    if (!ultima) {
      dispatch({ type: "NEXT_PAGE" });
      return;
    }

    setSalvando(true);
    setErroServidor(false);

    // gh#16: o id vem da query ['user'], que o useUser já mantém em cache —
    // antes cada gravação começava por um supabase.auth.getUser() próprio.
    if (!user) {
      setErroServidor(true);
      setSalvando(false);
      return;
    }

    const payload = ehNutricao
      ? {
          user_id: user.id,
          frequencia: state.nutricaoAnswers.frequencia,
          objetivo: state.nutricaoAnswers.objetivo,
        }
      : {
          user_id: user.id,
          freq_treino: state.treinoAnswers[1],
          duracao: state.treinoAnswers[2],
        };

    try {
      await salvar.mutateAsync({ ehNutricao, payload });
    } catch (erro) {
      console.error(erro.message, erro);
      setErroServidor(true);
      return;
    } finally {
      setSalvando(false);
    }

    // gh#24: as respostas ficaram gravadas no banco, então o rascunho da
    // sessão cumpriu seu papel. Sem limpar aqui, "Refazer questionário"
    // reabriria o formulário com as respostas da rodada anterior já marcadas
    // — o risco que a persistência introduz. O RESET zera o contexto, e o
    // provider regrava o estado inicial no sessionStorage.
    dispatch({ type: "RESET" });

    navigate(fluxo.resultado);
  }

  if (!pergunta) return null;

  return (
    <div className="flex w-full flex-col gap-4">
      {erroServidor && (
        <Alert
          action={
            <Button variant="secondary" size="sm" onClick={handleProximo}>
              Tentar novamente
            </Button>
          }
        >
          Não foi possível salvar suas respostas.
        </Alert>
      )}

      <Card className="flex flex-col gap-8">
        <OptionList
          name={String(chave)}
          question={pergunta.titulo}
          options={pergunta.options}
          value={selecionada}
          onChange={handleEscolha}
        />

        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
          <Button variant="secondary" onClick={handleVoltar}>
            Voltar
          </Button>

          <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:items-end">
            <Button
              onClick={handleProximo}
              disabled={!selecionada}
              loading={salvando}
              className="w-full sm:w-auto sm:min-w-[180px]"
            >
              {state.pageIndex === fluxo.perguntas.length
                ? "Ver resultado"
                : "Próximo"}
            </Button>
            {!selecionada && (
              <p className="text-label text-muted">Escolha uma opção.</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PerguntasStep;
