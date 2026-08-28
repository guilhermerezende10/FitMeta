import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import { Suspense } from "react";

import AppLayout from "./ui/AppLayout";
import AuthLayout from "./features/authentication/AuthLayout";
import ProtectedRoute from "./ui/ProtectedRoute";

import { FormProvider } from "./context/FormContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ToastWithBlur from "./ui/ToastWithBlur";

// --------------------------------
// 🔥 CODE SPLITTING (React.lazy)
// --------------------------------

// Páginas principais
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));
const EstudosCientificos = React.lazy(() =>
  import("./pages/EstudosCientificos")
);
const Recomendado = React.lazy(() => import("./pages/Recomendado"));
const Motivacional = React.lazy(() => import("./pages/Motivacional"));
const MeuTreino = React.lazy(() => import("./pages/MeuTreino"));
const MinhaRecomendacaoNutri = React.lazy(() =>
  import("./pages/MinhaRecomendacaoNutri")
);
const PoliticasPrivacidade = React.lazy(() =>
  import("./pages/PoliticasPrivacidade")
);
const TermosDeUso = React.lazy(() => import("./pages/TermosDeUso"));

// Estudos
const EstudosCategoria = React.lazy(() =>
  import("./features/estudos-cientificos/EstudosCategoria")
);

// Recomendação treino
const FormLayout = React.lazy(() =>
  import("./features/recomendacao-treino/FormLayout")
);
const InfoBasicas = React.lazy(() =>
  import("./features/recomendacao-treino/InfoBasicas")
);
const TreinoSelect = React.lazy(() =>
  import("./features/recomendacao-treino/TreinoSelect")
);
const TreinoResult = React.lazy(() =>
  import("./features/recomendacao-treino/TreinoResult")
);

// Recomendação nutricional
const NutricaoSelect = React.lazy(() =>
  import("./features/recomendacao-nutricional/NutricaoSelect")
);
const NutricaoInfoBasicas = React.lazy(() =>
  import("./features/recomendacao-nutricional/NutricaoInfoBasicas")
);
const NutricaoResult = React.lazy(() =>
  import("./features/recomendacao-nutricional/NutricaoResult")
);

// Auth
const AuthCallback = React.lazy(() =>
  import("./features/authentication/AuthCallback")
);

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastWithBlur />

      <BrowserRouter>
        <FormProvider>
          <Suspense
            fallback={<div className="text-white p-10">Carregando...</div>}
          >
            <Routes>
              <Route path="/auth/callback" element={<AuthCallback />} />

              <Route index element={<Navigate replace to="/recomendado" />} />

              {/* Rotas protegidas */}
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="recomendado" element={<Recomendado />} />
                {/* /home saiu; links antigos caem no painel */}
                <Route
                  path="home"
                  element={<Navigate replace to="/recomendado" />}
                />
                <Route path="estudos" element={<EstudosCientificos />} />

                {/* mesmas URLs de antes, uma tela so */}
                <Route
                  path="estudos/:categoria"
                  element={<EstudosCategoria />}
                />

                {/* As telas intersticiais (foto grande + um botao) sairam:
                    viraram a etapa 1 do formulario que introduziam. */}
                <Route
                  path="recomendacao-treino"
                  element={
                    <Navigate
                      replace
                      to="/recomendacao-treino/formulario/iniciar"
                    />
                  }
                />
                <Route
                  path="recomendacao-nutricional"
                  element={
                    <Navigate
                      replace
                      to="/recomendacao-nutricional/formulario/iniciar"
                    />
                  }
                />

                {/* Formulários */}
                <Route element={<FormLayout />}>
                  <Route path="meu-treino" element={<MeuTreino />} />
                  <Route
                    path="minha-nutricao"
                    element={<MinhaRecomendacaoNutri />}
                  />

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

              {/* Login & Register */}
              <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="registrar" element={<Register />} />
              </Route>

              {/* Documentos legais — template proprio, fora do layout de auth */}
              <Route
                path="politicas-privacidade"
                element={<PoliticasPrivacidade />}
              />
              <Route path="termos-de-uso" element={<TermosDeUso />} />
            </Routes>
          </Suspense>
        </FormProvider>
      </BrowserRouter>

      {/* Toaster */}
      <Toaster
        position="top-center"
        containerStyle={{
          position: "fixed",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          pointerEvents: "none",
        }}
        toastOptions={{
          success: { duration: 2000 },
          error: { duration: 2000 },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
