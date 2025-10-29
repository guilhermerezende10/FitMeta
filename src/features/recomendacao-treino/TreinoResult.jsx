import { useForm } from "../../context/FormContext";
import Title from "../../ui/Title";
import TreinoResultTable from "./TreinoResultTable";

function TreinoResult() {
  const { state, _ } = useForm();
  const nome = state.infoBasicas.nome;

  return (
    <div className="h-real flex flex-col bg-white">
      {/* Título fixo no topo */}
      <div className="flex-shrink-0 px-4 pt-6 pb-4">
        <div className="max-w-lg mx-auto">
          <Title className="text-lg sm:text-xl font-extrabold bg-brand-bgDarkGray rounded-full text-white py-3 sm:py-4 px-6 text-center shadow-lg">
            Resultados
          </Title>
        </div>
      </div>

      {/* Container da tabela com scroll */}
      <div className="flex-1 overflow-hidden pb-24">
        <TreinoResultTable />
      </div>
    </div>
  );
}

export default TreinoResult;