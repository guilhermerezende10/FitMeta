/**
 * Card do sistema: superfície `surface` sobre a página `canvas`.
 * Regra dura — fundo da página nunca é igual ao fundo do card.
 */
function Card({ children, className = "", as: Tag = "div", ...props }) {
  return (
    <Tag
      className={`rounded-card border border-line bg-surface p-6 sm:p-8 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Card;
