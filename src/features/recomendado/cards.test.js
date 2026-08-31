import { describe, it, expect } from "vitest";
import { PLANOS, EXPLORAR, CARD_DO_PLANO } from "./cards";
import { ITEMS } from "../../ui/sidebar-ativo";

describe("cards — as duas seções levam a lugares diferentes (gh#46)", () => {
  it('"Seu plano" leva ao resultado salvo, nunca ao questionário', () => {
    for (const card of PLANOS) {
      expect(card.to).not.toMatch(/\/formulario\//);
    }
    expect(PLANOS.map((c) => c.to).sort()).toEqual(["/meu-treino", "/minha-nutricao"]);
  });

  it('"Explorar" leva ao questionário, e não ao resultado', () => {
    // Decisão de produto: estes cards convidam a *montar* o plano. Apontá-los
    // para o resultado faria o card prometer uma coisa e entregar outra.
    const montar = EXPLORAR.find((c) => c.id === "montar");
    const nutri = EXPLORAR.find((c) => c.id === "nutri");

    expect(montar.to).toBe("/recomendacao-treino/formulario/iniciar");
    expect(nutri.to).toBe("/recomendacao-nutricional/formulario/iniciar");
  });

  it("o caminho do questionário é completo, não a rota que redireciona", () => {
    // `/recomendacao-treino` deixou de significar "o formulário": hoje leva ao
    // plano salvo. Sem o caminho completo, estes cards mudariam de destino.
    for (const id of ["montar", "nutri"]) {
      const card = EXPLORAR.find((c) => c.id === id);
      expect(card.to).toMatch(/\/formulario\/iniciar$/);
    }
  });
});

describe("cards — integridade", () => {
  it("todo card tem id, título e destino", () => {
    for (const card of [...PLANOS, ...EXPLORAR]) {
      expect(card.id).toBeTruthy();
      expect(card.title).toBeTruthy();
      expect(card.to?.startsWith("/")).toBe(true);
    }
  });

  it("os ids são únicos dentro de cada seção", () => {
    for (const lista of [PLANOS, EXPLORAR]) {
      const ids = lista.map((c) => c.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("CARD_DO_PLANO aponta para cards que existem em Explorar", () => {
    // É o mapa que remove do Explorar o convite a montar um plano que já existe.
    for (const [plano, cardId] of Object.entries(CARD_DO_PLANO)) {
      expect(PLANOS.some((p) => p.id === plano)).toBe(true);
      expect(EXPLORAR.some((c) => c.id === cardId)).toBe(true);
    }
  });
});

describe("navegação lateral (gh#46)", () => {
  it("Treino e Nutrição levam ao plano salvo, não ao questionário", () => {
    const treino = ITEMS.find((i) => i.id === "treino");
    const nutricao = ITEMS.find((i) => i.id === "nutricao");

    expect(treino.to).toBe("/meu-treino");
    expect(nutricao.to).toBe("/minha-nutricao");
  });

  it("nenhum item da barra lateral abre um formulário", () => {
    for (const item of ITEMS) {
      expect(item.to).not.toMatch(/\/formulario\//);
    }
  });
});
