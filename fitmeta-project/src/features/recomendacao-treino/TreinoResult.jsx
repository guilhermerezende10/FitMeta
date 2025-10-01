import { useForm } from "../../context/FormContext";
import Title from "../../ui/Title"
import TreinoResultTable from "./TreinoResultTable";

function TreinoResult() {
      const { state, dispatch } = useForm();
    

    return (
        <div>
            <Title className="text-black">Resultado:</Title>
            <TreinoResultTable />
        </div>
    )
}

export default TreinoResult
