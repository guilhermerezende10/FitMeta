import { useState } from "react";
import Button from "../../ui/Button";
import Title from "../../ui/Title";
import Logo from "../../ui/Logo";
import logoDarkblue from "../../data/logo/logo-darkblue.png";
import { Navigate } from "react-router-dom";

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
  const [pageIndex, setPageIndex] = useState(1);
  const [goResult, setGoResult] = useState(false);

  function handleNextPage() {
    if (pageIndex === questions.length) {
      console.log("indo para home...");
      setGoResult(true);
    } else {
      setPageIndex(pageIndex + 1);
    }
  }
  if (goResult) {
    return <Navigate to="/recomendacao-treino/formulario/resultado" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Logo src={logoDarkblue} />

      {questions.map(
        (question) =>
          question.index === pageIndex && (
            <div key={question.index} className="mt-10 text-center">
              <Title className="text-black">{question.title}</Title>

              <div className="mt-6 flex flex-col gap-3">
                {question.options.map((option) => (
                  <button
                    key={option}
                    className="px-6 py-3 border rounded-lg hover:bg-gray-100 transition"
                    onClick={() => console.log(`Escolheu: ${option}`)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )
      )}

      <div className="top-10 mt-16 relative">
        <Button
          className="px-36 py-6 rounded-full text-white text-base font-regular shadow-lg transition bg-gradient-to-r from-[#3F2B57] to-[#2B1546] hover:opacity-90"
          onClick={handleNextPage}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}

export default TreinoSelect;
