import { login as loginApi } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      console.log('cadastro existe')
      navigate("/home");
    },
    onError: (err) => {
      console.log("ERROR" + err);
      toast.error("Email ou senha inseridos estão incorretos.");
    },
  });

  return { login, isLoading };
}
