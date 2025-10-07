import { Outlet } from "react-router-dom";
import Container from "./Container";
import MenuBar from "./MenuBar";

function AppLayout() {
  return (
    <div className="bg-brand-bgDarkGray min-h-screen flex flex-col">
      <Container >
        <Outlet />
      </Container>
      <MenuBar />
    </div>
  );
}

export default AppLayout;

