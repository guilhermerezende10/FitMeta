import { useState } from "react";
import Item from "../../ui/Item";
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
  time: "1 min",
  path: "/meu-treino",
};

function RecomendadoList() {
  const [showMeuTreino, setShowMeuTreino] = useState(true);
  // Banco de dados precisa de uma variável booleana pra determinar se o treino personalizado existe ou nao

  return (
    <>
      {showMeuTreino && (
        <Item
          key={meuTreino.title}
          title={meuTreino.title}
          imgSrc={meuTreino.imgSrc}
          time={meuTreino.time}
          path={meuTreino.path}
        />
      )}
      {recomendados.map((recomendado) => (
        <Item
          key={recomendado.title}
          title={recomendado.title}
          imgSrc={recomendado.img}
          time={recomendado.time}
          path={recomendado.path}
        />
      ))}
    </>
  );
}

export default RecomendadoList;
