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
            Sua recomendação, {nome}
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

export default NutricaoResult;
