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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Erro ao identificar usuário:", userError);
        setLoading(false);
        return;
      }

      try {
        const { data: userInfo, error: userInfoError } = await supabase
          .from("info_basica")
          .select("peso, altura, idade, sexo, nome")
          .eq("user_id", user.id)
          .single();

        if (userInfoError) {
          console.error("Erro ao buscar infoBasicas:", userInfoError);
        } else if (userInfo) {
          setInfoBasicas(userInfo);
        }

        const { data: nutricaoData, error: nutricaoError } = await supabase
          .from("nutricao_answers")
          .select("frequencia, objetivo")
          .eq("user_id", user.id)
          .single();

        if (nutricaoError) {
          console.error("Erro ao buscar nutricaoAnswers:", nutricaoError);
        } else if (nutricaoData) {
          setNutricaoAnswers(nutricaoData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Wrapper centralizador apenas no PC, com box um pouco acima */}
      <div className="w-full md:flex md:flex-col md:items-center md:justify-start md:min-h-screen md:pt-36">
        
        {/* Título */}
        <div className="px-4 pb-6 w-full max-w-lg">
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

        {/* Tabela */}
        <div className="w-full flex justify-center md:overflow-visible">
          <NutricaoResultTable resultado={resultado} />
        </div>

      </div>
    </div>
  );
}

export default MinhaRecomendacaoNutri;
