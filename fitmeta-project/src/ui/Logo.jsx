import Img from "./Img";

function Logo({ src, className }) {
  return <Img src={src} alt="logo" className={className} />;
}

export default Logo;
