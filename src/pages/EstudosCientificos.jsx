import Logo from "../ui/Logo";
import Title from "../ui/Title";
import bgEstudos from "../data/images/bg-estudos.jpg";
import EstudosCientificosCategorias from "../features/estudos-cientificos/EstudosCientificosCategorias";

function EstudosCientificos() {
  return (
    <div
      className="
        relative flex flex-col items-center justify-start 
        min-h-real 
        overflow-auto
        lg:pl-56 
        pb-28          /* 🔵 evita cortar no MOBILE */
        md:pb-10       /* tablet e pc normal */
      "
    >
      {/* IMAGEM DE FUNDO */}
      <img
        src={bgEstudos}
        alt="Imagem de fundo dos estudos"
        className="fixed inset-0 w-full h-full object-cover"
      />

      {/* CAMADA ESCURA */}
      <div className="fixed inset-0 bg-brand-bgDarkGray/90"></div>

      {/* LOGO — SOMENTE MOBILE */}

      {/* CONTEÚDO */}
      <div className="absolute mt-4 lg:mt-16 w-full flex flex-col items-center z-10 px-4">
      <div className="block lg:hidden mb-6 mt-4">
          <Logo className="h-20 w-20 mx-auto" />
        </div>

        {/* TÍTULO RESPONSIVO IGUAL AO RECOMENDADO */}
        <Title
          className="
            text-white font-bold text-center

            mb-4         /* mobile */
            md:mb-6
            lg:mb-8
            xl:mb-10

            text-2xl     /* mobile */
            sm:text-3xl
            md:text-4xl
            lg:text-5xl
            xl:text-6xl  /* cresce bastante no PC */
          "
        >
          Estudos Científicos
        </Title>

        <EstudosCientificosCategorias />
      </div>
    </div>
  );
}

export default EstudosCientificos;
