// src/context/useForm.js
import { useContext } from "react";

import { FormContext } from "./form-context";

/**
 * Acesso ao estado do formulario.
 *
 * Vive em arquivo proprio, e nao junto do FormProvider, porque
 * react-refresh/only-export-components exige que um arquivo com componente
 * exporte apenas componentes — caso contrario o Fast Refresh do Vite recarrega
 * a pagina inteira e o formulario em andamento perde o estado.
 */
export function useForm() {
  return useContext(FormContext);
}
