import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { handleLogout } from "../services/apiAuth";
import NavIcon from "./NavIcon";
import { contaAtiva, MENU_CONTA, rotaAtiva } from "./sidebar-ativo";

/**
 * Rodapé da barra lateral: o cartão do usuário é o gatilho de um menu.
 *
 * Antes eram dois elementos para uma ideia só — um cartão com avatar, nome e
 * e-mail que era puramente decorativo, e logo abaixo um item "Minha conta"
 * indo para o mesmo lugar. O cartão ocupava o alvo mais óbvio da barra e
 * recusava o clique.
 *
 * O menu também é a primeira entrada de navegação que `/meus-dados` tem: até
 * aqui só se chegava lá de dentro do fluxo da Nutrição, mesmo o peso sendo a
 * entrada mais importante do produto.
 *
 * Abre para cima porque o gatilho está colado no rodapé da janela.
 */
function MenuDaConta({ nome, email, inicial, onEscolher }) {
  const { pathname } = useLocation();
  const [aberto, setAberto] = useState(false);

  const blocoRef = useRef(null);
  const gatilhoRef = useRef(null);
  const menuRef = useRef(null);

  // Aceso também fechado, enquanto se está num destino do menu: sem isso a
  // barra deixa de dizer onde a pessoa está assim que "Perfil" sai da lista.
  const emConta = contaAtiva(pathname);

  /**
   * `mousedown` e não `click`: fechar antes de o clique completar evita que o
   * elemento que estava sob o painel receba um clique fantasma.
   */
  useEffect(() => {
    if (!aberto) return;

    function aoApontarFora(evento) {
      if (!blocoRef.current?.contains(evento.target)) setAberto(false);
    }

    document.addEventListener("mousedown", aoApontarFora);
    return () => document.removeEventListener("mousedown", aoApontarFora);
  }, [aberto]);

  // O foco entra no primeiro item. "Sair" nunca é o item inicialmente focado.
  useEffect(() => {
    if (!aberto) return;
    menuRef.current?.querySelector("[role='menuitem']")?.focus();
  }, [aberto]);

  function fechar({ devolverFoco = true } = {}) {
    setAberto(false);
    if (devolverFoco) gatilhoRef.current?.focus();
  }

  function aoTeclar(evento) {
    if (evento.key === "Escape") {
      evento.preventDefault();
      fechar();
      return;
    }

    // Tab fecha e deixa o foco seguir seu caminho normal — o painel não é um
    // diálogo, e prender o foco aqui atrapalharia o drawer do mobile.
    if (evento.key === "Tab") {
      fechar({ devolverFoco: false });
      return;
    }

    if (evento.key !== "ArrowDown" && evento.key !== "ArrowUp") return;

    evento.preventDefault();
    const itens = [...(menuRef.current?.querySelectorAll("[role='menuitem']") ?? [])];
    if (itens.length === 0) return;

    const atual = itens.indexOf(document.activeElement);
    const passo = evento.key === "ArrowDown" ? 1 : -1;
    itens[(atual + passo + itens.length) % itens.length].focus();
  }

  function escolher() {
    setAberto(false);
    onEscolher?.();
  }

  const ITEM =
    "group flex h-11 w-full items-center gap-3 rounded-field-sm px-3 text-left text-body font-medium outline-none transition-colors focus-visible:shadow-focus";

  return (
    <div ref={blocoRef} className="relative px-3">
      {aberto && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Conta"
          onKeyDown={aoTeclar}
          className="absolute inset-x-3 bottom-16 z-20 flex flex-col gap-0.5 rounded-row border border-strong bg-surface-raised p-1 shadow-e3"
        >
          {MENU_CONTA.map((item) => {
            const ativo = rotaAtiva(item.to, pathname);

            return (
              <NavLink
                key={item.id}
                role="menuitem"
                to={item.to}
                onClick={escolher}
                aria-current={ativo ? "page" : undefined}
                className={`${ITEM} ${
                  ativo
                    ? "bg-accent-surface text-primary"
                    : "text-secondary hover:bg-accent-surface hover:text-primary"
                }`}
              >
                <NavIcon
                  name={item.id}
                  className={
                    ativo
                      ? "text-accent-on-card"
                      : "text-muted group-hover:text-accent-on-card"
                  }
                />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div aria-hidden="true" className="m-1 h-px bg-line" />

          {/* Única exceção da paleta do menu: sair pinta em danger. */}
          <button
            role="menuitem"
            type="button"
            onClick={handleLogout}
            className={`${ITEM} text-secondary hover:bg-danger/10 hover:text-danger`}
          >
            <NavIcon name="sair" className="text-muted group-hover:text-danger" />
            <span>Sair</span>
          </button>
        </div>
      )}

      <button
        ref={gatilhoRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={aberto}
        onClick={() => setAberto((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && aberto) fechar();
        }}
        className={`flex h-14 w-full items-center gap-3 rounded-row px-3 py-2 text-left outline-none transition-colors focus-visible:shadow-focus ${
          aberto || emConta ? "bg-surface-raised" : "hover:bg-surface-raised"
        }`}
      >
        <span
          aria-hidden="true"
          className="flex h-8 w-8 flex-none items-center justify-center rounded-pill bg-accent-surface font-display text-[18px] leading-none text-accent-on-card"
        >
          {inicial}
        </span>

        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-body font-medium leading-5 text-primary">
            {nome}
          </span>
          <span className="truncate text-[12px] leading-4 text-muted">
            {email}
          </span>
        </span>

        <NavIcon
          name="seta"
          size={16}
          className={`text-muted transition-transform ${aberto ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}

export default MenuDaConta;
