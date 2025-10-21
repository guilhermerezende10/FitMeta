import Button from "../ui/Button"
import Container from "../ui/Container"
import Img from "../ui/Img"
import Logo from "../ui/Logo"
import Title from "../ui/Title"
import davidLaid from "../data/images/david-recomendacao-treino.jpg";

function RecomendacaoNutricional() {
    return (
        <Container className="relative h-screen w-screen overflow-hidden bg-brand-bgDarkGray">
      {/* Imagem com fade */}
      <div className=" inset-x-0 bottom-0 h-3/5 z-0 relative">
        <Img src={davidLaid} alt="David laid" />
        {/* Fade da imagem para o fundo */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bgDarkGray via-brand-bgDarkGray/20 to-transparent" />
      </div>

      {/* Conteúdo principal */}
      <Container className="pb-20 text-white text-center flex flex-col items-center z-10">
        <Logo />

        <Title className="text-3xl font-extrabold  text-white text-center">
          Recomendação Nutricional
        </Title>

        <Button
         page="/recomendacao-nutricional/formulario/iniciar" className= "px-28 py-4 absolute bottom-28  rounded-full text-white text-base font-regular shadow-lg transition bg-gradient-to-r from-brand-button1Violet to-brand-button2Purple hover:opacity-90">Começar</Button>
      </Container>
    </Container>
    )
}

export default RecomendacaoNutricional
