// src/context/form-context.js
import { createContext } from "react";

/**
 * O objeto de contexto vive separado do FormProvider e do useForm porque
 * react-refresh/only-export-components trata contexto como export que nao e
 * componente: mantido junto do provider, o Fast Refresh do Vite deixa de valer
 * para o arquivo inteiro. Nome com hifen para nao competir com FormContext.jsx
 * na resolucao de extensao do Vite.
 */
export const FormContext = createContext();
