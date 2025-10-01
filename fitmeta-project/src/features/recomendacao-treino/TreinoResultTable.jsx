import { useForm } from "../../context/FormContext";

import { register } from "swiper/element/bundle";
register();
import "swiper/css/bundle";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const todosTreinos = [
    {
        nome: "PPL(3x) / 45min",
        segunda: ['', '',''],
        terca: "Descanso",
        quarta: [''],
        quinta: "Descanso",
        sexta: [''],
        sabado: "Descanso",
        domingo: "Descanso",
        faixaRep: "5 a 9 Repetições (até a falha) em todos exercícios."
    }
]

function TreinoResultTable() {
  const { state, dispatch } = useForm();

  return (
    <Swiper>

    </Swiper>
  );
}

export default TreinoResultTable;
