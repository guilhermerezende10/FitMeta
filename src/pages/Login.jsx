import LoginFooter from "../features/authentication/LoginFooter";
import LoginForm from "../features/authentication/LoginForm.jsx";
import Container from "../ui/Container";
import Title from "../ui/Title";

function Login() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-screen px-4 ">
      <Title className="mb-10 mt-40 text-brand-button2Purple text-3xl font-bold " >
        Entre em sua conta
      </Title>
      <LoginForm />
      <LoginFooter />
    </Container>
  );
}

export default Login;
