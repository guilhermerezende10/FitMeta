import { Link } from "react-router-dom";

/**
 * Card de conteúdo com foto — o card "Explorar" do design.
 *
 * FM-21: substitui Item.jsx e Estudo.jsx, que renderizavam o mesmo card.
 * FM-12: o véu é parte do componente, não um parâmetro. Texto branco sobre
 * foto sem véu não é possível por construção.
 * FM-03: o card inteiro é um único link.
 */
function PhotoCard({ title, image, meta, to, className = "" }) {
  return (
    <Link
      to={to}
      className={`group relative block h-60 overflow-hidden rounded-card outline-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-e3 focus-visible:shadow-focus ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden bg-[#1B2429]">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Véu obrigatório, de baixo para cima */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-surface-sunken/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-scrim-card"
      />

      <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex flex-col items-start gap-3">
        {meta && (
          <span className="flex h-7 items-center gap-2 rounded-pill border border-strong bg-surface/85 px-3">
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
              className="flex-none text-secondary"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7.5V12l3 2" />
            </svg>
            <span className="text-caption uppercase text-secondary">{meta}</span>
          </span>
        )}

        <h3 className="max-w-[420px] font-display text-[24px] font-bold leading-7 text-primary">
          {title}
        </h3>
      </div>
    </Link>
  );
}

export default PhotoCard;
