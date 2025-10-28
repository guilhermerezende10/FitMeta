import EstudosCientificosList from "../features/estudos-cientificos/EstudosCientificosList"
import Logo from "../ui/Logo"
import Title from "../ui/Title"



function EstudosCientificos() {
    return (
        <div className="items-center">
            <Logo />
            <Title>Estudos Científicos</Title>

            <EstudosCientificosList />
        </div>
    )
}

export default EstudosCientificos
