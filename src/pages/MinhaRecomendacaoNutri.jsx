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
          setInfoBasicas({
            peso: userInfo.peso,
            altura: userInfo.altura,
            idade: userInfo.idade,
            sexo: userInfo.sexo,
            nome: userInfo.nome,
          });
        }

        const { data: nutricaoData, error: nutricaoError } = await supabase
          .from("nutricao_answers")
          .select("frequencia, objetivo")
          .eq("user_id", user.id)
          .single();

        if (nutricaoError) {
          console.error("Erro ao buscar nutricaoAnswers:", nutricaoError);
        } else if (nutricaoData) {
          setNutricaoAnswers({
            frequencia: nutricaoData.frequencia,
            objetivo: nutricaoData.objetivo,
          });
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
