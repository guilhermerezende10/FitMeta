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
      {/* Logo (aparece só no mobile conforme antes) */}
      <div className="absolute top-8 left-16 transform -translate-x-1/2 z-10 block lg:hidden">
        <Logo />
      </div>

      <Swiper
        slidesPerView={1}
        className="relative h-real w-screen"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 8000, disableOnInteraction: true }}
      >
        {pessoas.map((pessoa) => (
          <SwiperSlide key={pessoa.id}>
            {/* ========== MOBILE: exatamente como antes ========== */}
            <div className="lg:hidden absolute inset-0 z-0 flex justify-center items-center">
              <div
                className="rounded-2xl shadow-2xl bg-white/5 backdrop-blur-sm overflow-hidden
                  flex justify-center items-center h-full w-full"
              >
                <Img
                  src={pessoa.imagem}
                  className="h-full w-full object-cover opacity-90"
                />
              </div>

              {/* Fade (mobile) */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bgDarkGray via-brand-bgDarkGray/70 to-transparent" />
            </div>

            {/* Texto do mobile (mantido igual) */}
            <div className="lg:hidden relative z-10 mt-20 flex flex-col items-center justify-end h-real pb-44 px-8 text-white">
              <Title className="text-center font-extrabold mb-2 text-white text-3xl">
                {pessoa.nome}
              </Title>

              <Subtitle className="text-sm">{`"${pessoa.frase}"`}</Subtitle>

              <Text className="text-xs font-light text-white text-justify max-w-sm mt-4">
                {pessoa.historia}
              </Text>
            </div>

            {/* ========== DESKTOP: imagem à esquerda, texto direita ========== */}
            <div className="hidden lg:flex h-real w-screen items-stretch">
              {/* FOTO ESQUERDA */}
              <div
                className="relative w-1/2 ml-60 flex items-start justify-center"
                /* importante: items-start para que a imagem se alinhe ao topo em vez de ser centralizada */
              >
                <div className="relative w-full h-full overflow-visible">
                  <Img
                    src={pessoa.imagem}
                    className={
                      // Desktop: evitar corte do topo — object-top + min-h
                      "w-full h-auto min-h-[70vh] lg:min-h-[85vh] object-cover lg:object-top opacity-90 shadow-xl"
                    }
                  />

                  {/* Fade sobre a imagem (desktop) */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-brand-bgDarkGray/90 via-brand-bgDarkGray/40 to-transparent rounded-2xl" />
                </div>
              </div>

              {/* TEXTO DIREITA */}
              <div className="w-1/2 h-full flex flex-col justify-center px-16 text-white z-30">
                <Title className="text-left font-extrabold mb-4 text-white text-5xl">
                  {pessoa.nome}
                </Title>

                <Subtitle className="text-left text-xl mb-6">
                  {`"${pessoa.frase}"`}
                </Subtitle>

                <Text className="text-left text-base font-light max-w-lg">
                  {pessoa.historia}
                </Text>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

export default Motivacional;
