import { useState } from "react";
import { FaUser, FaApple } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLogoGoogle } from "react-icons/io";
import LoginRegisterInput from "./LoginRegisterInput";
import toast from "react-hot-toast";
import { useRegister } from "./useRegister";
import { NavLink } from "react-router-dom";
import { registerGoogle } from "../../services/apiAuth";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    acceptedTerms: false,
  });

  const { signup, isLoading } = useRegister();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // lógica de cadastro
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (!formData.acceptedTerms) {
      toast.error("Você precisa aceitar os termos de uso.");
      return;
    }

    await signup({
      email: formData.email,
      password: formData.password,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      name="register"
      method="post"
      className="flex flex-col items-center"
    >
      {/* Campos de entrada */}
      <div className="flex flex-col gap-4 w-80 mt-60">
        <LoginRegisterInput
          type="text"
          placeholder="Nome de usuário"
          name="username"
          iconElement={<FaUser />}
          value={formData.username}
          onChange={handleChange}
          disabled={isLoading}
        />
        <LoginRegisterInput
          type="email"
          placeholder="E-mail"
          name="email"
          autoComplete="username"
          iconElement={<MdEmail />}
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
        <LoginRegisterInput
          type="password"
          placeholder="Senha"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          autoComplete="password"
        />
      </div>

      {/* Termos de uso */}
      <label className="flex items-start gap-2 w-80 text-sm text-gray-700 m-2">
        <input
          type="checkbox"
          name="acceptedTerms"
          checked={formData.acceptedTerms}
          onChange={handleChange}
          className="mt-1 accent-purple-800"
          disabled={isLoading}
        />

        <span>
          Li e concordo com a{" "}
          <NavLink to="/politicas-privacidade" className="text-purple-800 underline">
            Política de Privacidade
          </NavLink>{" "}
          e os{" "}
          <NavLink to="/termos-de-uso" className="text-purple-800 underline">
            Termos de Uso
          </NavLink>
        </span>
      </label>

      {/* Botão de envio */}
      <button
        type="submit"
        className="w-80 py-4 mt-6 mb-8 text-center rounded-full text-white font-semibold shadow-lg transition bg-gradient-to-r from-[#3F2B57] to-[#2B1546] hover:opacity-90"
        disabled={isLoading}
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
      <div className="flex justify-center gap-6 mb-8 mt-4">
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
          onClick={() => registerGoogle()}
        >
          <IoLogoGoogle size={22} className="text-black" />
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
