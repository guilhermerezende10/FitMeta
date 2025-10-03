import LoginRegisterInput from "../features/authentication/LoginRegisterInput";
import RegisterFooter from "../features/authentication/RegisterFooter";
import TermosDeUso from "../features/authentication/TermosDeUso";
import Button from "../ui/Button";
import Title from "../ui/Title";

import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Register() {
  return (
    <div>
      <Title className="text-black">Crie sua conta</Title>
      <LoginRegisterInput
        type="text"
        placeholder="Nome de usuário"
        name="user"
        iconElement={<FaUser />}
      />
      <LoginRegisterInput
        type="email"
        placeholder="E-mail"
        name="email"
        iconElement={<MdEmail />}
      />
      <LoginRegisterInput type="password" placeholder="Senha" name="senha" />

      <TermosDeUso />
      <Button>CADASTRE-SE</Button>
      <RegisterFooter />
    </div>
  );
}

export default Register;
