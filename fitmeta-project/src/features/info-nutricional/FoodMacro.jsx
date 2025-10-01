function FoodMacro({ label, value }) {
  return (
    <div className="text-left ml-8">
      <p className="text-base text-white">{label}</p> {/* Nome do nutriente */}
      <p className="text-sm text-gray-400">{value}</p>    {/* Valor do nutriente */}
    </div>
  );
}
export default FoodMacro;
