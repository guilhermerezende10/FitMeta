import Title from "./Title";
import Img from "./Img";
import Description from "./Description";
import Link from "./Link";
import Container from "./Container";

const imagens = import.meta.glob("../data/estudos-cientificos/*.{jpg,webp}", {
  eager: true,
  import: "default",
});
function Estudo({ estudo }) {
  const path = `../data/estudos-cientificos/${estudo.imgSrc}`;
  estudo.imagem = imagens[path];

  return (
    <Container className="flex justify-center text-justify pb-5 mb-10">
      <div className="bg-darkblue-150/85 w-4/5 max-w-3xl rounded-xl text-white shadow-lg overflow-hidden">
        <div className="relative w-full mb-4">
          <Img className="rounded-md w-full" src={estudo.imagem} />

          <div className="absolute bottom-2 left-1/2 w-full -translate-x-1/2 text-white px-3 py-1 text-md font-bold">
            {estudo.title}
          </div>
        </div>

        <Description className="mb-4 text-sm w-11/12 py-2 mx-auto">
          {estudo.description}
        </Description>

        <a href={estudo.link} target="_blank" rel="noopener noreferrer">
          <Link className="block w-full text-center bg-white text-black transition py-3 font-semibold hover:bg-gray-100 rounded-b-xl">
            Link do estudo
          </Link>
        </a>
      </div>
    </Container>
  );
}

export default Estudo;
