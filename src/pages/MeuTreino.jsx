import Alert from "../ui/Alert";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import Spinner from "../ui/Spinner";
import TreinoPlano from "../features/recomendacao-treino/TreinoPlano";
import { planoDoUsuario } from "../features/recomendacao-treino/planoDoUsuario";
import { useTreinoAnswers } from "../services/usePlanos";

/**
 * Plano de treino salvo.
 *
 * gh#16: a busca era um `useEffect` com `useState` para loading e erro, e
 * começava por um `supabase.auth.getUser()` próprio. Agora vem do React Query,
 * que já mantém o usuário em cache e devolve os três estados prontos.
 *
 * gh#15: "não tem plano" e "a consulta falhou" eram o mesmo estado, e as duas
 * situações caíam no EmptyState — quem tinha plano, com a rede instável, lia
 * que não tinha plano nenhum. Continuam sendo três estados distintos:
 * carregando, erro e resultado.
 */
function MeuTreino({ recemCriado = false }) {
  const { dados, carregando, erro, recarregar } = useTreinoAnswers();

  if (carregando) return <Spinner />;

  if (erro)
    return (
      <Alert
        action={
          <Button variant="secondary" size="sm" onClick={recarregar}>
            Tentar novamente
          </Button>
        }
      >
        Não foi possível carregar seu plano de treino.
      </Alert>
    );

  const plano = planoDoUsuario(dados);

  if (!plano)
    return (
      <EmptyState
        icon="treino"
        titulo="Você ainda não tem um plano de treino."
        descricao="Três perguntas bastam para montar sua semana."
        acao="Montar meu treino"
        to="/recomendacao-treino/formulario/iniciar"
      />
    );

  return <TreinoPlano plano={plano} recemCriado={recemCriado} />;
}

export default MeuTreino;
