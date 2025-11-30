import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Title from "../ui/Title";
import { treinos } from "../data/data-recomendacao-treino";
import supabase from "../services/supabase";
import Spinner from "../ui/Spinner";

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

  const [treinoAnswers, setTreinoAnswers] = useState({
    1: "",
    2: "",
    3: "",
  });

  const [loading, setLoading] = useState(false); // <-- novo

  useEffect(() => {
    async function fetchAnswers() {
      setLoading(true); // <-- ATIVAR LOADING ANTES DE TUDO

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false); // <-- ENCERRAR LOADING
        return;
      }

      const { data, error } = await supabase
        .from("treino_answers")
        .select("freq_treino, duracao, experiencia")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.log(error);
        setLoading(false); // <-- ENCERRAR LOADING MESMO COM ERRO
        return;
      }

      setTreinoAnswers({
        1: data.freq_treino,
        2: data.duracao,
        3: data.experiencia,
      });

      setLoading(false); // <-- ENCERRAR LOADING APÓS SUCESSO
    }

    fetchAnswers();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 place-items-center lg:pl-56">
        <Spinner />
      </div>
    );
  }

  const diasDeTreino = parseInt(
    (treinoAnswers[1] || "").replace(/\D/g, ""),
    10
  );
  const duracaoTreino = parseInt(
    (treinoAnswers[2] || "").replace(/\D/g, ""),
    10
  );

  const treinoFinal = treinos.filter(
    (treino) =>
      treino.duracao === duracaoTreino && treino.diasDeTreino === diasDeTreino
  );

  return (
    <div>
      <div className="flex-shrink-0 px-5 pt-3 pb-4">
        <div className="max-w-md mx-auto">
          <Title className="text-lg sm:text-xl font-bold bg-brand-bgDarkGray rounded-full text-white py-3 sm:py-4 lg:my-3 text-center shadow-lg">
           Seu treino personalizado
          </Title>
        </div>
      </div>
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

                {/* LISTA */}
                <div
                  className="
                  flex-grow px-0 flex flex-col

                  /* Mobile: scroll normal */
                  overflow-y-auto

                  /* PC: também tem scroll se necessário */
                  sm:overflow-y-auto
                "
                >
                  {treinoFinal[0] && Array.isArray(treinoFinal[0][dia]) ? (
                    <div className="flex flex-col flex-grow">
                      {treinoFinal[0][dia].map(
                        ([exercicio, repeticoes], index) => (
                          <div
                            key={index}
                            className={`
                            border-b border-gray-600 last:border-b-0 px-6 text-left

                            /* Mobile: altura natural */
                            py-3

                            /* PC: cada exercício ocupa espaço igual */
                            sm:flex-1 sm:flex sm:flex-col sm:justify-center
                          `}
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
    </div>
  );
}

export default MeuTreino;
