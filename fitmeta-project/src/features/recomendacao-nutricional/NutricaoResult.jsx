import { useForm } from "../../context/FormContext";
import calculadorMacros from "./calculadorMacros";

function NutricaoResult() {
  const { state, dispatch } = useForm();

  const resultado = calculadorMacros(
  state.infoBasicas.peso,
  state.infoBasicas.altura,
  state.infoBasicas.idade,
  state.infoBasicas.sexo,
  state.nutricaoAnswers.frequencia,
  state.nutricaoAnswers.objetivo
);


  console.log(resultado);
  return <div>Resultado</div>;
}

export default NutricaoResult;
