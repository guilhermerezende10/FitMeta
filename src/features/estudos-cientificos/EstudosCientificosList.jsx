import Container from "../../ui/Container";
import Description from "../../ui/Description";
import Title from "../../ui/Title";
import Img from "../../ui/Img";
import Link from "../../ui/Link";

import { estudos } from "../../data/data-estudos-cientificos";

// ✅ Caminho correto relativo ao arquivo atual
const imagens = import.meta.glob("../../data/estudos-cientificos/*.{jpg,webp}", {
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
        <Container
          key={estudo.title}
          className="flex justify-center text-justify py-8"
        >
          <div className="bg-graydark-400/85 mb-5 w-4/5 max-w-3xl rounded-xl text-white shadow-lg p-5">
            <Title className="text-center text-xl font-extrabold mb-4 text-white">
              {estudo.title}
            </Title>
            <Img
              className="rounded-md w-full mb-4"
              src={estudo.img}
              alt={estudo.title}
            />
            <Description className="mb-4">{estudo.description}</Description>
            <Link
              className="block text-center bg-white w-full text-black transition py-3 font-semibold hover:bg-gray-100"
              
            >
              <a href={estudo.link} target="_blank" rel="noopener noreferrer">

              Link do estudo
              </a>
            </Link>
          </div>
        </Container>
      ))}
    </>
  );
}

export default EstudosCientificosList;
