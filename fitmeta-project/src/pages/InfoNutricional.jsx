import { useState } from "react";
import Title from "../ui/Title";
import FoodMacro from "../features/info-nutricional/FoodMacro";

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
    <div>
      <Title>Informações nutricionais de alimentos</Title>
      <input
        type="text"
        value={query}
        placeholder="Insira o alimento para consulta"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>
        <FaSearch />
      </button>

      {/* {loading && <Spinner />} */}
      {/* {error && <Error />} */}

      {results && results.length > 0 && (
        <div>
          {results.map((food) => (
            <div key={food.food_name}>
              <Title>{food.food_name}</Title>
              <FoodMacro>
                Quantidade: {food.serving_qty} {food.serving_unit}
              </FoodMacro>
              <FoodMacro>Calorias: {food.nf_calories}</FoodMacro>
              <FoodMacro>Proteínas: {food.nf_protein} g</FoodMacro>
              <FoodMacro>
                Carboidratos: {food.nf_total_carbohydrate} g
              </FoodMacro>
              <FoodMacro>Gorduras: {food.nf_total_fat} g</FoodMacro>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InfoNutricional;
