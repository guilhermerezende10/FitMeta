import RecomendadoList from "../features/recomendado/RecomendadoList";
import Logo from "../ui/Logo";
import Title from "../ui/Title";

function Recomendado() {
  return (
    <div className="bg-[#192126] min-h-screen flex flex-col items-center py-10">
      {/* Logo */}
      <Logo className="mb-6 w-20 h-20 object-contain" />

      {/* Título */}
      <Title className="text-3xl text-center font-bold text-white mb-10">
        Recomendado para você
      </Title>

      {/* Lista de recomendações */}
      <RecomendadoList />
    </div>
  );
}

export default Recomendado;
