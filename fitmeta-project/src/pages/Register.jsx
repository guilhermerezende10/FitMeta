import RegisterFooter from "../features/authentication/RegisterFooter";
import Title from "../ui/Title";


import RegisterForm from "../features/authentication/RegisterForm";

function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">

      <Title className="text-[#2d1748] text-2xl relative top-24 font-bold mb-6">
        Crie sua conta
      </Title>

      <RegisterForm />

      {/* Footer */}
      <RegisterFooter />
    </div>
  );
}

export default Register;
