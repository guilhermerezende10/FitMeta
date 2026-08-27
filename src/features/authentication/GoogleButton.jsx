/**
 * Entrar com Google — o único provedor externo que o app implementa
 * (`registerGoogle` em services/apiAuth.js + rota /auth/callback).
 */
function GoogleButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-control w-full items-center justify-center gap-3 rounded-pill border border-strong bg-transparent text-body font-medium text-primary outline-none transition-colors hover:border-muted hover:bg-surface focus-visible:shadow-focus"
    >
      <span
        aria-hidden="true"
        className="flex h-6 w-6 items-center justify-center rounded-pill border border-strong text-label font-semibold text-primary"
      >
        G
      </span>
      Continuar com Google
    </button>
  );
}

export default GoogleButton;
