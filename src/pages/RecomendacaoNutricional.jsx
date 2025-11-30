import Button from "../ui/Button";
import Container from "../ui/Container";
import Img from "../ui/Img";
import Logo from "../ui/Logo";
import Title from "../ui/Title";
import imgRecomendacaoNutricional from "../data/images/recomendacao-nutricional.jpg";
import imgRecomendacaoNutricionalPc from "../data/images/recomendacao-nutricionalpc.jpg";

function RecomendacaoNutricional() {
  return (
    <Container className="relative h-real w-screen overflow-hidden bg-brand-bgDarkGray">
      {/* Imagem com fade */}
      <div className="relative h-[60vh] md:h-[60vh] lg:h-[65vh] w-full overflow-hidden">
        {/* Mobile */}
        <div className="block lg:hidden">
          <Img
            src={imgRecomendacaoNutricional}
            alt="Imagem de uma refeição"
            style={{ objectPosition: "top center" }}
          />
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <Img src={imgRecomendacaoNutricionalPc} alt="Imagem de uma refeição (desktop)" />
        </div>

        {/* Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bgDarkGray via-brand-bgDarkGray/20 to-transparent" />
      </div>

      {/* Conteúdo */}
      <Container className="relative -mt-24 sm:-mt-28 md:-mt-32 lg:-mt-36 pb-20 sm:pb-24 md:pb-28 lg:pb-32 px-4 sm:px-6 md:px-8 lg:px-10 text-white text-center flex flex-col items-center w-full max-w-screen-xl mx-auto">
        {/* Logo somente no mobile */}
        <div className="lg:hidden mb-5">
          <Logo className="h-20 w-20" />
        </div>

        {/* Mesma posição do outro (lg:top-56) */}
        <div className="lg:absolute lg:top-56 flex flex-col items-center gap-4">
          <Title className="text-4xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold mb-6 text-white">
            Recomendação Nutricional
          </Title>

          <Button
            page="/recomendacao-nutricional/formulario/iniciar"
            className="w-full max-w-[260px] sm:max-w-[300px] px-6 py-4 rounded-full font-medium text-white text-xl shadow-lg transition bg-gradient-to-r from-brand-button1Violet to-brand-button2Purple hover:opacity-90 hover:scale-105 transform"
          >
            Começar
          </Button>
        </div>
      </Container>
    </Container>
  );
}

export default RecomendacaoNutricional;
