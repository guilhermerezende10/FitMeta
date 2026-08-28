import { useState } from "react";
import FoodMacro from "../features/info-nutricional/FoodMacro";
import Logo from "../ui/Logo";
import { FaSearch } from "react-icons/fa";
import Spinner from "../ui/Spinner";
import ErrorMessage from "../ui/Error";

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

      if (!response.ok)
        throw new Error(
          `Nao foi possivel consultar o alimento (erro ${response.status}).`
        );

      const data = await response.json();
      console.log(data);
      setResults(data.foods);
    } catch (err) {
      console.error(err);
      // fetch rejeita com TypeError quando nao ha rede; a mensagem nativa
      // ("Failed to fetch") nao diz nada a quem esta usando o app.
      setError(
        err instanceof TypeError
          ? "Sem conexao com a internet. Verifique a rede e tente de novo."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full rounded-card overflow-hidden bg-[url('https://img.freepik.com/fotos-premium/o-conceito-de-nutricao-dietetica-frutas-e-legumes-frescos-talheres-e-um-prato-em-forma-de-relogio-vista-superior-espaco-livre-para-o-seu-texto_187166-18366.jpg')] bg-cover bg-center relative">
  {/* Overlay preto */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Conteúdo da página */}
  <div className="relative z-10">
    {/* Logo */}
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
      <Logo />
    </div>

    {/* Título */}
    <h1 className="text-white text-xl font-bold text-center mt-4">
      Informações nutricionais de alimentos
    </h1>

    {/* Barra de busca */}
    <div className="flex justify-center mt-6 relative">
      <input
        className="w-4/5 md:w-2/3 rounded-pill border border-line bg-surface py-3 px-5 text-center text-primary shadow-e1 outline-none placeholder:text-faint focus:border-accent focus:shadow-focus"
        type="text"
        value={query}
        placeholder="Insira um alimento para consultar"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="absolute right-[12%] md:right-[18%] top-1/2 -translate-y-1/2 rounded-pill bg-surface p-2 text-secondary transition-colors hover:bg-surface-raised hover:text-primary"
        onClick={handleSearch}
      >
        <FaSearch />
      </button>
    </div>

    {loading && <Spinner />}
    {error && (
      <div className="mx-auto mt-6 w-4/5 md:w-2/3">
        <ErrorMessage message={error} onRetry={handleSearch} />
      </div>
    )}

    {/* Resultados */}
    {results && results.length > 0 && (
      <div className="mt-8 px-6 space-y-6">
        {results.map((food) => (
          <div
            key={food.food_name}
            className="bg-black/80 rounded-3xl p-6 shadow-lg"
          >
            {/* Nome do alimento */}
            <h2 className="text-2xl font-extrabold mb-4 text-white flex items-center gap-3">
              <img
                src={food.photo.thumb}
                alt={food.food_name}
                className="w-10 h-10 rounded-md object-cover"
              />
              {food.food_name}
            </h2>

            {/* Infos */}
            <div className="grid grid-cols-2 gap-4 text-gray-100 text-sm ">
             <FoodMacro label="Quantidade" value={`${food.serving_qty} ${food.serving_unit}`} />
             <FoodMacro label="Calorias" value={`${food.nf_calories}`} />
             <FoodMacro label="Proteínas" value={`${food.nf_protein} g`} />
             <FoodMacro label="Carboidratos" value={`${food.nf_total_carbohydrate} g`} />
             <FoodMacro label="Gorduras" value={`${food.nf_total_fat} g`} />
             <FoodMacro label="Colesterol" value={`${food.nf_cholesterol} g`} />
             <FoodMacro label="Fibras" value={`${food.nf_dietary_fiber} g`} />
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
