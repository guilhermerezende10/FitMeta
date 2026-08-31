import { NavLink, useLocation } from "react-router-dom";
import { useForm } from "../context/useForm";
import { useUser } from "../features/authentication/useUser";
import { useInfoBasica } from "../services/usePlanos";
import { handleLogout } from "../services/apiAuth";
import Brand from "./Brand";
import NavIcon from "./NavIcon";
import { isItemActive } from "./sidebar-ativo";

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

const ITEMS = [
  { id: "home", label: "Home", to: "/recomendado" },
  { id: "treino", label: "Treino", to: "/recomendacao-treino" },
  { id: "nutricao", label: "Nutrição", to: "/recomendacao-nutricional" },
  { id: "estudos", label: "Estudos", to: "/estudos" },
  { id: "motivacao", label: "Motivação", to: "/motivacional" },
  { id: "perfil", label: "Perfil", to: "/perfil" },
];

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

  const nome =
    infoBasica?.nome?.trim() ||
    user?.user_metadata?.nome ||
    email.split("@")[0] ||
    "Sua conta";
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

        <div className="flex items-center gap-3 px-3">
          <div
            aria-hidden="true"
            className="flex h-8 w-8 flex-none items-center justify-center rounded-pill bg-accent-surface font-display text-[18px] leading-none text-accent-on-card"
          >
            {inicial}
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-body font-medium leading-5 text-primary">
              {nome}
            </span>
            <span className="truncate text-[12px] leading-4 text-dim">
              {email}
            </span>
          </div>
        </div>

        <div className="px-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex h-11 w-full items-center gap-3 rounded-field px-3 text-left text-body font-medium text-secondary outline-none transition-colors hover:bg-danger/10 hover:text-danger focus-visible:shadow-focus"
          >
            <NavIcon name="sair" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
