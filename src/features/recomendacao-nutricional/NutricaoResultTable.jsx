import Container from "../../ui/Container";
import ResultRow from "../../ui/ResultRow";

function NutricaoResultTable({ resultado }) {
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className="
          bg-graydark-700
          w-[90%] sm:w-80 md:w-96 lg:w-[26rem]
          rounded-3xl
          text-white
          text-base sm:text-lg md:text-2xl
          flex flex-col
          justify-center
          overflow-hidden
          border border-gray-600
          py-1 sm:py-2
          shadow-lg
        "
      >
        <Container className="divide-y divide-gray-600 w-full">
          <ResultRow
            label="Calorias"
            value={`${resultado.calorias} kcal`}
            className="p-2 sm:p-3 md:p-4 pl-6 sm:pl-6 md:pl-8"
          />
          <ResultRow
            label="Proteínas"
            value={`${resultado.proteina}g`}
            className="p-2 sm:p-3 md:p-4 pl-6 sm:pl-6 md:pl-8"
          />
          <ResultRow
            label="Carboidratos"
            value={`${resultado.carboidrato}g`}
            className="p-2 sm:p-3 md:p-4 pl-6 sm:pl-6 md:pl-8"
          />
          <ResultRow
            label="Gorduras"
            value={`${resultado.gordura}g`}
            className="p-2 sm:p-3 md:p-4 pl-6 sm:pl-6 md:pl-8"
          />
          <ResultRow
            label="TMB"
            value={`${resultado.tmb} kcal`}
            className="p-2 sm:p-3 md:p-4 pl-6 sm:pl-6 md:pl-8"
          />
        </Container>
      </div>
    </div>
  );
}

export default NutricaoResultTable;
