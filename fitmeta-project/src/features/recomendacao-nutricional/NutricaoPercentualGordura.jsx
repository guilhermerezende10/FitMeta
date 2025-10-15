import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useForm } from "../../context/FormContext";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Title from "../../ui/Title";

function NutricaoPercentualGordura() {
  const { state, dispatch } = useForm();
  const [answerRange, setAnswerRange] = useState(0);
    const [goToResult, setGoToResult] = useState(false);
  const navigate = useNavigate();

   useEffect(() => {
      if (goToResult) {
        navigate("/recomendacao-nutricional/formulario/resultado");
      }
    }, [goToResult, navigate]);

  function handleNextPageAndState() {
    if (!answerRange) {
      toast.error(
        "Por favor, preencha todas as informações antes de continuar."
      );
      return;
    }

    dispatch({
      type: "SET_NUTRICAO_ANSWER",
      payload: { option: answerRange, questionIndex: "percentualGordura" },
    });
    setGoToResult(true);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {" "}
      <div className="top-9 text-center">
        <div className="bg-brand-bgDarkGray absolute top-36 left-1/2 -translate-x-1/2 py-4 px-14 rounded-full shadow-md text-center w-4/5 max-w-xl">
          <Title className="text-white text-xl rounded-full shadow-md">
            Qual seu percentual de gordura corporal?
          </Title>
        </div>
        <div className="absolute bottom-48  left-1/2 -translate-x-1/2 font-bold">
          <input
            type="range"
            id="gordura"
            name="gordura"
            value={answerRange}
            min="5"
            max="40"
            onChange={(e) => setAnswerRange(e.target.value)}
          ></input>
          {answerRange}
        </div>
        <Button
          className="px-36 py-6 rounded-full text-white text-base font-regular shadow-lg transition bg-gradient-to-r from-brand-button1Violet to-brand-button2Purple hover:opacity-90"
          onClick={handleNextPageAndState}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}

export default NutricaoPercentualGordura;
