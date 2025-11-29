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

categorias.forEach((categoria) => {
  const path = `../../data/estudos-cientificos/${categoria.imgSrc}`;
  categoria.img = imagens[path];
});

function EstudosCientificosCategorias() {
  return (
    <div
      className="
    grid gap-6
    grid-cols-1      /* mobile */
    sm:grid-cols-1
    md:grid-cols-1   /* tablet */
    lg:grid-cols-2   /* desktop = 2 items */
    xl:grid-cols-2   /* desktop grande = 2 items */
    max-w-[1200px]
    mx-auto
    place-items-center
  "
    >
      {categorias.map((categoria) => (
        <Item
          key={categoria.title}
          title={categoria.title}
          imgSrc={categoria.img}
          time={categoria.time}
          path={categoria.path}
          className="w-full" /* garante responsividade como no Recomendado */
        />
      ))}
    </div>
  );
}

export default EstudosCientificosCategorias;
