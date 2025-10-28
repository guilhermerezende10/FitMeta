import { useState } from "react";
import { useLogin } from "./useLogin";
import LoginRegisterInput from "./LoginRegisterInput";
import SpinnerMini from "../../ui/SpinnerMini";
import { FaFacebookF, FaUser } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";
import toast from "react-hot-toast";
import { registerGoogle } from "../../services/apiAuth";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Por favor, preencha todas os campos antes de continuar.");
      return;
    }
    login(formData, {
      onSettled: () => {
        setFormData({
          email: "",
          password: "",
        });
      },
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // ✅ agora atualiza o campo certo
    }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      name="login"
      method="post"
      className="flex flex-col items-center"
    >
      <div className="flex flex-col gap-4 w-80 mb-16">
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
          className="w-full mt-6 max-w-80 py-4 text-center rounded-full text-white font-semibold shadow-lg transition-all bg-gradient-to-r from-[#3F2B57] to-[#2B1546] hover:opacity-90 z-10"
          disabled={isLoading}
        >
          {!isLoading ? "ENTRAR" : <SpinnerMini />}
        </button>
      </div>

      {/* Divisor */}
      <div className="flex items-center my-4 w-80">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="px-2 text-gray-500 text-sm">OU CONECTE COM</span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      {/* Ícones sociais */}
      <div className="flex justify-center gap-6 mb-10 mt-8 ">
        <button
          type="button"
          aria-label="Entrar com Facebook"
          className="p-3 border rounded-full hover:bg-gray-100"
        >
          <FaFacebookF size={22} />
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

export default LoginForm;
