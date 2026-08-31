import { login as loginApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    // v5 do TanStack Query renomeou isLoading para isPending em mutations.
    // `isLoading` não existe mais no resultado, então vinha undefined.
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/recomendado");
    },
  });

  // O erro de credencial agora é mostrado no próprio formulário, parado na
  // tela, em vez de um toast que some.
  // Exposto com o nome que o formulário já consome, para o JSX não mudar.
  return { login, isLoading: isPending, isError, error };
}
