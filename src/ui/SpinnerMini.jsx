/** Anel de carregamento para dentro de botões — herda o tom do botão. */
export default function SpinnerMini() {
  return (
    <span
      aria-hidden="true"
      className="h-[18px] w-[18px] animate-spin rounded-pill border-2 border-transparent border-t-current"
    />
  );
}
