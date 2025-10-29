import EstudosCientificosList from "../features/estudos-cientificos/EstudosCientificosList"
import Logo from "../ui/Logo"
import Title from "../ui/Title"
import bgestudos from ""


function EstudosCientificos() {
    return (
        <div className="items-center">
            <img src="bg-estudos" alt="" />
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
            <Logo />
            </div>
             <div className="mt-32 items-center">
            <Title className="text-center text-3xl font-extrabold mb-5 text-white ">Estudos Científicos</Title>
            
            <EstudosCientificosList />
            </div>   
        </div>
    )
}

export default EstudosCientificos
