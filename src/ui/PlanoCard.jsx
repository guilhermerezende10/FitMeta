import { Link } from "react-router-dom";
import NavIcon from "./NavIcon";

/**
 * Card de plano salvo — sem foto, com brilho de acento no canto superior
 * esquerdo e a ação "Abrir" no pé.
 */
function PlanoCard({ title, description, icon, to, className = "" }) {
  return (
    <Link
      to={to}
      className={`group relative flex h-60 flex-col overflow-hidden rounded-card border border-line bg-surface p-6 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-e3 focus-visible:shadow-focus ${className}`}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-plano-glow" />

      <div className="relative flex flex-col gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-field bg-accent-surface text-accent-on-card">
          <NavIcon name={icon} />
        </span>

        <span className="flex flex-col gap-2">
          <span className="font-display text-[24px] font-bold leading-7 text-primary">
            {title}
          </span>
          <span className="text-body text-secondary">{description}</span>
        </span>
      </div>

      <span className="relative mt-auto flex items-center justify-end gap-2 text-body font-medium text-accent-on-card">
        Abrir
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        >
          <path d="m10 6 6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

export default PlanoCard;
