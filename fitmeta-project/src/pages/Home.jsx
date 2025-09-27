import Container from "../ui/Container";
import Logo from "../ui/Logo";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import Button from "../ui/Button";
import Img from "../ui/Img";
import cbumHome from "../data/images/cbum-home.jpg";
import logoWhite from "../data/logo/logo-white.png";

const StyledTitle = "text-3xl font-extrabold mb-2";
const StyledSubtitle = "text-base font-bold text-gray-400 mb-8";
const StyledBtn =
    "px-16 py-4 rounded-full text-white text-base font-regular shadow-lg transition";


function Home() {
  return (
    <Container className="relative h-screen w-screen overflow-hidden bg-[#192126]">
      {/* Imagem com fade */}
      <div className="absolute inset-x-0 bottom-0 h-3/5 z-0 relative">
        <Img
          src={cbumHome}
          className="h-full w-full object-cover opacity-90"
          alt="Cbum lifting weights"
        />
        {/* Fade da imagem para o fundo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#192126] via-[#192126]/20 to-transparent" />
      </div>

      {/* Conteúdo principal */}
      <Container className="absolute inset-x-0 bottom-0 pb-20 text-white text-center flex flex-col items-center z-10">
        <Logo src={logoWhite} className="h-20 w-20 mb-5" />

        <Title className={StyledTitle}>Bem vindo, monstro</Title>
        <Subtitle className={StyledSubtitle}>
          Treine de modo inteligente
        </Subtitle>

        <Button
          className={`${StyledBtn} bg-gradient-to-r from-[#3F2B57] to-[#2B1546] hover:opacity-90`} page="/registrar"
        >
          Aprenda você mesmo
        </Button>
      </Container>
    </Container>
  );
}

export default Home;
