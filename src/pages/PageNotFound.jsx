import EmptyState from "../ui/EmptyState";

function PageNotFound() {
  return (
    <EmptyState
      icon="home"
      titulo="Esta página não existe."
      descricao="O endereço pode ter mudado, ou o link que trouxe você até aqui está quebrado."
      acao="Ir para o início"
      to="/recomendado"
    />
  );
}

export default PageNotFound;
