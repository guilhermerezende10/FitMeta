import LoginFooter from "../features/authentication/LoginFooter";
import LoginForm from "../features/authentication/loginForm";
import Container from "../ui/Container";
import Title from "../ui/Title";

function Login() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-screen px-4">
      <Title className="absolute top-52 text-brand-button2Purple text-2xl font-bold">
        Faça login em sua conta
      </Title>
      <LoginForm />
      <LoginFooter />
    </Container>
  );
}

export default Login;
