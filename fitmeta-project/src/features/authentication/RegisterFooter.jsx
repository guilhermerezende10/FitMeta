import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Container from "../../ui/Container";

function RegisterFooter() {
  return (
    <Container>
      <div>
        <hr /> <p>OU CONECTE-SE COM</p> <hr />
      </div>
      <button>
        <FaApple />
      </button>

      <button>
        <FaGoogle />
      </button>
      <p>
        Já possui uma conta? Faça <span>Login</span>
      </p>
    </Container>
  );
}

export default RegisterFooter;
