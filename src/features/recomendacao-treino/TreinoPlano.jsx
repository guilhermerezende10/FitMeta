import Card from "../../ui/Card";
import Button from "../../ui/Button";

/**
 * Resultado do treino.
 *
 * FM-07: o plano tem `nome` ("PPL (3x) / 45min") e `faixaRep` ("5 a 9") no
 * dado, e nenhum dos dois chegava à tela. Agora os dois aparecem como
 * pílulas ao lado do título.
 *
 * O carrossel de dias vira uma grade: no desktop os sete dias cabem lado a
 * lado, sem obrigar a passar slide para ver o treino de sexta.
 */

const DIAS = [
  ["segunda", "Segunda"],
  ["terca", "Terça"],
  ["quarta", "Quarta"],
  ["quinta", "Quinta"],
  ["sexta", "Sexta"],
  ["sabado", "Sábado"],
  ["domingo", "Domingo"],
];

function TreinoPlano({ plano, recemCriado }) {
  return (
    <div className="flex flex-col gap-8">
      {recemCriado && (
        <p className="flex h-8 items-center gap-2 self-start rounded-pill border border-accent bg-accent-surface px-4">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-accent-on-card"
          >
            <path d="m5 12.5 4.5 4.5L19 7" />
          </svg>
          <span className="text-label text-primary">Plano criado</span>
        </p>
      )}

      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-display-l text-primary">
            Meu treino
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="flex h-7 items-center rounded-pill bg-surface-raised px-3 text-caption uppercase text-secondary">
              {plano.nome}
            </span>
            <span className="flex h-7 items-center rounded-pill bg-surface-raised px-3 text-caption uppercase text-secondary">
              {plano.faixaRep} repetições
            </span>
          </div>
        </div>

        <Button
          variant="secondary"
          to="/recomendacao-treino/formulario/iniciar"
          className="flex-none"
        >
          Refazer questionário
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {DIAS.map(([chave, rotulo]) => {
          const conteudo = plano[chave];
          const treina = Array.isArray(conteudo);

          return (
            <Card key={chave} className="flex flex-col gap-4 p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-[20px] font-bold leading-6 text-primary">
                  {rotulo}
                </h2>
                <span className="flex-none whitespace-nowrap text-caption uppercase text-dim">
                  {treina
                    ? `${conteudo.length} ${
                        conteudo.length === 1 ? "exercício" : "exercícios"
                      }`
                    : "Descanso"}
                </span>
              </div>

              {treina && (
                <ul className="flex flex-col">
                  {conteudo.map(([exercicio, series], i) => (
                    <li
                      key={`${exercicio}-${i}`}
                      className="flex items-center justify-between gap-4 border-t border-line py-2.5"
                    >
                      <span className="text-body font-medium leading-5 text-primary">
                        {exercicio}
                      </span>
                      <span className="flex-none text-caption uppercase text-secondary">
                        {String(series).replace(/\D/g, "")} séries
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default TreinoPlano;
