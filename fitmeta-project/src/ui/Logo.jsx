import Img from "./Img";

function Logo({ src, className }) {
  const StyledLogo = "h-20 w-20 mb-5";

  return (
    <Img src={src} alt="logo" className={className ? className : StyledLogo} />
  );
}

export default Logo;
