import { useState } from "react";
import Title from "../ui/Title";
import FoodMacro from "../features/info-nutricional/FoodMacro";
import Logo from "../ui/Logo";

import { FaSearch } from "react-icons/fa";

function InfoNutricional() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const appId = "08041345";
  const appKey = "4e3d21e66ab26d4f5ca1e511d8cdac95";

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          method: "POST",
          headers: {
            "x-app-id": appId,
            "x-app-key": appKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );

      if (!response.ok) throw new Error("Erro ao buscar dados");

      const data = await response.json();
      console.log(data);
      setResults(data.foods); // 'foods' contém os alimentos retornados
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    
   <div className="">
      <Title>Informações nutricionais de alimentos</Title>
      <div className="">
      <div className="">
      <input className="relative left-11 rounded-md w-4/5 text-center py-5"
        type="text"
        value={query}
        placeholder="Insira o alimento para consulta"
        onChange={(e) => setQuery(e.target.value)}
        />
      <button className="" onClick={handleSearch}>
        <FaSearch />
      </button></div>
        </div>

      {/* {loading && <Spinner />} */}
      {/* {error && <Error />} */}

      {results && results.length > 0 && (
        <div className="absolute py-4 px-10 m-10 bg-gray-200 rounded-3xl">
          {results.map((food) => (
            <div key={food.food_name}>
              <Title className="relative left-4 text-3xl font-extrabold mb-2 text-white text-left" >{food.food_name}</Title>
              <div className="flex mb-6 overflow-hidden">
              <div className="grid grid-cols-2 gap-4 text-white">
              <FoodMacro className="mx-10">
                Quantidade: {food.serving_qty} {food.serving_unit}
              </FoodMacro>
              <FoodMacro>Calorias: {food.nf_calories}</FoodMacro>
              <FoodMacro>Proteínas: {food.nf_protein} g</FoodMacro>
              <FoodMacro>
                Carboidratos: {food.nf_total_carbohydrate} g
              </FoodMacro>
              <FoodMacro>Gorduras: {food.nf_total_fat} g</FoodMacro>
              </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
}

export default InfoNutricional;
