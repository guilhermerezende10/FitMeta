import { useForm } from "../../context/FormContext";

function NutricaoResult() {
  const { state, dispatch } = useForm();

  const { altura, peso, idade, sexo } = state.infoBasicas;

  const { objetivo, treinosSemana } = state.nutricaoAnswers;

  console.log(state);
  return <div>Resultado</div>;
}

export default NutricaoResult;
