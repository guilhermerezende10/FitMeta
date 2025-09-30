import Button from "../../ui/Button";
import Container from "../../ui/Container";
import Title from "../../ui/Title";
import RowFormList from "./RowFormList";
import Logo from "../../ui/Logo";
import logoDarkblue from "../../data/logo/logo-darkblue.png";

function InfoBasicas() {
  return (
    <Container>
      
      <div className="absolute top-5 justify-center left-1/2 transform -translate-x-1/2 z-10">
      <Logo className="w-20 h-20" src={logoDarkblue} />
      </div>
      <div className="bg-[#192126] relative bottom-36 py-4 px-14 rounded-full shadow-md w-full max-w-xl">
        <Title className="text-2xl font-bold text-white">
          Informações Básicas
        </Title>
      </div>

      <RowFormList/>
      <div className="top-10 mt-16 relative">
      <Button className="px-36 py-6 rounded-full text-white text-base font-regular shadow-lg transition bg-gradient-to-r from-[#3F2B57] to-[#2B1546] hover:opacity-90-full" page="/recomendacao-treino/formulario/questions">Próximo</Button>
      </div>
    </Container>
  );
}

export default InfoBasicas;
