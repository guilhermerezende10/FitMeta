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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="home" />} />
        <Route path="home" element={<Home />} />
        <Route element={<AppLayout />}>
          <Route path="estudos" element={<EstudosCientificos />} />
          <Route path="recomendacao-treino" element={<RecomendacaoTreino />} />
          <Route
            path="recomendacao-nutricional"
            element={<RecomendacaoNutricional />}
          />
          <Route path="motivacional" element={<Motivacional />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="registrar" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
