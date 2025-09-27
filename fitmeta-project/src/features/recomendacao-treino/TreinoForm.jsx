import Button from "../../ui/Button";
import Container from "../../ui/Container";
import Title from "../../ui/Title";
import RowFormList from "./RowFormList";
import Logo from "../../ui/Logo";
import logoDarkblue from "../../data/logo/logo-darkblue.png";

function TreinoForm() {
  return (
    <Container>
      <Logo src={logoDarkblue} />
      <div className="bg-[#192126] p-4 px-14 rounded-full shadow-md w-full max-w-xl">
        <Title className="text-2xl font-bold text-white">
          Informações Básicas
        </Title>
      </div>

      <RowFormList />
      <Button>Próximo</Button>
    </Container>
  );
}

export default TreinoForm;
