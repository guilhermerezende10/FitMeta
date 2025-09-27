import { Outlet } from "react-router-dom";
import Container from "./Container";

function AppLayout() {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
      {/* <MenuBar /> */}
    </>
  );
}

export default AppLayout;
