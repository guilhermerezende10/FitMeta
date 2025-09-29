import RowForm from "./RowForm";
// import { useForm } from "react-hook-form";

function RowFormList() {
  // const {register, handleSubmit} = useForm()
  return (
    <form>
      <RowForm label="Idade" type="text" />
      <RowForm label="Sexo" type="radio" options={["Masculino", "Feminino"]} />
      <RowForm label="Peso (kg)" type="text" />
      <RowForm label="Altura (cm)" type="text" />
    </form>
  );
}

export default RowFormList;
