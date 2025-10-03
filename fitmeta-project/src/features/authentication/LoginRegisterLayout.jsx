import { Outlet } from "react-router-dom";
import Logo from "../../ui/Logo";
import logoDarkBlue from "../../data/logo/logo-darkblue.png";

function LoginRegisterLayout() {
  return (
    <div>
      <Logo src={logoDarkBlue} />

      <Outlet />
    </div>
  );
}

export default LoginRegisterLayout;
