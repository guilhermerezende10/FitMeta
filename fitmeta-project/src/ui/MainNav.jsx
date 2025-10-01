import { NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { GiMeal, GiThreeFriends } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import { useForm } from "../context/FormContext";

const StyledNavLink = ({ isActive }) =>
  `relative flex flex-row items-center text-white text-2xl p-2 rounded-3xl px-4 
   transition-all duration-300 ease-in-out 
   ${
     isActive
       ? "bg-gradient-to-r from-[#3F2B57] to-[#2B1546] scale-105 before:content-[attr(rel)] before:text-lg before:mt-1 before:block before:text-gray-300 before:mx-2 before:font-regular before:opacity-100 before:transition-opacity before:duration-300"
       : "before:opacity-0"
   }`;

function MainNav() {
  const { _, dispatch } = useForm();
  function handleResetPage() {
    dispatch({
      type: "RESET_PAGE",
    });
  }
  return (
    <nav className="fixed bottom-2 left-0 right-0 bg-[#192126] z-50 rounded-full mx-5 my-1 ">
      <ul className="flex justify-around items-center py-3 ">
        <li>
          <NavLink
            to="/recomendado"
            className={StyledNavLink}
            rel="Home"
            onClick={handleResetPage}
          >
            <GoHomeFill />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/recomendacao-treino"
            className={StyledNavLink}
            rel="Treino"
            onClick={handleResetPage}
          >
            <CgGym />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/recomendacao-nutricional"
            className={StyledNavLink}
            rel="Nutrição"
            onClick={handleResetPage}
          >
            <GiMeal />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/motivacional"
            className={StyledNavLink}
            rel="Motivação"
            onClick={handleResetPage}
          >
            <GiThreeFriends />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
