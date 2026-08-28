import LogoWhite from "../data/logo/logo-white.png";

/**
 * Marca do FitMeta: símbolo + wordmark.
 *
 * O símbolo vai direto sobre a superfície escura, sem container atrás.
 * O wordmark é Barlow Condensed 700 ao lado, alinhado pela caixa alta.
 */
function Brand({ className = "" }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <img
        src={LogoWhite}
        alt=""
        aria-hidden="true"
        className="h-[39px] w-[39px] flex-none object-contain"
        loading="eager"
        decoding="sync"
      />
      <span className="font-display text-display-m tracking-[0.02em] text-primary">
        FITMETA
      </span>
    </div>
  );
}

export default Brand;
