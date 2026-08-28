import { useCallback, useEffect, useState } from "react";

import supabase from "../services/supabase";
import calculadorMacros from "../features/recomendacao-nutricional/calculadorMacros";
import NutricaoPlano from "../features/recomendacao-nutricional/NutricaoPlano";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import Spinner from "../ui/Spinner";

/**
 * Recomendação nutricional salva.
 *
 * As duas consultas e a chamada a `calculadorMacros` são as mesmas de
 * antes, com os mesmos argumentos e na mesma ordem.
 *
 * gh#15: o try/catch anterior não pegava falha de consulta — o supabase-js
 * converte erro de rede em `error` em vez de lançar — então a tela caía no
 * EmptyState e afirmava que o usuário não tinha recomendação nenhuma.
 */
function MinhaRecomendacaoNutri({ recemCriado = false }) {
  const [infoBasicas, setInfoBasicas] = useState(null);
  const [respostas, setRespostas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  const buscar = useCallback(async () => {
    setLoading(true);
    setErro(false);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      setErro(true);
      setLoading(false);
      return;
    }

    if (!user) {
      setInfoBasicas(null);
      setRespostas(null);
      setLoading(false);
      return;
    }

    // maybeSingle: ausência de linha passa a devolver `data: null` sem erro,
    // então "não respondeu" deixa de ser confundido com "a consulta falhou".
    const [{ data: userInfo, error: infoError }, { data: nutricaoData, error: respostasError }] =
      await Promise.all([
        supabase
          .from("info_basica")
          .select("peso, altura, idade, sexo, nome")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("nutricao_answers")
          .select("frequencia, objetivo")
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);

    if (infoError || respostasError) {
      console.error(infoError || respostasError);
      setErro(true);
      setLoading(false);
      return;
    }

    setInfoBasicas(userInfo);
    setRespostas(nutricaoData);
    setLoading(false);
  }, []);

  useEffect(() => {
    buscar();
  }, [buscar]);

  if (loading) return <Spinner />;

  if (erro)
    return (
      <Alert
        action={
          <Button variant="secondary" size="sm" onClick={buscar}>
            Tentar novamente
          </Button>
        }
      >
        Não foi possível carregar sua recomendação nutricional.
      </Alert>
    );

  if (!infoBasicas || !respostas?.objetivo)
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
    infoBasicas.peso,
    infoBasicas.altura,
    infoBasicas.idade,
    infoBasicas.sexo,
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
