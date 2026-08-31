import { describe, it, expect } from "vitest";
import { paragrafos } from "./paragrafos";

describe("paragrafos — separação", () => {
  it("quebra em <br>", () => {
    expect(paragrafos("um<br>dois")).toEqual(["um", "dois"]);
  });

  it.each(["<br>", "<br/>", "<br />", "<BR>", "<Br />"])(
    "reconhece a variação %s",
    (tag) => {
      expect(paragrafos(`um${tag}dois`)).toEqual(["um", "dois"]);
    }
  );

  it("apara o espaço em volta de cada parágrafo", () => {
    expect(paragrafos("  um  <br>  dois  ")).toEqual(["um", "dois"]);
  });

  it("descarta parágrafos vazios de <br> seguidos", () => {
    expect(paragrafos("um<br><br>dois")).toEqual(["um", "dois"]);
  });
});

describe("paragrafos — casos de borda", () => {
  it("texto sem <br> vira um parágrafo só", () => {
    expect(paragrafos("parágrafo único")).toEqual(["parágrafo único"]);
  });

  it("string vazia devolve lista vazia", () => {
    expect(paragrafos("")).toEqual([]);
  });

  it("sem argumento devolve lista vazia — o default cobre copy ausente", () => {
    expect(paragrafos()).toEqual([]);
  });

  it("só espaços e <br> devolve lista vazia", () => {
    expect(paragrafos("  <br>  <br> ")).toEqual([]);
  });

  it("nunca devolve entrada em branco", () => {
    const r = paragrafos("a<br> <br>b<br><br>");
    expect(r.every((p) => p.trim() !== "")).toBe(true);
    expect(r).toEqual(["a", "b"]);
  });
});
