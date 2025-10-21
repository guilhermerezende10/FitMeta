export default function calculadorMacros(peso, altura, idade, sexo, treinosSemana, objetivo) {
  // 1️⃣ TMB (Mifflin-St Jeor)
  const tmb = (10 * peso) + (6.25 * altura) - (5 * idade) + (sexo.toLowerCase() === "m" ? 5 : -161);

  // 2️⃣ Fator de atividade mais realista pra musculação
  let fator;
  if (treinosSemana <= 1) fator = 1.1;
  else if (treinosSemana <= 3) fator = 1.25;
  else if (treinosSemana <= 5) fator = 1.35;
  else fator = 1.45;

  // 3️⃣ Gasto total (GET)
  const get = tmb * fator;

  // 4️⃣ Ajuste pelo objetivo
  let calorias;
  if(objetivo ==="manter") calorias = get * fator;
  else if (objetivo === "perder") calorias = get * fator * 0.85;
  else if (objetivo === "ganhar") calorias = get * fator * 1.1;
  else calorias = get;

  // 5️⃣ Macronutrientes base
  const proteina = peso * 2.0;
  const gordura = peso * 0.9;
  const kcalProteina = proteina * 4;
  const kcalGordura = gordura * 9;
  const carboidrato = (calorias - (kcalProteina + kcalGordura)) / 5;

  return {
    tmb: Math.round(tmb),
    //fator,
    calorias: Math.round(calorias),
    proteina: Math.round(proteina),
    gordura: Math.round(gordura),
    carboidrato: Math.round(carboidrato)
  };
}