import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

/**
 * Estrutura do desktop: a barra lateral é uma coluna real do layout
 * (240px), não um deslocamento à direita do conteúdo.
 *
 * FM-11: substitui o layout mobile com `lg:pl-56` e posicionamentos mágicos.
 * FM-10: nada de `w-screen` (100vw ignora a barra de rolagem e vaza 15px).
 */

// Telas de tela cheia, sem a coluna de navegação.
const FULL_BLEED = ["/home"];

function AppLayout() {
  const { pathname } = useLocation();
  const fullBleed = FULL_BLEED.includes(pathname);

  if (fullBleed) {
    return (
      <div className="min-h-screen bg-canvas">
        <Outlet />
      </div>
    );
  }

  // A altura é a da janela: a coluna de navegação fica parada e o conteúdo rola.
  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto px-12 pb-12 pt-10">
        <div className="mx-auto w-full max-w-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
