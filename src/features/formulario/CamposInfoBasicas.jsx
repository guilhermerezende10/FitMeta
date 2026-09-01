import Field from "../../ui/Field";
import { CAMPOS } from "./validarInfoBasicas";

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
 *
 * `campos` escolhe quais aparecer. A tela de dados corporais mostra só idade,
 * sexo, peso e altura — o nome passou a ser editado na tela de conta, e
 * mostrá-lo nos dois lugares faria o usuário achar que são coisas diferentes.
 * O default é a lista inteira, então o questionário não muda.
 */

const SEXOS = ["Masculino", "Feminino"];

function CamposInfoBasicas({
  valores,
  erros = {},
  onCampo,
  idPrefixo = "fm",
  desabilitado = false,
  campos = CAMPOS,
}) {
  const { nome, idade, peso, altura, sexo } = valores;
  const mostrar = (campo) => campos.includes(campo);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {mostrar("nome") && (
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
      )}

      {mostrar("idade") && (
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
      )}

      {mostrar("sexo") && (
        <div className="flex flex-col gap-2">
          <span
            className={`text-caption uppercase ${
              erros.sexo ? "text-danger" : "text-muted"
            }`}
          >
            Sexo
          </span>
          <div
            role="radiogroup"
            aria-label="Sexo"
            aria-invalid={erros.sexo ? true : undefined}
            aria-describedby={erros.sexo ? `${idPrefixo}-sexo-erro` : undefined}
            className={`flex h-control gap-1 rounded-field border bg-canvas p-1 ${
              erros.sexo ? "border-danger" : "border-line"
            }`}
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

          {/* Mesmo formato da mensagem de erro do Field, para os campos não
              divergirem no primeiro ajuste. */}
          {erros.sexo && (
            <p
              id={`${idPrefixo}-sexo-erro`}
              className="flex items-center gap-2 text-label text-danger"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="flex-none"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5" />
                <path d="M12 16.5v.01" />
              </svg>
              {erros.sexo}
            </p>
          )}
        </div>
      )}

      {mostrar("peso") && (
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
      )}

      {mostrar("altura") && (
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
      )}
    </div>
  );
}

export default CamposInfoBasicas;
