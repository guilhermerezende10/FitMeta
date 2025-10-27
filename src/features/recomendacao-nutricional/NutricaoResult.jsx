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


  console.log(resultado);
  return <div>
    <Title className="text-3xl font-extrabold mb-2 text-black text-center">Resultado</Title>
    <NutricaoResultTable resultado={resultado} /> 
  </div>;
}

export default NutricaoResult;
