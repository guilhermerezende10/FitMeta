import { Outlet, useLocation } from "react-router-dom";
import Container from "./Container";
import MenuBar from "./MenuBar";

function AppLayout() {
  const location = useLocation();

  const hideNavRoute = "/home";
  const showNav = !hideNavRoute.includes(location.pathname);

  return (
    <div className="bg-brand-bgDarkGray min-h-real flex flex-col">
      <Container >
        <Outlet />
      </Container>
      {showNav && <MenuBar />}
    </div>
  );
}

export default AppLayout;
