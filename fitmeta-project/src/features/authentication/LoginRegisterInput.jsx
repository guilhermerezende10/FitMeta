import { IoMdEye } from "react-icons/io";

function LoginRegisterInput({
  type,
  placeholder,
  name,
  iconElement,
  onChange,
  value,
  autoComplete,
  disabled
}) {
  return (
    <div className="relative w-80">
      <input
        className="w-full bg-gray-200 text-[#2d1748] placeholder-gray-500 py-6 my-2 pl-4 pr-10 rounded-xl outline-none"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
        disabled={disabled}
      />
      <span className="absolute text-2xl right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer">
        {type === "password" ? <IoMdEye /> : iconElement}
      </span>
    </div>
  );
}

export default LoginRegisterInput;
