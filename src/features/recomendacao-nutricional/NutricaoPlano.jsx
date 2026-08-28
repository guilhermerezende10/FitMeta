import Card from "../../ui/Card";
import Button from "../../ui/Button";

/**
 * Resultado nutricional.
 *
 * Os números vêm exatamente como `calculadorMacros` os devolve — nenhuma
 * conta é refeita aqui. A diferença entre a soma dos macros e a caloria
 * apresentada está apurada e registrada em gh#4.
 *
 * O GET não é exibido porque a função não o expõe (ver gh#5); mostrar
 * exigiria recalcular, e a regra é não inventar cálculo na tela.
 */

const MACROS = [
  { chave: "proteina", nome: "Proteína", cor: "#9956D6", kcalPorGrama: 4 },
  { chave: "carboidrato", nome: "Carboidrato", cor: "#00A99D", kcalPorGrama: 4 },
  { chave: "gordura", nome: "Gordura", cor: "#E46D00", kcalPorGrama: 9 },
];

const OBJETIVO_ROTULO = {
  ganhar: "Ganhar peso",
  manter: "Manter peso",
  perder: "Perder peso",
};

function frequenciaRotulo(freq) {
  const n = Number(freq);
  if (n === 1) return "1x por semana";
  if (n === 3) return "2 a 3x por semana";
  if (n === 5) return "4 a 5x por semana";
  return null;
}

function NutricaoPlano({ resultado, objetivo, frequencia, recemCriado }) {
  const linhas = MACROS.map((m) => {
    const gramas = resultado[m.chave] ?? 0;
    return { ...m, gramas, kcal: gramas * m.kcalPorGrama };
  });

  const totalKcalMacros = linhas.reduce((soma, l) => soma + l.kcal, 0) || 1;

  const pills = [
    OBJETIVO_ROTULO[objetivo] || null,
    frequenciaRotulo(frequencia),
  ].filter(Boolean);

  return (
    <div className="flex flex-col gap-8">
      {recemCriado && (
        <p className="flex h-8 items-center gap-2 self-start rounded-pill border border-accent bg-accent-surface px-4">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-accent-on-card"
          >
            <path d="m5 12.5 4.5 4.5L19 7" />
          </svg>
          <span className="text-label text-primary">Recomendação criada</span>
        </p>
      )}

      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-display-l text-primary">
            Minha nutrição
          </h1>
          {pills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {pills.map((p) => (
                <span
                  key={p}
                  className="flex h-7 items-center rounded-pill bg-surface-raised px-3 text-caption uppercase text-secondary"
                >
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>

        <Button
          variant="secondary"
          to="/recomendacao-nutricional/formulario/iniciar"
          className="flex-none"
        >
          Refazer questionário
        </Button>
      </div>

      <Card className="flex flex-wrap items-center justify-between gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-caption uppercase text-dim">Meta diária</span>
          <span className="flex items-baseline gap-2">
            <span className="font-display text-display-xl tabular-nums text-primary">
              {resultado.calorias}
            </span>
            <span className="font-display text-[24px] font-bold leading-7 text-secondary">
              kcal
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-caption uppercase text-dim">TMB</span>
          <span className="text-title tabular-nums text-primary">
            {Math.round(resultado.tmb)} kcal
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-caption uppercase text-dim">GET</span>
          <span className="text-title tabular-nums text-primary">
            {resultado.get} kcal
          </span>
        </div>
      </Card>

      <Card className="flex flex-col gap-6">
        <div
          aria-hidden="true"
          className="flex h-4 w-full overflow-hidden rounded-pill"
        >
          {linhas.map((l) => (
            <span
              key={l.chave}
              style={{
                width: `${(l.kcal / totalKcalMacros) * 100}%`,
                background: l.cor,
              }}
            />
          ))}
        </div>

        <ul className="flex flex-col">
          {linhas.map((l) => (
            <li
              key={l.chave}
              className="flex items-center gap-4 border-t border-line py-3"
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 flex-none rounded-pill"
                style={{ background: l.cor }}
              />
              <span className="flex-1 text-body font-medium text-primary">
                {l.nome}
              </span>
              <span className="font-display text-[24px] font-bold leading-6 tabular-nums text-primary">
                {l.gramas} g
              </span>
              <span className="w-24 text-right text-caption uppercase tabular-nums text-dim">
                {l.kcal} kcal
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="flex items-start gap-4 px-6 py-5">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="mt-0.5 flex-none text-accent-on-card"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5" />
          <path d="M12 7.5v.01" />
        </svg>
        <p className="text-body text-secondary">
          Valores estimados pela fórmula FAO/OMS. Ajuste conforme sua resposta
          ao longo das semanas.
        </p>
      </Card>
    </div>
  );
}

export default NutricaoPlano;
