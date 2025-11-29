import { NavLink } from "react-router-dom";
import Container from "./Container";
import Img from "./Img";
import Title from "./Title";
import { FaStopwatch } from "react-icons/fa";

function RecomendadoItem({ title, imgSrc, time, path }) {
  return (
   <Container
  className="
    relative last:mb-20

    md:w-full
    md:max-w-[680px]
    md:justify-self-center

    md:[&:last-child:nth-child(odd)]:col-span-2
  "
>
      <NavLink to={path}>
        <div className="p-4 relative">

          {/* TÍTULO -> mobile igual | maior só no PC */}
          <Title
            className="
              absolute top-10 left-8 z-10
              text-white text-xl font-bold text-shadow-md w-64
              md:text-2xl md:w-96
            "
          >
            {title}
          </Title>

          {/* IMAGEM */}
          <div
            className="
              relative w-80 h-48
              sm:h-56
              md:w-[520px] md:h-72
              lg:w-[640px] lg:h-80
              mx-auto
            "
          >
            <Img
              className="rounded-3xl w-full h-full object-cover"
              src={imgSrc}
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/30 rounded-3xl pointer-events-none" />
          </div>

          {/* TEMPO */}
          <div
            className="
              absolute bottom-8 left-8 z-10
              flex items-center gap-2
              bg-white text-brand-bgDarkGray text-sm px-3 py-1 rounded-full shadow-lg
              md:bottom-10 md:left-10
            "
          >
            <FaStopwatch className="text-lg" />
            <span>{time}</span>
          </div>

        </div>
      </NavLink>
    </Container>
  );
}

export default RecomendadoItem;
