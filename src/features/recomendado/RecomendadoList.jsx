import PhotoCard from "../../ui/PhotoCard";
import PlanoCard from "../../ui/PlanoCard";
import Alert from "../../ui/Alert";
import Button from "../../ui/Button";
import { planosRespondidos } from "./planosRespondidos";
import { CARD_DO_PLANO, EXPLORAR, PLANOS } from "./cards";
import {
  useNutricaoAnswers,
  useTreinoAnswers,
} from "../../services/usePlanos";

function Skeleton() {
  return (
    <div className="h-60 w-full animate-shimmer rounded-card bg-shimmer bg-[length:300%_100%]" />
  );
}

function Secao({ titulo, children }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-caption uppercase text-dim">{titulo}</h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">{children}</div>
    </section>
  );
}

function RecomendadoList() {
  /**
   * gh#16: as duas consultas eram um `useEffect` com andaime manual de
   * loading e erro, precedido por um `supabase.auth.getUser()` só para
   * descobrir o id. Agora são duas queries do React Query, com o usuário
   * vindo do cache.
   */
  const treino = useTreinoAnswers();
  const nutricao = useNutricaoAnswers();

  const loading = treino.carregando || nutricao.carregando;
  const erro = treino.erro || nutricao.erro;

  function recarregar() {
    treino.recarregar();
    nutricao.recarregar();
  }

  const planosSalvos = planosRespondidos(treino.dados, nutricao.dados);

  if (erro) {
    return (
      <Alert
        action={
          <Button variant="secondary" size="sm" onClick={recarregar}>
            Tentar novamente
          </Button>
        }
      >
        Não foi possível carregar seus planos.
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-12">
        <Secao titulo="Seu plano">
          <Skeleton />
          <Skeleton />
        </Secao>
        <Secao titulo="Explorar">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Secao>
      </div>
    );
  }

  const planos = PLANOS.filter((p) => planosSalvos.includes(p.id));
  const descartados = planosSalvos.map((id) => CARD_DO_PLANO[id]);
  const explorar = EXPLORAR.filter((e) => !descartados.includes(e.id));

  return (
    <div className="flex flex-col gap-12">
      {planos.length > 0 && (
        <Secao titulo="Seu plano">
          {planos.map((p) => (
            <PlanoCard key={p.id} {...p} />
          ))}
        </Secao>
      )}

      <Secao titulo="Explorar">
        {explorar.map((c) => (
          <PhotoCard key={c.id} {...c} />
        ))}
      </Secao>
    </div>
  );
}

export default RecomendadoList;
