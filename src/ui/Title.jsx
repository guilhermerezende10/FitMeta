function Title({ children, className }) {
  const StyledTitle = "text-3xl font-extrabold mb-2 text-white text-left";
  return <h1 className={className ? className : StyledTitle}>{children}</h1>;
}

export default Title;
