import Button from "../../ui/Button";
import Title from "../../ui/Title";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/FormContext";
import toast from "react-hot-toast";
import { useEffect } from "react";

const questions = [
  {
    index: 1,
    title: "Você se considera",
    options: [
      "Sedentário",
      "Levemente ativo",
      "Moderadamente ativo",
      "Muito ativo ou atleta",
    ],
  },

  {
    index: 2,
    title: "Sua alimentação inclui",
    options: [
      "Alimentação saudável, se preocupando com o consumo de açúcar, gordura, etc.",
      "Não tenho uma alimentação tão nutritiva, mas não como muita besteira.",
      "Consumo muito açúcar e gordura no meu dia a dia.",
    ],
  },
];

function NutricaoSelect() {
  const { state, dispatch } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.pageIndex > questions.length) {
      navigate("/recomendacao-nutricional/formulario/percentual-gordura");
    }
  }, [state.pageIndex, navigate]);

  function handleNextPage() {
    const answer = state.nutricaoAnswers[state.pageIndex];
    if (!answer) {
      toast.error(
        "Por favor, preencha todas as informações antes de continuar."
      );
      return;
    }

    dispatch({ type: "NEXT_PAGE" });
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
      state.nutricaoAnswers[question.index] === option
        ? "bg-brand-bgDarkGray text-white border-black"
        : "border-black/40 hover:bg-brand-bgDarkGray hover:text-white hover:border-black"
    }`}
                  onClick={() =>
                    dispatch({
                      type: "SET_NUTRICAO_ANSWER",
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

export default NutricaoSelect;
