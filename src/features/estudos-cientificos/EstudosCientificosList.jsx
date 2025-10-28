import Container from "../../ui/Container";
import Description from "../../ui/Description";
import Title from "../../ui/Title";

import { estudos } from "../../data/data-estudos-cientificos";
import Img from "../../ui/Img";
import Link from "../../ui/Link";

function EstudosCientificosList() {
  return (
    <>
      {estudos.map((estudo) => (
        <Container key={estudo.title}>
          <Title>{estudo.title}</Title>
          <Img src={`../../data/estudos-cientificos/${estudo.imgSrc}`} alt={estudo.title} />
          <Description>{estudo.description}</Description>
          <Link href={estudo.link}>Link do estudo</Link>
        </Container>
      ))}
    </>
  );
}

export default EstudosCientificosList;
