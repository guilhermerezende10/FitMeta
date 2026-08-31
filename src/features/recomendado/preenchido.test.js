import { describe, it, expect } from "vitest";
import { preenchido } from "./preenchido";

describe("preenchido — texto", () => {
  it.each([
    ["texto comum", "Perder peso", true],
    ["string vazia", "", false],
    ["só espaços", "   ", false],
    ["texto com espaços em volta", "  ok  ", true],
  ])("%s", (_, valor, esperado) => {
    expect(preenchido(valor)).toBe(esperado);
  });
});

describe("preenchido — número", () => {
  // `nutricao_answers.frequencia` é gravado como número (1, 3 ou 5). A versão
  // antiga chamava `.trim()` direto e estourava `frequencia.trim is not a
  // function`, dentro de um async sem captura — a checagem morria calada.
  it.each([1, 3, 5, 42, -1, 1.5])("aceita o número %p sem estourar", (n) => {
    expect(() => preenchido(n)).not.toThrow();
    expect(preenchido(n)).toBe(true);
  });

  it("zero conta como preenchido — é um valor, não uma ausência", () => {
    expect(preenchido(0)).toBe(true);
  });
});

describe("preenchido — ausência", () => {
  it.each([
    ["null", null],
    ["undefined", undefined],
  ])("%s é vazio", (_, valor) => {
    expect(preenchido(valor)).toBe(false);
  });

  it("nenhum argumento é vazio", () => {
    expect(preenchido()).toBe(false);
  });
});
