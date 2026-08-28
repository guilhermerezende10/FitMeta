import { useEffect, useState } from "react";
import { treinos } from "../data/data-recomendacao-treino";
import supabase from "../services/supabase";
import Spinner from "../ui/Spinner";
import EmptyState from "../ui/EmptyState";
import TreinoPlano from "../features/recomendacao-treino/TreinoPlano";

/**
 * Plano de treino salvo.
 *
 * A consulta e a regra de escolha do plano são as mesmas de antes:
 * dias de treino e duração saem das respostas e casam com `treinos`.
 */
function MeuTreino({ recemCriado = false }) {
  const [plano, setPlano] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscar() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("treino_answers")
        .select("freq_treino, duracao")
        .eq("user_id", user.id)
        .single();

      if (error || !data) {
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
    }

    buscar();
  }, []);

  if (loading) return <Spinner />;

  if (!plano)
    return (
      <EmptyState
        icon="treino"
        titulo="Você ainda não tem um plano de treino."
        descricao="Quatro perguntas bastam para montar sua semana."
        acao="Montar meu treino"
        to="/recomendacao-treino/formulario/iniciar"
      />
    );

  return <TreinoPlano plano={plano} recemCriado={recemCriado} />;
}

export default MeuTreino;
