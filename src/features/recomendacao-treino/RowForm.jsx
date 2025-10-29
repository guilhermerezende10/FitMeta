function RowForm({ label, type, options = null, value, onChange, name }) {
  return (
    <div className="mb-6 w-full">
      <label className="block text-[0.75rem] text-gray-500 uppercase tracking-wide mb-2 font-medium">
        {label}
      </label>

      {!options ? (
        <input
          type={type}
          name={name}
          className="border-b border-gray-300 focus:border-brand-button2Purple transition-all duration-200 focus:outline-none w-full text-gray-800 text-sm py-1.5 placeholder-gray-400 leading-tight"
          key={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 border-b border-gray-300 pb-3 mt-2">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer"
            >
              <input
                type={type}
                name={name}
                value={option.toLowerCase()}
                checked={value === option.toLowerCase()}
                onChange={onChange}
                className="accent-brand-button2Purple w-4 h-4"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default RowForm;
