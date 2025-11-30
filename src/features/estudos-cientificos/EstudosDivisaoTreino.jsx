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
    <div className="absolute w-full flex flex-col items-center z-10 px-4 lg:pl-56">
      
      {/* Fundo */}
      <img
        src={bgEstudos}
        alt="Imagem de fundo"
        className="fixed inset-0 w-full h-full object-cover"
      />

      {/* Botão voltar */}
      <div className="absolute top-14 left-6 z-20 lg:left-72 ">
        <button
          onClick={handleBackPage}
          className="text-3xl lg:text-4xl text-white flex items-center justify-center"
        >
          <IoIosArrowBack />
        </button>
      </div>

      {/* Escurecimento */}
      <div className="fixed inset-0 bg-black/60"></div>

      {/* Conteúdo */}
      <div className="relative mt-10 w-full flex flex-col items-center z-10 px-4">

        {/* Logo mobile */}
        <div className="block md:hidden mb-6 mt-4">
          <Logo className="h-20 w-20 mx-auto" />
        </div>

        {/* Título */}
        <Title
          className="
            text-white text-center font-extrabold
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
            mb-10
          "
        >
          Estudos de Divisão de Treino
        </Title>

        {/* Grid */}
        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            gap-6 
            w-full 
            max-w-6xl 
            px-2
          "
        >
          {estudosDivisaoTreino.map((estudo) => (
            <div
              key={estudo.title}
              className="last:mb-14 transform scale-100 md:scale-95"
            >
              <Estudo estudo={estudo} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default EstudosDivisaoTreino;
