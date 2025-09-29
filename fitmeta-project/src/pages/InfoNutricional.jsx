import { useEffect } from "react";
import Title from "../ui/Title";

const apiKey = "46c739a6460f4b81b463a41d56d6f06d"; // Client ID
const apiKey2 = "d756ddc46c874e28a949ae6a71b1359e"; // Client Secret



function InfoNutricional() {
    useEffect(() => {
       async function fetchData() {
        const query = `${apiKey}`;
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
