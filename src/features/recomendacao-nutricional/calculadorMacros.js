export default function calculadorMacros(peso, altura, idade, sexo, treinosSemana, objetivo) {
  // normalizar inputs
  const p = parseFloat(peso);
//   const h = parseFloat(altura);
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
  //
  // Proteina e gordura sao arredondadas ANTES de o carboidrato ser derivado,
  // e a caloria exibida tambem. Sem isso, o carboidrato fechava com os valores
  // continuos, os quatro numeros eram arredondados de forma independente, e a
  // soma dos inteiros que aparecem na tela nao reproduzia a caloria exibida —
  // o erro de cada arredondamento e amplificado pelo multiplicador do macro
  // (0,5 g de gordura vale 4,5 kcal). O desvio ia de -1 a +6 kcal.
  //
  // Derivando o residual dos inteiros, a folga cai para no maximo 2 kcal e
  // fica toda absorvida no carboidrato. A formula nao mudou: proteina segue em
  // 2,0 g/kg e gordura em 0,9 g/kg.
  const caloriasFinal = Math.round(calorias);
  const proteinaFinal = Math.round(p * 2.0);
  const gorduraFinal = Math.round(p * 0.9);
  const carboidratoFinal = Math.round(
    (caloriasFinal - (proteinaFinal * 4 + gorduraFinal * 9)) / 4
  );

  return {
    tmb: Math.round(tmb * 100) / 100,         // mantive duas casas se quiser
    // GET (gasto energetico total) ja era calculado no passo 3 e descartado.
    // Exposto para que a tela possa mostra-lo sem repetir o fator de atividade
    // fora deste modulo. Para objetivo "manter", get e calorias coincidem.
    get: Math.round(get),
    calorias: caloriasFinal,
    proteina: proteinaFinal,
    gordura: gorduraFinal,
    carboidrato: carboidratoFinal
  };
}
