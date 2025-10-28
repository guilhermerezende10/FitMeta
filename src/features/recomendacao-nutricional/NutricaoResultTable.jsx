import Container from "../../ui/Container";
import ResultRow from "../../ui/ResultRow";

function NutricaoResultTable({ resultado }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-graydark-700 w-80 md:w-96 lg:w-[28rem] min-w-4 min-h-96 rounded-3xl text-white text-xl md:text-2xl lg:text-3xl flex flex-col justify-center overflow-hidden border border-gray-600 py-1">
        <Container className="divide-y divide-gray-600 w-full">
          <ResultRow
            label="Calorias" 
            value={resultado.calorias + " kcal"} 
            className="p-3 md:p-4 lg:p-5 pl-6 md:pl-8 lg:pl-10" 
          />
          <ResultRow
            label="Proteínas" 
            value={resultado.proteina + "g"} 
            className="p-3 md:p-4 lg:p-5 pl-6 md:pl-8 lg:pl-10" 
          />
          <ResultRow
            label="Carboidratos" 
            value={resultado.carboidrato + "g"} 
            className="p-3 md:p-4 lg:p-5 pl-6 md:pl-8 lg:pl-10" 
          />
          <ResultRow
            label="Gorduras" 
            value={resultado.gordura + "g"} 
            className="p-3 md:p-4 lg:p-5 pl-6 md:pl-8 lg:pl-10" 
          />
          <ResultRow
            label="TMB" 
            value={resultado.tmb + " kcal"} 
            className="p-3 md:p-4 lg:p-5 pl-6 md:pl-8 lg:pl-10" 
          />
        </Container>
      </div>
    </div>
  );
}

export default NutricaoResultTable;