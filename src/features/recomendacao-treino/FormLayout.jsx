import { IoIosArrowBack } from "react-icons/io";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../../ui/Logo";
import logoDarkblue from "../../data/logo/logo-darkblue.png";
import { useForm } from "../../context/FormContext";

function FormLayout() {
  const { state, dispatch } = useForm();
  const navigate = useNavigate();

  function handleBackPage() {
    if (state.pageIndex !== 1) dispatch({ type: "PREV_PAGE" });
    else navigate(-1);
  }

  return (
    <div className="min-h-real w-full flex flex-col items-center bg-white relative px-4 pt-4 pb-2 ">
      {/* Header fixo */}
      <div className="flex items-center justify-between w-full  ">
        <div className="absolute lg:left-72 lg:top-12">
          <button
            onClick={handleBackPage}
            className="text-2xl text-brand-bgDarkGray flex items-center justify-center"
          >
            <IoIosArrowBack />
          </button>
        </div>

        <div className="flex justify-center w-full">
          <Logo
            className="mb-2 w-20 h-20 object-contain block lg:hidden"
            src={logoDarkblue}
          />
        </div>

        {/* espaçamento visual para equilibrar o ícone */}
      </div>

      {/* Conteúdo dinâmico do formulário */}
      <div className="flex-1 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}

export default FormLayout;
