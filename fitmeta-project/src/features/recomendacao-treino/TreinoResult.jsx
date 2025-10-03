import { useForm } from "../../context/FormContext";
import Title from "../../ui/Title";
import TreinoResultTable from "./TreinoResultTable";

function TreinoResult() {
  const { state, _ } = useForm();
  const nome = state.infoBasicas.nome;

  return (
    <div>
      <Title className="text-lg font-extrabold absolute top-28 bg-[#192126] rounded-full text-white py-3 w-4/5 left-1/2 e -translate-x-1/2 mb-2 text-center">
        Resultados
      </Title>
      <TreinoResultTable />
    </div>
  );
}

export default TreinoResult;
