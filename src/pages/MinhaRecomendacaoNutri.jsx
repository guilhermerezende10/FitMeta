import calculadorMacros from "../features/recomendacao-nutricional/calculadorMacros";
import NutricaoPlano from "../features/recomendacao-nutricional/NutricaoPlano";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import Spinner from "../ui/Spinner";
import { useInfoBasica, useNutricaoAnswers } from "../services/usePlanos";

/**
 * Recomendação nutricional salva.
 *
 * gh#16: as duas consultas eram um `useEffect` com `Promise.all` e andaime
 * manual de loading e erro, precedido por um `supabase.auth.getUser()`. Viraram
 * duas queries, que o React Query dispara em paralelo por conta própria.
 *
 * A chamada a `calculadorMacros` é a mesma, com os mesmos argumentos e na
 * mesma ordem.
 *
 * gh#15: falha de consulta e ausência de resposta continuam sendo estados
 * distintos — o supabase-js converte erro de rede em `error` em vez de lançar,
 * e é `apiPlanos` que agora transforma isso em exceção para o hook.
 */
function MinhaRecomendacaoNutri({ recemCriado = false }) {
  const infoBasica = useInfoBasica();
  const nutricao = useNutricaoAnswers();

  const carregando = infoBasica.carregando || nutricao.carregando;
  const erro = infoBasica.erro || nutricao.erro;

  if (carregando) return <Spinner />;

  if (erro)
    return (
      <Alert
        action={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              infoBasica.recarregar();
              nutricao.recarregar();
            }}
          >
            Tentar novamente
          </Button>
        }
      >
        Não foi possível carregar sua recomendação nutricional.
      </Alert>
    );

  const dadosBasicos = infoBasica.dados;
  const respostas = nutricao.dados;

  if (!dadosBasicos || !respostas?.objetivo)
    return (
      <EmptyState
        icon="nutricao"
        titulo="Você ainda não tem uma recomendação nutricional."
        descricao="Três perguntas bastam para calcular suas calorias e macros."
        acao="Calcular minha nutrição"
        to="/recomendacao-nutricional/formulario/iniciar"
      />
    );

  const resultado = calculadorMacros(
    dadosBasicos.peso,
    dadosBasicos.altura,
    dadosBasicos.idade,
    dadosBasicos.sexo,
    respostas.frequencia,
    respostas.objetivo
  );

  return (
    <NutricaoPlano
      resultado={resultado}
      objetivo={respostas.objetivo}
      frequencia={respostas.frequencia}
      recemCriado={recemCriado}
    />
  );
}

export default MinhaRecomendacaoNutri;
