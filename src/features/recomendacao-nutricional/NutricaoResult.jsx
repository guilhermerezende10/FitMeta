import MinhaRecomendacaoNutri from "../../pages/MinhaRecomendacaoNutri";

/**
 * Resultado logo após o formulário.
 *
 * Lê do Supabase, e não do FormContext: o passo anterior acabou de gravar
 * lá, e assim a tela sobrevive a um recarregamento. Lendo da memória, um
 * F5 zerava peso, altura, idade e sexo, e o cálculo devolvia NaN.
 */
function NutricaoResult() {
  return <MinhaRecomendacaoNutri recemCriado />;
}

export default NutricaoResult;
