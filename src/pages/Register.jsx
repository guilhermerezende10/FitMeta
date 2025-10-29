import RegisterFooter from "../features/authentication/RegisterFooter";
import Title from "../ui/Title";


import RegisterForm from "../features/authentication/RegisterForm";

function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-real px-4">

      <Title className="absolute top-56 text-brand-button2Purple text-3xl font-bold">
        Crie sua conta
      </Title>

      <RegisterForm />

      {/* Footer */}
      <RegisterFooter />
    </div>
  );
}

export default Register;
