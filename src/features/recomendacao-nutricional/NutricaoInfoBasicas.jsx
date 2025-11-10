import Button from "../../ui/Button";
import Container from "../../ui/Container";
import Title from "../../ui/Title";
import RowFormList from "../recomendacao-treino/RowFormList";
import { useForm } from "../../context/FormContext";
import { toast } from "react-hot-toast";

function InfoBasicas() {
  const { state } = useForm();

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
      toast.error(
        "Por favor, preencha todas as informações antes de continuar."
      );
    }
  }

  return (
    <Container>
      <div className="flex justify-center w-full mb-7">
        <div className="bg-brand-bgDarkGray py-3 w-full max-w-xs rounded-full shadow-md text-center">
          <Title className="text-lg text-white font-semibold ">
            Informações Básicas
          </Title>
        </div>
      </div>

      {/* Campos */}
      <div className="w-full max-w-md mx-auto px-4 flex flex-col gap-3">
        <RowFormList />
      </div>

      <div className="w-full flex justify-center ">
        <Button
          className={`mt-5 w-full max-w-xs py-3 rounded-full text-white text-base font-medium shadow-lg transition text-center ${
            isFormValid
              ? "bg-gradient-to-r from-brand-button1Violet to-brand-button2Purple hover:opacity-90"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          page={isFormValid && "/recomendacao-nutricional/formulario/questions"}
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
