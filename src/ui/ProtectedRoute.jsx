import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import Button from "./Button";
import FullPage from "./FullPage";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";

/**
 * Portão das rotas privadas.
 *
 * São três desfechos, não dois: há sessão, não há sessão, ou não deu para
 * verificar. O último era tratado como o segundo — uma instabilidade de rede
 * mandava para /login quem estava autenticado, e a pessoa perdia o lugar em
 * que estava. Agora a falha de verificação mostra erro com opção de tentar de
 * novo, e só a ausência real de sessão redireciona.
 */
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, isError, recarregar } = useUser();

  const semSessao = !isLoading && !isError && !isAuthenticated;

  useEffect(() => {
    if (semSessao) navigate("/login");
  }, [semSessao, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isError)
    return (
      <FullPage>
        <div className="w-full max-w-[480px] px-6">
          <Alert
            action={
              <Button variant="secondary" size="sm" onClick={recarregar}>
                Tentar novamente
              </Button>
            }
          >
            Não foi possível verificar sua sessão.
          </Alert>
        </div>
      </FullPage>
    );

  if (isAuthenticated) return children;

  // Sem sessão: nada é renderizado enquanto o efeito acima navega para /login.
  return null;
}

export default ProtectedRoute;
