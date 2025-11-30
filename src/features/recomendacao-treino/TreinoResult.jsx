import { useForm } from "../../context/FormContext";
import Title from "../../ui/Title";
import TreinoResultTable from "./TreinoResultTable";

function TreinoResult() {
  const { state } = useForm();
  const nome = state.infoBasicas.nome;

  return (
    <div className="max-h-real flex flex-col bg-white overflow-y-hidden">
      {/* Título fixo no topo */}
      <div className="flex-shrink-0 px-5 pt-3 pb-4">
        <div className="max-w-md mx-auto">
          <Title className="text-lg sm:text-xl font-bold bg-brand-bgDarkGray rounded-full text-white py-3 sm:py-4 lg:my-3 text-center shadow-lg">
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