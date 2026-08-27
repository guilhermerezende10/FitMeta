import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Brand from "../../ui/Brand";
import Button from "../../ui/Button";
import NavIcon from "../../ui/NavIcon";
import {
  POLITICA,
  TERMOS,
  ULTIMA_ATUALIZACAO,
  EMAIL_CONTATO,
  ENDERECO_CONTATO,
} from "./legalDocs";

/**
 * Template de documento legal.
 *
 * FM-18: Política e Termos não herdam mais o layout de autenticação — têm
 * cabeçalho próprio, índice lateral e coluna de leitura de 700px.
 * FM-17: o botão de voltar é um `<button>`, não uma `<div onClick>`.
 */

const DOCS = [POLITICA, TERMOS];

function Paragrafo({ children }) {
  return (
    <p className="max-w-[570px] text-body-long text-secondary [text-wrap:pretty]">
      {children}
    </p>
  );
}

function Bloco({ bloco }) {
  if (bloco.type === "p") return <Paragrafo>{bloco.text}</Paragrafo>;

  if (bloco.type === "p-email")
    return (
      <Paragrafo>
        {bloco.text}
        <a
          href={`mailto:${bloco.email}`}
          className="text-accent-on-card underline underline-offset-2 hover:text-accent-hover"
        >
          {bloco.email}
        </a>
        {bloco.depois}
      </Paragrafo>
    );

  if (bloco.type === "ul")
    return (
      <ul className="flex flex-col gap-3">
        {bloco.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-3 h-1 w-1 flex-none bg-accent"
            />
            <span className="max-w-[558px] text-body-long text-secondary">
              {item}
            </span>
          </li>
        ))}
      </ul>
    );

  if (bloco.type === "contato")
    return (
      <div className="flex flex-col gap-4 rounded-row border border-line bg-surface p-6">
        <p className="flex items-center gap-3 text-body-long text-secondary">
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
            className="flex-none text-muted"
          >
            <rect x="2.5" y="5" width="19" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          <a
            href={`mailto:${EMAIL_CONTATO}`}
            className="text-accent-on-card underline underline-offset-2 hover:text-accent-hover"
          >
            {EMAIL_CONTATO}
          </a>
        </p>
        <p className="flex items-center gap-3 text-body-long text-secondary">
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
            className="flex-none text-muted"
          >
            <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {ENDERECO_CONTATO}
        </p>
      </div>
    );

  return null;
}

function LegalDocument({ doc }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [progresso, setProgresso] = useState(0);
  const [ativa, setAtiva] = useState(doc.secoes[0]?.n ?? 1);

  // O documento troca: volta ao topo e reinicia o índice.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: 0 });
    setProgresso(0);
    setAtiva(doc.secoes[0]?.n ?? 1);
  }, [doc]);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;

    const max = el.scrollHeight - el.clientHeight;
    setProgresso(max > 0 ? Math.min(1, el.scrollTop / max) : 0);

    const topo = el.getBoundingClientRect().top;
    let atual = null;
    el.querySelectorAll("[data-sec]").forEach((s) => {
      if (s.getBoundingClientRect().top - topo <= 140)
        atual = Number(s.getAttribute("data-sec"));
    });
    setAtiva(atual || doc.secoes[0]?.n || 1);
  }

  function irPara(n) {
    const el = scrollRef.current;
    if (!el) return;
    const sec = el.querySelector(`[data-sec="${n}"]`);
    if (!sec) return;
    const offset =
      el.scrollTop +
      sec.getBoundingClientRect().top -
      el.getBoundingClientRect().top -
      32;
    el.scrollTo({ top: offset, behavior: "smooth" });
    setAtiva(n);
  }

  return (
    <div className="flex h-screen flex-col bg-canvas">
      <header className="relative flex h-16 flex-none items-center justify-between border-b border-line px-8">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex h-10 items-center gap-2 rounded-pill border border-strong pl-3 pr-4 text-body font-medium text-primary outline-none transition-colors hover:border-muted hover:bg-surface focus-visible:shadow-focus"
          >
            <NavIcon name="voltar" size={18} />
            Voltar
          </button>
          <Brand />
        </div>

        <nav
          aria-label="Documentos"
          className="flex gap-1 rounded-pill border border-line p-1"
        >
          {DOCS.map((d) => {
            const atual = d.slug === doc.slug;
            return (
              <Link
                key={d.slug}
                to={d.rota}
                aria-current={atual ? "page" : undefined}
                className={`flex h-9 items-center rounded-pill border px-5 text-label font-medium outline-none transition-colors focus-visible:shadow-focus ${
                  atual
                    ? "border-accent bg-accent-surface text-primary"
                    : "border-transparent text-secondary hover:text-primary"
                }`}
              >
                {d.titulo}
              </Link>
            );
          })}
        </nav>

        <div
          aria-hidden="true"
          className="absolute -bottom-px left-0 h-0.5 bg-accent transition-[width]"
          style={{ width: `${Math.round(progresso * 100)}%` }}
        />
      </header>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-8 pb-24 pt-12"
      >
        <div className="flex items-start justify-center gap-16">
          <article className="flex w-full max-w-doc flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h1 className="font-display text-display-l text-primary">
                {doc.titulo}
              </h1>
              <p className="self-start rounded-pill border border-line bg-surface px-3 py-1.5 text-caption uppercase text-secondary">
                Última atualização: {ULTIMA_ATUALIZACAO}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {doc.intro.map((texto) => (
                <Paragrafo key={texto}>{texto}</Paragrafo>
              ))}
            </div>

            {doc.secoes.map((sec) => (
              <section
                key={sec.n}
                data-sec={sec.n}
                className="flex flex-col gap-4"
              >
                <h2 className="flex items-baseline gap-3 font-display text-display-m">
                  <span className="text-accent-on-card">{sec.n}</span>
                  <span className="text-primary">{sec.titulo}</span>
                </h2>
                {sec.blocos.map((bloco, i) => (
                  <Bloco key={i} bloco={bloco} />
                ))}
              </section>
            ))}

            <div className="flex flex-col items-start gap-6 rounded-row bg-accent-surface p-8">
              <p className="max-w-[60ch] text-body-long font-medium text-primary">
                {doc.fechamento}
              </p>
              <Button to="/registrar">Voltar ao cadastro</Button>
            </div>
          </article>

          <nav
            aria-label="Nesta página"
            className="sticky top-8 hidden w-[220px] flex-none flex-col gap-3 xl:flex"
          >
            <p className="text-caption uppercase text-muted">Nesta página</p>
            <div className="flex flex-col">
              {doc.secoes.map((sec) => {
                const atual = sec.n === ativa;
                return (
                  <button
                    key={sec.n}
                    type="button"
                    onClick={() => irPara(sec.n)}
                    className={`border-l-2 py-2.5 pl-3 text-left text-label font-medium outline-none transition-colors focus-visible:shadow-focus ${
                      atual
                        ? "border-accent text-primary"
                        : "border-transparent text-secondary hover:text-primary"
                    }`}
                  >
                    {sec.n}. {sec.titulo}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default LegalDocument;
