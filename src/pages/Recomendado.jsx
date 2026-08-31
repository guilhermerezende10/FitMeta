import RecomendadoList from "../features/recomendado/RecomendadoList";

function Recomendado() {
  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-display-l text-primary">
          Recomendado para você
        </h1>
        <p className="text-body text-secondary">
          Continue de onde parou ou comece algo novo.
        </p>
      </header>

      <RecomendadoList />
    </div>
  );
}

export default Recomendado;
