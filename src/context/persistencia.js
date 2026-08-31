/**
 * Persistência do formulário entre carregamentos de página (gh#24).
 *
 * `sessionStorage`, não `localStorage`: o preenchimento pertence à sessão. Um
 * questionário abandonado não deve ressuscitar semanas depois, em outro
 * contexto, com dados que o usuário nem lembra ter digitado.
 *
 * Recebe o storage por parâmetro em vez de acessar o global: assim dá para
 * testar sem navegador, e o provider decide o que passar.
 */
export const CHAVE = "fitmeta:formulario";

const ehObjeto = (v) => typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * Reconstrói um estado válido a partir do que estava salvo, campo a campo,
 * usando `base` para o que faltar ou vier com tipo errado.
 *
 * Campo a campo, e não "aceita ou rejeita o objeto inteiro", porque o formato
 * muda com o tempo: uma versão futura que acrescente um campo ainda consegue
 * aproveitar o resto do que estava salvo, em vez de descartar o progresso do
 * usuário por uma diferença de esquema.
 */
export function normalizar(salvo, base) {
  if (!ehObjeto(salvo)) return base;

  const infoSalva = ehObjeto(salvo.infoBasicas) ? salvo.infoBasicas : {};
  const infoBasicas = {};
  for (const campo of Object.keys(base.infoBasicas)) {
    const valor = infoSalva[campo];
    // Os campos são inputs controlados: só texto serve. Número vindo de um
    // formato antigo quebraria o `.trim()` da etapa 1.
    infoBasicas[campo] = typeof valor === "string" ? valor : base.infoBasicas[campo];
  }

  const pageIndex =
    Number.isInteger(salvo.pageIndex) && salvo.pageIndex >= 1
      ? salvo.pageIndex
      : base.pageIndex;

  return {
    ...base,
    infoBasicas,
    treinoAnswers: ehObjeto(salvo.treinoAnswers) ? salvo.treinoAnswers : base.treinoAnswers,
    nutricaoAnswers: ehObjeto(salvo.nutricaoAnswers)
      ? salvo.nutricaoAnswers
      : base.nutricaoAnswers,
    pageIndex,
  };
}

/**
 * JSON inválido, storage indisponível (modo privado) ou chave ausente caem
 * todos no estado inicial. Falhar aqui não pode impedir o app de subir.
 */
export function ler(storage, base) {
  try {
    const bruto = storage?.getItem(CHAVE);
    if (!bruto) return base;
    return normalizar(JSON.parse(bruto), base);
  } catch {
    return base;
  }
}

/**
 * Cota cheia ou storage bloqueado: perde-se a persistência, não a sessão.
 *
 * Não há um `limpar`: ao concluir o questionário o `PerguntasStep` despacha
 * `RESET`, e a regravação do estado inicial por aqui já deixa o rascunho
 * vazio. Uma função a mais seria outro caminho para a mesma coisa.
 */
export function gravar(storage, state) {
  // Sem `?.`: encadeamento opcional devolveria `undefined` sem gravar nada, e
  // a função responderia `true` para uma escrita que não aconteceu.
  if (!storage) return false;
  try {
    storage.setItem(CHAVE, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
