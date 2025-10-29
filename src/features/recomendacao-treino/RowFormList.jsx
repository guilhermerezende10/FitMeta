import { useForm } from "../../context/FormContext";
import RowForm from "./RowForm";

function RowFormList() {
  const { state, dispatch } = useForm();

  function handleChange(e) {
    dispatch({
      type: "SET_INFO",
      payload: { field: e.target.name, value: e.target.value },
    });
  }

  const info = state.infoBasicas; // ✅ facilita o acesso

  return (
    <form className="w-full max-w-md mx-auto px-4 sm:px-6 flex flex-col gap-4">
      <RowForm
        name="nome"
        label="Nome"
        type="text"
        value={info.nome}
        onChange={handleChange}
      />
      <RowForm
        name="idade"
        label="Idade"
        type="text"
        value={info.idade}
        onChange={handleChange}
      />
      <RowForm
        name="sexo"
        label="Sexo"
        type="radio"
        options={["Masculino", "Feminino"]}
        value={info.sexo} // ✅ agora sim
        onChange={handleChange}
      />
      <RowForm
        name="peso"
        label="Peso (kg)"
        type="text"
        value={info.peso}
        onChange={handleChange}
      />
      <RowForm
        name="altura"
        label="Altura (cm)"
        type="text"
        value={info.altura}
        onChange={handleChange}
      />
    </form>
  );
}

export default RowFormList;
