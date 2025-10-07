import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import Title from "../../ui/Title";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/FormContext";

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
  const [goToResult, setGoToResult] = useState(false);
  const { state, dispatch } = useForm();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (goToResult) {
        navigate("/recomendacao-treino/formulario/resultado");
      }
    },
    [goToResult, navigate]
  );

  function handleNextPage() {
    const answer = state.treinoAnswers[state.pageIndex];
    if (!answer) {
      alert("Por favor, escolha uma opção antes de continuar!");
      return;
    }

    if (state.pageIndex === questions.length) {
      setGoToResult(true);
    } else {
      dispatch({ type: "NEXT_PAGE" });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Pergunta atual */}
      {questions
        .filter((q) => q.index === state.pageIndex)
        .map((question) => (
          <div key={question.index} className=" top-9 text-center">
            <div className="bg-brand-bgDarkGray absolute top-36 left-1/2 -translate-x-1/2 py-4 px-14 rounded-full shadow-md text-center w-4/5 max-w-xl">
              <Title className="text-white text-xl rounded-full shadow-md">
                {question.title}
              </Title>
            </div>

            <div className="relative mt-12 mb-3 flex flex-col gap-3 left-1/2 -translate-x-1/2 w">
              {question.options.map((option) => (
                <button
                  key={option}
                  className={`w-80 py-4 my-2 rounded-full border-2 text-lg last:mb-20 text-center whitespace-nowrap
    ${
      state.treinoAnswers[question.index] === option
        ? "bg-brand-bgDarkGray text-white border-black"
        : "border-black/40 hover:bg-brand-bgDarkGray hover:text-white hover:border-black"
    }`}
                  onClick={() =>
                    dispatch({
                      type: "SET_TREINO_ANSWER",
                      payload: { option, questionIndex: question.index },
                    })
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}

      {/* Botão Próximo */}
      <div className="absolute bottom-48  left-1/2 -translate-x-1/2 font-bold">
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
