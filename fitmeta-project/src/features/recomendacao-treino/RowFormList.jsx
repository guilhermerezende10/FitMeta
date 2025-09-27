import RowForm from "./RowForm";

function RowFormList() {
  return (
    <>
      <RowForm label="Idade" type="text" />
      <RowForm label="Sexo" type="radio" options={["Masculino", "Feminino"]} />
      <RowForm label="Peso (kg)" type="text" />
      <RowForm label="Altura (cm)" type="text" />
    </>
  );
}

export default RowFormList;
