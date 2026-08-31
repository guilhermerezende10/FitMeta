import { useState } from "react";
import { pessoas } from "../data/data-motivacional";

/**
 * Área motivacional.
 *
 * FM-26: a história do Ramon Dino trazia `**` de markdown escrito no meio
 * do texto, que aparecia como asterisco na tela. Saiu do dado.
 *
 * O carrossel automático dá lugar a navegação explícita: setas, contador e
 * a fila de atletas — o usuário controla o ritmo da leitura.
 */

const imagens = import.meta.glob("../data/motivacional/*.jpg", {
  eager: true,
  import: "default",
});

/**
 * gh#18: a fila mostra 20 círculos de 40px e usava o mesmo JPEG em resolução
 * cheia da foto principal — 1,5 MB para desenhar as miniaturas. As versões de
 * 96px em WebP somam 28 KB, geradas por `scripts/gerar-miniaturas.mjs` e
 * versionadas junto das originais.
 */
const miniaturas = import.meta.glob("../data/motivacional/thumbs/*.webp", {
  eager: true,
  import: "default",
});

function imagemDe(pessoa) {
  return imagens[`../data/motivacional/${pessoa.imagemSrc}`];
}

// Cai na imagem cheia se a miniatura não existir, para que uma foto nova sem
// miniatura gerada apareça com peso errado em vez de não aparecer.
function miniaturaDe(pessoa) {
  const nome = pessoa.imagemSrc.replace(/\.jpg$/i, ".webp");
  return miniaturas[`../data/motivacional/thumbs/${nome}`] ?? imagemDe(pessoa);
}

function Seta({ direcao, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-pill border border-strong text-primary outline-none transition-colors hover:border-muted hover:bg-surface-raised focus-visible:shadow-focus"
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
        <path d={direcao === "anterior" ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"} />
      </svg>
    </button>
  );
}

function Motivacional() {
  const [indice, setIndice] = useState(0);
  const pessoa = pessoas[indice];

  const anterior = () =>
    setIndice((i) => (i - 1 + pessoas.length) % pessoas.length);
  const proximo = () => setIndice((i) => (i + 1) % pessoas.length);

  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch">
      <div className="relative h-[420px] flex-none overflow-hidden rounded-card bg-[#1B2429] lg:h-[640px] lg:w-[520px]">
        {/* É o LCP da tela: carrega com prioridade, nunca lazy. */}
        <img
          src={imagemDe(pessoa)}
          alt={pessoa.nome}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover [object-position:50%_30%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-surface-sunken/10"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-scrim-card" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-6">
        <h1 className="font-display text-display-l text-primary">
          {pessoa.nome}
        </h1>

        <blockquote className="border-l-[3px] border-accent p-4 font-display text-[24px] font-bold leading-8 text-accent-on-card">
          {pessoa.frase}
        </blockquote>

        <p className="max-w-[62ch] text-left text-body-long text-secondary [text-wrap:pretty]">
          {pessoa.historia}
        </p>

        <div className="flex items-center justify-end gap-4">
          <span className="text-caption uppercase tabular-nums text-dim">
            {indice + 1} de {pessoas.length}
          </span>
          <Seta direcao="anterior" onClick={anterior} label="Atleta anterior" />
          <Seta direcao="proximo" onClick={proximo} label="Próximo atleta" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {pessoas.map((p, i) => {
            const ativo = i === indice;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setIndice(i)}
                aria-label={p.nome}
                aria-current={ativo ? "true" : undefined}
                className={`h-10 w-10 flex-none overflow-hidden rounded-pill bg-surface-raised outline-none transition-shadow focus-visible:shadow-focus ${
                  ativo
                    ? "shadow-[0_0_0_2px_#8B45E0]"
                    : "shadow-[0_0_0_1px_#3D474E] hover:shadow-[0_0_0_1px_#8E979E]"
                }`}
              >
                <img
                  src={miniaturaDe(p)}
                  alt=""
                  aria-hidden="true"
                  width="40"
                  height="40"
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover object-top transition-opacity ${
                    ativo ? "opacity-100" : "opacity-80 hover:opacity-100"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Motivacional;
