import { describe, it, expect } from "vitest";
import { ehLoginPorSenha, provedoresDaConta } from "./provedores";

describe("provedoresDaConta", () => {
  it("prefere identities, que lista todos os provedores", () => {
    const user = {
      identities: [{ provider: "email" }, { provider: "google" }],
      app_metadata: { provider: "google" },
    };
    expect(provedoresDaConta(user)).toEqual(["email", "google"]);
  });

  it("cai em app_metadata.providers quando não há identities", () => {
    const user = { app_metadata: { providers: ["email", "google"] } };
    expect(provedoresDaConta(user)).toEqual(["email", "google"]);
  });

  it("cai em app_metadata.provider, que guarda só o último usado", () => {
    const user = { app_metadata: { provider: "google" } };
    expect(provedoresDaConta(user)).toEqual(["google"]);
  });

  it.each([[undefined], [null], [{}], [{ app_metadata: {} }]])(
    "não estoura com %s",
    (user) => {
      expect(provedoresDaConta(user)).toEqual([]);
    }
  );
});

describe("ehLoginPorSenha", () => {
  it("conta só do Google não tem senha do FitMeta", () => {
    expect(ehLoginPorSenha({ identities: [{ provider: "google" }] })).toBe(false);
  });

  it("conta de e-mail tem senha", () => {
    expect(ehLoginPorSenha({ identities: [{ provider: "email" }] })).toBe(true);
  });

  it("conta ligada aos dois mantém os formulários", () => {
    const user = {
      identities: [{ provider: "google" }, { provider: "email" }],
    };
    expect(ehLoginPorSenha(user)).toBe(true);
  });

  it.each([[undefined], [{}]])("na dúvida mostra o formulário (%s)", (user) => {
    // Esconder o campo de senha de quem tem senha é um beco sem saída: a
    // pessoa fica sem caminho nenhum para trocá-la. Mostrá-lo para quem não
    // tem produz um erro legível. Esta é a decisão registrada.
    expect(ehLoginPorSenha(user)).toBe(true);
  });
});
