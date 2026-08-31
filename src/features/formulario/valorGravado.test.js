import { describe, it, expect } from "vitest";
import { valorGravado } from "./valorGravado";
import { FLUXO_NUTRICAO, FLUXO_TREINO } from "./fluxos";

describe("valorGravado — fluxo de treino", () => {
  it("guarda o rótulo como está, sem normalizar", () => {
    expect(valorGravado("2 a 3x por semana", false, "frequencia")).toBe(
      "2 a 3x por semana"
    );
    expect(valorGravado("Ganhar peso", false, "objetivo")).toBe("Ganhar peso");
  });
});

describe("valorGravado — frequência (nutrição)", () => {
  it.each([
    ["1x por semana", 1],
    ["2 a 3x por semana", 3],
    ["4 a 5x por semana", 5],
  ])("normaliza %s para %i", (rotulo, esperado) => {
    expect(valorGravado(rotulo, true, "frequencia")).toBe(esperado);
  });

  it("devolve número, não string — o bug de tipo que motivou `preenchido`", () => {
    expect(typeof valorGravado("1x por semana", true, "frequencia")).toBe("number");
  });

  it("devolve o rótulo intacto se nenhum padrão casar", () => {
    expect(valorGravado("todo dia", true, "frequencia")).toBe("todo dia");
  });
});

describe("valorGravado — objetivo (nutrição)", () => {
  it.each([
    ["Ganhar peso", "ganhar"],
    ["Manter peso", "manter"],
    ["Perder peso", "perder"],
  ])("normaliza %s para %s", (rotulo, esperado) => {
    expect(valorGravado(rotulo, true, "objetivo")).toBe(esperado);
  });

  it("é insensível a maiúsculas", () => {
    expect(valorGravado("GANHAR PESO", true, "objetivo")).toBe("ganhar");
  });

  it("devolve as chaves que calculadorMacros espera", () => {
    const chaves = FLUXO_NUTRICAO.perguntas
      .find((p) => p.label === "objetivo")
      .options.map((o) => valorGravado(o, true, "objetivo"));
    expect(chaves.sort()).toEqual(["ganhar", "manter", "perder"]);
  });
});

describe("valorGravado — outras perguntas", () => {
  it("não mexe em label que não seja frequência nem objetivo", () => {
    expect(valorGravado("Qualquer coisa", true, "outra")).toBe("Qualquer coisa");
  });

  it("percorre o fluxo de treino inteiro sem alterar nada", () => {
    for (const p of FLUXO_TREINO.perguntas) {
      for (const o of p.options) {
        expect(valorGravado(o, false, p.label)).toBe(o);
      }
    }
  });
});
