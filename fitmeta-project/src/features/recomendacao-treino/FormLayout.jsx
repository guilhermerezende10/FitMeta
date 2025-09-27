import { Outlet } from "react-router-dom"

function FormLayout() {
    return (
        <div className="bg-white w-full min-h-screen flex justify-center items-center pt-20 pb-20">
            <Outlet />
        </div>
    )
}

export default FormLayout
