function ResultRow({ label, value, className }) {
  return (
    <div className={className}>
      <div className="text-2xl">{label}:</div>
      <div className="text-xl text-gray-400">{value}</div>
    </div>
  );
}

export default ResultRow;