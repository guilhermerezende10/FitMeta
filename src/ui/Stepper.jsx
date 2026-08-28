/**
 * Indicador de etapa: círculos numerados ligados por linha.
 * Cumprido vira check no acento; atual ganha anel; pendente fica apagado.
 */
function Stepper({ steps, current, className = "" }) {
  return (
    <ol
      className={`flex items-start justify-center ${className}`}
      aria-label={`Etapa ${current} de ${steps.length}`}
    >
      {steps.map((label, index) => {
        const n = index + 1;
        const done = n < current;
        const isCurrent = n === current;

        return (
          <li key={label} className="flex items-start">
            {index > 0 && (
              <div
                aria-hidden="true"
                className={`mt-[15px] h-0.5 w-14 ${
                  done || isCurrent ? "bg-accent" : "bg-line"
                }`}
              />
            )}

            <div
              className="flex w-28 flex-col items-center gap-2"
              aria-current={isCurrent ? "step" : undefined}
            >
              {done ? (
                <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-accent">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12.5 4.5 4.5L19 7" />
                  </svg>
                </span>
              ) : (
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-pill border-2 text-label font-semibold ${
                    isCurrent
                      ? "border-accent bg-accent-surface text-primary shadow-focus"
                      : "border-line text-muted"
                  }`}
                >
                  {n}
                </span>
              )}

              <span
                className={`text-center text-[12px] leading-4 ${
                  isCurrent
                    ? "font-semibold text-primary"
                    : done
                      ? "font-medium text-secondary"
                      : "font-medium text-muted"
                }`}
              >
                {label}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default Stepper;
