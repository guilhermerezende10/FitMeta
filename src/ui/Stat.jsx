/**
 * Bloco de estatística: rótulo em caption, número herói em Barlow Condensed
 * tabular, unidade alinhada à base. Nunca número sem rótulo.
 */
function Stat({ label, value, unit, color, size = "md", className = "" }) {
  const sizes = {
    md: "text-[48px] leading-[48px]",
    lg: "text-[64px] leading-[60px]",
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className="text-caption uppercase text-muted">{label}</span>
      <span className="flex items-baseline gap-2">
        <span
          className={`font-display tabular-nums ${sizes[size]}`}
          style={color ? { color } : undefined}
        >
          {value}
        </span>
        {unit && <span className="text-body text-secondary">{unit}</span>}
      </span>
    </div>
  );
}

export default Stat;
