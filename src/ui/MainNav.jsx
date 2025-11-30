import { NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { GiMeal, GiThreeFriends } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import { useForm } from "../context/FormContext";
import Logo from "./Logo";

const StyledNavLink = ({ isActive }) =>
  `relative flex flex-row items-center text-white text-xl p-2 rounded-3xl px-4 
   transition-all duration-300 ease-in-out gap-2

   /* largura maior no desktop */
   lg:w-36 lg:justify-start

   ${
     isActive
       ? "bg-gradient-to-r from-brand-button1Violet to-brand-button2Purple scale-105"
       : "opacity-80 hover:opacity-100"
   }
  `;

function MainNav() {
  const { dispatch } = useForm();
  function handleResetPage() {
    dispatch({
      type: "RESET_PAGE",
    });
  }
  return (
    <nav
      className="
    /* MOBILE (continua igual) */
    fixed bottom-2 left-0 right-0 bg-brand-bgDarkGray z-50 rounded-full mx-3 my-1

    /* DESKTOP = SIDEBAR */
    lg:fixed lg:top-0 lg:left-0 lg:bottom-0 
    lg:w-60 lg:rounded-none lg:bg-brand-bgDarkGray lg:flex lg:flex-col lg:items-center lg:py-10 lg:mx-0 lg:my-0
  "
    >
      {/* LOGO ACIMA DOS ITENS E CENTRALIZADO NO DESKTOP */}
      <div className="hidden lg:flex lg:justify-center lg:mb-6">
        <Logo />
      </div>
      <ul
        className="
  flex justify-around items-center py-3
  lg:grid lg:grid-cols-1 lg:gap-6 lg:justify-start lg:py-4
  "
      >
        <li>
          <NavLink
            to="/recomendado"
            className={({ isActive }) => StyledNavLink({ isActive })}
            onClick={handleResetPage}
          >
            {({ isActive }) => (
              <>
                <GoHomeFill />
                <span
                  className={`
          text-sm lg:text-base transition-all duration-200
          ${isActive ? "inline-block" : "hidden"}
          lg:inline-block
        `}
                >
                  Home
                </span>
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/recomendacao-treino"
            className={({ isActive }) => StyledNavLink({ isActive })}
            onClick={handleResetPage}
          >
            {({ isActive }) => (
              <>
                <CgGym />
                <span
                  className={`
          text-sm lg:text-base transition-all duration-200
          ${isActive ? "inline-block" : "hidden"}
          lg:inline-block
        `}
                >
                  Treino
                </span>
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/recomendacao-nutricional"
            className={({ isActive }) => StyledNavLink({ isActive })}
            onClick={handleResetPage}
          >
            {({ isActive }) => (
              <>
                <GiMeal />
                <span
                  className={`
          text-sm lg:text-base transition-all duration-200
          ${isActive ? "inline-block" : "hidden"}
          lg:inline-block
        `}
                >
                  Nutrição
                </span>
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/motivacional"
            className={({ isActive }) => StyledNavLink({ isActive })}
            onClick={handleResetPage}
          >
            {({ isActive }) => (
              <>
                <GiThreeFriends />
                <span
                  className={`
          text-sm lg:text-base transition-all duration-200
          ${isActive ? "inline-block" : "hidden"}
          lg:inline-block
        `}
                >
                  Motivação
                </span>
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
