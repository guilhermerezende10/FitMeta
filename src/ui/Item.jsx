import { NavLink } from "react-router-dom";
import Container from "./Container";
import Img from "./Img";
import Title from "./Title";
import { FaStopwatch } from "react-icons/fa";

function Item({ title, imgSrc, time, path, className }) {
  return (
    <Container className={className}>
      <NavLink to={path}>
        <div className="p-4 relative">
          {/* TÍTULO -> mobile igual | maior só no PC */}
          <Title
            className="
    absolute 
    top-8 left-6                 /* mobile padrão */
    z-10

    md:top-12 md:left-10         /* mais distante no PC */
    lg:top-14 lg:left-12

    text-white font-bold 
    text-shadow-lg               /* sombra maior */
    
    text-lg
    sm:text-xl
    md:text-2xl
    lg:text-3xl
  "
          >
            {title}
          </Title>

          {/* IMAGEM */}
          <div
            className="
    relative 
    w-full                      /* agora ocupa toda a largura em mobile */
    max-w-sm                    /* limite no mobile para não exagerar */
    aspect-[16/9]               /* mantém proporção responsiva */
    
    sm:max-w-md                 /* tablets pequenos */
    
    md:max-w-[420px]            /* desktop médio */
    lg:max-w-[480px]
    xl:max-w-[520px]

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

export default Item;
