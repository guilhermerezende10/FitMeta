import { createClient } from "@supabase/supabase-js";

/**
 * Sem `.env`, o `createClient` recebe `undefined` e lança "supabaseUrl is
 * required" de dentro do node_modules, ainda no import — tela branca, e um
 * erro que não diz qual variável falta nem onde configurá-la.
 *
 * A checagem abaixo troca isso por um erro que nomeia a variável ausente.
 * Continua sendo lançado no carregamento do módulo, porque sem o cliente
 * não há app: falhar aqui é melhor do que falhar na primeira consulta.
 */
const obrigatorias = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

const ausentes = Object.entries(obrigatorias)
  .filter(([, valor]) => !valor || !String(valor).trim())
  .map(([nome]) => nome);

if (ausentes.length > 0) {
  throw new Error(
    `Variáveis de ambiente ausentes: ${ausentes.join(", ")}. ` +
      "Copie o .env.example para .env e preencha os valores — eles ficam em " +
      "Supabase > Project Settings, em Data API (URL) e API Keys (chave anon). " +
      "Lembre de reiniciar o servidor: o Vite lê o .env só na inicialização."
  );
}

export const supabaseUrl = obrigatorias.VITE_SUPABASE_URL;
const supabaseKey = obrigatorias.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
