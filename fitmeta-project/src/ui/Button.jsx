import { NavLink } from "react-router-dom";

function Button({
  children,
  page,
  type,
  className,
  onClick,
  disabled = false,
}) {
  const StyledBtn =
    "px-20 py-4 rounded-full text-white text-base font-regular shadow-lg transition bg-gradient-to-r from-[#3F2B57] to-[#2B1546] hover:opacity-90";
  return (
    <NavLink
      to={page}
      type={type}
      className={className ? className : StyledBtn}
      onClick={onClick}
      disabled={disabled}
    >
      <button>{children}</button>
    </NavLink>
  );
}

export default Button;
