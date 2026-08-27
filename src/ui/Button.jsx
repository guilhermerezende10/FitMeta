import { Link } from "react-router-dom";
import SpinnerMini from "./SpinnerMini";

/**
 * Botão do sistema.
 *
 * FM-03: é sempre UM elemento interativo — `<button>`, `<Link>` ou `<a>`,
 * nunca um dentro do outro.
 * FM-02: o gradiente primário vem do token `bg-gradient-primary`.
 */

const BASE =
  "inline-flex items-center justify-center gap-3 rounded-pill text-body font-medium " +
  "outline-none transition-all focus-visible:shadow-focus disabled:cursor-not-allowed";

const SIZES = {
  md: "h-control px-8",
  sm: "h-10 px-5",
};

const VARIANTS = {
  primary:
    "bg-gradient-primary text-white shadow-glow border border-transparent " +
    "hover:bg-gradient-primary-hover hover:shadow-glow-lg " +
    "active:bg-gradient-primary active:shadow-glow " +
    "disabled:bg-none disabled:bg-surface-raised disabled:border-strong disabled:text-muted disabled:shadow-none",
  secondary:
    "bg-transparent border border-strong text-primary " +
    "hover:bg-surface-raised hover:border-muted " +
    "disabled:border-line disabled:text-muted",
  ghost:
    "bg-transparent border border-transparent px-0 text-accent-on-card " +
    "hover:text-accent-hover disabled:text-muted",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  type = "button",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const classes = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  const isDisabled = disabled || loading;

  const content = loading ? (
    <>
      <SpinnerMini />
      <span className="sr-only">Enviando…</span>
    </>
  ) : (
    children
  );

  // Navegação interna
  if (to && !isDisabled) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  // Link externo
  if (href && !isDisabled) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
}

export default Button;
