import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register } from "../../services/apiAuth";

export function useRegister() {
  const navigate = useNavigate();

  const {
    mutate: signup,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ email, password, nome }) =>
      register({ email, password, nome }),
    onSuccess: () => {
      toast.success("Conta criada com sucesso!");
      navigate("/login");
    },
  });

  // O erro vai para o formulário, onde o usuário pode agir sobre ele.
  return { signup, isLoading, isError, error };
}
