import Container from "../ui/Container";
import Img from "../ui/Img";
import Logo from "../ui/Logo";
import Title from "../ui/Title";
import Button from "../ui/Button";
import davidLaid from "../data/images/david-recomendacao-treino.jpg";

function RecomendacaoTreino() {
  return (
    <Container className="relative h-screen w-screen overflow-hidden bg-[#192126]">
      {/* Imagem com fade */}
      <div className="absolute inset-x-0 bottom-0 h-3/5 z-0 relative">
        <Img src={davidLaid} alt="Cbum lifting weights" />
        {/* Fade da imagem para o fundo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#192126] via-[#192126]/20 to-transparent" />
      </div>

      {/* Conteúdo principal */}
      <Container className="absolute inset-x-0 bottom-0 pb-20 text-white text-center flex flex-col items-center z-10">
        <Logo/>

        <Title>Monte seu treino</Title>

        <Button
          page="/recomendacao-treino/formulario" 
        >
          Começar
        </Button>
      </Container>
    </Container>
  );
}

export default RecomendacaoTreino;
