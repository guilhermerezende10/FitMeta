import { Outlet } from "react-router-dom";


function LoginRegisterLayout() {
  return (
    <div
      className="
        w-full min-h-real bg-white
        flex flex-col items-center justify-center
        px-6 py-6
        overflow-y-auto
      "
    >
      

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
