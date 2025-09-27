import { NavLink } from "react-router-dom";
import Container from "../../ui/Container";
import Img from "../../ui/Img";
import Title from "../../ui/Title";
import { CiStopwatch } from "react-icons/ci";

function Recomendado({ title, imgSrc, time, path }) {
  return (
    <Container>
      <NavLink to={path}>
        <Title >{title}</Title>
        <Img src={imgSrc} />
        <div>
          <CiStopwatch />
          <span>{time}</span>
        </div>
      </NavLink>
    </Container>
  );
}

export default Recomendado;
