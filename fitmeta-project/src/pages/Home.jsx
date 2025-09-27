import Container from "../ui/Container";
import Logo from "../ui/Logo";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import Button from "../ui/Button";
import Img from "../ui/Img";
import cbumHome from "../data/images/cbum-home.jpg";
import logoWhite from "../data/logo/logo-white.png";

function Home() {
  return (
    <Container className="relative h-screen w-screen overflow-hidden bg-[#192126]">
      {/* Imagem com fade */}
      <div className="absolute inset-x-0 bottom-0 h-3/5 z-0 relative">
        <Img src={cbumHome} alt="Cbum lifting weights" />
        {/* Fade da imagem para o fundo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#192126] via-[#192126]/20 to-transparent" />
      </div>

      {/* Conteúdo principal */}
      <Container className="absolute inset-x-0 bottom-0 pb-20 text-white text-center flex flex-col items-center z-10">
        <Logo src={logoWhite} />

        <Title>Bem vindo, monstro</Title>
        <Subtitle className="text-base font-bold text-gray-400 text-center mb-8">
          Treine de modo inteligente
        </Subtitle>

        <Button
          page="/motivacional" // Trocar para /registrar depois
        >
          Aprenda você mesmo
        </Button>
      </Container>
    </Container>
  );
}

export default Home;
