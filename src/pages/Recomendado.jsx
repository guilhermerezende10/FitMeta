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

<div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8 md:justify-items-center">
  <RecomendadoList />
</div>

    </div>
  );
}

export default Recomendado;
