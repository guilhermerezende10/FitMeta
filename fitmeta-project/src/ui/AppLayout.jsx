import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <h1>Applayout</h1>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;
