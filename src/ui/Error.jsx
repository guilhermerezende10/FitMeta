import Alert from "./Alert";

/**
 * Erro em linha, de apresentacao pura.
 *
 * Nao usa nenhum hook de router de proposito: `useRouteError` so existe dentro
 * do `errorElement` de um data router (`createBrowserRouter`), e o app monta
 * `<BrowserRouter>`. Fora desse contexto o hook nao devolve undefined — ele
 * dispara um invariant, e como nao havia error boundary na arvore o throw
 * durante o render apagava o app inteiro.
 *
 * A mensagem vem por prop, entao o componente funciona em qualquer ponto da
 * arvore. Se um dia existir um `errorElement` de rota, ele deve ser um
 * componente separado — os dois casos nao compartilham implementacao.
 */
function Error({ message, onRetry }) {
  return (
    <Alert
      action={
        onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="flex-none rounded-pill border border-line px-3 py-1 text-caption text-primary transition-colors hover:bg-surface-raised"
          >
            Tentar novamente
          </button>
        ) : null
      }
    >
      {message || "Algo deu errado. Tente novamente."}
    </Alert>
  );
}

export default Error;
