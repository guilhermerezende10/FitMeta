import Img from "./Img";
import LogoWhite from "../data/logo/logo-white.png";

function Logo({ src = LogoWhite, className }) {
  const StyledLogo = "h-20 w-20 mb-5";

  return (
    <Img src={src} alt="logo" className={className ? className : StyledLogo} />
  );
}

export default Logo;
