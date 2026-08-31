import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useUser } from "../features/authentication/useUser";
import {
  getInfoBasica,
  getNutricaoAnswers,
  getTreinoAnswers,
  salvarInfoBasica,
  salvarRespostas,
} from "./apiPlanos";

/**
 * Hooks de leitura e gravação dos planos (gh#16).
 *
 * O `userId` sai da query `['user']`, que o `useUser` já mantém em cache — as
 * telas não chamam mais `supabase.auth.getUser()` por conta própria, que era
 * uma ida à rede a mais antes de tocar na própria tabela.
 */

export const chaves = {
  infoBasica: (userId) => ["info_basica", userId],
  treino: (userId) => ["treino_answers", userId],
  nutricao: (userId) => ["nutricao_answers", userId],
};

/**
 * Base das três leituras.
 *
 * `enabled` só liga com sessão. Sem ela, o v5 mantém a query em `pending` com
 * `isFetching` falso, então `isLoading` é falso e a tela cai no estado vazio —
 * o mesmo que o código manual fazia ao encontrar `user` nulo, e não um spinner
 * eterno.
 *
 * O carregamento do usuário entra no `carregando` porque, enquanto ele não
 * resolve, ainda não dá para dizer se há plano.
 */
function usePlano(chave, buscar) {
  const { user, isLoading: carregandoUsuario } = useUser();
  const userId = user?.id;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: chave(userId),
    queryFn: () => buscar(userId),
    enabled: Boolean(userId),
  });

  return {
    dados: data ?? null,
    carregando: carregandoUsuario || isLoading,
    erro: isError,
    recarregar: refetch,
  };
}

export const useInfoBasica = () => usePlano(chaves.infoBasica, getInfoBasica);
export const useTreinoAnswers = () => usePlano(chaves.treino, getTreinoAnswers);
export const useNutricaoAnswers = () => usePlano(chaves.nutricao, getNutricaoAnswers);

/**
 * `removeQueries`, e não `invalidateQueries`.
 *
 * Invalidar marca como obsoleto, mas a tela de resultado monta logo em seguida
 * e renderiza o valor em cache antes de o refetch chegar — o usuário veria por
 * um instante o plano *anterior*, que é o risco que a issue aponta como o
 * maior. Removendo, a tela de resultado sempre parte de uma busca limpa; o
 * custo é o mesmo spinner que ela já mostrava antes desta migração.
 */
function useSalvarComInvalidacao(mutationFn, chavesAfetadas) {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const userId = user?.id;

  return useMutation({
    mutationFn,
    onSuccess: () => {
      for (const chave of chavesAfetadas) {
        queryClient.removeQueries({ queryKey: chave(userId) });
      }
    },
  });
}

export function useSalvarInfoBasica() {
  const { user } = useUser();
  return useSalvarComInvalidacao(
    (valores) => salvarInfoBasica({ userId: user?.id, ...valores }),
    [chaves.infoBasica]
  );
}

/**
 * Remove as duas chaves de resposta porque o `pageIndex` é compartilhado entre
 * os fluxos e a tela de resultado da nutrição também depende de `info_basica`
 * — deixar qualquer uma delas em cache reabriria a mesma janela de dado velho.
 */
export function useSalvarRespostas() {
  return useSalvarComInvalidacao(salvarRespostas, [
    chaves.treino,
    chaves.nutricao,
    chaves.infoBasica,
  ]);
}
