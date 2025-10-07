import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EstudosCientificos from "./pages/EstudosCientificos";
import RecomendacaoTreino from "./pages/RecomendacaoTreino";
import RecomendacaoNutricional from "./pages/RecomendacaoNutricional";
import Motivacional from "./pages/Motivacional";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import InfoBasicas from "./features/recomendacao-treino/InfoBasicas";
import FormLayout from "./features/recomendacao-treino/FormLayout";
import Recomendado from "./pages/Recomendado";
import InfoNutricional from "./pages/InfoNutricional";
import MeuTreino from "./pages/MeuTreino";
import TreinoSelect from "./features/recomendacao-treino/TreinoSelect";
import TreinoResult from "./features/recomendacao-treino/TreinoResult";

import { FormProvider } from "./context/FormContext";
import LoginRegisterLayout from "./features/authentication/LoginRegisterLayout";

function App() {
  return (
    <BrowserRouter>
      <FormProvider>
        <Routes>
          <Route index element={<Navigate replace to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route element={<AppLayout />}>
            <Route path="recomendado" element={<Recomendado />} />
            <Route path="estudos" element={<EstudosCientificos />} />
            <Route path="info-nutricional" element={<InfoNutricional />} />
            <Route path="meu-treino" element={<MeuTreino />} />
            <Route
              path="recomendacao-treino"
              element={<RecomendacaoTreino />}
            />
            <Route element={<FormLayout />}>
              <Route
                path="recomendacao-treino/formulario/iniciar"
                element={<InfoBasicas />}
              />
              <Route
                path="recomendacao-treino/formulario/questions"
                element={<TreinoSelect />}
              />
              <Route
                path="recomendacao-treino/formulario/resultado"
                element={<TreinoResult />}
              />
            </Route>
            <Route
              path="recomendacao-nutricional"
              element={<RecomendacaoNutricional />}
            />
            <Route path="motivacional" element={<Motivacional />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route element={<LoginRegisterLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="registrar" element={<Register />} />
          </Route>
        </Routes>
      </FormProvider>
    </BrowserRouter>
  );
}

export default App;
