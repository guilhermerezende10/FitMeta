import Container from "../../ui/Container";
import ResultRow from "../../ui/ResultRow";

function NutricaoResultTable({ resultado }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-graydark-700 w-80 min-h-96 rounded-2xl text-white text-2xl flex flex-col justify-center items-center text-center overflow-hidden border border-gray-600 py-1">
        <Container className="divide-y divide-gray-600 w-full text-center">
          <ResultRow 
            label="Calorias" 
            value={resultado.calorias + " kcal"} 
            className="p-4 flex flex-col justify-center items-center" 
          />
          <ResultRow 
            label="Proteínas" 
            value={resultado.proteina + "g"} 
            className="p-4 flex flex-col justify-center items-center" 
          />
          <ResultRow 
            label="Carboidratos" 
            value={resultado.carboidrato + "g"} 
            className="p-4 flex flex-col justify-center items-center" 
          />
          <ResultRow 
            label="Gorduras" 
            value={resultado.gordura + "g"} 
            className="p-4 flex flex-col justify-center items-center" 
          />
          <ResultRow 
            label="TMB" 
            value={resultado.tmb + " kcal"} 
            className="p-4 flex flex-col justify-center items-center" 
          />
        </Container>
      </div>
    </div>
  );
}

export default NutricaoResultTable;