import { Link } from "react-router-dom";
import {
  CATEGORIAS,
  contagem,
  imagemDoEstudo,
} from "../features/estudos-cientificos/categorias";

/**
 * Hub de estudos.
 *
 * FM-22: o card mostra quantos estudos a categoria tem, no lugar do
 * "5 min" que era idêntico em todos e não vinha de lugar nenhum.
 */
function EstudosCientificos() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-display-l text-primary">
          Estudos Científicos
        </h1>
        <p className="text-body text-secondary">
          Pesquisa revisada por pares, resumida em português.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {CATEGORIAS.map((cat) => (
          <Link
            key={cat.slug}
            to={`/estudos/${cat.slug}`}
            className="group relative block h-60 overflow-hidden rounded-card outline-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-e3 focus-visible:shadow-focus"
          >
            <div className="absolute inset-0 overflow-hidden bg-[#1B2429]">
              <img
                src={imagemDoEstudo(cat.estudos[0]?.imgSrc)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-surface-sunken/35"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-scrim-card"
            />

            <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex flex-col items-start gap-3">
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
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
                  <path d="M14 3v5h5" />
                  <path d="M9 13h6" />
                  <path d="M9 17h4" />
                </svg>
                <span className="text-caption uppercase text-secondary">
                  {contagem(cat.estudos.length)}
                </span>
              </span>

              <h2 className="max-w-[420px] font-display text-[24px] font-bold leading-7 text-primary">
                {cat.titulo}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EstudosCientificos;
