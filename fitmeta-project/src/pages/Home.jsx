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
    <Container className="relative h-screen w-screen bg-black overflow-hidden">
      <Container className="absolute inset-x-0 top-0 h-3/5">
        <Img
          src={cbumHome}
          className="h-full w-full object-cover opacity-80"
          alt="Cbum lifting weights"
        />
      </Container>
      <Container className="absolute inset-x-0 bottom-0 h-2/5 bg-gray-900 bg-opacity-90 rounded-t-3xl shadow-2xl">
        <Container className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Logo
            src={logoWhite}
            className="h-32 w-32 rounded-full p-2"
          />
        </Container>
        <Container className="relative z-10 flex flex-col items-center justify-end h-full p-8 pb-16 text-white text-center">
          <Title className="text-3xl font-extrabold mb-1">
            Bem vindo, monstro
          </Title>
          <Subtitle className="text-base font-light text-gray-400 mb-8">
            Treine de modo inteligente
          </Subtitle>
          <Button className="w-full max-w-md py-4 px-6 rounded-lg bg-purple-700 hover:bg-purple-600 transition-colors text-white text-base font-semibold tracking-wider shadow-lg">
            Aprenda você mesmo
          </Button>
        </Container>
      </Container>
    </Container>
  );
}

export default Home;
