import { describe, it, expect } from "vitest";
import { validar } from "./validarInfoBasicas";

const VALIDO = { nome: "Rafa", idade: 30, peso: 80, altura: 178 };

describe("validar — caso feliz", () => {
  it("não acusa erro com dados dentro das faixas", () => {
    expect(validar(VALIDO)).toEqual({});
  });

  it("aceita os valores como string, que é o que o input devolve", () => {
    expect(validar({ nome: "Rafa", idade: "30", peso: "80", altura: "178" })).toEqual({});
  });
});

describe("validar — nome", () => {
  it.each([
    ["vazio", ""],
    ["só espaços", "   "],
    ["undefined", undefined],
    ["null", null],
  ])("acusa nome %s", (_, nome) => {
    expect(validar({ ...VALIDO, nome })).toHaveProperty("nome");
  });
});

describe("validar — limites das faixas", () => {
  // Os limites são inclusivos: 10 e 100 passam, 9 e 101 não.
  it.each([
    ["idade", "idade", 9, 10, 100, 101],
    ["peso", "peso", 29, 30, 300, 301],
    ["altura", "altura", 99, 100, 250, 251],
  ])("%s: rejeita fora, aceita nos extremos", (_, campo, abaixo, min, max, acima) => {
    expect(validar({ ...VALIDO, [campo]: abaixo })).toHaveProperty(campo);
    expect(validar({ ...VALIDO, [campo]: min })).not.toHaveProperty(campo);
    expect(validar({ ...VALIDO, [campo]: max })).not.toHaveProperty(campo);
    expect(validar({ ...VALIDO, [campo]: acima })).toHaveProperty(campo);
  });

  it.each(["idade", "peso", "altura"])("acusa %s vazia", (campo) => {
    expect(validar({ ...VALIDO, [campo]: "" })).toHaveProperty(campo);
  });

  it.each(["idade", "peso", "altura"])("acusa %s não numérica", (campo) => {
    expect(validar({ ...VALIDO, [campo]: "abc" })).toHaveProperty(campo);
  });

  it("acumula todos os erros de uma vez", () => {
    const erros = validar({ nome: "", idade: 5, peso: 1, altura: 10 });
    expect(Object.keys(erros).sort()).toEqual(["altura", "idade", "nome", "peso"]);
  });
});

describe("validar — subconjunto de campos", () => {
  const CORPO = ["idade", "sexo", "peso", "altura"];

  it("não exige o que não está na tela", () => {
    // A tela de dados corporais não mostra o nome. Sem o filtro, quem entrou
    // pelo Google e tem nome vazio ficaria travado num campo invisível.
    expect(validar({ ...VALIDO, nome: "" }, CORPO)).toEqual({});
  });

  it("continua validando o que está na tela", () => {
    expect(validar({ ...VALIDO, nome: "", peso: 500 }, CORPO)).toEqual({
      peso: "Informe um peso entre 30 e 300 kg.",
    });
  });

  it("sem o segundo argumento, o comportamento é o de sempre", () => {
    // Protege o questionário de uma futura inversão do default.
    expect(validar({ ...VALIDO, nome: "" })).toEqual({
      nome: "Informe seu nome.",
    });
  });

  it("lista vazia não valida nada", () => {
    expect(validar({ nome: "", idade: 0, peso: 0, altura: 0 }, [])).toEqual({});
  });
});
