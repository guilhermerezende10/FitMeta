import Recomendado from "./Recomendado";

const recomendados = [
  {
    title: "Monte seu próprio treino",
    imgSrc: "https://blog.ciaathletica.com.br/wp-content/uploads/2018/08/shutterstock_749969473-1.jpg",
    time: "5 min",
    path: "/recomendacao-treino",
  },
  {
    title: "Descubra sua recomendação nutricional",
    imgSrc: "",
    time: "3 min",
    path: "/recomendacao-nutricional",
  },
  {
    title: "Área motivacional",
    imgSrc: "",
    time: "8 min",
    path: "/motivacional",
  },
  {
    title: "Estudos Científicos",
    imgSrc: "",
    time: "10 min",
    path: "/estudos",
  },
  {
    title: "Informações nutricionais de alimentos",
    imgSrc: "",
    time: "3 min",
    path: "/info-nutricional",
  },
  {
    title: "Meu treino",
    imgSrc: "",
    time: "2 min",
    path: "/meu-treino",
  },
];

function RecomendadoList() {
  return (
    <>
      {recomendados.map((recomendado) => (
        <Recomendado
          key={recomendado.title}
          title={recomendado.title}
          imgSrc={recomendado.imgSrc}
          time={recomendado.time}
          path={recomendado.path}
        />
      ))}
    </>
  );
}

export default RecomendadoList;
