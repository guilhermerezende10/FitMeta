import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Brand from "./Brand";
import Sidebar from "./Sidebar";

/**
 * Shell da área logada.
 *
 * A partir de `lg`, a barra lateral é uma coluna real do layout (240px), não um
 * deslocamento à direita do conteúdo — e essa medida não muda.
 *
 * Abaixo de `lg` ela sai do fluxo e vira drawer (gh#10). Antes disso não havia
 * nenhuma classe responsiva no shell: em 375px, os 240px da barra mais os 96px
 * de padding do main deixavam ~39px para o conteúdo, e todas as telas da área
 * logada ficavam inutilizáveis no celular.
 *
 * A altura usa `dvh`, e não `vh`: no mobile a barra de endereço do navegador
 * entra e sai, e `100vh` não acompanha — parte do conteúdo ficava sob ela.
 */

const SELETOR_FOCAVEL =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function IconeMenu() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function IconeFechar() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function AppLayout() {
  const [aberto, setAberto] = useState(false);
  const { pathname } = useLocation();
  const drawerRef = useRef(null);
  const abridorRef = useRef(null);

  // Navegar fecha o drawer. Cobre também o caso em que a rota muda por outro
  // caminho que não um clique no menu.
  useEffect(() => setAberto(false), [pathname]);

  // Esc fecha, e Tab não escapa do drawer enquanto ele está aberto.
  useEffect(() => {
    if (!aberto) return;

    const drawer = drawerRef.current;
    const abridor = abridorRef.current;
    drawer?.querySelector(SELETOR_FOCAVEL)?.focus();

    function onKeyDown(e) {
      if (e.key === "Escape") {
        setAberto(false);
        return;
      }

      if (e.key !== "Tab" || !drawer) return;

      const focaveis = Array.from(drawer.querySelectorAll(SELETOR_FOCAVEL));
      if (!focaveis.length) return;

      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];

      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Devolve o foco a quem abriu, para quem navega por teclado não se perder.
      abridor?.focus();
    };
  }, [aberto]);

  return (
    <div className="flex h-screen overflow-hidden bg-canvas supports-[height:100dvh]:h-[100dvh]">
      <Sidebar className="hidden lg:flex" />

      {aberto && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setAberto(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/60"
          />

          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="absolute inset-y-0 left-0 flex"
          >
            <Sidebar className="flex" onNavigate={() => setAberto(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 flex-none items-center gap-3 border-b border-line bg-surface px-4 lg:hidden">
          <button
            ref={abridorRef}
            type="button"
            onClick={() => setAberto(true)}
            aria-label="Abrir menu"
            aria-expanded={aberto}
            className="-ml-2 flex h-11 w-11 flex-none items-center justify-center rounded-field text-secondary outline-none transition-colors hover:bg-surface-raised hover:text-primary focus-visible:shadow-focus"
          >
            {aberto ? <IconeFechar /> : <IconeMenu />}
          </button>

          <Brand />
        </header>

        <main className="min-w-0 flex-1 overflow-y-auto px-4 pb-12 pt-8 lg:px-12 lg:pt-10">
          <div className="mx-auto w-full max-w-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
