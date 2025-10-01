import { IoIosArrowBack } from "react-icons/io";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../../ui/Logo";
import logoDarkblue from "../../data/logo/logo-darkblue.png";
import { useForm } from "../../context/FormContext";

function FormLayout() {
  const { state, dispatch } = useForm();
  // const { nome, idade, peso, altura, sexo } = state.infoBasicas;

  function handleBackPage() {
    if (state.pageIndex !== 1) dispatch({ type: "PREV_PAGE" });
    else navigate(-1);
  }

  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center bg-white">
      <div
        className="absolute top-7 left-5 text-2xl p-3"
        onClick={handleBackPage}
      >
        <IoIosArrowBack className="text-[#192126]" />
      </div>

      {/* Logo */}
      <div className="absolute top-8">
        <Logo src={logoDarkblue} />
      </div>
      <Outlet />
    </div>
  );
}

export default FormLayout;
