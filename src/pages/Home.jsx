import Container from "../ui/Container";
import Logo from "../ui/Logo";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import Button from "../ui/Button";
import Img from "../ui/Img";
import cbumHome from "../data/images/cbum-home.jpg";
import cbumHomePc from "../data/images/cbum-homepc.jpg";

function Home() {
  return (
    <Container className="relative h-real w-screen overflow-hidden bg-brand-bgDarkGray">
      {/* Imagem com fade */}
      <div className="inset-x-0 bottom-0 h-3/5 relative z-0 pointer-events-none overflow-hidden">
        {/* Mobile image */}
        <div className="block lg:hidden">
          <Img src={cbumHome} alt="Cbum lifting weights" />
        </div>

        {/* Desktop image */}
        <div className="hidden lg:block">
          <Img src={cbumHomePc} alt="Cbum lifting weights desktop" />
        </div>

        {/* Fade da imagem para o fundo */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bgDarkGray via-brand-bgDarkGray/20 to-transparent" />
      </div>

      {/* Conteúdo principal */}
      <Container className="inset-x-0 bottom-0 pb-20 text-white text-center flex flex-col items-center z-10 relative">
        <Logo />

        <Title>Bem vindo, monstro</Title>
        <Subtitle className="text-base font-bold text-gray-400 text-center mb-8">
          Treine de modo inteligente
        </Subtitle>

        <Button page="/recomendado">Aprenda você mesmo</Button>
      </Container>
    </Container>
  );
}

export default Home;
