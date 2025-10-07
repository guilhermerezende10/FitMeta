import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function LoginRegisterInput({
  type,
  placeholder,
  name,
  iconElement,
  onChange,
  value,
  autoComplete,
  disabled,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-80">
      <input
        className="w-full bg-gray-200 text-[#2d1748] placeholder-gray-500 py-6 my-2 pl-4 pr-10 rounded-xl outline-none"
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
        disabled={disabled}
      />
      <span
        className="absolute text-2xl right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
        onClick={togglePassword}
      >
        {type !== "password" ? (
          iconElement
        ) : showPassword ? (
          <IoMdEyeOff />
        ) : (
          <IoMdEye />
        )}
      </span>
    </div>
  );
}

export default LoginRegisterInput;
