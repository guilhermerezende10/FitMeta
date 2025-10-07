import { NavLink } from "react-router-dom";
import Container from "../../ui/Container";

function RegisterFooter() {
  return (
    <Container>
      <p >
        Já possui uma conta?{" "}
        <span>
          <NavLink
            to="/login"
            className="underline text-brand-button2Purple font-semibold"
          >
            Faça Login{" "}
          </NavLink>
        </span>
      </p>
    </Container>
  );
}

export default RegisterFooter;
