import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

/**
 * Estrutura do desktop: a barra lateral é uma coluna real do layout
 * (240px), não um deslocamento à direita do conteúdo.
 *
 * A altura é a da janela: a navegação fica parada e só o conteúdo rola.
 */
function AppLayout() {
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
