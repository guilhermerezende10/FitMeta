import Title from "./Title";
import Img from "./Img";
import Description from "./Description";
import Link from "./Link";
import Container from "./Container";

const imagens = import.meta.glob("../data/estudos-cientificos/*.jpg", {
  eager: true,
  import: "default",
});
function Estudo({ estudo }) {
  const path = `../data/estudos-cientificos/${estudo.imgSrc}`;
  estudo.imagem = imagens[path]; // já é o src

  return (
    <Container
      key={estudo.title}
      className="flex justify-center text-justify pb-5"
    >
      <div className="bg-graydark-400/85 mb-5 w-4/5 max-w-3xl rounded-xl text-white shadow-lg p-5">
        <Title className="text-center text-xl font-extrabold mb-4 text-white">
          {estudo.title}
        </Title>
        <Img
          className="rounded-md w-full mb-4"
          src={estudo.imagem}
          alt={estudo.title}
        />
        <Description className="mb-4 text-sm">{estudo.description}</Description>
        <Link
          className="block text-center bg-white w-full text-black transition py-3 font-semibold hover:bg-gray-100"
          href={estudo.link}
        >
          Link do estudo
        </Link>
      </div>
    </Container>
  );
}

export default Estudo;
