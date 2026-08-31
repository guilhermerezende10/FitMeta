import { describe, it, expect } from "vitest";
import { contagem, categoriaPorSlug, CATEGORIAS } from "./categorias";

describe("contagem — singular e plural", () => {
  it("usa o singular só para 1 — a categoria de nutrição tem um item só", () => {
    expect(contagem(1)).toBe("1 estudo");
  });

  it.each([0, 2, 7, 20])("usa o plural para %i", (n) => {
    expect(contagem(n)).toBe(`${n} estudos`);
  });

  it("zero é plural, não singular", () => {
    expect(contagem(0)).toBe("0 estudos");
  });
});

describe("categoriaPorSlug", () => {
  it("encontra cada categoria pelo próprio slug", () => {
    for (const c of CATEGORIAS) {
      expect(categoriaPorSlug(c.slug)).toBe(c);
    }
  });

  it("devolve undefined para slug inexistente — a tela redireciona nesse caso", () => {
    expect(categoriaPorSlug("nao-existe")).toBeUndefined();
  });

  it("não casa por prefixo nem ignora maiúsculas", () => {
    const primeira = CATEGORIAS[0];
    expect(categoriaPorSlug(primeira.slug.toUpperCase())).toBeUndefined();
    expect(categoriaPorSlug(primeira.slug.slice(0, -1))).toBeUndefined();
  });
});

describe("integridade do catálogo", () => {
  it("os slugs são únicos", () => {
    const slugs = CATEGORIAS.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("toda categoria tem slug e título", () => {
    for (const c of CATEGORIAS) {
      expect(c.slug).toBeTruthy();
      expect(c.titulo).toBeTruthy();
    }
  });
});
