import Container from "../../ui/Container";
import Description from "../../ui/Description";
import Title from "../../ui/Title";
import Img from "../../ui/Img";
import Link from "../../ui/Link";

import { estudos } from "../../data/data-estudos-cientificos";

// ✅ Caminho correto relativo ao arquivo atual
const imagens = import.meta.glob("../../data/estudos-cientificos/*.jpg", {
  eager: true,
  import: "default",
});

// ✅ Mapear corretamente as imagens
estudos.forEach((estudo) => {
  const path = `../../data/estudos-cientificos/${estudo.imgSrc}`;
  estudo.img = imagens[path]; // o Vite gera as chaves exatas com esse caminho
});

function EstudosCientificosList() {
  return (
    <>
      {estudos.map((estudo) => (
        <Container key={estudo.title}>
          <Title>{estudo.title}</Title>
          <Img src={estudo.img} alt={estudo.title} />
          <Description>{estudo.description}</Description>
          <Link href={estudo.link}>Link do estudo</Link>
        </Container>
      ))}
    </>
  );
}

export default EstudosCientificosList;
