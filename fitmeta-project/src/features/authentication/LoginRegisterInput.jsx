import { IoMdEye } from "react-icons/io";

function LoginRegisterInput({ type, placeholder, name, iconElement }) {
  return (
    <>
      {type !== "password" ? (
        <>
          <input type={type} placeholder={placeholder} name={name} />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {iconElement}
          </span>
        </>
      ) : (
        <div className="relative">
          <input type="password" placeholder={placeholder} name={name} />
          {/* ícone como elemento irmão */}
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <IoMdEye />
          </span>
        </div>
      )}
    </>
  );
}

export default LoginRegisterInput;
