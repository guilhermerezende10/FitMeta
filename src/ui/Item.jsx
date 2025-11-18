import { NavLink } from "react-router-dom";
import Container from "./Container";
import Img from "./Img";
import Title from "./Title";
import { FaStopwatch } from "react-icons/fa";
function RecomendadoItem({ title, imgSrc, time, path }) {
  return (
    <Container className="relative bg-brand-bgDarkGray last:mb-14 ">
      <NavLink to={path}>
        <div className="p-6 ">
          <Title
            className="absolute top-10 left-8 z-10 text-white text-xl font-bold text-shadow-md
	"
          >
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

export default RecomendadoItem;
