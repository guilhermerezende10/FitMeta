import { useForm } from "../../context/FormContext";

import { register } from "swiper/element/bundle";
register();
import "swiper/css/bundle";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { treinos } from "../../data/data-recomendacao-treino";

function TreinoResultTable() {
  const {
    state: { _, treinoAnswers },
  } = useForm();

  if (!treinoAnswers[1] || !treinoAnswers[2]) {
    return;
  }
  const diasDeTreino = parseInt(treinoAnswers[1].replace(/\D/g, ""), 10);
  const duracaoTreino = parseInt(treinoAnswers[2].replace(/\D/g, ""), 10);

  // const nivelTreino = treinoAnswers[3];

  const treinoFinal = treinos.filter(
    (treino) =>
      treino.duracao === duracaoTreino && treino.diasDeTreino === diasDeTreino
  );

  // Array dos dias para iterar
  const diasSemana = [
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado",
    "domingo",
  ];

  return (
    <Swiper
      slidesPerView={1}
      className="relative h-screen w-screen overflow-hidden"
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 8000, disableOnInteraction: true }}
    >
      {diasSemana.map((dia) => (
        <SwiperSlide key={dia}>
          <div className="p-6">
            <h2 className="text-2xl font-bold capitalize">{dia}</h2>

            {treinoFinal[0] && Array.isArray(treinoFinal[0][dia]) ? (
              <ul className="mt-4 space-y-2">
                {treinoFinal[0][dia].map(([exercicio, repeticoes], index) => (
                  <li key={index} className="flex justify-between">
                    <span>{exercicio}</span>
                    <span className="font-semibold">{repeticoes}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 italic">
                {treinoFinal[0]?.[dia] ?? "Descanso"}
              </p>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default TreinoResultTable;
