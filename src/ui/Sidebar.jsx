import { NavLink, useLocation } from "react-router-dom";
import { useForm } from "../context/useForm";
import { useUser } from "../features/authentication/useUser";
import { useInfoBasica } from "../services/usePlanos";
import { nomeExibido } from "../features/conta/nomeExibido";
import Brand from "./Brand";
import MenuDaConta from "./MenuDaConta";
import NavIcon from "./NavIcon";
import { isItemActive, ITEMS } from "./sidebar-ativo";

/**
 * Barra lateral — coluna real de 240px, não um deslocamento.
 *
 * A partir de `lg` é a primeira coluna do shell; abaixo disso o AppLayout a
 * monta dentro de um drawer (gh#10). O conteúdo é o mesmo nos dois casos: o
 * modo é escolhido por quem monta, via `className`, e `onNavigate` deixa o
 * drawer fechar quando um item é escolhido.
 *
 * FM-23: Estudos passa a existir na navegação.
 * FM-03: cada item é um único elemento interativo (NavLink), sem <button> dentro.
 */

function Sidebar({ className = "", onNavigate }) {
  const { pathname } = useLocation();
  const { dispatch } = useForm();
  const { user } = useUser();

  const email = user?.email ?? "";

  /**
   * gh#25: o nome exibido aqui vinha só de `user_metadata`, que o app nunca
   * escreve — então editar o perfil não mudava nada na barra. `info_basica.nome`
   * é o nome que o próprio usuário digitou, e passa na frente.
   *
   * A query é a mesma que as outras telas usam, servida do cache.
   */
  const { dados: infoBasica } = useInfoBasica();

  const nome = nomeExibido(infoBasica, user);
  const inicial = (nome[0] || "?").toUpperCase();

  function handleResetPage() {
    dispatch({ type: "RESET_PAGE" });
    onNavigate?.();
  }

  return (
    <aside
      className={`flex w-sidebar flex-none flex-col border-r border-line bg-surface pb-6 pt-8 ${className}`}
    >
      <div className="px-6">
        <Brand />
      </div>

      <nav className="px-3 pt-10">
        <ul className="flex flex-col gap-1">
          {ITEMS.map((item) => {
            const active = isItemActive(item.id, pathname);

            return (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  onClick={handleResetPage}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex h-11 w-full items-center gap-3 rounded-field px-3 text-body font-medium outline-none transition-colors focus-visible:shadow-focus ${
                    active
                      ? "bg-accent-surface text-primary"
                      : "text-secondary hover:bg-surface-raised hover:text-primary"
                  }`}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-2.5 left-0 top-2.5 w-[3px] rounded-sm bg-accent"
                    />
                  )}
                  <NavIcon
                    name={item.id}
                    className={active ? "text-accent-on-card" : "text-dim"}
                  />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex-1" />

      <div className="flex flex-col gap-4">
        <div className="mx-3 h-px bg-line" />

        <MenuDaConta
          nome={nome}
          email={email}
          inicial={inicial}
          onEscolher={handleResetPage}
        />
      </div>
    </aside>
  );
}

export default Sidebar;
