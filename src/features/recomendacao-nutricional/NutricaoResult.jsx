import { useForm } from "../../context/FormContext";
import Title from "../../ui/Title";
import calculadorMacros from "./calculadorMacros";
import NutricaoResultTable from "./NutricaoResultTable";

function NutricaoResult() {
  const { state } = useForm();

  const resultado = calculadorMacros(
  state.infoBasicas.peso,
  state.infoBasicas.altura,
  state.infoBasicas.idade,
  state.infoBasicas.sexo,
  state.nutricaoAnswers.frequencia,
  state.nutricaoAnswers.objetivo
);


  return <div>
    <Title className="text-2xl font-extrabold absolute top-32 text-white text-center bg-graydark-700 rounded-full py-3 w-4/5 left-1/2 e -translate-x-1/2 mb-2 ">Resultado</Title>
    <NutricaoResultTable resultado={resultado} /> 
  </div>;
}

export default NutricaoResult;
