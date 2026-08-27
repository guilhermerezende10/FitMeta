import { Link } from "react-router-dom";

/**
 * Card de conteúdo com foto.
 *
 * FM-21: substitui `Item.jsx` e `Estudo.jsx`, que renderizavam o mesmo card.
 * FM-12: o véu sobre a foto é obrigatório e não é opcional na API — texto
 * branco sobre foto só existe com véu por baixo.
 *
 * O card inteiro é um único link (FM-03), nunca um botão dentro de um link.
 */
function PhotoCard({ title, image, meta, to, className = "" }) {
  return (
    <Link
      to={to}
      className={`group relative block aspect-[540/240] overflow-hidden rounded-card shadow-e3 outline-none focus-visible:shadow-focus ${className}`}
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Véu obrigatório — de baixo para cima */}
      <div aria-hidden="true" className="absolute inset-0 bg-scrim" />

      <div className="relative flex h-full flex-col justify-between p-6">
        <h3 className="max-w-[80%] font-display text-display-m text-white">
          {title}
        </h3>

        {meta && (
          <span className="inline-flex w-fit items-center gap-2 rounded-pill border border-white/[0.18] bg-surface-sunken/70 px-3 py-1 text-[12px] leading-4 text-white">
            {meta.icon}
            {meta.label}
          </span>
        )}
      </div>
    </Link>
  );
}

export default PhotoCard;
