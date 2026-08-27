import Button from "./Button";
import NavIcon from "./NavIcon";

/** Estado vazio: o usuário ainda não tem o plano que a tela mostraria. */
function EmptyState({ icon, titulo, descricao, acao, to }) {
  return (
    <div className="mx-auto mt-6 flex max-w-[560px] flex-col items-center gap-4 rounded-card border border-line bg-surface p-10 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-accent-surface text-accent-on-card">
        <NavIcon name={icon} size={26} />
      </span>

      <h2 className="font-display text-display-m text-primary">{titulo}</h2>
      <p className="text-body text-secondary">{descricao}</p>

      <Button to={to} className="mt-2">
        {acao}
      </Button>
    </div>
  );
}

export default EmptyState;
