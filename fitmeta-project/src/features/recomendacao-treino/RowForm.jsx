function RowForm({ label, type, options = null }) {
  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </label>

      {!options ? (
        <input
          type={type}
          className="border-b border-gray-300 mb-3 focus:outline-none pb-1 w-full text-gray-700 text-sm"
          key={label}
        />
      ) : (
        <div className="flex items-center gap-6 border-b mb-7 pb-3 mt-3 border-gray-300">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-1 text-gray-700 text-sm"
            >
              <input
                type={type}
                name={label}
                value={option}
                className="accent-black"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default RowForm;