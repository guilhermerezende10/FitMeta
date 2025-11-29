import { Swiper, SwiperSlide } from "swiper/react";
import Title from "../ui/Title";

function MeuTreino() {
  const diasSemana = [
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado",
    "domingo",
  ];

  const diasNomes = {
    segunda: "Segunda-feira",
    terca: "Terça-feira",
    quarta: "Quarta-feira",
    quinta: "Quinta-feira",
    sexta: "Sexta-feira",
    sabado: "Sábado",
    domingo: "Domingo",
  };

  const treinoFinal = [];

  return (
    <div >
        <div className="flex-shrink-0 px-4 pt-3 pb-4">
        <div className="max-w-lg mx-auto">
          <Title className="text-lg sm:text-xl font-bold bg-brand-bgDarkGray rounded-full text-white py-3 sm:py-4 px-6 text-center shadow-lg">
           Seu treino personalizado 
          </Title>
        </div>
      </div>
      <div className="h-full flex flex-col px-5">
        <style>{`
  .swiper-pagination {
    position: absolute !important;
    top: -0.4rem !important;
    bottom: auto !important;
    }
    
    .swiper-pagination-bullet {
        border: 1px solid #192126 !important;
        background: white !important;
        opacity: 0.5 !important;
        }
        
        .swiper-pagination-bullet-active {
            background: #192126 !important;
            opacity: 1 !important;
            }
            `}</style>

        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 8000, disableOnInteraction: true }}
          className="w-full h-full max-w-xl mx-auto py-2"
          centeredSlides={true}
        >
          {diasSemana.map((dia) => (
            <SwiperSlide
              key={dia}
              className="flex items-center justify-center px-2 py-4"
            >
              <div className="w-full max-w-md bg-brand-bgDarkGray rounded-3xl text-white overflow-hidden shadow-xl">
                {/* Header do dia */}
                <div className="bg-gray-700 px-6 py-3">
                  <h2 className="text-xl sm:text-xl font-bold">
                    {diasNomes[dia]}
                  </h2>
                  <span className="text-sm sm:text-base text-gray-300">
                    {treinoFinal[0]?.[dia] !== "Descanso" &&
                      Array.isArray(treinoFinal[0]?.[dia]) &&
                      treinoFinal[0][dia].length + " exercícios"}
                  </span>
                </div>

                {/* Lista de exercícios - com scroll interno */}
                <div className="max-h-[40vh] min-[400px]:max-h-[45vh] min-[500px]:max-h-[50vh] sm:max-h-[55vh] overflow-y-auto">
                  {treinoFinal[0] && Array.isArray(treinoFinal[0][dia]) ? (
                    <ul className="divide-y divide-gray-500">
                      {treinoFinal[0][dia].map(
                        ([exercicio, repeticoes], index) => (
                          <li
                            key={index}
                            className="px-6 py-3 hover:bg-gray-700/50 transition-colors"
                          >
                            <span className="block text-xs sm:text-lg font-medium">
                              {exercicio}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-400 mt-1 block">
                              {String(repeticoes).replace(/\D/g, "")} séries
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <div className="px-6 py-8 text-center">
                      <p className="text-lg text-gray-300">
                        {treinoFinal[0]?.[dia] ?? "Descanso"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MeuTreino;
