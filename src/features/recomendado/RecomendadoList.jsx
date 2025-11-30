import { useState, useEffect } from "react";
import supabase from "../../services/supabase";
import Item from "../../ui/Item";
import Spinner from "../../ui/Spinner";
const recomendados = [
  {
    title: "Estudos científicos",
    imgSrc: "estudos-cientificos.jpg",
    time: "10 min",
    path: "/estudos",
  },
  {
    title: "Monte seu próprio treino",
    imgSrc: "recomendacao-treino.jpg",
    time: "5 min",
    path: "/recomendacao-treino",
  },
  {
    title: "Descubra sua recomendação nutricional",
    imgSrc: "recomendacao-nutricional.jpg",
    time: "3 min",
    path: "/recomendacao-nutricional",
  },
  {
    title: "Área motivacional",
    imgSrc: "motivacional.jpg",
    time: "8 min",
    path: "/motivacional",
  },
];

const imagens = import.meta.glob("../../data/recomendado/*.jpg", {
  eager: true,
  import: "default",
});

recomendados.forEach((recomendado) => {
  const path = `../../data/recomendado/${recomendado.imgSrc}`;
  recomendado.img = imagens[path]; // já é o src
});

const meuTreino = {
  title: "Ver meu treino personalizado",
  imgSrc: imagens["../../data/recomendado/meu-treino.jpg"],
  time: "3 min",
  path: "/meu-treino",
};

const minhaNutricao = {
  title: "Ver minha recomendação nutricional personalizada",
  imgSrc: imagens["../../data/recomendado/minha-nutricao.jpg"],
  time: "3 min",
  path: "/minha-nutricao",
};

function RecomendadoList() {
  const [showMeuTreino, setShowMeuTreino] = useState(false);
  const [showMinhaNutricao, setShowMinhaNutricao] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkRespostas() {
      const { data: session } = await supabase.auth.getUser();
      if (!session?.user) {
        setLoading(false);
        return;
      }

      const userId = session.user.id;

      const { data: treinoData, error: treinoError } = await supabase
        .from("treino_answers")
        .select("freq_treino, duracao, experiencia")
        .eq("user_id", userId)
        .single();

      const respondeuTreino =
        treinoData?.freq_treino?.trim() &&
        treinoData?.duracao?.trim() &&
        treinoData?.experiencia?.trim();

      setShowMeuTreino(!!respondeuTreino);

      setLoading(false);

      
      const { data: nutricaoData, error: nutricaoError } = await supabase
        .from("nutricao_answers")
        .select("objetivo, frequencia")
        .eq("user_id", userId)
        .single();

      const respondeuNutricao =
        nutricaoData?.objetivo?.trim() &&
        nutricaoData?.frequencia?.trim();

      setShowMinhaNutricao(!!respondeuNutricao);

      setLoading(false);
    }

    checkRespostas();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 place-items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className="
        grid gap-6
        grid-cols-1
        lg:grid-cols-2
        lg:max-w-[1200px]
        lg:mx-auto
        place-items-center
      "
    >
      {showMeuTreino && (
        <Item
          key={meuTreino.title}
          className="w-full"
          title={meuTreino.title}
          imgSrc={meuTreino.imgSrc}
          time={meuTreino.time}
          path={meuTreino.path}
        />
      )}

      {showMinhaNutricao && (
        <Item
          key={minhaNutricao.title}
          className="w-full"
          title={minhaNutricao.title}
          imgSrc={minhaNutricao.imgSrc}
          time={minhaNutricao.time}
          path={minhaNutricao.path}
        />
      )}

      {recomendados
        .filter(
          (rec) =>
            (!showMeuTreino || rec.title !== "Monte seu próprio treino") &&
            (!showMinhaNutricao ||
              rec.title !== "Descubra sua recomendação nutricional")
        )
        .map((rec) => (
          <Item
            key={rec.title}
            className="w-full"
            title={rec.title}
            imgSrc={rec.img}
            time={rec.time}
            path={rec.path}
          />
        ))}
    </div>
  );
}



export default RecomendadoList;
