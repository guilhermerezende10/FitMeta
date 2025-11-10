import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import Title from "../../ui/Title";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/FormContext";
import toast from "react-hot-toast";

const questions = [
  {
    index: 1,
    title: "Quantas vezes você vai a academia na semana?",
    label: "frequencia",
    options: ["1x por semana", "2 a 3x por semana", "4 a 5x por semana"],
  },
  {
    index: 2,
    title: "Qual é o seu objetivo?",
    label: "objetivo",
    options: ["Ganhar peso", "Manter peso", "Perder peso"],
  },
];

function NutricaoSelect() {
  const { state, dispatch } = useForm();
  const navigate = useNavigate();
  const [goToResult, setGoToResult] = useState(false);

  // Estado local para a resposta atual
  const [selectedOption, setSelectedOption] = useState(
    state.nutricaoAnswers[questions[state.pageIndex - 1]?.label] || ""
  );

  useEffect(() => {
    if (goToResult) {
      navigate("/recomendacao-nutricional/formulario/resultado");
    }
  }, [goToResult, navigate]);

  const currentQuestion = questions.find((q) => q.index === state.pageIndex);

  const handleOptionClick = (option) => {
    // Armazena a opção original no estado local
    setSelectedOption(option);

    // Transforma o valor apenas para o dispatch
    let value = option;

    if (currentQuestion.label === "frequencia") {
      if (option.includes("1x")) value = 1;
      else if (option.includes("2 a 3")) value = 3;
      else if (option.includes("4 a 5")) value = 5;
    }
    if (currentQuestion.label === "objetivo") {
      if (option.toLowerCase().includes("ganhar")) value = "ganhar";
      else if (option.toLowerCase().includes("manter")) value = "manter";
      else if (option.toLowerCase().includes("perder")) value = "perder";
    }

    dispatch({
      type: "SET_NUTRICAO_ANSWER",
      payload: { label: currentQuestion.label, option: value },
    });
  };

  const handleNextPage = () => {
    if (!selectedOption) {
      toast.error(
        "Por favor, preencha todas as informações antes de continuar."
      );
      return;
    }

    if (state.pageIndex === questions.length) {
      setGoToResult(true);
    } else {
      dispatch({ type: "NEXT_PAGE" });
      // Atualiza o selectedOption para a próxima pergunta
      const nextQuestion = questions.find(
        (q) => q.index === state.pageIndex + 1
      );
      setSelectedOption(state.nutricaoAnswers[nextQuestion?.label] || "");
    }
  };

  return (
    <div className="h-real flex flex-col bg-white">
      {/* Container scrollável */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-real flex flex-col px-4 sm:px-6 py-6">
          <div className="max-w-lg mx-auto w-full flex flex-col justify-between min-h-full">
            {/* Título da pergunta */}
            <div className="mb-8 sm:mb-10 flex-shrink-0">
              <div className="bg-brand-bgDarkGray py-4 px-6 sm:px-10 rounded-full shadow-lg">
                <Title className="text-white text-lg sm:text-xl font-semibold text-center">
                  {currentQuestion?.title}
                </Title>
              </div>
            </div>

            {/* Opções de resposta */}
            <div className="flex-1 flex flex-col justify-center py-4">
              <div className="flex flex-col gap-4 sm:gap-5">
                {currentQuestion?.options.map((option) => (
                  <button
                    key={option}
                    className={`w-full py-4 px-6 rounded-full border-2 text-base sm:text-lg font-medium text-center transition-all duration-300 shadow-sm hover:shadow-md 
    ${
      selectedOption === option
        ? "  border-gray-600"
        : " text-gray-800 border-gray-300"
    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Botão Próximo */}
            <div className="mt-8 flex-shrink-0 pb-28">
              <Button
                className="w-full py-5 px-32 sm:py-5 rounded-full text-white text-base sm:text-lg font-semibold shadow-lg transition-all duration-300 bg-gradient-to-r from-brand-button1Violet to-brand-button2Purple hover:opacity-90 active:scale-95"
                onClick={handleNextPage}
              >
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutricaoSelect;
