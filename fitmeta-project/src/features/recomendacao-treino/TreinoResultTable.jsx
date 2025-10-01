import { useForm } from "../../context/FormContext";

import { register } from "swiper/element/bundle";
register();
import "swiper/css/bundle";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const treinos = [
    {
        nome: "PPL(3x) / 45min",
        segunda: [
            ['Supino Inclinado', '(4x)'],
            ['Crucifixo', '(4x)'],
            ['Elevação Lateral na Máquina ou Polia', '(4x)'],
            ['Tríceps Francês', '(3x)'],
            ['Tríceps Pulley', '(3x)']
        ],
        terca: "Descanso",
        quarta: [
            ['Cadeira Flexora', '(4x)'],
            ['Agachamento Pêndulo', '(4x)'],
            ['Mesa Flexora', '(3x)'],
            ['Cadeira Extensora', '(4x)'],
            ['Panturrilha no Leg', '(4x)']
        ],
        quinta: "Descanso",
        sexta: [
            ['Puxada Fechada', '(4x)'],
            ['Remada Aberta', '(3x)'],
            ['Remada Baixa', '(3x)'],
            ['Rosca Scott', '(2x)'],
            ['Rosca no Banco Inclinado', '(2x)']
        ],
        sabado: "Descanso",
        domingo: "Descanso",
        faixaRep: "5 a 9"
    }
];

function TreinoResultTable() {
  const { state, dispatch } = useForm();
  const treinoFinal = treinos[0]

  return (
    <Swiper
      slidesPerView={1}
      className="relative h-screen w-screen overflow-hidden"
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 8000, disableOnInteraction: true }}
    >
      {treinoFinal.map((treino) => (
        <SwiperSlide key={treino.nome}>

        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default TreinoResultTable;
