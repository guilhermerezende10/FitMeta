import { useEffect, useRef, useState } from "react";
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
 * 96px em WebP somam 23 KB, geradas por `scripts/gerar-miniaturas.mjs` e
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

/**
 * De que lado da fila ainda há conteúdo fora da vista.
 *
 * Fora do componente de propósito: sem dependências de render, serve tanto ao
 * `onScroll` quanto ao efeito de montagem sem virar dependência de nenhum.
 * A tolerância de 1px cobre o arredondamento sub-pixel do navegador, que faz
 * `scrollLeft + clientWidth` parar a uma fração de `scrollWidth` no fim.
 */
function medirBordas(el) {
  if (!el) return null;

  const { scrollLeft, scrollWidth, clientWidth } = el;

  return {
    esquerda: scrollLeft > 1,
    direita: scrollLeft + clientWidth < scrollWidth - 1,
  };
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

  const filaRef = useRef(null);
  const [bordas, setBordas] = useState({ esquerda: false, direita: false });

  const anterior = () =>
    setIndice((i) => (i - 1 + pessoas.length) % pessoas.length);
  const proximo = () => setIndice((i) => (i + 1) % pessoas.length);

  // Estado inicial dos degradês: sem isto, o da direita só apareceria depois
  // do primeiro scroll, e a fila pareceria terminar nos 20 visíveis.
  useEffect(() => {
    const medida = medirBordas(filaRef.current);
    if (medida) setBordas(medida);
  }, []);

  /**
   * Traz o atleta selecionado para o centro da fila. Sem isto, navegar pelas
   * setas deixa o círculo ativo fora da vista, e a marcação de seleção não
   * comunica nada.
   *
   * `block: "nearest"` mantém o scroll restrito ao eixo horizontal — a página
   * não é puxada verticalmente quando a fila já está visível.
   */
  useEffect(() => {
    const alvo = filaRef.current?.children[indice];
    if (!alvo) return;

    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    alvo.scrollIntoView({
      behavior: suave ? "smooth" : "auto",
      inline: "center",
      block: "nearest",
    });
  }, [indice]);

  return (
    <div className="flex flex-col gap-12 lg:min-h-[calc(100vh-88px)] lg:flex-row lg:items-center lg:gap-16">
      <div className="relative h-[420px] flex-none overflow-hidden rounded-card bg-[#1B2429] lg:h-[600px] lg:w-[480px]">
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

      {/* Altura fixa igual à da foto, a partir de lg. As histórias vão de 431
          a 677 caracteres; com a coluna centralizada, contador, setas e fila
          subiam e desciam a cada atleta, e o usuário reposicionava o mouse a
          cada clique. Quem estabiliza é a altura, não o alinhamento. */}
      <div className="flex min-w-0 flex-1 flex-col gap-6 lg:h-[600px]">
        {/* Leitura ancorada no topo: é aqui que a variação de tamanho é
            absorvida, sem empurrar os controles. */}
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <h1 className="font-display text-display-l text-primary">
            {pessoa.nome}
          </h1>

          <blockquote className="border-l-[3px] border-accent p-4 font-display text-[24px] font-bold leading-8 text-accent-on-card">
            {pessoa.frase}
          </blockquote>

          <p className="max-w-[62ch] text-left text-body-long text-secondary [text-wrap:pretty]">
            {pessoa.historia}
          </p>
        </div>

        {/* Controles ancorados na base: mesmo y para os 20 atletas. */}
        <div className="flex flex-none flex-col gap-4">
          <div className="flex items-center justify-end">
            <span className="text-caption uppercase tabular-nums text-dim">
              {indice + 1} de {pessoas.length}
            </span>
          </div>

          {/* As setas ladeiam a fila: viram o controle dela, em vez de flutuarem
              soltas entre o parágrafo e os círculos. São as mesmas de antes —
              trocam de atleta, com volta ao início. */}
          <div className="flex items-center gap-4">
            <Seta direcao="anterior" onClick={anterior} label="Atleta anterior" />

            <div className="relative min-w-0 flex-1">
              <div
                ref={filaRef}
                onScroll={(e) => setBordas(medirBordas(e.currentTarget))}
                className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
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
                        className={`h-full w-full object-cover object-center transition-opacity ${
                          ativo ? "opacity-100" : "opacity-80 hover:opacity-100"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Substituem a barra de rolagem: dizem que há mais atletas de cada
                  lado. Só a opacidade muda, para não remontar o nó a cada scroll. */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-canvas to-transparent transition-opacity ${
                  bordas.esquerda ? "opacity-100" : "opacity-0"
                }`}
              />
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-canvas to-transparent transition-opacity ${
                  bordas.direita ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            <Seta direcao="proximo" onClick={proximo} label="Próximo atleta" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Motivacional;
