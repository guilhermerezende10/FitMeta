import { useState } from "react";
import { useLogin } from "./useLogin";
import LoginRegisterInput from "./LoginRegisterInput";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { FaUser } from "react-icons/fa";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "guilherme@example.com",
    password: "password123",
  });

  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) return;
    login(formData);
  }

  function handleChange(e) {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      value,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-80">
        <LoginRegisterInput
          type="text"
          placeholder="E-mail/Usuário"
          name="email/username"
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
      </div>

      <Button
        type="submit"
        className="w-80 py-4 mt-6 mb-8 text-center rounded-full text-white font-semibold shadow-lg transition bg-gradient-to-r from-[#3F2B57] to-[#2B1546] hover:opacity-90"
        disabled={isLoading}
      >
        {!isLoading ? "ENTRAR" : <SpinnerMini />}
      </Button>
    </form>
  );
}

export default LoginForm;
