import Container from "../ui/Container";
import Img from "../ui/Img";
import Logo from "../ui/Logo";
import Title from "../ui/Title";
import Button from "../ui/Button";
import davidLaid from "../data/images/david-recomendacao-treino.jpg";
import davidLaidPc from "../data/images/david-recomendacao-treinopc.jpg";

function RecomendacaoTreino() {
  return (
    <Container className="relative min-h-real w-screen bg-brand-bgDarkGray overflow-hidden lg:pl-56">

      {/* Imagem */}
      <div className="relative h-[55vh] md:h-[60vh] lg:h-[65vh] w-full overflow-hidden">

        {/* Mobile */}
        <div className="block lg:hidden">
          <Img src={davidLaid} alt="David Laid" />
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <Img src={davidLaidPc} alt="David Laid (desktop)" />
        </div>

        {/* Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bgDarkGray via-brand-bgDarkGray/20 to-transparent" />
      </div>

      {/* Conteúdo – mesma estrutura da Nutrição */}
      <Container
        className="
          relative 
          -mt-24 sm:-mt-28 md:-mt-32 lg:-mt-36 
          pb-20 sm:pb-24 md:pb-28 lg:pb-32 
          px-4 sm:px-6 md:px-8 lg:px-10
          text-white text-center flex flex-col items-center
          w-full max-w-screen-xl mx-auto
        "
      >

        {/* Logo só no mobile */}
        <div className="lg:hidden mb-5">
          <Logo className="h-20 w-20" />
        </div>

        {/* Posição idêntica à nutricional */}
        <div className="lg:absolute lg:top-56">
          <Title className="text-4xl sm:text-4xl lg:mb-12 lg:text-4xl font-extrabold mb-6">
            Monte seu treino
          </Title>

          <Button
            page="/recomendacao-treino/formulario/iniciar"
            className="
              w-full max-w-xs 
              px-14 py-5 lg:px-40
              rounded-full font-medium
              text-white text-xl 
              shadow-lg transition 
              bg-gradient-to-r from-brand-button1Violet to-brand-button2Purple
              hover:opacity-90 hover:scale-105 transform
              lg:font-semibold
            "
          >
            Começar
          </Button>
        </div>

      </Container>
    </Container>
  );
}

export default RecomendacaoTreino;
