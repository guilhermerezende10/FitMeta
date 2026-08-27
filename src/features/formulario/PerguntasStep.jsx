import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/FormContext";
import supabase from "../../services/supabase";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";
import OptionList from "../../ui/OptionList";

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
  function valorGravado(opcao) {
    if (!ehNutricao) return opcao;

    if (pergunta.label === "frequencia") {
      if (opcao.includes("1x")) return 1;
      if (opcao.includes("2 a 3")) return 3;
      if (opcao.includes("4 a 5")) return 5;
    }

    if (pergunta.label === "objetivo") {
      const o = opcao.toLowerCase();
      if (o.includes("ganhar")) return "ganhar";
      if (o.includes("manter")) return "manter";
      if (o.includes("perder")) return "perder";
    }

    return opcao;
  }

  // …e para desenhar a seleção precisamos do caminho de volta.
  const selecionada = (() => {
    const guardado = respostas[chave];
    if (guardado === undefined || guardado === null) return "";
    if (!ehNutricao) return guardado;
    return (
      pergunta.options.find((o) => valorGravado(o) === guardado) ?? ""
    );
  })();

  function handleEscolha(opcao) {
    if (ehNutricao) {
      dispatch({
        type: "SET_NUTRICAO_ANSWER",
        payload: { label: pergunta.label, option: valorGravado(opcao) },
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

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
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
          experiencia: state.treinoAnswers[3],
        };

    const { error } = await supabase
      .from(ehNutricao ? "nutricao_answers" : "treino_answers")
      .upsert(payload, { onConflict: "user_id" });

    setSalvando(false);

    if (error) {
      console.error(error);
      setErroServidor(true);
      return;
    }

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

        <div className="flex items-center justify-between gap-6">
          <Button variant="secondary" onClick={handleVoltar}>
            Voltar
          </Button>

          <div className="flex flex-col items-end gap-2">
            <Button
              onClick={handleProximo}
              disabled={!selecionada}
              loading={salvando}
              className="min-w-[180px]"
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
