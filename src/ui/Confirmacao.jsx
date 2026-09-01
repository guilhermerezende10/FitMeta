/**
 * Confirmação curta de que algo foi salvo.
 *
 * A mesma pílula estava copiada na tela de dados e na de nutrição, e a de conta
 * traria mais três cópias — uma por bloco. Sendo um componente só, o ícone e o
 * espaçamento não divergem quando alguém ajusta um deles.
 *
 * Altura fixa de propósito: é para uma frase curta, do tamanho de "Dados
 * atualizados". Aviso que precisa de duas linhas não é isto.
 */
function Confirmacao({ children, className = "" }) {
  return (
    <p
      className={`flex h-8 w-fit items-center gap-2 rounded-pill border border-accent bg-accent-surface px-4 ${className}`}
    >
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
        className="flex-none text-accent-on-card"
      >
        <path d="m5 12.5 4.5 4.5L19 7" />
      </svg>
      <span className="text-label text-primary">{children}</span>
    </p>
  );
}

export default Confirmacao;
