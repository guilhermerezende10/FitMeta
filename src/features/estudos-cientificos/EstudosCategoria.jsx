import { Link, Navigate, useParams } from "react-router-dom";
import {
  CATEGORIAS,
  categoriaPorSlug,
  contagem,
  imagemDoEstudo,
} from "./categorias";
import NavIcon from "../../ui/NavIcon";

/**
 * Lista de estudos de uma categoria.
 *
 * FM-20: o campo `source` existia no dado e nunca chegava à tela. Agora
 * aparece no pé de cada estudo.
 * FM-25: a categoria de nutrição tem um item só. Isso é tratado no layout
 * (lista vertical + contagem no singular), sem inventar conteúdo.
 * FM-08: uma das descrições traz `<br>` escrito no meio do texto, que o
 * React renderiza como literal. Viram parágrafos de verdade, sem que a
 * copy mude.
 */

function paragrafos(texto = "") {
  return texto
    .split(/<br\s*\/?>/i)
    .map((parte) => parte.trim())
    .filter(Boolean);
}
function EstudosCategoria() {
  const { categoria } = useParams();
  const cat = categoriaPorSlug(categoria);

  if (!cat) return <Navigate replace to="/estudos" />;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <Link
          to="/estudos"
          className="flex h-8 items-center gap-1.5 self-start rounded-pill pl-2 pr-3 text-body font-medium text-secondary outline-none transition-colors hover:bg-surface-raised hover:text-primary focus-visible:shadow-focus"
        >
          <NavIcon name="voltar" size={18} />
          Estudos
        </Link>

        <div className="flex flex-col gap-2">
          <h1 className="font-display text-display-l text-primary">
            {cat.titulo}
          </h1>
          <p className="text-caption uppercase text-dim">
            {contagem(cat.estudos.length)}
          </p>
        </div>
      </header>

      <nav aria-label="Categorias" className="flex flex-wrap gap-2">
        {CATEGORIAS.map((c) => {
          const ativa = c.slug === cat.slug;
          return (
            <Link
              key={c.slug}
              to={`/estudos/${c.slug}`}
              aria-current={ativa ? "page" : undefined}
              className={`flex h-10 items-center rounded-pill border px-5 text-body font-medium outline-none transition-colors focus-visible:shadow-focus ${
                ativa
                  ? "border-accent bg-accent-surface text-primary"
                  : "border-line text-secondary hover:bg-surface-raised hover:text-primary"
              }`}
            >
              {c.pill}
            </Link>
          );
        })}
      </nav>

      <ul className="flex w-full max-w-[880px] flex-col gap-4">
        {cat.estudos.map((estudo) => (
          <li
            key={estudo.title}
            className="flex items-stretch gap-6 rounded-card border border-line bg-surface p-5 transition-all hover:border-strong hover:bg-surface-raised hover:shadow-e2"
          >
            <div className="relative h-[140px] w-[200px] flex-none overflow-hidden rounded-row bg-surface-raised">
              <img
                src={imagemDoEstudo(estudo.imgSrc)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <h2 className="font-display text-[20px] font-bold leading-7 text-primary">
                {estudo.title}
              </h2>

              <div className="flex flex-col gap-2">
                {paragrafos(estudo.description).map((paragrafo) => (
                  <p
                    key={paragrafo}
                    className="text-left text-body text-secondary [text-wrap:pretty]"
                  >
                    {paragrafo}
                  </p>
                ))}
              </div>

              <div className="mt-auto flex items-end justify-between gap-6 pt-1">
                <p className="flex min-w-0 items-center gap-2">
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
                    className="flex-none text-dim"
                  >
                    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 3v5h5" />
                    <path d="M9 13h6" />
                    <path d="M9 17h4" />
                  </svg>
                  <span className="truncate text-[12px] font-medium leading-4 tracking-[0.02em] text-dim">
                    {estudo.source}
                  </span>
                </p>

                <a
                  href={estudo.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-none items-center gap-1.5 rounded-pill text-body font-medium text-accent-on-card outline-none transition-colors hover:text-accent-hover focus-visible:shadow-focus"
                >
                  Ver estudo
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
                  >
                    <path d="M14 5h5v5" />
                    <path d="M19 5l-8 8" />
                    <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
                  </svg>
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EstudosCategoria;
