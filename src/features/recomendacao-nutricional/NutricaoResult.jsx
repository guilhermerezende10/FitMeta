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
    <div className="flex flex-col items-center justify-start w-full py-6 sm:py-8">
      {/* Título */}
      <Title
        className="
          text-xl sm:text-xl md:text-2xl font-bold text-white text-center
          bg-graydark-700 rounded-full shadow-md
          py-3 sm:py-3 px-6 sm:px-8
          w-[90%] sm:w-[70%] md:w-[55%] lg:w-[45%]
          max-w-xl
        "
      >
        {`Recomendação para ${nome}`}
      </Title>

      {/* Tabela */}
      <div className="mt-8 sm:mt-10 w-full flex justify-center">
        <NutricaoResultTable resultado={resultado} />
      </div>
    </div>
  );
}

export default NutricaoResult;
