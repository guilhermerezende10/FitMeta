import LegalDocument from "../features/legal/LegalDocument";
import { TERMOS } from "../features/legal/legalDocs";

function TermosDeUso() {
  return <LegalDocument doc={TERMOS} />;
}

export default TermosDeUso;
