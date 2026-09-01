import { forwardRef, useId } from "react";

/**
 * Campo de texto do sistema.
 *
 * FM-13: o rótulo é sempre visível e associado ao campo. Placeholder não
 * substitui rótulo — quando o usuário digita, o rótulo continua lá.
 *
 * `tone` diz sobre que superfície o campo está: sobre a página (`canvas`)
 * o campo é `surface`; dentro de um card ele inverte, para não sumir.
 */

const TONES = {
  canvas: "bg-surface",
  card: "bg-canvas",
};

const Field = forwardRef(function Field(
  {
    label,
    id,
    error,
    hint,
    unit,
    tone = "canvas",
    className = "",
    // Deixa o rótulo assumir outra escala sem deixar de ser rótulo. Serve a
    // quem já anuncia o campo pelo título do bloco: em vez de esconder o
    // rótulo — ou repeti-lo logo abaixo do título —, o título vira o rótulo.
    labelClassName = "",
    trailing,
    ...props
  },
  ref
) {
  const autoId = useId();
  const fieldId = id || `fm-${autoId}`;
  const errorId = `${fieldId}-erro`;
  const hintId = `${fieldId}-dica`;

  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  const borderClass = error
    ? "border-danger focus:border-danger focus:shadow-none"
    : "border-line focus:border-accent focus:shadow-focus";

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={fieldId}
        className={
          labelClassName ||
          `text-caption uppercase ${error ? "text-danger" : "text-muted"}`
        }
      >
        {label}
      </label>

      <div className="relative flex">
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`h-control w-full rounded-field border ${borderClass} ${TONES[tone]} px-4 text-body text-primary outline-none transition-shadow placeholder:text-faint ${
            unit || trailing ? "pr-14" : ""
          }`}
          {...props}
        />

        {unit && (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-body text-muted">
            {unit}
          </span>
        )}

        {trailing}
      </div>

      {error && (
        <p
          id={errorId}
          className="flex items-center gap-2 text-label text-danger"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="flex-none"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5" />
            <path d="M12 16.5v.01" />
          </svg>
          {error}
        </p>
      )}

      {hint && !error && (
        <p id={hintId} className="text-label text-muted">
          {hint}
        </p>
      )}
    </div>
  );
});

/** Botão de mostrar/esconder senha, para usar no `trailing` do Field. */
export function PasswordToggle({ visible, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={visible ? "Esconder senha" : "Mostrar senha"}
      className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-field-sm text-muted outline-none transition-colors hover:bg-surface-raised hover:text-primary focus-visible:shadow-focus"
    >
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
      >
        <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
        <circle cx="12" cy="12" r="3" />
        {visible && <path d="M4 20 20 4" />}
      </svg>
    </button>
  );
}

export default Field;
