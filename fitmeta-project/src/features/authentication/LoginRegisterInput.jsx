import { IoMdEye } from "react-icons/io";

function LoginRegisterInput({ type, placeholder, name, iconElement }) {
  return (
    <>
      {type !== "password" ? (
        <>
          <input className="bg-gray-500/20 text-center py-4 rounded-xl px-" type={type} placeholder={placeholder} name={name} />
          <span>{iconElement}</span>
        </>
      ) : (
        <div className="relative">
          <input className="bg-gray-500/20 text-left py-4 rounded-xl" type="password" placeholder={placeholder} name={name} />
          <span>
            <IoMdEye />
          </span>
        </div>
      )}
    </>
  );
}

export default LoginRegisterInput;
