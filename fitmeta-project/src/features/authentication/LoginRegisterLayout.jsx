import { Outlet } from "react-router-dom";
import Logo from "../../ui/Logo";
import logoDarkPurple from "../../data/logo/logo-darkpurple.png";

function LoginRegisterLayout() {
  return (
    <div>
      <Logo className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10 h-36" src={logoDarkPurple} />

      <Outlet />
    </div>
  );
}

export default LoginRegisterLayout;
