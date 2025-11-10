import LoginFooter from "../features/authentication/LoginFooter";
import LoginForm from "../features/authentication/LoginForm.jsx";
import Container from "../ui/Container";
import Title from "../ui/Title";
import Logo from "../ui/Logo";
import logoDarkPurple from "../data/logo/logo-darkpurple.png";

function Login() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-real px-4 ">
      <div className="flex justify-center w-full">
        <Logo
          className="h-28 sm:h-32 md:h-36 object-contain"
          src={logoDarkPurple}
        />
      </div>
      <Title className="mb-10 mt-8 text-brand-button2Purple text-3xl font-bold ">
        Entre em sua conta
      </Title>
      <LoginForm />
      <LoginFooter />
    </Container>
  );
}

export default Login;
