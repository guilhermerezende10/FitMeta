/**
 * Ícones do sistema: SVG inline, traço 2px, grade 24.
 * Regra 3 do sistema de design — emoji nunca.
 *
 * A cor vem de `currentColor`, então quem usa controla via classe de texto.
 */

const PATHS = {
  home: ["M4 11 12 4l8 7", "M6 10v9h12v-9"],
  treino: ["M4 9v6", "M20 9v6", "M8 5v14", "M16 5v14", "M8 12h8"],
  nutricao: ["M3 11h18a9 9 0 0 1-18 0Z", "M12 7c0-1.7 1.3-3 3-3"],
  estudos: ["M12 6.5 4 4v15l8 2.5", "M12 6.5 20 4v15l-8 2.5", "M12 6.5v15"],
  motivacao: [
    "M12 3c4 4.5 5.5 6.6 5.5 9.5a5.5 5.5 0 0 1-11 0C6.5 9.6 8 7.5 12 3Z",
    "M12 17.5a2.5 2.5 0 0 0 2.5-2.5c0-1.6-1.4-2.6-2.5-4-1.1 1.4-2.5 2.4-2.5 4a2.5 2.5 0 0 0 2.5 2.5Z",
  ],
  sair: ["M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3", "m10 8-4 4 4 4", "M6 12h9"],
  voltar: ["m14 6-6 6 6 6"],
};

function NavIcon({ name, size = 20, className = "" }) {
  const paths = PATHS[name];
  if (!paths) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`flex-none ${className}`}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

export default NavIcon;
