import { describe, it, expect } from "vitest";
import calculadorMacros from "./calculadorMacros";

const SEXOS = ["masculino", "feminino"];
// Um representante de cada uma das 6 faixas etárias da tabela FAO/OMS.
const IDADES = [2, 5, 15, 25, 45, 70];
// Um representante de cada um dos 4 fatores de atividade (1.1, 1.25, 1.35, 1.45).
const TREINOS = [0, 2, 4, 6];
const OBJETIVOS = ["manter", "perder", "ganhar"];
// Extremos e meio das faixas que o formulário aceita (30 a 300 kg).
const PESOS = [30, 80, 150, 300];

function todasAsCombinacoes() {
  const casos = [];
  for (const sexo of SEXOS)
    for (const idade of IDADES)
      for (const treinos of TREINOS)
        for (const objetivo of OBJETIVOS)
          for (const peso of PESOS)
            casos.push({ sexo, idade, treinos, objetivo, peso });
  return casos;
}

const COMBINACOES = todasAsCombinacoes();

describe("calculadorMacros — matriz completa", () => {
  it("cobre 2 sexos x 6 faixas x 4 fatores x 3 objetivos x 4 pesos", () => {
    expect(COMBINACOES).toHaveLength(576);
  });

  it("nunca devolve macro negativo", () => {
    const negativos = COMBINACOES.filter((c) => {
      const r = calculadorMacros(
        c.peso,
        170,
        c.idade,
        c.sexo,
        c.treinos,
        c.objetivo
      );
      return r.proteina < 0 || r.gordura < 0 || r.carboidrato < 0;
    });
    expect(negativos).toEqual([]);
  });

  it("mantém os quatro números coerentes entre si (folga de no máximo 2 kcal)", () => {
    const incoerentes = COMBINACOES.filter((c) => {
      const r = calculadorMacros(
        c.peso,
        170,
        c.idade,
        c.sexo,
        c.treinos,
        c.objetivo
      );
      const soma = r.proteina * 4 + r.gordura * 9 + r.carboidrato * 4;
      return Math.abs(soma - r.calorias) > 2;
    });
    expect(incoerentes).toEqual([]);
  });

  it("respeita o piso e o teto de gordura", () => {
    const forads = COMBINACOES.filter((c) => {
      const r = calculadorMacros(
        c.peso,
        170,
        c.idade,
        c.sexo,
        c.treinos,
        c.objetivo
      );
      const min = Math.round(c.peso * 0.5);
      const ideal = Math.round(c.peso * 0.9);
      return r.gordura < min || r.gordura > ideal;
    });
    expect(forads).toEqual([]);
  });

  it("mantém a proteína em 2,0 g/kg em todos os casos", () => {
    const fora = COMBINACOES.filter((c) => {
      const r = calculadorMacros(
        c.peso,
        170,
        c.idade,
        c.sexo,
        c.treinos,
        c.objetivo
      );
      return r.proteina !== Math.round(c.peso * 2);
    });
    expect(fora).toEqual([]);
  });

  it("devolve inteiros nos macros e nas calorias", () => {
    const naoInteiros = COMBINACOES.filter((c) => {
      const r = calculadorMacros(
        c.peso,
        170,
        c.idade,
        c.sexo,
        c.treinos,
        c.objetivo
      );
      return ![r.calorias, r.proteina, r.gordura, r.carboidrato].every(
        Number.isInteger
      );
    });
    expect(naoInteiros).toEqual([]);
  });
});

describe("calculadorMacros — valores conhecidos", () => {
  it("homem de 25 anos, 80 kg, 3 treinos, manter", () => {
    // TMB = 15.057 * 80 + 692.2 = 1896.76 ; fator 1.25 ; GET = 2370.95
    const r = calculadorMacros(80, 178, 25, "masculino", 3, "manter");
    expect(r.tmb).toBe(1896.76);
    expect(r.get).toBe(2371);
    expect(r.calorias).toBe(2371);
    expect(r.proteina).toBe(160); // 80 * 2,0
    expect(r.gordura).toBe(72); // 80 * 0,9, sem redução
    expect(r.carboidrato).toBe(271); // residual
    expect(r.ajuste).toBeNull();
  });

  it("aceita peso e idade como string, como vêm do formulário", () => {
    const numeros = calculadorMacros(80, 178, 25, "masculino", 3, "manter");
    const textos = calculadorMacros("80", "178", "25", "masculino", 3, "manter");
    expect(textos).toEqual(numeros);
  });

  it("aceita a abreviação de sexo usada no formulário", () => {
    const completo = calculadorMacros(80, 178, 25, "masculino", 3, "manter");
    const abreviado = calculadorMacros(80, 178, 25, "m", 3, "manter");
    expect(abreviado).toEqual(completo);
  });

  it("objetivo desconhecido cai no comportamento de manter", () => {
    const manter = calculadorMacros(80, 178, 25, "masculino", 3, "manter");
    const invalido = calculadorMacros(80, 178, 25, "masculino", 3, "seja-la-o-que-for");
    expect(invalido.calorias).toBe(manter.calorias);
  });

  it("perder e ganhar deslocam a meta em -15% e +10%", () => {
    const base = calculadorMacros(80, 178, 25, "masculino", 3, "manter");
    const perder = calculadorMacros(80, 178, 25, "masculino", 3, "perder");
    const ganhar = calculadorMacros(80, 178, 25, "masculino", 3, "ganhar");
    expect(perder.calorias).toBe(Math.round(base.get * 0.85));
    expect(ganhar.calorias).toBe(Math.round(base.get * 1.1));
  });
});

describe("calculadorMacros — reconciliação (gh#9)", () => {
  it("reduz a gordura quando o carboidrato ficaria abaixo do piso", () => {
    // Peso alto, frequência baixa e objetivo perder: a meta encosta no piso.
    const r = calculadorMacros(150, 175, 65, "masculino", 0, "perder");
    expect(r.gordura).toBeLessThan(Math.round(150 * 0.9));
    expect(r.gordura).toBeGreaterThanOrEqual(Math.round(150 * 0.5));
    expect(r.carboidrato).toBeGreaterThanOrEqual(50);
    expect(r.ajuste).toMatchObject({ gorduraReduzida: true, metaElevada: false });
  });

  it("eleva a meta quando nem no piso de gordura os macros cabem", () => {
    const r = calculadorMacros(300, 175, 70, "feminino", 0, "perder");
    expect(r.gordura).toBe(Math.round(300 * 0.5)); // parou no piso
    expect(r.carboidrato).toBe(0);
    expect(r.calorias).toBe(r.proteina * 4 + r.gordura * 9);
    expect(r.ajuste).toMatchObject({ metaElevada: true });
  });

  it("não sinaliza ajuste quando o plano fecha naturalmente", () => {
    const r = calculadorMacros(70, 175, 25, "masculino", 5, "ganhar");
    expect(r.ajuste).toBeNull();
    expect(r.gordura).toBe(Math.round(70 * 0.9));
  });

  it("o caso que motivou a issue não produz mais carboidrato negativo", () => {
    // Antes da correção, 12.694 das 77.904 combinações do formulário davam
    // carboidrato negativo — todas com peso alto, frequência baixa e "perder".
    for (const peso of [120, 150, 200, 250, 300]) {
      for (const idade of [18, 40, 65, 100]) {
        const r = calculadorMacros(peso, 170, idade, "feminino", 0, "perder");
        expect(r.carboidrato).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
