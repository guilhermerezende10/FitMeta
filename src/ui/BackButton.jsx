import { useNavigate } from "react-router-dom";
import NavIcon from "./NavIcon";

/**
 * FM-17: o botão de voltar era uma `<div>` com `onClick` — invisível para o
 * teclado e para leitores de tela. Agora é um `<button>` de verdade.
 */
function BackButton({ to, label = "Voltar", className = "" }) {
  const navigate = useNavigate();

  function handleBack() {
    if (to) navigate(to);
    else navigate(-1);
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex h-10 items-center gap-2 rounded-pill border border-strong pl-3 pr-4 text-body font-medium text-primary outline-none transition-colors hover:border-muted hover:bg-surface focus-visible:shadow-focus ${className}`}
    >
      <NavIcon name="voltar" size={18} />
      {label}
    </button>
  );
}

export default BackButton;
