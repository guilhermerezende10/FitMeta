import Button from "../../ui/Button";
import Container from "../../ui/Container";
import Title from "../../ui/Title";
import RowFormList from "./RowFormList";
import { useForm } from "../../context/FormContext";

function InfoBasicas() {
  const { state, dispatch } = useForm();

  function handleChange(e) {
    console.log('entrou')
    dispatch({
      type: "SET_INFO",
      payload: { field: e.target.name, value: e.target.value },
    });
  }

  return (
    <Container>
  
      <div className="bg-[#192126] relative bottom-24 py-4 px-14 rounded-full shadow-md w-full max-w-xl">
        <Title className="text-2xl font-bold text-white">
          Informações Básicas
        </Title>
      </div>

      <RowFormList state={state.InfoBasicas} handleChange={handleChange}/>
      <div className="top-10 mt-16 relative">
        <Button
          className="px-36 py-6 rounded-full text-white text-base font-regular shadow-lg transition bg-gradient-to-r from-[#3F2B57] to-[#2B1546] hover:opacity-90-full"
          page="/recomendacao-treino/formulario/questions"
        >
          Próximo
        </Button>
      </div>
    </Container>
  );
}

export default InfoBasicas;
