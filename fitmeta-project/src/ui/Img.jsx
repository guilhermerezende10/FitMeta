function Img({ src, alt, className }) {
  const StyledImg = "h-full w-full object-cover opacity-90";
  return (
    <img src={src} alt={alt} className={className ? className : StyledImg} />
  );
}

export default Img;
