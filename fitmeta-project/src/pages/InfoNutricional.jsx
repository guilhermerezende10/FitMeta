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

        <div className="mt-6 flex flex-col items-center">
          <input className="rounded-md w-4/5 text-center text-lg py-3 border border-gray-300"
            type="text"
            value={query}
            placeholder="Insira o alimento para consulta"
            onChange={(e) => setQuery(e.target.value)}
          />
            <button
            onClick={handleSearch}
            className="absolute left-12 top-60 -translate-y-1/2 bg-white/90 hover:bg-white p-3 text-gray-700 transition"
>
  <FaSearch className="text-lg" />
</button>

        </div>

        {results && results.length > 0 && (
          <div className="mt-6 mx-6 bg-[#192126]/90 rounded-3xl p-6">
            {results.map((food) => (
              <div key={food.food_name}>
                <Title className="text-2xl font-extrabold mb-4 text-white capitalize">
                  {food.food_name}
                </Title>
                <div className="grid grid-cols-2 gap-6 text-white">
                <div>
                <p className="text-lg font-semibold">Calorias</p>
                <p className="text-sm">{food.nf_calories.toFixed(2)} kcal</p>
                </div>
                <div>
                <p className="text-lg font-semibold">Carboidratos</p>
                <p className="text-sm">{food.nf_total_carbohydrate} g</p>
                </div>
                <div>
                <p className="text-lg font-semibold">Proteínas</p>
                <p className="text-sm">{food.nf_protein} g</p>
                </div>
                <div>
                <p className="text-lg font-semibold">Gorduras</p>
                <p className="text-sm">{food.nf_total_fat} g</p>
              </div>
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
