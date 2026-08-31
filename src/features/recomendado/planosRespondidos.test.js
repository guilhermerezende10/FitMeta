import { describe, it, expect } from "vitest";
import { planosRespondidos } from "./planosRespondidos";

const TREINO = { freq_treino: "Posso treinar 3 vezes por semana", duracao: "45 min" };
const NUTRICAO = { objetivo: "perder", frequencia: 3 };

describe("planosRespondidos — os dois respondidos", () => {
  it("lista treino e nutrição", () => {
    expect(planosRespondidos(TREINO, NUTRICAO).sort()).toEqual(["nutricao", "treino"]);
  });
});

describe("planosRespondidos — um ou nenhum", () => {
  it("só treino", () => {
    expect(planosRespondidos(TREINO, null)).toEqual(["treino"]);
  });

  it("só nutrição", () => {
    expect(planosRespondidos(null, NUTRICAO)).toEqual(["nutricao"]);
  });

  it.each([
    ["ambos nulos", null, null],
    ["ambos undefined", undefined, undefined],
    ["objetos vazios", {}, {}],
  ])("%s devolve lista vazia", (_, t, n) => {
    expect(planosRespondidos(t, n)).toEqual([]);
  });
});

describe("planosRespondidos — resposta incompleta não conta", () => {
  it.each([
    ["treino sem duração", { freq_treino: "3 vezes" }],
    ["treino sem frequência", { duracao: "45 min" }],
    ["treino com campo vazio", { freq_treino: "", duracao: "45 min" }],
    ["treino com campo em branco", { freq_treino: "   ", duracao: "45 min" }],
  ])("%s não entra na lista", (_, t) => {
    expect(planosRespondidos(t, null)).toEqual([]);
  });

  it.each([
    ["nutrição sem frequência", { objetivo: "perder" }],
    ["nutrição sem objetivo", { frequencia: 3 }],
    ["nutrição com objetivo vazio", { objetivo: "", frequencia: 3 }],
  ])("%s não entra na lista", (_, n) => {
    expect(planosRespondidos(null, n)).toEqual([]);
  });
});

describe("planosRespondidos — tipos", () => {
  it("frequência numérica conta como preenchida", () => {
    // `nutricao_answers.frequencia` é número, não texto — a checagem antiga
    // chamava `.trim()` em tudo e estourava.
    expect(planosRespondidos(null, { objetivo: "perder", frequencia: 1 })).toEqual([
      "nutricao",
    ]);
  });

  it("a ordem é sempre treino antes de nutrição", () => {
    expect(planosRespondidos(TREINO, NUTRICAO)).toEqual(["treino", "nutricao"]);
  });
});
