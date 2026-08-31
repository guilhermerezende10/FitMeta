import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/apiAuth";

export function useRegister() {
  const {
    mutate: signup,
    // v5 renomeou isLoading para isPending em mutations — ver useLogin.
    isPending,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: ({ email, password, nome }) =>
      register({ email, password, nome }),
  });

  // O retorno de signUp era descartado, e com ele o único sinal disponível
  // para saber se o projeto Supabase exige confirmação de e-mail. Preservado
  // para a tela de sucesso escolher entre as duas variantes do design (gh#1):
  // `data.session === null` significa que o e-mail precisa ser confirmado.
  const precisaConfirmar = Boolean(data) && !data.session;

  // O erro vai para o formulário, onde o usuário pode agir sobre ele.
  return {
    signup,
    isLoading: isPending,
    isError,
    error,
    sucesso: Boolean(data),
    precisaConfirmar,
  };
}
