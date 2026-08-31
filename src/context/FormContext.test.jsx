// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, act } from "@testing-library/react";
import { FormProvider } from "./FormContext";
import { useForm } from "./useForm";
import { CHAVE } from "./persistencia";

/**
 * Sonda: expõe o estado como texto e guarda o `dispatch` para o teste usar.
 * Uma remontagem do provider é o que o app faz num F5 — o estado só sobrevive
 * se vier do sessionStorage.
 */
let despachar;

function Sonda() {
  const { state, dispatch } = useForm();
  despachar = dispatch;
  return (
    <div>
      <span data-testid="pagina">{state.pageIndex}</span>
      <span data-testid="nome">{state.infoBasicas.nome}</span>
      <span data-testid="treino">{JSON.stringify(state.treinoAnswers)}</span>
      <span data-testid="nutricao">{JSON.stringify(state.nutricaoAnswers)}</span>
    </div>
  );
}

const montar = () =>
  render(
    <FormProvider>
      <Sonda />
    </FormProvider>
  );

const lido = (id) => screen.getByTestId(id).textContent;

beforeEach(() => {
  sessionStorage.clear();
  despachar = undefined;
});

afterEach(cleanup);

describe("FormProvider — sobrevive ao recarregamento (gh#24)", () => {
  it("retoma o questionário de treino de onde parou", () => {
    montar();
    act(() => {
      despachar({ type: "SET_INFO", payload: { field: "nome", value: "Rafa" } });
      despachar({
        type: "SET_TREINO_ANSWER",
        payload: { questionIndex: 1, option: "Posso treinar 3 vezes por semana" },
      });
      despachar({ type: "NEXT_PAGE" });
    });

    expect(lido("pagina")).toBe("2");
    cleanup(); // equivale ao F5: a árvore inteira é descartada

    montar();
    expect(lido("pagina")).toBe("2");
    expect(lido("nome")).toBe("Rafa");
    expect(JSON.parse(lido("treino"))).toEqual({
      1: "Posso treinar 3 vezes por semana",
    });
  });

  it("retoma o questionário de nutrição de onde parou", () => {
    montar();
    act(() => {
      despachar({
        type: "SET_NUTRICAO_ANSWER",
        payload: { label: "frequencia", option: 3 },
      });
    });

    cleanup();
    montar();
    expect(JSON.parse(lido("nutricao"))).toEqual({ frequencia: 3 });
  });

  it("os dois fluxos não misturam respostas", () => {
    montar();
    act(() => {
      despachar({
        type: "SET_TREINO_ANSWER",
        payload: { questionIndex: 1, option: "treino" },
      });
      despachar({
        type: "SET_NUTRICAO_ANSWER",
        payload: { label: "objetivo", option: "perder" },
      });
    });

    cleanup();
    montar();
    expect(JSON.parse(lido("treino"))).toEqual({ 1: "treino" });
    expect(JSON.parse(lido("nutricao"))).toEqual({ objetivo: "perder" });
  });
});

describe("FormProvider — concluir deixa o rascunho limpo", () => {
  it("RESET não deixa respostas para o próximo questionário", () => {
    // É o que o PerguntasStep despacha após gravar as respostas no banco.
    // Sem isso, "Refazer questionário" reabriria com tudo já marcado.
    montar();
    act(() => {
      despachar({ type: "SET_INFO", payload: { field: "nome", value: "Rafa" } });
      despachar({
        type: "SET_TREINO_ANSWER",
        payload: { questionIndex: 1, option: "treino" },
      });
      despachar({ type: "NEXT_PAGE" });
      despachar({ type: "RESET" });
    });

    cleanup();
    montar();
    expect(lido("nome")).toBe("");
    expect(JSON.parse(lido("treino"))).toEqual({});
    expect(lido("pagina")).toBe("1");
  });
});

describe("FormProvider — resiliência", () => {
  it("sessionStorage corrompido não impede o app de subir", () => {
    sessionStorage.setItem(CHAVE, "{{{ isso nao e json");
    expect(() => montar()).not.toThrow();
    expect(lido("pagina")).toBe("1");
    expect(lido("nome")).toBe("");
  });

  it("formato antigo aproveita o que dá e descarta o resto", () => {
    sessionStorage.setItem(
      CHAVE,
      JSON.stringify({
        infoBasicas: { nome: "Rafa", idade: 30 }, // idade numérica: formato antigo
        treinoAnswers: "lixo",
        pageIndex: 3,
      })
    );
    montar();
    expect(lido("nome")).toBe("Rafa");
    expect(lido("pagina")).toBe("3");
    expect(JSON.parse(lido("treino"))).toEqual({});
  });

  it("grava sob a chave do projeto", () => {
    montar();
    act(() => {
      despachar({ type: "SET_INFO", payload: { field: "nome", value: "Rafa" } });
    });
    expect(JSON.parse(sessionStorage.getItem(CHAVE)).infoBasicas.nome).toBe("Rafa");
  });

  it("usa sessionStorage, não localStorage — fechar o navegador não restaura", () => {
    montar();
    act(() => {
      despachar({ type: "SET_INFO", payload: { field: "nome", value: "Rafa" } });
    });
    expect(localStorage.getItem(CHAVE)).toBeNull();
  });
});
