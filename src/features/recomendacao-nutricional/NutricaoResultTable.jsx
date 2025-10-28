import Container from "../../ui/Container";
import ResultRow from "../../ui/ResultRow";

function NutricaoResultTable({ resultado }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-graydark-700 w-80 min-w-4 min-h-96 rounded-3xl text-white text-2xl flex flex-col justify-center overflow-hidden border border-gray-600 py-1">
        <Container className="divide-y divide-gray-600 w-full">
          <ResultRow
            label="Calorias" 
            value={resultado.calorias + " kcal"} 
            className="p-4 pl-8" 
          />
          <ResultRow
            label="Proteínas" 
            value={resultado.proteina + "g"} 
            className="p-4 pl-8" 
          />
          <ResultRow
            label="Carboidratos" 
            value={resultado.carboidrato + "g"} 
            className="p-4 pl-8" 
          />
          <ResultRow
            label="Gorduras" 
            value={resultado.gordura + "g"} 
            className="p-4 pl-8" 
          />
          <ResultRow
            label="TMB" 
            value={resultado.tmb + " kcal"} 
            className="p-4 pl-8" 
          />
        </Container>
      </div>
    </div>
  );
}

export default NutricaoResultTable;