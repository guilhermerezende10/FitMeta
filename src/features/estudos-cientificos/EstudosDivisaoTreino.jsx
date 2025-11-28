import { estudosDivisaoTreino } from "../../data/data-estudos-cientificos";
import Estudo from "../../ui/Estudo";
import Title from "../../ui/Title";
import Logo from "../../ui/Logo";
import bgEstudos from "../../data/images/bg-estudos.jpg";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function EstudosDivisaoTreino() {
  const navigate = useNavigate();

  function handleBackPage() {
    navigate(-1);
  }
  return (
    <>
      <div className="relative flex flex-col items-center justify-start min-h-screen overflow-auto">
        {/* Imagem de fundo */}
        <img
          src={bgEstudos}
          alt="Imagem de fundo dos estudos"
          className="fixed inset-0 w-full h-full object-cover  "
        />

        <div className="absolute top-14 left-6 z-10">
          <button
            onClick={handleBackPage}
            className="text-3xl text-white flex items-center justify-center"
          >
            <IoIosArrowBack />
          </button>
        </div>
        <div className=" bg-black/80 h-full w-full object-cover fixed"></div>

        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
          <Logo />
        </div>

        {/* Conteúdo */}
        <div className="absolute mt-32 w-full flex flex-col items-center z-10">
          <Title className="text-center text-2xl font-extrabold mb-5 text-white px-6">
            Estudos de Divisão de Treino
          </Title>
          {estudosDivisaoTreino.map((estudo) => (
            <div key={estudo.title} className="last:mb-14">
              <Estudo estudo={estudo} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default EstudosDivisaoTreino;
