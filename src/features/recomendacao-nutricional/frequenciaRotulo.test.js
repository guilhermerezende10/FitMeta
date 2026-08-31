import { describe, it, expect } from "vitest";
import { frequenciaRotulo } from "./frequenciaRotulo";
import { valorGravado } from "../formulario/valorGravado";
import { FLUXO_NUTRICAO } from "../formulario/fluxos";

describe("frequenciaRotulo — valores gravados", () => {
  it.each([
    [1, "1x por semana"],
    [3, "2 a 3x por semana"],
    [5, "4 a 5x por semana"],
  ])("%i vira %s", (valor, esperado) => {
    expect(frequenciaRotulo(valor)).toBe(esperado);
  });

  it("aceita o valor como string, que é como pode voltar do banco", () => {
    expect(frequenciaRotulo("3")).toBe("2 a 3x por semana");
  });
});

describe("frequenciaRotulo — valores fora do conjunto", () => {
  it.each([0, 2, 4, 7, -1, null, undefined, "abc", ""])(
    "devolve null para %p, para a tela poder omitir a linha",
    (valor) => {
      expect(frequenciaRotulo(valor)).toBeNull();
    }
  );
});

describe("frequenciaRotulo — ida e volta", () => {
  // O que valorGravado escreve, frequenciaRotulo tem de saber ler de volta.
  it("reconstrói exatamente os rótulos do fluxo de nutrição", () => {
    const opcoes = FLUXO_NUTRICAO.perguntas.find(
      (p) => p.label === "frequencia"
    ).options;

    for (const rotulo of opcoes) {
      const gravado = valorGravado(rotulo, true, "frequencia");
      expect(frequenciaRotulo(gravado)).toBe(rotulo);
    }
  });
});
