import RowForm from "./RowForm";
import { useForm } from "react-hook-form";

function RowFormList() {
  const {register, handleSubmit} = useForm()
  return (
    <form onSubmit={handleSubmit}>
      <RowForm label="Idade" type="text" {...register('idade')} />
      <RowForm label="Sexo" type="radio" options={["Masculino", "Feminino"]}  {...register('sexo')} />
      <RowForm label="Peso (kg)" type="text"  {...register('peso')}/>
      <RowForm label="Altura (cm)" type="text"  {...register('altura')}/>
    </form>
  );
}

export default RowFormList;
