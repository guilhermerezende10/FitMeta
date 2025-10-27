import Container from "../../ui/Container";
import ResultRow from "../../ui/ResultRow";

function NutricaoResultTable({ resultado }) {
  return (
    <Container>
      <ResultRow label="Calorias" value={resultado.calorias + " kcal"} className="" />
      <ResultRow label="Proteínas" value={resultado.proteina + "g"} className="" />
      <ResultRow label="Carboidratos" value={resultado.carboidrato + "g"} />
      <ResultRow label="Gorduras" value={resultado.gordura + "g"} className="" />
      <ResultRow label="TMB" value={resultado.tmb + " kcal"} className="" />
    </Container>
  );
}

export default NutricaoResultTable;
