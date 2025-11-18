import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import Title from "../../ui/Title";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/FormContext";
import toast from "react-hot-toast";

const questions = [
  {
    index: 1,
    title: "Frequência de Treino",
    options: [
      "Posso treinar 3 vezes por semana",
      "Posso treinar 4 vezes por semana",
      "Posso treinar 5 vezes por semana",
    ],
  },
  {
    index: 2,
    title: "Duração de Treino",
    options: [
      "Até 45 minutos",
      "Até 60 minutos",
      "Até 90 minutos",
      "Mais de 90 minutos",
    ],
  },
  {
    index: 3,
    title: "Experiência com Treinos",
    options: ["Iniciante", "Intermediário", "Avançado"],
  },
];

function TreinoSelect() {
  const { state, dispatch } = useForm();
  const navigate = useNavigate();
  const [goToResult, setGoToResult] = useState(false);

  const [selectedOption, setSelectedOption] = useState(
    state.treinoAnswers[state.pageIndex] || ""
  );

  useEffect(() => {
    if (goToResult) {
      navigate("/recomendacao-treino/formulario/resultado");
    }
  }, [goToResult, navigate]);

  const currentQuestion = questions.find((q) => q.index === state.pageIndex);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    dispatch({
      type: "SET_TREINO_ANSWER",
      payload: { questionIndex: currentQuestion.index, option },
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
      const nextQuestion = questions.find(
        (q) => q.index === state.pageIndex + 1
      );
      setSelectedOption(state.treinoAnswers[nextQuestion?.index] || "");
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
                      selectedOption === option ||
                      state.treinoAnswers[currentQuestion.index] === option
                        ? "  border-gray-700"
                        : " border-gray-200"
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Botão Próximo */}
            <div className="mt-8 flex justify-end flex-shrink-0 pb-28 text-center">
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

export default TreinoSelect;
