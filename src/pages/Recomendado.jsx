import RecomendadoList from "../features/recomendado/RecomendadoList";
import Logo from "../ui/Logo";
import Title from "../ui/Title";
import { TbLogout } from "react-icons/tb";

function Recomendado() {
  return (
    <div className="bg-brand-bgDarkGray min-h-real flex flex-col items-center py-5 relative">
      {/* LOGO — APARECE SOMENTE NO CELULAR */}
      <Logo className="mb-2 w-20 h-20 object-contain block md:hidden" />

      {/* LOGOUT */}
      <TbLogout className="w-8 h-8 absolute right-5 top-11 text-white" />

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
