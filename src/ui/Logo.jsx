import Img from "./Img";
import LogoWhite from "../data/logo/logo-white.png";

function Logo({ src = LogoWhite, className }) {
  return (
    <img
      src={src}
      alt="logo"
      className={className || "h-16 w-16 mb-5 object-contain"}
      loading="eager"
      decoding="sync"
    />
  );
}


export default Logo;
