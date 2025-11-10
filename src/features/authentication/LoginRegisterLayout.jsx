import { Outlet } from "react-router-dom";
import Logo from "../../ui/Logo";
import logoDarkPurple from "../../data/logo/logo-darkpurple.png";

function LoginRegisterLayout() {
  return (
    <div
      className="
        w-screen min-h-real bg-white
        flex flex-col items-center justify-center
        px-6 py-6
        overflow-y-auto
      "
    >
      {/* Logo — pequeno espaçamento acima e abaixo */}
      <div className="flex justify-center w-full">
        <Logo className="h-28 sm:h-32 md:h-36 object-contain" src={logoDarkPurple} />
      </div>

      {/* Conteúdo central (Outlet) */}
      <div className="w-full max-w-md">
        <Outlet />
      </div>

      {/* spacer final: evita sobreposição com tab bar / rodapé */}
      <div className="h-14 sm:h-16 md:h-20" />
    </div>
  );
}

export default LoginRegisterLayout;
