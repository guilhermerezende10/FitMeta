import { describe, it, expect } from "vitest";
import { CONTA, isItemActive, rotaAtiva, ACTIVE_FOR, ITEMS } from "./sidebar-ativo";

describe("isItemActive — rota exata", () => {
  it.each([
    ["home", "/recomendado"],
    ["treino", "/recomendacao-treino"],
    ["nutricao", "/minha-nutricao"],
    ["estudos", "/estudos"],
    ["motivacao", "/motivacional"],
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
    const rotas = ["/recomendado", "/meu-treino", "/minha-nutricao", "/estudos", "/motivacional"];
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

describe("Minha conta — fora de ITEMS de propósito", () => {
  it("nenhum item da barra acende em /perfil", () => {
    // A regressão que importa: a tela de conta não pode acender Nutrição nem
    // qualquer outro item só porque saiu da lista.
    expect(ITEMS.filter((i) => isItemActive(i.id, "/perfil"))).toEqual([]);
  });

  it("nenhum item da barra acende em /meus-dados", () => {
    // Alimenta treino e nutrição, e não pertence a nenhum dos dois.
    expect(ITEMS.filter((i) => isItemActive(i.id, "/meus-dados"))).toEqual([]);
  });

  it("rotaAtiva casa o destino da conta e recusa prefixo parcial", () => {
    expect(rotaAtiva(CONTA.to, "/perfil")).toBe(true);
    expect(rotaAtiva(CONTA.to, "/perfil/senha")).toBe(true);
    expect(rotaAtiva(CONTA.to, "/perfil-x")).toBe(false);
  });

  it("CONTA tem destino absoluto e rótulo", () => {
    expect(CONTA.to.startsWith("/")).toBe(true);
    expect(CONTA.label.trim()).toBeTruthy();
  });
});

describe("ITEMS e ACTIVE_FOR não podem divergir", () => {
  it("todo item da barra tem entrada em ACTIVE_FOR", () => {
    // Sem isso o item existe e nunca acende — é o motivo de os dois viverem
    // no mesmo módulo.
    for (const item of ITEMS) {
      expect(ACTIVE_FOR[item.id], `faltou ACTIVE_FOR para "${item.id}"`).toBeTruthy();
    }
  });

  it("toda entrada de ACTIVE_FOR pertence a um item existente", () => {
    for (const id of Object.keys(ACTIVE_FOR)) {
      expect(ITEMS.some((i) => i.id === id), `ACTIVE_FOR órfão: "${id}"`).toBe(true);
    }
  });

  it("o destino de cada item acende o próprio item", () => {
    for (const item of ITEMS) {
      expect(isItemActive(item.id, item.to), `"${item.id}" não acende em ${item.to}`).toBe(true);
    }
  });

  it("o destino de um item não acende outro", () => {
    for (const item of ITEMS) {
      const acesos = ITEMS.filter((i) => isItemActive(i.id, item.to)).map((i) => i.id);
      expect(acesos).toEqual([item.id]);
    }
  });
});
