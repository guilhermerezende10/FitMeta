function ResultRow({ label, value, className }) {
  return (
    <div className={className}>
      <div className="text-lg">{label}:</div>
      <div className="text-base text-gray-400">{value}</div>
    </div>
  );
}

export default ResultRow;