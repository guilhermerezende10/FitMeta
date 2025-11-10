import { useForm } from "../../context/FormContext";

import { register } from "swiper/element/bundle";
register();
import "swiper/css/bundle";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

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
      treino.duracao === duracaoTreino && treino.diasDeTreino === diasDeTreino
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
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 8000, disableOnInteraction: true }}
        className="w-full h-full max-w-xl mx-auto"
        centeredSlides={true}
      >
        {diasSemana.map((dia) => (
          <SwiperSlide key={dia} className="flex items-center justify-center px-2 py-4">
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
              <div className="max-h-[43vh] overflow-y-auto">

                {treinoFinal[0] && Array.isArray(treinoFinal[0][dia]) ? (
                  <ul className="divide-y divide-gray-500">
                    {treinoFinal[0][dia].map(([exercicio, repeticoes], index) => (
                      <li key={index} className="px-6 py-3 hover:bg-gray-700/50 transition-colors">
                        <span className="block text-xs sm:text-lg font-medium">
                          {exercicio}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-400 mt-1 block">
                          {String(repeticoes).replace(/\D/g, "")} séries
                        </span>
                      </li>
                    ))}
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
  );
}

export default TreinoResultTable;