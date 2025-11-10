import RecomendadoList from "../features/recomendado/RecomendadoList";
import Logo from "../ui/Logo";
import Title from "../ui/Title";

function Recomendado() {
  return (
    <div className="bg-brand-bgDarkGray min-h-real flex flex-col items-center py-5">
      <Logo className="mb-2 w-20 h-20 object-contain" />

      <Title className="text-2xl text-center font-bold text-white mb-2">
        Recomendado para você
      </Title>

      <RecomendadoList />
    </div>
  );
}

export default Recomendado;
