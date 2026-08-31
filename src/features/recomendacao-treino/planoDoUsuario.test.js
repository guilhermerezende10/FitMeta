import { describe, it, expect } from "vitest";
import { planoDoUsuario } from "./planoDoUsuario";
import { treinos } from "../../data/data-recomendacao-treino";

describe("planoDoUsuario — casamento com o catálogo", () => {
  it("encontra o plano correspondente às respostas", () => {
    const alvo = treinos[0];
    const plano = planoDoUsuario({
      freq_treino: `Posso treinar ${alvo.diasDeTreino} vezes por semana`,
      duracao: `${alvo.duracao} minutos`,
    });
    expect(plano).toBe(alvo);
  });

  it("acha um plano para toda combinação existente no catálogo", () => {
    for (const t of treinos) {
      const plano = planoDoUsuario({
        freq_treino: `${t.diasDeTreino} vezes`,
        duracao: `${t.duracao} min`,
      });
      expect(plano).not.toBeNull();
      expect(plano.duracao).toBe(t.duracao);
      expect(plano.diasDeTreino).toBe(t.diasDeTreino);
    }
  });

  it("extrai o número de qualquer texto em volta", () => {
    const a = planoDoUsuario({ freq_treino: "3 vezes", duracao: "45 min" });
    const b = planoDoUsuario({
      freq_treino: "Posso treinar 3 vezes por semana",
      duracao: "Até 45 minutos",
    });
    expect(a).toBe(b);
  });
});

describe("planoDoUsuario — ausência de plano", () => {
  it.each([
    ["null", null],
    ["undefined", undefined],
    ["objeto vazio", {}],
  ])("%s devolve null", (_, entrada) => {
    expect(planoDoUsuario(entrada)).toBeNull();
  });

  it.each([
    ["sem frequência", { duracao: "45 min" }],
    ["sem duração", { freq_treino: "3 vezes" }],
    ["texto sem número", { freq_treino: "sempre", duracao: "bastante" }],
    ["colunas nulas", { freq_treino: null, duracao: null }],
  ])("%s devolve null em vez de quebrar", (_, entrada) => {
    expect(planoDoUsuario(entrada)).toBeNull();
  });

  it("combinação que não existe no catálogo devolve null", () => {
    expect(planoDoUsuario({ freq_treino: "7 vezes", duracao: "999 min" })).toBeNull();
  });

  it("aceita número em vez de texto, como o banco pode devolver", () => {
    const t = treinos[0];
    const plano = planoDoUsuario({
      freq_treino: t.diasDeTreino,
      duracao: t.duracao,
    });
    expect(plano).toBe(t);
  });
});
