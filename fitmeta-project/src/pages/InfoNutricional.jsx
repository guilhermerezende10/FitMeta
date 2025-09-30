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
      setResults(data.foods);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://img.freepik.com/fotos-premium/o-conceito-de-nutricao-dietetica-frutas-e-legumes-frescos-talheres-e-um-prato-em-forma-de-relogio-vista-superior-espaco-livre-para-o-seu-texto_187166-18366.jpg')] bg-cover bg-center relative">
      
      {/* Overlay cobrindo toda a tela */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Conteúdo acima do overlay */}
      <div className="relative z-10">
        <div className="pt-6 flex justify-center">
          <Logo />
        </div>

        <div className="bg-[#192126] py-3 text-center mt-4">
          <Title className="text-xl font-bold text-white">
            Informações nutricionais de alimentos
          </Title>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <input
            className="rounded-md w-4/5 text-center text-xl py-3 border border-gray-300"
            type="text"
            value={query}
            placeholder="Insira o alimento para consulta"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="relative right-36 bottom-11 mt-2 text-gray-700"
            onClick={handleSearch}
          >
            <FaSearch />
          </button>
        </div>

        {results && results.length > 0 && (
          <div className="mt-6 mx-6 bg-[#192126]/90 rounded-3xl p-6">
            {results.map((food) => (
              <div key={food.food_name}>
                <Title className="text-2xl font-extrabold mb-4 text-white capitalize">
                  {food.food_name}
                </Title>
                <div className="grid grid-cols-2 gap-4 text-white">
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoNutricional;
