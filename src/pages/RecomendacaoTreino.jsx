import Container from "../ui/Container";
import Img from "../ui/Img";
import Logo from "../ui/Logo";
import Title from "../ui/Title";
import Button from "../ui/Button";
import davidLaid from "../data/images/david-recomendacao-treino.jpg";
import davidLaidPc from "../data/images/david-recomendacao-treinopc.jpg";

function RecomendacaoTreino() {
  return (
    <Container className="relative min-h-real w-screen overflow-hidden bg-brand-bgDarkGray">
      {/* Imagem com fade */}
      <div className="relative h-[60vh] md:h-[60vh] lg:h-[65vh] w-full overflow-hidden">


        {/* Mobile */}
        <div className="block sm:hidden">
          <Img src={davidLaid} alt="David Laid" />
        </div>

        {/* Desktop */}
        <div className="hidden sm:block">
          <Img src={davidLaidPc} alt="David Laid (desktop)" />
        </div>

        {/* Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bgDarkGray via-brand-bgDarkGray/20 to-transparent" />
      </div>

      {/* Conteúdo */}
      <Container className="relative -mt-24 sm:-mt-28 md:-mt-32 lg:-mt-36 pb-20 sm:pb-24 md:pb-28 lg:pb-32 px-4 sm:px-6 md:px-8 lg:px-10 text-white text-center flex flex-col items-center w-full max-w-screen-xl mx-auto">
        <Logo />

        <Title className="text-3xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-white">
          Monte seu treino
        </Title>

        <Button
          page="/recomendacao-treino/formulario/iniciar"
          className="w-full max-w-xs px-12 py-4 rounded-full text-white text-base font-medium shadow-lg transition bg-gradient-to-r from-brand-button1Violet to-brand-button2Purple hover:opacity-90 hover:scale-105 transform"
        >
          Começar
        </Button>
      </Container>
    </Container>
  );
}

export default RecomendacaoTreino;
