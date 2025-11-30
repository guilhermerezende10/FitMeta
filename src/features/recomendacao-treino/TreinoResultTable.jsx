import { useForm } from "../../context/FormContext";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import { treinos } from "../../data/data-recomendacao-treino";

function TreinoResultTable() {
  const {
    state: { treinoAnswers },
  } = useForm();

  if (!treinoAnswers[1] || !treinoAnswers[2]) {
    return null;
  }

  const diasDeTreino = parseInt(treinoAnswers[1].replace(/\D/g, ""), 10);
  const duracaoTreino = parseInt(treinoAnswers[2].replace(/\D/g, ""), 10);

  const treinoFinal = treinos.filter(
    (treino) =>
      treino.duracao === duracaoTreino &&
      treino.diasDeTreino === diasDeTreino
  );

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

  return (
    <div className="h-full flex flex-col px-5">
      <style>{`
        .swiper-pagination {
          position: absolute !important;
          top: -0.5rem !important;
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
        modules={[Pagination, Autoplay]}
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
            <div
              className="w-full max-w-md bg-brand-bgDarkGray rounded-3xl text-white overflow-hidden shadow-xl
              flex flex-col
              h-[60vh] sm:h-[72vh] md:h-[74vh] lg:h-[76vh] xl:h-[81vh]"
            >
              {/* Header */}
              <div className="bg-gray-700 px-6 py-3 flex-shrink-0">
                <h2 className="text-base lg:text-xl font-bold">
                  {diasNomes[dia]}
                </h2>
                <span className="text-sm text-gray-300">
                  {treinoFinal[0]?.[dia] !== "Descanso" &&
                    Array.isArray(treinoFinal[0]?.[dia]) &&
                    treinoFinal[0][dia].length + " exercícios"}
                </span>
              </div>

              {/* Lista */}
              <div className="flex-grow px-0 flex flex-col overflow-y-auto sm:overflow-y-auto">
                {treinoFinal[0] && Array.isArray(treinoFinal[0][dia]) ? (
                  <div className="flex flex-col flex-grow">
                    {treinoFinal[0][dia].map(
                      ([exercicio, repeticoes], index) => (
                        <div
                          key={index}
                          className="
                            border-b border-gray-600 last:border-b-0 px-6 text-left
                            py-3
                            sm:flex-1 sm:flex sm:flex-col sm:justify-center
                          "
                        >
                          <span className="text-xs sm:text-base font-medium">
                            {exercicio}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-400 block mt-1">
                            {String(repeticoes).replace(/\D/g, "")} séries
                          </span>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex-grow flex items-center justify-center px-6">
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
  );
}

export default TreinoResultTable;
