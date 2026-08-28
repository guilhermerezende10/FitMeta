import { useCallback, useEffect, useState } from "react";

import { treinos } from "../data/data-recomendacao-treino";
import supabase from "../services/supabase";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import Spinner from "../ui/Spinner";
import TreinoPlano from "../features/recomendacao-treino/TreinoPlano";

/**
 * Plano de treino salvo.
 *
 * A consulta e a regra de escolha do plano são as mesmas de antes:
 * dias de treino e duração saem das respostas e casam com `treinos`.
 *
 * gh#15: "não tem plano" e "a consulta falhou" eram o mesmo estado, e as duas
 * situações caíam no EmptyState — quem tinha plano, com a rede instável, lia
 * que não tinha plano nenhum e era convidado a refazer o questionário que já
 * havia respondido. Agora são três estados: carregando, erro e resultado.
 */
function MeuTreino({ recemCriado = false }) {
  const [plano, setPlano] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  const buscar = useCallback(async () => {
    setLoading(true);
    setErro(false);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      setErro(true);
      setLoading(false);
      return;
    }

    if (!user) {
      setPlano(null);
      setLoading(false);
      return;
    }

    // maybeSingle, e não single: `single` devolve erro tanto para zero linhas
    // quanto para falha real, o que tornava os dois casos indistinguíveis.
    const { data, error } = await supabase
      .from("treino_answers")
      .select("freq_treino, duracao")
      .eq("user_id", user.id)
      .maybeSingle();

    // O supabase-js não lança em falha de rede: converte para `error` e devolve
    // `data: null` (PostgrestBuilder.js:167). Sem checar `error` aqui, um try/
    // catch em volta não pegaria nada.
    if (error) {
      console.error(error);
      setErro(true);
      setLoading(false);
      return;
    }

    if (!data) {
      setPlano(null);
      setLoading(false);
      return;
    }

    const diasDeTreino = parseInt(
      (data.freq_treino || "").replace(/\D/g, ""),
      10
    );
    const duracaoTreino = parseInt((data.duracao || "").replace(/\D/g, ""), 10);

    setPlano(
      treinos.find(
        (t) => t.duracao === duracaoTreino && t.diasDeTreino === diasDeTreino
      ) ?? null
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    buscar();
  }, [buscar]);

  if (loading) return <Spinner />;

  if (erro)
    return (
      <Alert
        action={
          <Button variant="secondary" size="sm" onClick={buscar}>
            Tentar novamente
          </Button>
        }
      >
        Não foi possível carregar seu plano de treino.
      </Alert>
    );

  if (!plano)
    return (
      <EmptyState
        icon="treino"
        titulo="Você ainda não tem um plano de treino."
        descricao="Três perguntas bastam para montar sua semana."
        acao="Montar meu treino"
        to="/recomendacao-treino/formulario/iniciar"
      />
    );

  return <TreinoPlano plano={plano} recemCriado={recemCriado} />;
}

export default MeuTreino;
