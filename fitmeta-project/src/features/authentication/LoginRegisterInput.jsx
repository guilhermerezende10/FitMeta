import { IoMdEye } from "react-icons/io";

function LoginRegisterInput({ type, placeholder, name, iconElement }) {
  return (
    <>
        <div className="relative top-20">
      {type !== "password" ? (

        <div className="relative w-80"> {/* largura fixa igual ao protótipo */}
          <input
            className="w-full bg-gray-200 text-[#2d1748] placeholder-gray-500 py-6 my-2 pl-4 pr-4 rounded-xl outline-none"
            type={type}
            placeholder={placeholder}
            name={name}
            />
          <span className="absolute text-2xl right-3 top-1/2 -translate-y-1/2 text-gray-600">
            {iconElement}
          </span>
        </div>
      ) : (
        <div className="relative w-80">
          <input
            className="w-full my-2 bg-gray-200 text-[#2d1748] placeholder-gray-500 py-6 pl-4 pr-10 rounded-xl outline-none"
            type="password"
            placeholder={placeholder}
            name={name}
            />
          <span className="absolute text-2xl right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer">
            <IoMdEye />
          </span>
        </div>
      )}
      </div>
    </>
  );
}

export default LoginRegisterInput;
