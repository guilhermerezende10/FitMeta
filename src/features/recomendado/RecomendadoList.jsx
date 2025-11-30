import { useState, useEffect } from "react";
import supabase from "../../services/supabase";
import Item from "../../ui/Item";
import Spinner from "../../ui/Spinner";
const recomendados = [
  {
    title: "Estudos Científicos",
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
  title: "Ver meu Treino Personalizado",
  imgSrc: imagens["../../data/recomendado/meu-treino.jpg"],
  time: "3 min",
  path: "/meu-treino",
};

function RecomendadoList() {
  const [showMeuTreino, setShowMeuTreino] = useState(false);
  const [loading, setLoading] = useState(true); // <-- novo

  useEffect(() => {
    async function checkTreinoRespondido() {
      const { data: session } = await supabase.auth.getUser();

      if (!session?.user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("treino_answers")
        .select("freq_treino, duracao, experiencia")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        setShowMeuTreino(false);
        setLoading(false);
        return;
      }

      const respondeuTudo =
        data?.freq_treino?.trim() &&
        data?.duracao?.trim() &&
        data?.experiencia?.trim();

      setShowMeuTreino(!!respondeuTudo);
      setLoading(false); // <-- agora a tela libera
    }

    checkTreinoRespondido();
  }, []);

  // 🟣 Enquanto carrega → não renderiza nada (ou posso criar skeleton se quiser)
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

      {recomendados
        .filter(
          (rec) => !showMeuTreino || rec.title !== "Monte seu próprio treino"
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
