import { describe, it, expect } from "vitest";
import { isItemActive, ACTIVE_FOR } from "./sidebar-ativo";

describe("isItemActive — rota exata", () => {
  it.each([
    ["home", "/recomendado"],
    ["treino", "/recomendacao-treino"],
    ["nutricao", "/minha-nutricao"],
    ["estudos", "/estudos"],
    ["motivacao", "/motivacional"],
    ["perfil", "/perfil"],
  ])("acende %s em %s", (id, rota) => {
    expect(isItemActive(id, rota)).toBe(true);
  });
});

describe("isItemActive — sub-rotas", () => {
  it("mantém o item aceso no resultado do fluxo", () => {
    expect(isItemActive("treino", "/recomendacao-treino/formulario/resultado")).toBe(true);
    expect(isItemActive("nutricao", "/recomendacao-nutricional/formulario/questions")).toBe(true);
    expect(isItemActive("estudos", "/estudos/frequencia")).toBe(true);
  });

  it("o item de treino cobre também /meu-treino", () => {
    expect(isItemActive("treino", "/meu-treino")).toBe(true);
  });
});

describe("isItemActive — não acende onde não deve", () => {
  it("só um item acende por rota", () => {
    const rotas = ["/recomendado", "/meu-treino", "/minha-nutricao", "/estudos", "/motivacional", "/perfil"];
    for (const rota of rotas) {
      const acesos = Object.keys(ACTIVE_FOR).filter((id) => isItemActive(id, rota));
      expect(acesos).toHaveLength(1);
    }
  });

  it("prefixo parcial não conta — /estudos-x não acende /estudos", () => {
    expect(isItemActive("estudos", "/estudos-x")).toBe(false);
  });

  it("id desconhecido devolve false em vez de estourar", () => {
    expect(isItemActive("nao-existe", "/recomendado")).toBe(false);
  });

  it("rota fora do mapa não acende nada", () => {
    const acesos = Object.keys(ACTIVE_FOR).filter((id) => isItemActive(id, "/login"));
    expect(acesos).toEqual([]);
  });
});
