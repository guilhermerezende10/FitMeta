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

  // Estado local para a pergunta atual
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
      toast.error("Por favor, preencha todas as informações antes de continuar.");
      return;
    }

    if (state.pageIndex === questions.length) {
      setGoToResult(true);
    } else {
      dispatch({ type: "NEXT_PAGE" });
      // Atualiza o selectedOption para a próxima pergunta
      const nextQuestion = questions.find((q) => q.index === state.pageIndex + 1);
      setSelectedOption(state.treinoAnswers[nextQuestion?.index] || "");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-real">
      <div className=" top-9 text-center">
        <div className="bg-brand-bgDarkGray absolute top-36 left-1/2 -translate-x-1/2 py-4 px-14 rounded-full shadow-md text-center w-4/5 max-w-xl">
          <Title className="text-white text-xl rounded-full shadow-md">
            {currentQuestion?.title}
          </Title>
        </div>

        <div className="relative mt-12 mb-3 flex flex-col gap-3 left-1/2 -translate-x-1/2 w">
          {currentQuestion?.options.map((option) => (
            <button
              key={option}
              className={`w-80 py-4 my-2 rounded-full border-2 text-lg last:mb-20 text-center whitespace-nowrap
                ${
                  selectedOption === option ||
                  state.treinoAnswers[currentQuestion.index] === option
                    ? "bg-brand-bgDarkGray text-white border-black"
                    : "border-black/40 hover:bg-brand-bgDarkGray hover:text-white hover:border-black"
                }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-48 left-1/2 -translate-x-1/2 font-bold">
        <Button
          className="px-36 py-6 rounded-full text-white text-base font-regular shadow-lg transition bg-gradient-to-r from-brand-button1Violet to-brand-button2Purple hover:opacity-90"
          onClick={handleNextPage}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}

export default TreinoSelect;
