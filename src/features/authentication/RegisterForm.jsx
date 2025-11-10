import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import LoginRegisterInput from "./LoginRegisterInput";
import toast from "react-hot-toast";
import { useRegister } from "./useRegister";
import { NavLink } from "react-router-dom";
import { registerGoogle } from "../../services/apiAuth";
import { IoLogoGoogle } from "react-icons/io";

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
      className="flex flex-col items-center w-full"
    >
      {/* Card do formulário: deixa o conteúdo centralizado */}
      <div className="w-full bg-transparent px-4 sm:px-6 md:px-0">
        <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
          {/* Campos de entrada */}
          <div className="flex flex-col gap-4">
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
          <label className="flex items-start gap-2 text-sm text-gray-700 mt-4 mb-2">
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
              <NavLink
                to="/politicas-privacidade"
                className="text-purple-800 underline"
              >
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
            className="w-full mt-4 py-4 sm:py-3.5 rounded-full text-white font-semibold shadow-lg transition-all bg-gradient-to-r from-[#3F2B57] to-[#2B1546] hover:opacity-95"
            disabled={isLoading}
          >
            CADASTRE-SE
          </button>

          {/* Divisor */}
          <div className="flex items-center mt-8">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-2 text-gray-400 text-xs sm:text-sm">OU CONECTE COM</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Ícones sociais */}
          <div className="flex justify-center gap-4 m-6">
            <button
              type="button"
              aria-label="Entrar com Google"
              className="p-4 border rounded-full hover:bg-gray-100 transition"
              onClick={() => registerGoogle()}
            >
              <IoLogoGoogle size={20} className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;