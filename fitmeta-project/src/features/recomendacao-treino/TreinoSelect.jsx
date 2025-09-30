import { useState } from "react";
import Button from "../../ui/Button";
import Title from "../../ui/Title";
import Logo from "../../ui/Logo";
import logoDarkblue from "../../data/logo/logo-darkblue.png";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";

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
  const navigate = useNavigate();
  function handleNextPage() {
    if (pageIndex < questions.length) {
      setPageIndex(pageIndex + 1);
    } else {
      navigate("/home");
    }
  }

  const [pageIndex, setPageIndex] = useState(1);
  return (
    <div>
      <Logo src={logoDarkblue} />
      {questions.map(
        (question) =>
          question.index === pageIndex && (
            <>
              <Title className="text-black">{question.title}</Title>
              <Container>
                {question.options.map((option) => (
                  <div key={option}>{option}</div>
                ))}
              </Container>
            </>
          )
      )}

      <div className="top-10 mt-16 relative">
        <Button
          className="px-36 py-6 rounded-full text-white text-base font-regular shadow-lg transition bg-gradient-to-r from-[#3F2B57] to-[#2B1546] hover:opacity-90-full"
          onClick={handleNextPage}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}

export default TreinoSelect;
