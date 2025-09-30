import { Outlet } from "react-router-dom"

function FormLayout() {
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center bg-white">
      <Outlet />
    </div>
  );
}

export default FormLayout
