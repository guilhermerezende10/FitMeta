import { useEffect } from "react";
import Title from "../ui/Title";

function InfoNutricional() {
    useEffect(() => {
       async function fetchData() {
        const query = ``;
        const data = await fetch(query)
        console.log(data)

       }
       fetchData()
    }, [])
  return (
    <div>
      <Title>
        Informações nutricionais de qualquer alimento
      </Title>
    </div>
  );
}

export default InfoNutricional;
