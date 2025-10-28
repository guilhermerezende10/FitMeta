import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../services/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function AuthCallback() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    async function handleAuthCallback() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;
        console.log(error)

        if (data.session) {
          const user = data.session.user;

          queryClient.setQueryData(["user"], user);

          toast.success("Logado com sucesso!");
          navigate("/home");
        } else {
          toast.error("Não foi possível autenticar o usuário.");
          navigate("/login");
        }
      } catch (err) {
        console.error("Erro no callback de autenticação:", err.message);
        toast.error("Erro durante a autenticação. Tente novamente.");
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
