export default function calculadorMacros(peso, altura, idade, sexo, treinosSemana, objetivo) {
  // normalizar inputs
  const p = parseFloat(peso);
  const h = parseFloat(altura);
  const i = parseInt(idade, 10);
  const s = String(sexo).toLowerCase();

  // 1) TMB (FAO/OMS) — tabela por faixas etárias (assumindo os coeficientes que você já tem)
  let tmb = 0;
  if (s === "m" || s === "masculino") {
    if (i < 3) tmb = (59.512 * p) - 30.4;
    else if (i < 10) tmb = (22.706 * p) + 504.3;
    else if (i < 18) tmb = (17.686 * p) + 658.2;
    else if (i < 30) tmb = (15.057 * p) + 692.2;
    else if (i < 60) tmb = (11.472 * p) + 873.1;
    else tmb = (11.711 * p) + 587.7;
  } else {
    if (i < 3) tmb = (58.31 * p) - 31.1;
    else if (i < 10) tmb = (20.315 * p) + 485.9;
    else if (i < 18) tmb = (13.384 * p) + 692.6;
    else if (i < 30) tmb = (14.818 * p) + 486.6;
    else if (i < 60) tmb = (8.126 * p) + 845.6;
    else tmb = (9.082 * p) + 658.5;
  }

  // 2) Fator de atividade (ajustado)
  let fator;
  if (treinosSemana <= 1) fator = 1.1;
  else if (treinosSemana <= 3) fator = 1.25;
  else if (treinosSemana <= 5) fator = 1.35;
  else fator = 1.45;

  // 3) GET
  const get = tmb * fator;

  // 4) ajuste por objetivo
  let calorias;
  if (objetivo === "manter") calorias = get;
  else if (objetivo === "perder") calorias = get * 0.85;
  else if (objetivo === "ganhar") calorias = get * 1.1;
  else calorias = get;

  // 5) macronutrientes
  const proteina = p * 2.0;
  const gordura = p * 0.9;
  const kcalProteina = proteina * 4;
  const kcalGordura = gordura * 9;
  const carboidrato = (calorias - (kcalProteina + kcalGordura)) / 4;

  return {
    tmb: Math.round(tmb * 100) / 100,         // mantive duas casas se quiser
    calorias: Math.round(calorias),
    proteina: Math.round(proteina),
    gordura: Math.round(gordura),
    carboidrato: Math.round(carboidrato)
  };
}
