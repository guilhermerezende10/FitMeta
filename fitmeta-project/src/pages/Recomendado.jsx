import RecomendadoList from "../features/recomendado/RecomendadoList";
import Logo from "../ui/Logo";
import Title from "../ui/Title";

function Recomendado() {
  return (
    <div>
      <Logo/>
      <Title>Recomendado para você</Title>
      
      <RecomendadoList />
    </div>
  );
}

export default Recomendado;
