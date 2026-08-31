import { describe, it, expect } from "vitest";
import { infoBasicasDoBanco } from "./infoBasicasDoBanco";
import { validar } from "./validarInfoBasicas";

const LINHA = { nome: "Rafa", idade: 30, sexo: "masculino", peso: 80.5, altura: 178 };

describe("infoBasicasDoBanco — conversão de tipo", () => {
  it("devolve todos os campos como string", () => {
    const r = infoBasicasDoBanco(LINHA);
    for (const v of Object.values(r)) expect(typeof v).toBe("string");
  });

  it("os números viram texto sem perder o valor", () => {
    const r = infoBasicasDoBanco(LINHA);
    expect(r).toEqual({
      nome: "Rafa",
      idade: "30",
      sexo: "masculino",
      peso: "80.5",
      altura: "178",
    });
  });

  it("o resultado sobrevive ao `.trim()` que a etapa chama", () => {
    // Semear sem converter derrubava a etapa com `idade.trim is not a function`
    // — o mesmo tipo de bug que já apareceu em `preenchido`.
    const r = infoBasicasDoBanco(LINHA);
    for (const v of Object.values(r)) expect(() => v.trim()).not.toThrow();
  });
});

describe("infoBasicasDoBanco — dados incompletos", () => {
  it("coluna nula vira string vazia", () => {
    const r = infoBasicasDoBanco({ ...LINHA, idade: null, sexo: null });
    expect(r.idade).toBe("");
    expect(r.sexo).toBe("");
  });

  it("coluna ausente vira string vazia", () => {
    expect(infoBasicasDoBanco({ nome: "Rafa" })).toEqual({
      nome: "Rafa",
      idade: "",
      sexo: "",
      peso: "",
      altura: "",
    });
  });

  it.each([
    ["null", null],
    ["undefined", undefined],
    ["objeto vazio", {}],
  ])("linha %s devolve os cinco campos vazios, sem estourar", (_, entrada) => {
    expect(infoBasicasDoBanco(entrada)).toEqual({
      nome: "",
      idade: "",
      sexo: "",
      peso: "",
      altura: "",
    });
  });

  it("zero não é confundido com ausência", () => {
    expect(infoBasicasDoBanco({ ...LINHA, peso: 0 }).peso).toBe("0");
  });

  it("devolve exatamente as cinco chaves de infoBasicas", () => {
    expect(Object.keys(infoBasicasDoBanco(LINHA)).sort()).toEqual([
      "altura",
      "idade",
      "nome",
      "peso",
      "sexo",
    ]);
  });
});

describe("infoBasicasDoBanco — integração com a validação", () => {
  it("valores semeados válidos passam pela validação da etapa", () => {
    expect(validar(infoBasicasDoBanco(LINHA))).toEqual({});
  });

  it("linha vazia é reprovada pela validação, como um formulário em branco", () => {
    const erros = validar(infoBasicasDoBanco(null));
    expect(Object.keys(erros).sort()).toEqual(["altura", "idade", "nome", "peso"]);
  });

  it("valor fora de faixa salvo no banco continua sendo acusado", () => {
    const erros = validar(infoBasicasDoBanco({ ...LINHA, idade: 150 }));
    expect(erros).toHaveProperty("idade");
  });
});
