import PerguntasStep from "../formulario/PerguntasStep";
import { FLUXO_NUTRICAO } from "../formulario/fluxos";

function NutricaoSelect() {
  return <PerguntasStep fluxo={FLUXO_NUTRICAO} />;
}

export default NutricaoSelect;
