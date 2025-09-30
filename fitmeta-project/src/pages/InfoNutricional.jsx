import { useState } from "react";
import Title from "../ui/Title";
import FoodMacro from "../features/info-nutricional/FoodMacro";
import Logo from "../ui/Logo";
import { FaSearch } from "react-icons/fa";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";
import Img from "../ui/Img";

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
      setResults(data.foods);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="min-h-screen bg-cover bg-center relative">
  {/* Logo */}
  <div className="flex justify-center pt-4">
    <Logo />
  </div>

  {/* Título */}
  <h1 className="text-white text-xl font-bold text-center mt-4">
    Informações nutricionais de alimentos
  </h1>

  {/* Barra de busca */}
  <div className="flex justify-center mt-6 relative">
    <input
      className="w-4/5 md:w-2/3 rounded-full py-3 px-5 text-center shadow-md focus:outline-none"
      type="text"
      value={query}
      placeholder="Insira um alimento para consultar"
      onChange={(e) => setQuery(e.target.value)}
    />
    <button
      className="absolute right-[12%] md:right-[18%] top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-200 transition"
      onClick={handleSearch}
    >
      <FaSearch className="text-gray-700" />
    </button>
  </div>

  {loading && <Spinner />}
  {error && <Error />}

      {results && results.length > 0 && (
        <div className="absolute py-4 px-10 m-10 bg-gray-200 rounded-3xl">
          {results.map((food) => (
            <div key={food.food_name}>
              <Title className="relative left-4 text-3xl font-extrabold mb-2 text-white text-left">
                {food.food_name}
              </Title>
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
