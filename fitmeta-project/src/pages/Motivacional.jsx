import Container from "../ui/Container";

import logoWhite from "../data/logo/logo-white.png";
import Logo from "../ui/Logo";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import Text from "../ui/Text";
import Img from "../ui/Img";

const pessoas = [
  {
    nome: "Chris Bumstead",
    historia:
      "Chris Bumstead é um fisiculturista canadense conhecido por sua elegância e simetria no palco. Ele é campeão do Mr. Olympia na categoria Classic Physique e é admirado por sua dedicação ao esporte e sua personalidade carismática.",
    frase: "A consistência transforma o impossível em possível.",
    imagemName: "cbumMotivacional",
    imagemSrc: "cbum-motivacional.jpg",
  },
  //    {
  //     nome: "Arnold Schwarzenegger",
  //     historia:
  //       "Arnold Schwarzenegger é uma lenda do fisiculturismo, ator e ex-governador da Califórnia. Ele venceu o Mr. Olympia sete vezes e é conhecido por popularizar o fisiculturismo em todo o mundo. Sua história de superação e sucesso é inspiradora para muitos.",
  //     frase:
  //       "A força não vem da capacidade física. Vem de uma vontade indomável.",
  //     imagem: "https://example.com/arnold_schwarzenegger.jpg",
  //   },
  //    {
  //     nome: "Ronnie Coleman",
  //     historia:
  //       "Ronnie Coleman é um dos maiores fisiculturistas de todos os tempos, tendo vencido o Mr. Olympia oito vezes consecutivas. Ele é conhecido por sua incrível massa muscular e força, além de sua ética de trabalho implacável.",
  //     frase: "Não há atalhos para qualquer lugar que valha a pena ir.",
  //     imagem: "https://example.com/ronnie_coleman.jpg",
  //   },
];

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
      {/* Logo absoluta no topo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <Logo src={logoWhite} />
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
          <div className="relative z-10 flex flex-col items-center justify-end h-full pb-60 text-left text-white px-4" >
                
            <Title>{pessoa.nome}</Title>
            <Subtitle >{`"${pessoa.frase}"`}</Subtitle>
            <Text>{pessoa.historia}</Text>
         
          </div>
        </Container>
      ))}
    </Container>
  );
}

export default Motivacional;
