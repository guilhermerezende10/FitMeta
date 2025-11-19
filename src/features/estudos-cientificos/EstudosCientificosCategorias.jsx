import Item from "../../ui/Item";

const categorias = [
  {
    title: "Frequência de treino",
    imgSrc: "frequencia-de-treino.jpg",
    time: "5 min",
    path: "frequencia",
  },
  {
    title: "Volume de treino",
    imgSrc: "volume-de-treino.jpg",
    time: "5 min",
    path: "/estudos/volume",
  },
  {
    title: "Recomendação nutricional",
    imgSrc: "recomendacao-nutricional.jpg",
    time: "5 min",
    path: "/estudos/nutricao",
  },
  {
    title: "Divisão de treino",
    imgSrc: "treino-homemVSmulher.jpg",
    time: "5 min",
    path: "/estudos/divisao-treino",
  },
];

const imagens = import.meta.glob("../../data/estudos-cientificos/*.jpg", {
  eager: true,
  import: "default",
});

// ✅ Mapear corretamente as imagens
categorias.forEach((categoria) => {
  const path = `../../data/estudos-cientificos/${categoria.imgSrc}`;
  categoria.img = imagens[path]; // o Vite gera as chaves exatas com esse caminho
});

function EstudosCientificosCategorias() {
  return (
    <>
      {categorias.map((categoria) => (
        <Item
          key={categoria.title}
          title={categoria.title}
          imgSrc={categoria.img}
          time={categoria.time}
          path={categoria.path}
        />
      ))}
    </>
  );
}

export default EstudosCientificosCategorias;
