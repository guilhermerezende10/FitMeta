import RecomendadoList from "../features/recomendado/RecomendadoList";
import Logo from "../ui/Logo";
import Title from "../ui/Title";
import { TbLogout } from "react-icons/tb";

function Recomendado() {
  return (
    <div className="bg-brand-bgDarkGray min-h-real flex flex-col items-center py-5">
      <Logo className="mb-2 w-20 h-20 object-contain" />
      <TbLogout  className="mb-2 w-8 h-8 absolute right-5 top-11 text-white" />

      <Title className="text-2xl text-center font-bold text-white mb-2">
        Recomendado para você
      </Title>

<div className="">
  <RecomendadoList />
</div>

    </div>
  );
}

export default Recomendado;
