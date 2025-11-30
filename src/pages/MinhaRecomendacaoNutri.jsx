import { useEffect, useState } from "react";
import supabase from "../services/supabase";
import Spinner from "../ui/Spinner";
import NutricaoResultTable from "../features/recomendacao-nutricional/NutricaoResultTable";
import calculadorMacros from "../features/recomendacao-nutricional/calculadorMacros";
import Title from "../ui/Title";

function MinhaRecomendacaoNutri() {
  const [infoBasicas, setInfoBasicas] = useState({
    peso: "",
    altura: "",
    idade: "",
    sexo: "",
    nome: ""
  });

  const [nutricaoAnswers, setNutricaoAnswers] = useState({
    frequencia: "",
    objetivo: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNutricaoAnswers() {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("nutricao_answers")
        .select("frequencia, objetivo")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.log(error);
        setLoading(false);
        return;
      }

      setNutricaoAnswers({
        frequencia: data.frequencia,
        objetivo: data.objetivo,
      });

      setLoading(false);
    }

    fetchNutricaoAnswers();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 place-items-center lg:pl-56">
        <Spinner />
      </div>
    );
  }

  const resultado = calculadorMacros(
    infoBasicas.peso,
    infoBasicas.altura,
    infoBasicas.idade,
    infoBasicas.sexo,
    nutricaoAnswers.frequencia,
    nutricaoAnswers.objetivo
  );

  return (
    <div className="max-h-real flex flex-col bg-white overflow-y-hidden">
      {/* Título fixo */}
      <div className="flex-shrink-0 px-4 pt-3 pb-4">
        <div className="max-w-lg mx-auto">
          <Title
            className="
              text-lg sm:text-xl font-bold text-white text-center
              bg-brand-bgDarkGray rounded-full shadow-lg
              py-3 sm:py-4 px-6
            "
          >
            Sua recomendação, {infoBasicas.nome}
          </Title>
        </div>
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-hidden pb-0">
        <NutricaoResultTable resultado={resultado} />
      </div>
    </div>
  );
}

export default MinhaRecomendacaoNutri;
