import { NavLink } from "react-router-dom";
import Container from "../../ui/Container";
import Img from "../../ui/Img";
import Title from "../../ui/Title";
import { FaStopwatch } from "react-icons/fa";
function Recomendado({ title, imgSrc, time, path }) {
  return (
    <Container className="relative bg-[#192126] last:mb-14 ">
      <NavLink to={path}>
        <div className="p-4 ">
          <Title className="absolute top-10 left-8 z-10 text-white text-xl font-bold drop-shadow-2xl	">
            {title}
          </Title>
          <Img
            className="rounded-3xl w-80 h-48 sm:h-56 md:h-64 lg:h-72 object-cover block mx-auto"
            src={imgSrc}
          />
          <div className="absolute bottom-8 left-8 z-10 flex items-center font-regular gap-2 bg-white text-black text-sm px-3 py-1 rounded-full shadow-lg">
            <FaStopwatch className="text-lg" />
            <span>{time}</span>
          </div>
        </div>
      </NavLink>
    </Container>
  );
}

export default Recomendado;
