import Button from "../../ui/Button";
import Container from "../../ui/Container";
import Title from "../../ui/Title";
import RowFormList from "../recomendacao-treino/RowFormList";
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
      toast.error(
        "Por favor, preencha todas as informações antes de continuar."
      );
    }
  }

  return (
    <Container>

      {/* Título responsivo */}
      <div className="flex justify-center w-full mb-7 md:mt-5 lg:mt-5 xl:mt-5">
        <div className="
          bg-brand-bgDarkGray 
          py-3 md:py-5
          w-full max-w-xs md:max-w-lg lg:max-w-2xl
          rounded-full shadow-md text-center
        ">
          <Title className="text-lg text-white font-semibold">
            Informações Básicas
          </Title>
        </div>
      </div>

      {/* Campos responsivos */}
      <div
        className="
          w-full 
          max-w-md md:max-w-xl lg:max-w-3xl
          mx-auto px-4 
          flex flex-col gap-6
        "
      >
        <RowFormList />
      </div>

      {/* Botão responsivo */}
      <div className="w-full flex justify-center md:mt-10">
        <Button
          className={`
            mt-5 w-full py-3 md:py-5
            max-w-xs md:max-w-md lg:max-w-lg
            rounded-full text-white text-base font-medium 
            shadow-lg transition text-center
            ${
              isFormValid
                ? "bg-gradient-to-r from-brand-button1Violet to-brand-button2Purple hover:opacity-90"
                : "bg-gray-400 cursor-not-allowed"
            }
          `}
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
