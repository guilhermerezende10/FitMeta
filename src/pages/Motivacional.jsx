import Container from "../ui/Container";

import Logo from "../ui/Logo";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import Text from "../ui/Text";
import Img from "../ui/Img";
import { pessoas } from "../data/data-motivacional";

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
  pessoa.imagem = imagens[path];
});

function Motivacional() {
  return (
    <Container className="relative h-real w-screen overflow-hidden bg-brand-bgDarkGray">
      {/* Logo */}
      <div className="absolute top-8 left-16 transform -translate-x-1/2 z-10 block md:hidden">
        <Logo />
      </div>

      <Swiper
        slidesPerView={1}
        className="relative h-real w-screen overflow-hidden"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 8000, disableOnInteraction: true }}
      >
        {pessoas.map((pessoa) => (
          <SwiperSlide key={pessoa.id}>
            {/* Background */}
            <div className="absolute inset-0 z-0 flex justify-center items-center">
              <div
                className="rounded-2xl shadow-2xl bg-white/5 backdrop-blur-sm overflow-hidden
                flex justify-center items-center h-full w-full md:w-auto md:h-auto"
              >
                <Img
                  src={pessoa.imagem}
                  className="h-full w-full object-cover md:w-[640px] md:h-[1080px] md:object-cover opacity-90"
                />
              </div>

              {/* Fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bgDarkGray via-brand-bgDarkGray/70 to-transparent" />
            </div>

            {/* Texto */}
            <div className="relative z-10 mt-20 flex flex-col items-center justify-end h-real pb-44 px-8 text-white">
              <Title className="text-center font-extrabold mb-2 text-white text-3xl md:text-5xl">
                {pessoa.nome}
              </Title>

              <Subtitle className="text-sm md:text-xl">{`"${pessoa.frase}"`}</Subtitle>

              <Text className="text-xs font-light text-white text-justify max-w-sm mt-4 md:text-base md:max-w-xl">
                {pessoa.historia}
              </Text>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

export default Motivacional;
