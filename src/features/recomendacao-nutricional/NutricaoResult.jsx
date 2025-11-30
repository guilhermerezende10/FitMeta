import { useForm } from "../../context/FormContext";
import Title from "../../ui/Title";
import calculadorMacros from "./calculadorMacros";
import NutricaoResultTable from "./NutricaoResultTable";

function NutricaoResult() {
  const { state } = useForm();
  const nome = state.infoBasicas.nome;

  const resultado = calculadorMacros(
    state.infoBasicas.peso,
    state.infoBasicas.altura,
    state.infoBasicas.idade,
    state.infoBasicas.sexo,
    state.nutricaoAnswers.frequencia,
    state.nutricaoAnswers.objetivo
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
            Sua recomendação, {nome}
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

export default NutricaoResult;
