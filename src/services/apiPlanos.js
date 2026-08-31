import supabase from "./supabase";

/**
 * Acesso às tabelas de plano: `info_basica`, `treino_answers` e
 * `nutricao_answers`.
 *
 * Estava espalhado por cinco componentes, cada um repetindo o mesmo andaime de
 * loading e erro (gh#16). Aqui as funções só falam com o banco; quem cuida de
 * cache, carregamento e erro é o React Query, em `usePlanos.js`.
 *
 * Todas lançam em caso de erro, que é o contrato que o React Query espera —
 * e é o que faz `isError` funcionar sem checagem manual em cada tela.
 */

/**
 * `maybeSingle`, e não `single`: com `single`, zero linhas já vem como erro,
 * indistinguível de falha real. E o `error` precisa ser checado — o supabase-js
 * converte falha de rede em `error` em vez de lançar, então um try/catch em
 * volta não veria nada (gh#15).
 *
 * Devolve `null` para ausência de linha, que é diferente de falha.
 */
async function umaLinha(tabela, colunas, userId) {
  const { data, error } = await supabase
    .from(tabela)
    .select(colunas)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export const getInfoBasica = (userId) =>
  umaLinha("info_basica", "nome, idade, sexo, peso, altura", userId);

export const getTreinoAnswers = (userId) =>
  umaLinha("treino_answers", "freq_treino, duracao", userId);

export const getNutricaoAnswers = (userId) =>
  umaLinha("nutricao_answers", "objetivo, frequencia", userId);

/** Colunas e `onConflict` idênticos aos que o InfoBasicasStep já gravava. */
export async function salvarInfoBasica({ userId, nome, idade, sexo, peso, altura }) {
  const { error } = await supabase.from("info_basica").upsert(
    {
      user_id: userId,
      nome,
      idade: Number(idade),
      sexo,
      peso: Number(peso),
      altura: Number(altura),
    },
    { onConflict: "user_id" }
  );

  if (error) throw error;
}

/** Idem para as respostas dos dois questionários. */
export async function salvarRespostas({ ehNutricao, payload }) {
  const { error } = await supabase
    .from(ehNutricao ? "nutricao_answers" : "treino_answers")
    .upsert(payload, { onConflict: "user_id" });

  if (error) throw error;
}
