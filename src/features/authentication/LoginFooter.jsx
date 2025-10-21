import Container from "../../ui/Container";
import { NavLink } from "react-router-dom";

function LoginFooter() {
  return (
    <Container>
      <p >
        Ainda não possui uma conta?{" "}
        <span>
          <NavLink to="/registrar" className="underline text-brand-button2Purple font-semibold">
            Cadastre-se
          </NavLink>
        </span>
      </p>
    </Container>
  );
}

export default LoginFooter;
