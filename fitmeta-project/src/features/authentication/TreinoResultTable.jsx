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
    <div className="min-h-screen flex items-center justify-center p-4">
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 8000, disableOnInteraction: true }}
        className="w-screen relative overflow-hidden max-w-4xl"
        centeredSlides={true}
      >
        {diasSemana.map((dia) => (
          <SwiperSlide key={dia} className="flex justify-center mt-24">
            <div className="max-w-2xl bg-brand-bgDarkGray rounded-3xl text-white w-11/12 overflow-hidden">
  {/* Header do dia */}
  <div className="bg-gray-700 px-6 py-3">
    <h2 className="text-2xl font-bold capitalize">{dia}</h2>
    <span className="text-gray-300">
      {treinoFinal[0]?.[dia] !== "Descanso" &&
        treinoFinal[0]?.[dia]?.length + " exercícios"}
    </span>
  </div>

  {/* Lista de exercícios */}
  {treinoFinal[0] && Array.isArray(treinoFinal[0][dia]) ? (
    <ul className="divide-y divide-gray-500 border-t border-gray-500">
      {treinoFinal[0][dia].map(([exercicio, repeticoes], index) => (
        <li key={index} className="py-2 w-full">
          <span className="ml-6">{exercicio}</span>
          <span className="text-sm ml-6 text-gray-400 block">
            {String(repeticoes).replace(/\D/g, "")} séries
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="my-4 ml-6">{treinoFinal[0]?.[dia] ?? "Descanso"}</p>
  )}
</div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TreinoResultTable;