import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register } from "../../services/apiAuth";

export function useRegister() {

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password }) => register({ email, password }),
    onSuccess: () => {
      toast.success("Conta criada com sucesso!");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao criar conta.");
    },
  });

  return { signup, isLoading };
}
