import { useForm } from "../../context/FormContext";
import Title from "../../ui/Title";
import TreinoResultTable from "./TreinoResultTable";

function TreinoResult() {
  const { state, _ } = useForm();
  const nome = state.infoBasicas.nome;

  return (
    <div>
      <Title className="text-3xl font-extrabold mb-2 text-black text-left">
        Seu treino está pronto, {nome}
      </Title>
      <TreinoResultTable />
    </div>
  );
}

export default TreinoResult;
