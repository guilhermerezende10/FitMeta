import { describe, it, expect } from "vitest";
import { normalizar, ler, gravar, CHAVE } from "./persistencia";

const BASE = {
  infoBasicas: { nome: "", idade: "", peso: "", altura: "", sexo: "" },
  treinoAnswers: {},
  nutricaoAnswers: {},
  pageIndex: 1,
};

const CHEIO = {
  infoBasicas: {
    nome: "Rafa",
    idade: "30",
    peso: "80",
    altura: "178",
    sexo: "masculino",
  },
  treinoAnswers: { 1: "Posso treinar 3 vezes por semana" },
  nutricaoAnswers: { frequencia: 3, objetivo: "perder" },
  pageIndex: 2,
};

/** Storage de mentira, com os mesmos modos de falha do real. */
function storageFake({ conteudo = null, quebrado = false } = {}) {
  let dado = conteudo;
  return {
    getItem: () => {
      if (quebrado) throw new Error("storage bloqueado");
      return dado;
    },
    setItem: (_, v) => {
      if (quebrado) throw new Error("cota excedida");
      dado = v;
    },
    valor: () => dado,
  };
}

describe("normalizar — estado íntegro", () => {
  it("preserva um estado completo", () => {
    expect(normalizar(CHEIO, BASE)).toEqual(CHEIO);
  });

  it("mantém as respostas dos dois fluxos separadas", () => {
    const r = normalizar(CHEIO, BASE);
    expect(r.treinoAnswers).toEqual(CHEIO.treinoAnswers);
    expect(r.nutricaoAnswers).toEqual(CHEIO.nutricaoAnswers);
  });
});

describe("normalizar — entrada inválida cai na base", () => {
  it.each([
    ["null", null],
    ["undefined", undefined],
    ["string", "nada disso"],
    ["número", 42],
    ["array", [1, 2, 3]],
  ])("%s devolve o estado inicial", (_, entrada) => {
    expect(normalizar(entrada, BASE)).toEqual(BASE);
  });
});

describe("normalizar — formato antigo ou parcial", () => {
  it("campo ausente em infoBasicas usa o da base", () => {
    const r = normalizar({ ...CHEIO, infoBasicas: { nome: "Rafa" } }, BASE);
    expect(r.infoBasicas.nome).toBe("Rafa");
    expect(r.infoBasicas.idade).toBe("");
  });

  it("campo numérico em infoBasicas é descartado", () => {
    // Os campos são inputs controlados: um número vindo de um formato antigo
    // quebraria o `.trim()` da etapa 1.
    const r = normalizar({ ...CHEIO, infoBasicas: { ...CHEIO.infoBasicas, idade: 30 } }, BASE);
    expect(r.infoBasicas.idade).toBe("");
  });

  it("não deixa escapar chave desconhecida em infoBasicas", () => {
    const r = normalizar(
      { ...CHEIO, infoBasicas: { ...CHEIO.infoBasicas, apelido: "x" } },
      BASE
    );
    expect(Object.keys(r.infoBasicas).sort()).toEqual([
      "altura",
      "idade",
      "nome",
      "peso",
      "sexo",
    ]);
  });

  it("aproveita o resto quando só uma parte está corrompida", () => {
    const r = normalizar({ ...CHEIO, treinoAnswers: "lixo" }, BASE);
    expect(r.treinoAnswers).toEqual({});
    expect(r.infoBasicas).toEqual(CHEIO.infoBasicas);
    expect(r.pageIndex).toBe(2);
  });

  it.each([0, -1, 1.5, "2", null])("pageIndex inválido (%p) volta para 1", (v) => {
    expect(normalizar({ ...CHEIO, pageIndex: v }, BASE).pageIndex).toBe(1);
  });
});

describe("ler — resiliência", () => {
  it("chave ausente devolve a base", () => {
    expect(ler(storageFake(), BASE)).toEqual(BASE);
  });

  it("JSON inválido devolve a base, sem estourar", () => {
    expect(ler(storageFake({ conteudo: "{isso nao e json" }), BASE)).toEqual(BASE);
  });

  it("storage que lança devolve a base", () => {
    expect(ler(storageFake({ quebrado: true }), BASE)).toEqual(BASE);
  });

  it("storage ausente devolve a base", () => {
    expect(ler(null, BASE)).toEqual(BASE);
    expect(ler(undefined, BASE)).toEqual(BASE);
  });

  it("lê de volta o que foi gravado", () => {
    const s = storageFake();
    gravar(s, CHEIO);
    expect(ler(s, BASE)).toEqual(CHEIO);
  });
});

describe("gravar — resiliência", () => {
  it("grava sob a chave esperada", () => {
    const s = storageFake();
    gravar(s, CHEIO);
    expect(JSON.parse(s.valor())).toEqual(CHEIO);
  });

  it("storage que lança devolve false em vez de propagar", () => {
    expect(gravar(storageFake({ quebrado: true }), CHEIO)).toBe(false);
  });

  it("storage ausente devolve false", () => {
    expect(gravar(null, CHEIO)).toBe(false);
  });

  it("a chave é a do projeto, para não colidir com outra app no mesmo host", () => {
    expect(CHAVE).toBe("fitmeta:formulario");
  });
});

describe("ciclo completo", () => {
  it("gravar o estado inicial deixa o rascunho limpo, como após o RESET", () => {
    const s = storageFake();
    gravar(s, CHEIO);
    gravar(s, BASE);
    expect(ler(s, BASE)).toEqual(BASE);
  });
});
