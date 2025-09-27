import { NavLink } from "react-router-dom";

function Button({ children, page, className }) {
  return (
    <NavLink to={page} className={className}>
      <button >
        {children}
      </button>
    </NavLink>
  );
}

export default Button;
