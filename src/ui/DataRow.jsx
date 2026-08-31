/**
 * Linha de dado (exercício, macro).
 * O nome nunca quebra: `nowrap` + elipse. O valor vai numa pílula à direita.
 */
function DataRow({ index, name, value, className = "" }) {
  return (
    <div
      className={`flex items-center gap-4 rounded-row bg-surface-raised px-[18px] py-[15px] ${className}`}
    >
      {index != null && (
        <span className="w-6 flex-none tabular-nums text-body text-muted">
          {index}
        </span>
      )}

      <span className="min-w-0 flex-1 truncate text-body-l font-medium text-primary">
        {name}
      </span>

      {value != null && (
        <span className="flex-none rounded-pill bg-accent-surface px-3 py-1 text-body font-medium tabular-nums text-accent-on-card">
          {value}
        </span>
      )}
    </div>
  );
}

export default DataRow;
