import RegisterFooter from "../features/authentication/RegisterFooter";
import Title from "../ui/Title";
import Logo from "../ui/Logo";
import Container from "../ui/Container";

import logoDarkPurple from "../data/logo/logo-darkpurple.png";
import RegisterForm from "../features/authentication/RegisterForm";

function Register() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-real px-4 ">
      <div className="flex justify-center w-full">
        <Logo
          className="h-28 sm:h-32 md:h-36 object-contain"
          src={logoDarkPurple}
        />
      </div>

      <Title className="mb-8 mt-6 text-brand-button2Purple text-3xl font-bold ">
        Crie sua conta
      </Title>

      <RegisterForm />

      <RegisterFooter />
    </Container>
  );
}

export default Register;
