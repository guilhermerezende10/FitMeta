import Container from "../ui/Container";

import Logo from "../ui/Logo";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import Text from "../ui/Text";
import Img from "../ui/Img";
import { pessoas } from "../data/data-motivacional";

import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";

import { register } from "swiper/element/bundle";
register();
import "swiper/css/bundle";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

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
      {/* <div className="absolute inset-0 flex items-center justify-between z-10 ">
        <div
          className="swiper-button-prev px-2"
          style={{ transform: "translateY(-90px)" }}
        >
          <FaLongArrowAltLeft className="text-2xl cursor-pointer text-white " />
        </div>
        <div
          className="swiper-button-next px-2"
          style={{ transform: "translateY(-90px)" }}
        >
          <FaLongArrowAltRight className="text-2xl cursor-pointer text-white" />
        </div>
      </div> */}

      {/* Logo absoluta no topo */}
      <div className="absolute top-8 left-16 transform -translate-x-1/2 z-10">
        <Logo />
      </div>
      <Swiper
        slidesPerView={1}
        className="relative h-screen w-screen overflow-hidden"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 8000, disableOnInteraction: true }}
      >
        {pessoas.map((pessoa) => (
          <SwiperSlide key={pessoa.id}>
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
            
            <div className="relative z-10 mt-20 flex flex-col items-center justify-end h-full pb-60 px-8 text-white">
              <Title className="text-center text-3xl font-extrabold mb-2 text-white" >{pessoa.nome}</Title>
              <Subtitle>{`"${pessoa.frase}"`}</Subtitle>
              <Text className="text-left">{pessoa.historia}</Text>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

export default Motivacional;
