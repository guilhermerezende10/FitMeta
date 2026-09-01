import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  atualizarEmail,
  atualizarNome,
  atualizarSenha,
} from "../../services/apiAuth";

/**
 * Mutações da tela de conta.
 *
 * Juntas num módulo pelo mesmo motivo que as do plano vivem em `usePlanos.js`:
 * todas terminam mexendo na mesma chave de cache, a `["user"]`, e espalhá-las
 * pelos componentes faria cada um decidir sozinho o que invalidar.
 */

export function useAtualizarNome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: atualizarNome,
    /**
     * O usuário já volta atualizado da própria chamada. Gravar direto no cache
     * evita uma ida a mais ao servidor só para a barra lateral mostrar o nome
     * novo — é o mesmo atalho que o login usa.
     */
    onSuccess: (user) => {
      if (user) queryClient.setQueryData(["user"], user);
    },
  });
}

/**
 * Sem mexer no cache de propósito: o e-mail **não** mudou ainda. Ele só muda
 * quando o link de confirmação é aberto, e até lá o endereço em cache continua
 * sendo o correto.
 */
export function useAtualizarEmail() {
  return useMutation({ mutationFn: atualizarEmail });
}

export function useAtualizarSenha() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: atualizarSenha,
    /**
     * A conferência da senha atual entra na conta de novo e substitui a sessão.
     * Sem invalidar, o cache seguiria com o usuário da sessão anterior.
     */
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
}
