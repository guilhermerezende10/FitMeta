import { Outlet } from "react-router-dom";
import Container from "./Container";
import MenuBar from "./MenuBar";
import "./AppLayout.css" // Will be deleted later

function AppLayout() {
  return (
    <div className="appLayout">
      <Container >
        <Outlet />
      </Container>
      <MenuBar />
    </div>
  );
}

export default AppLayout;
