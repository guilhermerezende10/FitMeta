
import Logo from "../ui/Logo";
import Title from "../ui/Title";
import bgEstudos from "../data/images/bg-estudos.jpg";
import EstudosCientificosCategorias from "../features/estudos-cientificos/EstudosCientificosCategorias";


function EstudosCientificos() {
  return (
    
    <div className="relative flex flex-col items-center justify-start min-h-screen overflow-auto">
      {/* Imagem de fundo */}
      <img
        src={bgEstudos}
        alt="Imagem de fundo dos estudos"
        className="fixed inset-0 w-full h-full object-cover  "
      />
        <div className=" bg-brand-bgDarkGray/90 h-full w-full object-cover fixed"></div>
      {/* Logo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <Logo />
      </div>

      {/* Conteúdo */}
      <div className="absolute mt-32 w-full flex flex-col items-center z-10">
        <Title className="text-center text-3xl font-extrabold mb-5 text-white">
          Estudos Científicos
        </Title>

        <EstudosCientificosCategorias />
      </div>
    </div>
  );
}

export default EstudosCientificos;
