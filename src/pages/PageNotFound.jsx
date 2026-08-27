import Button from "../ui/Button";
import NavIcon from "../ui/NavIcon";

/** Tela 404, portada do design. */
function PageNotFound() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center">
      <div className="flex max-w-[560px] flex-col items-center gap-4 rounded-card border border-line bg-surface p-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-accent-surface text-accent-on-card">
          <NavIcon name="bussola" size={26} />
        </span>

        <h1 className="font-display text-display-l text-primary">
          Página não encontrada
        </h1>

        <p className="text-body text-secondary">
          O endereço que você abriu não existe ou foi movido.
        </p>

        <Button to="/recomendado" className="mt-2">
          Voltar para a home
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;
