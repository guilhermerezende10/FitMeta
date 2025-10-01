import { useState } from "react";
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

  if (goToResult) {
    navigate("/recomendacao-treino/formulario/resultado");
  }

  function handleNextPage() {
    if (state.pageIndex === questions.length) {
      setGoToResult(true);
    } else dispatch({ type: "NEXT_PAGE" });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Pergunta atual */}
      {questions
        .filter((q) => q.index === state.pageIndex)
        .map((question) => (
          <div
            key={question.index}
            className="mt-10 text-center justify-center"
          >
            <Title className="bg-[#192126] mt-40 relative py-4 px-14 text-white text-2xl bottom-56 rounded-full shadow-md w-full">
              {question.title}
            </Title>

            <div className="mt-6 flex flex-col gap-3">
              {question.options.map((option) => (
                <button
                  key={option}
                  className="py-3 my-2 rounded-full border-2 border-black/40 p-4-full relative text-lg bottom-24 mb-0 hover:bg-[#192126] hover:text-white transition hover:border-black first:mt-0 last:mb-0"
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
      <div className="top-10 mt-16 relative">
        <Button
          className="relative bottom-20 px-36 py-6 rounded-full text-white text-base font-regular shadow-lg transition bg-gradient-to-r from-[#3F2B57] to-[#2B1546] hover:opacity-90"
          onClick={handleNextPage}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}

export default TreinoSelect;
