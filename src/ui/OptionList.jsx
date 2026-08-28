/**
 * Escolha entre opções.
 *
 * Nunca `<input type=radio>` nativo, nunca `<select>` nativo — mas o grupo
 * é anunciado como radiogroup para quem usa leitor de tela, e cada opção
 * é um botão de verdade, alcançável pelo teclado.
 */
function OptionList({ name, question, options, value, onChange, className = "" }) {
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {question && (
        <h2 className="font-display text-display-m text-primary">{question}</h2>
      )}

      <div
        role="radiogroup"
        aria-label={question || name}
        className="flex flex-col gap-3"
      >
        {options.map((option) => {
          const label = typeof option === "string" ? option : option.label;
          const optionValue = typeof option === "string" ? option : option.value;
          const active = value === optionValue;

          return (
            <button
              key={optionValue}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(optionValue)}
              className={`flex h-16 w-full items-center justify-between gap-4 rounded-row border px-5 text-left text-body-l font-medium outline-none transition-colors focus-visible:shadow-focus ${
                active
                  ? "border-accent bg-accent-surface text-primary"
                  : "border-line bg-surface-raised text-secondary hover:border-strong hover:text-primary"
              }`}
            >
              <span>{label}</span>
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 flex-none items-center justify-center rounded-pill border-2 ${
                  active ? "border-accent" : "border-strong"
                }`}
              >
                {active && (
                  <span className="h-2.5 w-2.5 rounded-pill bg-accent" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default OptionList;
