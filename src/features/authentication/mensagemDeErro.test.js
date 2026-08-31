import { describe, it, expect } from "vitest";
import { mensagemDeErroDeLogin, mensagemDeErroDoGoogle } from "./mensagemDeErro";

describe("mensagemDeErroDeLogin — causas distintas, mensagens distintas", () => {
  it("credencial inválida continua dizendo o que dizia", () => {
    expect(mensagemDeErroDeLogin(new Error("Invalid login credentials"))).toBe(
      "E-mail ou senha incorretos."
    );
  });

  it("e-mail não confirmado deixa de virar 'senha incorreta'", () => {
    // Era o caso mais cruel: a pessoa trocava a senha várias vezes sem
    // entender, porque o app afirmava a causa errada.
    const m = mensagemDeErroDeLogin(new Error("Email not confirmed"));
    expect(m).toMatch(/confirme seu e-mail/i);
    expect(m).not.toMatch(/senha/i);
  });

  it("rate limit avisa para aguardar, em vez de acusar a senha", () => {
    const m = mensagemDeErroDeLogin(new Error("Request rate limit reached"));
    expect(m).toMatch(/tentativas/i);
    expect(m).not.toMatch(/incorret/i);
  });

  it("falha de rede fala de conexão, não de credencial", () => {
    const m = mensagemDeErroDeLogin(new TypeError("Failed to fetch"));
    expect(m).toMatch(/conexão|servidor/i);
    expect(m).not.toMatch(/incorret/i);
  });
});

describe("mensagemDeErroDeLogin — casos de borda", () => {
  it.each([
    ["null", null],
    ["undefined", undefined],
    ["objeto sem message", {}],
  ])("%s devolve uma frase utilizável", (_, erro) => {
    const m = mensagemDeErroDeLogin(erro);
    expect(typeof m).toBe("string");
    expect(m.length).toBeGreaterThan(0);
  });

  it("erro desconhecido mostra o texto do servidor em vez de inventar a causa", () => {
    expect(mensagemDeErroDeLogin(new Error("Database is on fire"))).toBe(
      "Database is on fire"
    );
  });

  it("nunca devolve string vazia", () => {
    for (const erro of [null, {}, new Error(""), new Error("qualquer coisa")]) {
      expect(mensagemDeErroDeLogin(erro).trim()).not.toBe("");
    }
  });
});

describe("mensagemDeErroDoGoogle", () => {
  it("falha de rede fala de conexão", () => {
    expect(mensagemDeErroDoGoogle(new Error("NetworkError"))).toMatch(
      /conexão|servidor/i
    );
  });

  it("erro do provedor aparece junto da explicação", () => {
    const m = mensagemDeErroDoGoogle(new Error("Provider not enabled"));
    expect(m).toMatch(/google/i);
    expect(m).toMatch(/Provider not enabled/);
  });

  it("erro sem mensagem ainda produz aviso utilizável", () => {
    const m = mensagemDeErroDoGoogle(undefined);
    expect(m).toMatch(/google/i);
    expect(m.length).toBeGreaterThan(0);
  });
});
