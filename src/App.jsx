import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
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
import NutricaoSelect from "./features/recomendacao-nutricional/NutricaoSelect";
import NutricaoInfoBasicas from "./features/recomendacao-nutricional/NutricaoInfoBasicas";

import { FormProvider } from "./context/FormContext";
import LoginRegisterLayout from "./features/authentication/LoginRegisterLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ToastWithBlur from "./ui/ToastWithBlur";
import ProtectedRoute from "./ui/ProtectedRoute";
import PoliticasPrivacidade from "./pages/PoliticasPrivacidade";
import TermosDeUso from "./pages/TermosDeUso";
import NutricaoResult from "./features/recomendacao-nutricional/NutricaoResult";
import AuthCallback from "./features/authentication/AuthCallback.jsx";
import EstudosFrequencia from "./features/estudos-cientificos/EstudosFrequencia.jsx";
import EstudosVolume from "./features/estudos-cientificos/EstudosVolume.jsx";
import EstudosNutricao from "./features/estudos-cientificos/EstudosNutricao.jsx";
import EstudosDivisaoTreino from "./features/estudos-cientificos/EstudosDivisaoTreino.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  useEffect(() => {
    const setRealHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    setRealHeight(); // define no carregamento inicial
    window.addEventListener("resize", setRealHeight);

    // remove o listener ao desmontar (boa prática)
    return () => window.removeEventListener("resize", setRealHeight);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ToastWithBlur />
      <BrowserRouter>
        <FormProvider>
          <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route index element={<Navigate replace to="/home" />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="home" element={<Home />} />
              <Route path="recomendado" element={<Recomendado />} />
              <Route path="estudos" element={<EstudosCientificos />} />
              <Route
                path="estudos/frequencia"
                element={<EstudosFrequencia />}
              />
              <Route path="estudos/volume" element={<EstudosVolume />} />
              <Route path="estudos/nutricao" element={<EstudosNutricao />} />
              <Route
                path="estudos/divisao-treino"
                element={<EstudosDivisaoTreino />}
              />
              <Route path="info-nutricional" element={<InfoNutricional />} />
              <Route
                path="recomendacao-treino"
                element={<RecomendacaoTreino />}
              />
              <Route
                path="recomendacao-nutricional"
                element={<RecomendacaoNutricional />}
              />
              <Route element={<FormLayout />}>
                <Route path="meu-treino" element={<MeuTreino />} />

                <Route
                  path="recomendacao-nutricional/formulario/iniciar"
                  element={<NutricaoInfoBasicas />}
                />
                <Route
                  path="recomendacao-nutricional/formulario/questions"
                  element={<NutricaoSelect />}
                />

                <Route
                  path="recomendacao-nutricional/formulario/resultado"
                  element={<NutricaoResult />}
                />
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
              <Route path="motivacional" element={<Motivacional />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route element={<LoginRegisterLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="registrar" element={<Register />} />
              <Route
                path="politicas-privacidade"
                element={<PoliticasPrivacidade />}
              />
              <Route path="termos-de-uso" element={<TermosDeUso />} />
            </Route>
          </Routes>
        </FormProvider>
      </BrowserRouter>

      {/* Toaster centralizado */}
      <Toaster
        position="top-center"
        containerStyle={{
          position: "fixed",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "auto",
          pointerEvents: "none",
        }}
        toastOptions={{
          success: { duration: 2000 },
          error: { duration: 2000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "var(--color-grey-700)",
            pointerEvents: "auto",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
