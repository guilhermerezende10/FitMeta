import Container from "../../ui/Container";

function LoginFooter() {
  return (
    <Container>
      <p className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 text-sm w-4/5 mx-9">
        Ainda não possui uma conta?  <span>Cadastre-se</span>
      </p>
    </Container>
  );
}

export default LoginFooter;
