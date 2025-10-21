// src/context/FormContext.jsx
import { createContext, useReducer, useContext } from "react";

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

// Contexto
const FormContext = createContext();

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  return useContext(FormContext);
}
