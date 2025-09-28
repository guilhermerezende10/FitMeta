import Container from "../ui/Container";

import Logo from "../ui/Logo";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import Text from "../ui/Text";
import Img from "../ui/Img";
import { pessoas } from "../data/data-motivacional";

import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";

const imagens = import.meta.glob("../data/motivacional/*.jpg", {
  eager: true,
  import: "default",
});

pessoas.forEach((pessoa) => {
  const path = `../data/motivacional/${pessoa.imagemSrc}`;
  pessoa.imagem = imagens[path]; // já é o src
});

function Motivacional() {


  return (
    <Container className="relative h-screen w-screen overflow-hidden bg-[#192126]">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10 text-white">
        <FaLongArrowAltLeft className="" />
        <FaLongArrowAltRight className="" />
      </div>
      {/* Logo absoluta no topo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <Logo />
      </div>
      {pessoas.map((pessoa) => (
        <Container
          key={pessoa.nome}
          className="relative h-screen w-screen overflow-hidden"
        >
          {/* Imagem de fundo */}
          <div className="absolute inset-0 z-0">
            <Img
              src={pessoa.imagem}
              className="h-full w-full object-cover opacity-90"
            />
            {/* Gradiente sobre a imagem */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#192126] via-[#192126]/85 to-transparent" />
          </div>

          {/* Conteúdo textual */}
          <div className="relative z-10 flex flex-col items-center justify-end h-full pb-60 text-left text-white px-4">
            <Title>{pessoa.nome}</Title>
            <Subtitle>{`"${pessoa.frase}"`}</Subtitle>
            <Text>{pessoa.historia}</Text>
          </div>
        </Container>
      ))}
    </Container>
  );
}

export default Motivacional;
