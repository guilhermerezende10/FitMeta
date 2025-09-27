function RowForm({ label, type, options = null }) {
  return (
    <div>
      <label className="text-lg font-medium text-gray-700">{label}</label>
      {!options ? (
        <input
          type={type}
          className="border border-gray-300 rounded-md p-2 w-full max-w-xl mt-4"
        />
      ) : (
        options.map((option) => (
          <>
            <input
              key={option}
              type={type}
              name={option}
              className="border border-gray-300 rounded-md p-2 w-full max-w-xl mt-4"
            />
            <label htmlFor={option}>{option}</label>
          </>
        ))
      )}
    </div>
  );
}

export default RowForm;
