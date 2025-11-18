import Item from "../../ui/Item";
const recomendados = [
  {
    title: "Monte seu próprio treino",
    imgSrc: "https://www.ironworksprime.com.br/wp-content/uploads/2018/03/Barra-fixa-Post-Blog-Ironworks.jpg",
    time: "5 min",
    path: "/recomendacao-treino",
  },
  {
    title: "Descubra sua recomendação nutricional",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1B_W8do40zWdSoD9v4JbHm_Y6v4uq6C3NuA&s",
    time: "3 min",
    path: "/recomendacao-nutricional",
  },
  {
    title: "Área motivacional",
    imgSrc: "https://i.pinimg.com/736x/a9/29/bd/a929bda1e530d0a367c2d490642fc03b.jpg",
    time: "8 min",
    path: "/motivacional",
  },
  {
    title: "Estudos Científicos",
    imgSrc: "https://www.clickriomafra.com.br/wp-content/uploads/2023/12/21/Estudos-de-car%C3%A1ter-cient%C3%ADfico-relev%C3%A2ncia-e-maneiras-de-pesquisa-1.jpg",
    time: "10 min",
    path: "/estudos",
  },
  {
    title: "Informações nutricionais de alimentos",
    imgSrc: "https://proximadx.com/wp-content/uploads/2024/06/Inbound-14-Rotulos-dos-alimentos-entender-as-informacoes-e-fundamental--scaled.webp",
    time: "3 min",
    path: "/info-nutricional",
  },
  {
    title: "Meu treino",
    imgSrc: "https://revistamensch.com.br/wp-content/uploads/2023/11/fitness-1.jpg",
    time: "2 min",
    path: "/meu-treino",
  },
];

function RecomendadoList() {
  return (
    <>
      {recomendados.map((recomendado) => (
        <Item
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
