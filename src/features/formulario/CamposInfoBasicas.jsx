import Field from "../../ui/Field";

/**
 * Os cinco campos de `info_basica`: nome, idade, sexo, peso e altura.
 *
 * Vivem em componente próprio porque dois lugares os editam — a etapa 1 dos
 * questionários e a tela de perfil (gh#25). Duplicar o formulário faria as
 * duas telas divergirem no primeiro ajuste de rótulo ou de faixa.
 *
 * FM-13: todo campo tem rótulo visível e associado.
 *
 * `idPrefixo` evita colisão de `id` caso as duas telas coexistam na árvore.
 */

const SEXOS = ["Masculino", "Feminino"];

function CamposInfoBasicas({
  valores,
  erros = {},
  onCampo,
  idPrefixo = "fm",
  desabilitado = false,
}) {
  const { nome, idade, peso, altura, sexo } = valores;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Field
        className="sm:col-span-2"
        tone="card"
        label="Nome"
        id={`${idPrefixo}-nome`}
        type="text"
        placeholder="Como você se chama"
        value={nome}
        disabled={desabilitado}
        onChange={(e) => onCampo("nome", e.target.value)}
        error={erros.nome}
      />

      <Field
        tone="card"
        label="Idade"
        id={`${idPrefixo}-idade`}
        type="number"
        inputMode="numeric"
        placeholder="0"
        unit="anos"
        value={idade}
        disabled={desabilitado}
        onChange={(e) => onCampo("idade", e.target.value)}
        error={erros.idade}
      />

      <div className="flex flex-col gap-2">
        <span className="text-caption uppercase text-muted">Sexo</span>
        <div
          role="radiogroup"
          aria-label="Sexo"
          className="flex h-control gap-1 rounded-field border border-line bg-canvas p-1"
        >
          {SEXOS.map((opcao) => {
            const ativo = sexo?.toLowerCase() === opcao.toLowerCase();
            return (
              <button
                key={opcao}
                type="button"
                role="radio"
                aria-checked={ativo}
                disabled={desabilitado}
                onClick={() => onCampo("sexo", opcao.toLowerCase())}
                className={`flex-1 rounded-field-sm text-body font-medium outline-none transition-colors focus-visible:shadow-focus ${
                  ativo
                    ? "bg-accent-surface text-primary"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {opcao}
              </button>
            );
          })}
        </div>
      </div>

      <Field
        tone="card"
        label="Peso"
        id={`${idPrefixo}-peso`}
        type="number"
        inputMode="decimal"
        placeholder="0"
        unit="kg"
        value={peso}
        disabled={desabilitado}
        onChange={(e) => onCampo("peso", e.target.value)}
        error={erros.peso}
      />

      <Field
        tone="card"
        label="Altura"
        id={`${idPrefixo}-altura`}
        type="number"
        inputMode="numeric"
        placeholder="0"
        unit="cm"
        value={altura}
        disabled={desabilitado}
        onChange={(e) => onCampo("altura", e.target.value)}
        error={erros.altura}
      />
    </div>
  );
}

export default CamposInfoBasicas;
