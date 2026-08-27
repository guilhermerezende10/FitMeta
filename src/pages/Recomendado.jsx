import RecomendadoList from "../features/recomendado/RecomendadoList";
import Logo from "../ui/Logo";
import Title from "../ui/Title";
import { TbLogout } from "react-icons/tb";
import { handleLogout } from "../services/apiAuth";

function Recomendado() {
  return (
    <div
      className="
    bg-brand-bgDarkGray 
    min-h-real 
    flex flex-col items-center 
    py-5 
    relative

    pb-28   /* espaço para a navbar no mobile */
    md:pb-5 /* tablet/PC normal */
 
  "
    >
      {/* LOGO — APARECE SOMENTE NO CELULAR */}
      <Logo className="mb-2 w-20 h-20 object-contain block lg:hidden" />

      {/* LOGOUT */}
      <button onClick={handleLogout}>
        <TbLogout className="w-8 h-8 absolute right-5 lg:right-14 lg:w-12 lg:h-12 top-11 text-white" />
      </button>

      {/* TÍTULO — AUMENTA COM A TELA */}
      <Title
        className="
    text-white font-bold text-center
    m-2              /* mobile */
    md:m-4           /* tablet */
    lg:m-6           /* desktop */
    xl:m-8           /* telas grandes */

    text-2xl
    md:text-3xl
    lg:text-4xl
    xl:text-5xl
  "
      >
        Recomendado para você
      </Title>

      <div>
        <RecomendadoList />
      </div>
    </div>
  );
}

export default Recomendado;
