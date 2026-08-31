// src/context/FormContext.jsx
import { useReducer } from "react";

import { FormContext } from "./form-context";

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

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

