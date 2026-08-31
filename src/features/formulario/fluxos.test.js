import { describe, it, expect } from "vitest";
import { fluxoDaRota, FLUXO_TREINO, FLUXO_NUTRICAO } from "./fluxos";

describe("fluxoDaRota", () => {
  it("reconhece o fluxo de nutrição pela raiz da rota", () => {
    expect(fluxoDaRota("/recomendacao-nutricional")).toBe(FLUXO_NUTRICAO);
    expect(fluxoDaRota("/recomendacao-nutricional/formulario/questions")).toBe(
      FLUXO_NUTRICAO
    );
  });

  it("cai no fluxo de treino para qualquer outra rota", () => {
    expect(fluxoDaRota("/recomendacao-treino/formulario")).toBe(FLUXO_TREINO);
    expect(fluxoDaRota("/")).toBe(FLUXO_TREINO);
    expect(fluxoDaRota("/motivacional")).toBe(FLUXO_TREINO);
  });

  it("casa por prefixo, não por igualdade — o resultado mantém o fluxo", () => {
    expect(fluxoDaRota("/recomendacao-nutricional/formulario/resultado")).toBe(
      FLUXO_NUTRICAO
    );
  });

  it("uma rota que só contém o termo no meio não vira nutrição", () => {
    expect(fluxoDaRota("/algo/recomendacao-nutricional")).toBe(FLUXO_TREINO);
  });
});

describe("integridade dos dois fluxos", () => {
  it.each([
    ["treino", FLUXO_TREINO],
    ["nutrição", FLUXO_NUTRICAO],
  ])("o fluxo de %s tem etapas e perguntas coerentes", (_, fluxo) => {
    expect(fluxo.etapas.length).toBeGreaterThan(0);
    expect(fluxo.perguntas.length).toBeGreaterThan(0);
    for (const p of fluxo.perguntas) {
      expect(p.options.length).toBeGreaterThan(0);
      expect(new Set(p.options).size).toBe(p.options.length);
    }
  });

  it("a primeira etapa dos dois é 'Sobre você' — é a etapa compartilhada", () => {
    expect(FLUXO_TREINO.etapas[0]).toBe("Sobre você");
    expect(FLUXO_NUTRICAO.etapas[0]).toBe("Sobre você");
  });

  it("o fluxo de nutrição rotula as perguntas, o de treino usa índice", () => {
    for (const p of FLUXO_NUTRICAO.perguntas) expect(p.label).toBeTruthy();
    for (const p of FLUXO_TREINO.perguntas) expect(p.index).toBeGreaterThan(0);
  });
});
