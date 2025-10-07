import { useState } from "react";
import { FaUser, FaApple } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLogoGoogle } from "react-icons/io";
import LoginRegisterInput from "./LoginRegisterInput";
import Button from "../../ui/Button";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    acceptedTerms: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // lógica de cadastro
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      {/* Campos de entrada */}
      <div className="flex flex-col gap-4 w-80">
        <LoginRegisterInput
          type="text"
          placeholder="Nome de usuário"
          name="username"
          iconElement={<FaUser />}
          value={formData.username}
          onChange={handleChange}
        />
        <LoginRegisterInput
          type="email"
          placeholder="E-mail"
          name="email"
          iconElement={<MdEmail />}
          value={formData.email}
          onChange={handleChange}
        />
        <LoginRegisterInput
          type="password"
          placeholder="Senha"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      {/* Termos de uso */}
      <label className="flex items-start gap-2 mt-28 w-80 text-sm text-gray-700">
        <input
          type="checkbox"
          name="acceptedTerms"
          checked={formData.acceptedTerms}
          onChange={handleChange}
          className="mt-1 accent-purple-800"
        />

        <span>
          Li e concordo com a{" "}
          <a href="#" className="text-purple-800 underline">
            Política de Privacidade
          </a>{" "}
          e os{" "}
          <a href="#" className="text-purple-800 underline">
            Termos de Uso
          </a>
        </span>
      </label>

      {/* Botão de envio */}
      <button
        type="submit"
        className="w-80 py-4 mt-6 mb-8 text-center rounded-full text-white font-semibold shadow-lg transition bg-gradient-to-r from-brand-button1Violet to-brand-button2Purple hover:opacity-90"
      >
        CADASTRE-SE
      </button>

      {/* Divisor */}
      <div className="flex items-center my-4 w-80">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="px-2 text-gray-500 text-sm">OU CONECTE COM</span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      {/* Ícones sociais */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          type="button"
          aria-label="Entrar com Apple"
          className="p-3 border rounded-full hover:bg-gray-100"
        >
          <FaApple size={22} />
        </button>
        <button
          type="button"
          aria-label="Entrar com Google"
          className="p-3 border rounded-full hover:bg-gray-100"
        >
          <IoLogoGoogle size={22} className="text-black" />
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
