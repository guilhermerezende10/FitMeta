import { getCurrentUser } from "../../services/apiAuth";
import { useQuery } from "@tanstack/react-query";

/**
 * Sessão do usuário, servida do cache do React Query.
 *
 * `isError` é exposto porque "não há sessão" e "não consegui verificar" são
 * coisas diferentes: `getCurrentUser` devolve `null` no primeiro caso e lança
 * no segundo. Sem essa distinção, uma queda de rede tirava da tela quem estava
 * autenticado — o mesmo tipo de confusão que a gh#15 corrigiu nas telas de
 * plano, e que sobrevivia aqui.
 */
export function useUser() {
  const { isLoading, data: user, isError, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    user,
    isError,
    recarregar: refetch,
    isAuthenticated: user?.role === "authenticated",
  };
}
