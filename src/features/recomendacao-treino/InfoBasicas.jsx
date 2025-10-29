import Button from "../../ui/Button";
import Container from "../../ui/Container";
import Title from "../../ui/Title";
import RowFormList from "./RowFormList";
import { useForm } from "../../context/FormContext";
import { toast } from "react-hot-toast";

function InfoBasicas() {
  const { state } = useForm();
  const { nome, idade, sexo, peso, altura } = state.infoBasicas;

  const isFormValid =
    nome?.trim() &&
    idade?.trim() &&
    sexo?.trim() &&
    peso?.trim() &&
    altura?.trim();

  function handleNext() {
    if (!isFormValid) {
      toast.error("Por favor, preencha todas as informações antes de continuar.");
    }
  }

  return (
    <Container className="relative flex flex-col items-center justify-start pt-20 pb-32">
      {/* Título centralizado e adaptável */}
      <div className="bg-brand-bgDarkGray absolute top-24 sm:top-32 left-1/2 -translate-x-1/2 px-8 sm:px-14 py-3 sm:py-4 rounded-full shadow-md w-[85%] max-w-md text-center">
        <Title className="text-base sm:text-xl text-white font-semibold">
          Informações Básicas
        </Title>
      </div>

      {/* Formulário */}
      <div className="mt-24 w-full max-w-md px-4 sm:px-6">
        <RowFormList />
      </div>

      {/* Botão fixado mais abaixo, centralizado */}
      <div className="mt-10 w-full flex justify-center">
        <Button
          className={`w-full sm:w-auto px-8 sm:px-16 py-4 sm:py-5 rounded-full text-white text-base font-medium shadow-lg transition ${
            isFormValid
              ? "bg-gradient-to-r from-brand-button1Violet to-brand-button2Purple hover:opacity-90"
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
