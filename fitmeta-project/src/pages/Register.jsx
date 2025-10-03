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
      <Title className="text-[#2d1748] absolute top-48 text-2xl font-bold left-1/2 transform -translate-x-1/2 z-10 h-36">Crie sua conta</Title>
      <div className="absolute top-80 left-1/2 transform -translate-x-1/2">
      <div className="">
      <LoginRegisterInput
        type="text"
        placeholder="Nome de usuário"
        name="user"
        iconElement={<FaUser />}
        />
        </div>
        <div>
      <LoginRegisterInput
        type="email"
        placeholder="E-mail"
        name="email"
        iconElement={<MdEmail />}
        />
        </div>
      <LoginRegisterInput type="password" placeholder="Senha" name="senha" />
        </div>

      <TermosDeUso />
      <Button className="text-center py-6 absolute bottom-48 w-4/5 left-1/2 transform -translate-x-1/2 rounded-full text-white text-base font-regular shadow-lg transition bg-gradient-to-r from-[#3F2B57] to-[#2B1546] hover:opacity-90">CADASTRE-SE</Button>
      <RegisterFooter />
    </div>
  );
}

export default Register;
