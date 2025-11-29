import { estudosVolume } from "../../data/data-estudos-cientificos";
import Estudo from "../../ui/Estudo";
import Title from "../../ui/Title";
import Logo from "../../ui/Logo";
import bgEstudos from "../../data/images/bg-estudos.jpg";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function EstudosVolume() {
  const navigate = useNavigate();

  function handleBackPage() {
    navigate(-1);
  }

  return (
    <div
      className="
        relative flex flex-col items-center justify-start 
        min-h-real 
        overflow-auto 
        pb-28
        md:pb-10
        lg:pl-56
      "
    >
      {/* Imagem de fundo */}
      <img
        src={bgEstudos}
        alt="Imagem de fundo dos estudos"
        className="fixed inset-0 w-full h-full object-cover"
      />

      {/* Botão voltar */}
      <div className="absolute top-14 left-6 z-10">
        <button
          onClick={handleBackPage}
          className="text-3xl text-white flex items-center justify-center"
        >
          <IoIosArrowBack />
        </button>
      </div>

      {/* Escurecimento */}
      <div className="fixed inset-0 bg-black/60"></div>

      {/* Logo */}
      <div className="block md:hidden absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <Logo />
      </div>

      {/* Conteúdo */}
      <div className="absolute mt-10 w-full flex flex-col items-center z-10 px-4">
        <Title
          className="
            text-white text-center font-extrabold
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
            mb-10
          "
        >
          Estudos de Volume de Treino
        </Title>

        {estudosVolume.map((estudo) => (
          <div key={estudo.title} className="last:mb-14">
            <Estudo estudo={estudo} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EstudosVolume;
