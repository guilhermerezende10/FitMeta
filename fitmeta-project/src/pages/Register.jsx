import LoginRegisterInput from "../features/authentication/LoginRegisterInput";
import RegisterFooter from "../features/authentication/RegisterFooter";
import Button from "../ui/Button";
import Title from "../ui/Title";

import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLogoGoogle } from "react-icons/io";
import { FaApple } from "react-icons/fa";

function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">

      <Title className="text-[#2d1748] text-2xl relative top-24 font-bold mb-6">
        Crie sua conta
      </Title>

      <div className="flex flex-col gap-4 w-80">
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
      </div>

      {/* Termos de uso */}
      <div className="flex items-start gap-2 mt-28 w-80 text-sm text-gray-700">
        <input type="checkbox" className="mt-1" />
        <p>
          Li e concordo com a{" "}
          <a href="#" className="text-purple-800 underline">
            Política de Privacidade
          </a>{" "}
          e os{" "}
          <a href="#" className="text-purple-800 underline">
            Termos de Uso
          </a>
        </p>
      </div>

      {/* Botão */}
      <Button className="w-80 py-4 mt-6 mb-8 text-center rounded-full text-white font-semibold shadow-lg transition bg-gradient-to-r from-[#3F2B57] to-[#2B1546] hover:opacity-90">
        CADASTRE-SE
      </Button>

      {/* Divider */}
      <div className="flex items-center my-4 w-80">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-2 text-gray-500 text-sm">OU CONECTE COM</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Social icons (Apple e Google) */}
      <div className="flex justify-center gap-6 mb-6">
        <button className="p-3 border rounded-full hover:bg-gray-100">
          <FaApple size={22} />
        </button>
        <button className="p-3 border rounded-full hover:bg-gray-100">
          <IoLogoGoogle size={22} className="text-black" />
        </button>
      </div>

      {/* Footer */}
      <RegisterFooter />
    </div>
  );
}

export default Register;
