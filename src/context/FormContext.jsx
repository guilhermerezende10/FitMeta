// src/context/FormContext.jsx
import { useEffect, useReducer } from "react";

import { FormContext } from "./form-context";
import { ler, gravar } from "./persistencia";

// Estado inicial do formulário
const initialState = {
  infoBasicas: {
    nome: "",
    idade: "",
    peso: "",
    altura: "",
    sexo: "",
  },
  treinoAnswers: {}, // { [questionIndex]: option }
  nutricaoAnswers: {},
  pageIndex: 1,
};

// Reducer central
function formReducer(state, action) {
  switch (action.type) {
    case "SET_INFO":
      return {
        ...state,
        infoBasicas: {
          ...state.infoBasicas,
          [action.payload.field]: action.payload.value,
        },
      };
    // Preenche a etapa 1 de uma vez com o que já está em `info_basica`.
    // Existe separada de SET_INFO para não disparar cinco renders nem cinco
    // limpezas de erro de campo — e para deixar claro, na leitura, que a
    // origem é o banco e não o usuário digitando.
    case "SEED_INFO":
      return {
        ...state,
        infoBasicas: { ...state.infoBasicas, ...action.payload },
      };
    case "SET_TREINO_ANSWER":
      return {
        ...state,
        treinoAnswers: {
          ...state.treinoAnswers,
          [action.payload.questionIndex]: action.payload.option,
        },
      };
    case "SET_NUTRICAO_ANSWER":
      return {
        ...state,
        nutricaoAnswers: {
          ...state.nutricaoAnswers,
          [action.payload.label]: action.payload.option,
        },
      };
    case "NEXT_PAGE":
      return {
        ...state,
        pageIndex: state.pageIndex + 1,
      };
    case "PREV_PAGE":
      return {
        ...state,
        pageIndex: state.pageIndex - 1,
      };
    case "RESET_PAGE":
      return {
        ...state,
        pageIndex: 1,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// Fora do provider: em SSR ou num teste sem DOM não existe `window`, e o
// acesso direto derrubaria o módulo no import.
function storage() {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

export function FormProvider({ children }) {
  /**
   * gh#24: o reducer recomeçava do zero a cada carregamento, então um F5 no
   * meio do questionário devolvia o usuário para a pergunta 1 com tudo em
   * branco. O estado passa a ser hidratado do `sessionStorage` na montagem e
   * regravado a cada mudança.
   *
   * A limpeza acontece ao concluir o questionário, no `PerguntasStep` — sem
   * ela, "Refazer questionário" ressuscitaria as respostas antigas, que é o
   * risco que esta mudança introduz.
   */
  const [state, dispatch] = useReducer(formReducer, initialState, (base) =>
    ler(storage(), base)
  );

  useEffect(() => {
    gravar(storage(), state);
  }, [state]);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

