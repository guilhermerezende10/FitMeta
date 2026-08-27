/** Carregamento de tela inteira. */
function Spinner() {
  return (
    <div role="status" className="flex items-center justify-center">
      <span
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-pill border-[3px] border-line border-t-accent"
      />
      <span className="sr-only">Carregando…</span>
    </div>
  );
}

export default Spinner;
