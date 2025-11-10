import { useState } from "react";
import { useLogin } from "./useLogin";
import LoginRegisterInput from "./LoginRegisterInput";
import SpinnerMini from "../../ui/SpinnerMini";
import { FaUser } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";
import toast from "react-hot-toast";
import { registerGoogle } from "../../services/apiAuth";


function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Por favor, preencha todos os campos antes de continuar.");
      return;
    }
    login(formData, {
      onSettled: () => setFormData({ email: "", password: "" }),
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      name="login"
      method="post"
      className="
        flex flex-col items-center
        w-full
      "
    >
      {/* Card do formulário: deixa o conteúdo centralizado verticalmente */}
      
      <div className="w-full bg-transparent px-4 sm:px-6 md:px-0">
        {/* Logo — pequeno espaçamento acima e abaixo */}
      

        <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
          <div className="flex flex-col gap-4">
            <LoginRegisterInput
              type="text"
              placeholder="E-mail/Usuário"
              name="email"
              iconElement={<FaUser />}
              value={formData.email}
              onChange={handleChange}
              autoComplete="username"
              disabled={isLoading}
            />

            <LoginRegisterInput
              type="password"
              placeholder="Senha"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              disabled={isLoading}
            />

            <button
              type="submit"
              className="w-full mt-2 py-4 sm:py-3.5 rounded-full text-white font-semibold shadow-lg transition-all bg-gradient-to-r from-[#3F2B57] to-[#2B1546] hover:opacity-95"
              disabled={isLoading}
            >
              {!isLoading ? "ENTRAR" : <SpinnerMini />}
            </button>
          </div>

          {/* Divisor */}
          <div className="flex items-center my-5">
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

export default LoginForm;
