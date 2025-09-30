import { useForm } from "../../context/FormContext";
import RowForm from "./RowForm";

function RowFormList() {
  const { state, dispatch } = useForm();
  function handleChange(e) {
    console.log(state)
    dispatch({
      type: "SET_INFO",
      payload: { field: e.target.name, value: e.target.value },
    });
  }

  return (
    <form>
      <RowForm
        name="nome"
        label="Nome"
        type="text"
        value={state.nome}
        onChange={(e) => handleChange(e)}
      />
      <RowForm
        name="idade"
        label="Idade"
        type="text"
        value={state.idade}
        onChange={(e) => handleChange(e)}
      />
      <RowForm
        name="sexo"
        label="Sexo"
        type="radio"
        options={["Masculino", "Feminino"]}
        value={state.sexo}
        onChange={(e) => handleChange(e)}
      />
      <RowForm
        name="peso"
        label="Peso (kg)"
        type="text"
        value={state.peso}
        onChange={(e) => handleChange(e)}
      />
      <RowForm
        name="altura"
        label="Altura (cm)"
        type="text"
        value={state.altura}
        onChange={(e) => handleChange(e)}
      />
    </form>
  );
}

export default RowFormList;
