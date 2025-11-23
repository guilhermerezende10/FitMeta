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
     <div className="bg-darkblue-150/85 mb-5 w-4/5 max-w-3xl rounded-xl text-white shadow-lg pt-0 pb-0 px-0 overflow-hidden">

        <Title className="text-center text-xl font-extrabold mb-4 text-white">
  
        </Title>
        <div className="relative w-full mb-4">
  <Img
    className="rounded-md w-full "
    src={estudo.imagem}
  
  />

  <div className="absolute bottom-2 left-1/2 w-full -translate-x-1/2  text-white px-3 py-1 rounded-md text-md text-left font-bold">
    {estudo.title}
  </div>
</div>

        <Description className="mb-4 text-sm w-11/12 py-2 mx-auto">
  {estudo.description}
</Description>

      <Link
  className="block w-full text-center bg-white text-black transition py-3 font-semibold hover:bg-gray-100 rounded-b-xl"
  href={estudo.link}
>
  Link do estudo
</Link>
      </div>
    </Container>
  );
}

export default Estudo;
