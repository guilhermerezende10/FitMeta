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
  // {
  //   title: "Informações nutricionais de alimentos",
  //   imgSrc: "https://proximadx.com/wp-content/uploads/2024/06/Inbound-14-Rotulos-dos-alimentos-entender-as-informacoes-e-fundamental--scaled.webp",
  //   time: "3 min",
  //   path: "/info-nutricional",
  // },
];

const imagens = import.meta.glob("../../data/recomendado/*.jpg", {
  eager: true,
  import: "default",
});

recomendados.forEach((recomendado) => {
  const path = `../../data/recomendado/${recomendado.imgSrc}`;
  recomendado.img = imagens[path]; // já é o src
});

function RecomendadoList() {
  return (
    <>
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
