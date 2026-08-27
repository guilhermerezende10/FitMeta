import { useEffect, useState } from "react";
import supabase from "../services/supabase";
import calculadorMacros from "../features/recomendacao-nutricional/calculadorMacros";
import NutricaoPlano from "../features/recomendacao-nutricional/NutricaoPlano";
import Spinner from "../ui/Spinner";
import EmptyState from "../ui/EmptyState";

/**
 * Recomendação nutricional salva.
 *
 * As duas consultas e a chamada a `calculadorMacros` são as mesmas de
 * antes, com os mesmos argumentos e na mesma ordem.
 */
function MinhaRecomendacaoNutri({ recemCriado = false }) {
  const [infoBasicas, setInfoBasicas] = useState(null);
  const [respostas, setRespostas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscar() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setLoading(false);
        return;
      }

      try {
        const { data: userInfo } = await supabase
          .from("info_basica")
          .select("peso, altura, idade, sexo, nome")
          .eq("user_id", user.id)
          .single();

        const { data: nutricaoData } = await supabase
          .from("nutricao_answers")
          .select("frequencia, objetivo")
          .eq("user_id", user.id)
          .single();

        if (userInfo) setInfoBasicas(userInfo);
        if (nutricaoData) setRespostas(nutricaoData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    buscar();
  }, []);

  if (loading) return <Spinner />;

  if (!infoBasicas || !respostas?.objetivo)
    return (
      <EmptyState
        icon="nutricao"
        titulo="Você ainda não tem uma recomendação nutricional."
        descricao="Três perguntas bastam para calcular suas calorias e macros."
        acao="Calcular minha nutrição"
        to="/recomendacao-nutricional/formulario/iniciar"
      />
    );

  const resultado = calculadorMacros(
    infoBasicas.peso,
    infoBasicas.altura,
    infoBasicas.idade,
    infoBasicas.sexo,
    respostas.frequencia,
    respostas.objetivo
  );

  return (
    <NutricaoPlano
      resultado={resultado}
      objetivo={respostas.objetivo}
      frequencia={respostas.frequencia}
      recemCriado={recemCriado}
    />
  );
}

export default MinhaRecomendacaoNutri;
