/**
 * Aviso de erro em linha — usado no lugar do toast quando o erro pertence
 * a um formulário e o usuário precisa dele parado na tela.
 */
function Alert({ children, action, className = "" }) {
  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-row border border-danger bg-surface px-4 py-3 ${className}`}
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
        className="mt-0.5 flex-none text-danger"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5" />
        <path d="M12 16.5v.01" />
      </svg>

      <div className="flex flex-1 flex-wrap items-center gap-2 text-body text-primary">
        {children}
      </div>

      {action}
    </div>
  );
}

export default Alert;
