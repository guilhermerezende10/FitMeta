import Item from "../../ui/Item";

const categorias = [
  {
    title: "Frequência de treino",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1B_W8do40zWdSoD9v4JbHm_Y6v4uq6C3NuA&s",
    time: "5 min",
    path: "/estudos-frequencia",
  },
  {
    title: "Volume de treino",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1B_W8do40zWdSoD9v4JbHm_Y6v4uq6C3NuA&s",
    time: "5 min",
    path: "/estudos-volume",
  },
  {
    title: "Recomendação nutricional",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1B_W8do40zWdSoD9v4JbHm_Y6v4uq6C3NuA&s",
    time: "5 min",
    path: "/estudos-nutricao",
  },
  {
    title: "Divisão de treino",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1B_W8do40zWdSoD9v4JbHm_Y6v4uq6C3NuA&s",
    time: "5 min",
    path: "/estudos-divisao-treino",
  },
];

function EstudosCientificosCategorias() {
  return (
    <>
      {categorias.map((categoria) => (
        <Item
          key={categoria.title}
          title={categoria.title}
          imgSrc={categoria.imgSrc}
          time={categoria.time}
          path={categoria.path}
        />
      ))}
    </>
  );
}

export default EstudosCientificosCategorias;
