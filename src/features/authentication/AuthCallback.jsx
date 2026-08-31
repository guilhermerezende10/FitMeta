import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../services/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function AuthCallback() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /**
   * Os toasts levam `id` fixo porque o app monta em StrictMode, e o React 18
   * executa o efeito duas vezes em desenvolvimento — sem o id, o usuário via
   * "Logado com sucesso!" duplicado.
   *
   * Id estável em vez de guarda por ref: o react-hot-toast substitui o toast
   * de mesmo id em vez de empilhar, e assim não há estado que possa ficar preso
   * se a segunda montagem sair mais cedo.
   */
  useEffect(() => {
    async function handleAuthCallback() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (data.session) {
          const user = data.session.user;

          queryClient.setQueryData(["user"], user);

          toast.success("Logado com sucesso!", { id: "auth-callback" });
          navigate("/recomendado");
        } else {
          toast.error("Não foi possível autenticar o usuário.", {
            id: "auth-callback",
          });
          navigate("/login");
        }
      } catch (err) {
        console.error("Erro no callback de autenticação:", err.message);
        toast.error("Erro durante a autenticação. Tente novamente.", {
          id: "auth-callback",
        });
        navigate("/login");
      }
    }

    handleAuthCallback();
  }, [navigate, queryClient]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-medium">Autenticando com o Google...</p>
    </div>
  );
}
