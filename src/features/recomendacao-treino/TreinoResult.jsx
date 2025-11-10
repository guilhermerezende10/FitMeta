import { useForm } from "../../context/FormContext";
import Title from "../../ui/Title";
import TreinoResultTable from "./TreinoResultTable";

function TreinoResult() {
  const { state, _ } = useForm();
  const nome = state.infoBasicas.nome;

  return (
    <div className="max-h-real flex flex-col bg-white overflow-y-hidden">
      {/* Título fixo no topo */}
      <div className="flex-shrink-0 px-4 pt-3 pb-4">
        <div className="max-w-lg mx-auto">
          <Title className="text-lg sm:text-xl font-bold bg-brand-bgDarkGray rounded-full text-white py-3 sm:py-4 px-6 text-center shadow-lg">
           Seu treino, {nome} 
          </Title>
        </div>
      </div>

      {/* Container da tabela com scroll */}
      <div className="flex-1 overflow-hidden pb-0">
        <TreinoResultTable />
      </div>
    </div>
  );
}

export default TreinoResult;