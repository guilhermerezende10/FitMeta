import LoginForm from "../features/authentication/loginForm"
import Container from "../ui/Container"
import Title from "../ui/Title"

function Login() {
    return (
        <Container>
            <Title>Faça login em sua conta</Title>
            <LoginForm />
        </Container>
    )
}

export default Login
