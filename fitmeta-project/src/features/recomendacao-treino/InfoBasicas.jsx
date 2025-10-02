import Button from "../../ui/Button";
import Container from "../../ui/Container";
import Title from "../../ui/Title";
import RowFormList from "./RowFormList";
import { useForm } from "../../context/FormContext";
import { useNavigate } from "react-router-dom";

function InfoBasicas() {
  const { state } = useForm();
  const navigate = useNavigate();

  const { nome, idade, sexo, peso, altura } = state.infoBasicas;

  // checa se todos os campos estão preenchidos
  const isFormValid =
    nome?.trim() &&
    idade?.trim() &&
    sexo?.trim() &&
    peso?.trim() &&
    altura?.trim();

  function handleNext() {
    if (!isFormValid) {
      alert("Por favor, preencha todas as informações antes de continuar."); // Vamos criar um componente DisplayAlert que vai falar isso na tela
    }
  }

  return (
    <Container>
      <div className="bg-[#192126] relative bottom-24 py-4 px-14 rounded-full shadow-md w-full max-w-xl">
        <Title className="text-2xl font-bold text-white">
          Informações Básicas
        </Title>
      </div>

      <RowFormList />

      <div className="top-10 mt-16 relative">
        <Button
          className={`px-36 py-6 rounded-full text-white text-base font-regular shadow-lg transition ${
            isFormValid
              ? "bg-gradient-to-r from-[#3F2B57] to-[#2B1546] hover:opacity-90"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          page={isFormValid && "/recomendacao-treino/formulario/questions"}
          onClick={handleNext}
          disabled={!isFormValid}
        >
          Próximo
        </Button>
      </div>
    </Container>
  );
}

export default InfoBasicas;
