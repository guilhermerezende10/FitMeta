// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const handleLogout = vi.fn();

vi.mock("../services/apiAuth", () => ({
  handleLogout: (...a) => handleLogout(...a),
}));

const { default: MenuDaConta } = await import("./MenuDaConta");

function montar({ rota = "/recomendado", onEscolher } = {}) {
  return render(
    <MemoryRouter initialEntries={[rota]}>
      <MenuDaConta
        nome="Rafael Barros"
        email="rafael@exemplo.com"
        inicial="R"
        onEscolher={onEscolher}
      />
    </MemoryRouter>
  );
}

const gatilho = () => screen.getByRole("button", { name: /rafael barros/i });
const itens = () => screen.getAllByRole("menuitem");

function abrir() {
  act(() => gatilho().click());
}

function teclar(key) {
  act(() => {
    document.activeElement.dispatchEvent(
      new KeyboardEvent("keydown", { key, bubbles: true })
    );
  });
}

beforeEach(() => handleLogout.mockReset());
afterEach(cleanup);

describe("Menu da conta — abrir e fechar", () => {
  it("o cartão do usuário é o gatilho, e anuncia que abre um menu", () => {
    // Antes ele era decorativo: ocupava o alvo mais óbvio e recusava o clique.
    montar();

    expect(gatilho().getAttribute("aria-haspopup")).toBe("menu");
    expect(gatilho().getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("abre no clique e fecha no clique de novo", () => {
    montar();

    abrir();
    expect(screen.getByRole("menu")).toBeTruthy();
    expect(gatilho().getAttribute("aria-expanded")).toBe("true");

    abrir();
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("clique fora fecha", () => {
    montar();
    abrir();

    act(() => {
      document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(screen.queryByRole("menu")).toBeNull();
  });
});

describe("Menu da conta — conteúdo", () => {
  it("tem os dois destinos e o sair, nessa ordem", () => {
    montar();
    abrir();

    expect(itens().map((i) => i.textContent)).toEqual([
      "Minha conta",
      "Meus dados",
      "Sair",
    ]);
  });

  it("dá a /meus-dados a primeira entrada de navegação que ela tem", () => {
    // Até aqui só se chegava lá de dentro do fluxo da Nutrição.
    montar();
    abrir();

    const dados = screen.getByRole("menuitem", { name: "Meus dados" });
    expect(dados.getAttribute("href")).toBe("/meus-dados");
  });

  it("escolher um destino fecha o menu e avisa quem monta", () => {
    const onEscolher = vi.fn();
    montar({ onEscolher });
    abrir();

    act(() => screen.getByRole("menuitem", { name: "Meus dados" }).click());

    expect(onEscolher).toHaveBeenCalled();
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("Sair encerra a sessão", () => {
    montar();
    abrir();

    act(() => screen.getByRole("menuitem", { name: "Sair" }).click());

    expect(handleLogout).toHaveBeenCalled();
  });

  it("o item da rota atual fica marcado", () => {
    montar({ rota: "/perfil" });
    abrir();

    const conta = screen.getByRole("menuitem", { name: "Minha conta" });
    expect(conta.getAttribute("aria-current")).toBe("page");
  });
});

describe("Menu da conta — teclado", () => {
  it("o foco entra no primeiro item, nunca no Sair", async () => {
    montar();
    abrir();

    await waitFor(() =>
      expect(document.activeElement.textContent).toBe("Minha conta")
    );
  });

  it("as setas percorrem e dão a volta", async () => {
    montar();
    abrir();
    await waitFor(() =>
      expect(document.activeElement.textContent).toBe("Minha conta")
    );

    teclar("ArrowDown");
    expect(document.activeElement.textContent).toBe("Meus dados");

    teclar("ArrowDown");
    expect(document.activeElement.textContent).toBe("Sair");

    teclar("ArrowDown");
    expect(document.activeElement.textContent).toBe("Minha conta");

    teclar("ArrowUp");
    expect(document.activeElement.textContent).toBe("Sair");
  });

  it("Esc fecha e devolve o foco ao gatilho", async () => {
    montar();
    abrir();
    await waitFor(() =>
      expect(document.activeElement.textContent).toBe("Minha conta")
    );

    teclar("Escape");

    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(gatilho());
  });

  it("Tab fecha sem sequestrar o foco", async () => {
    // O painel não é um diálogo: prender o foco aqui atrapalharia o drawer.
    montar();
    abrir();
    await waitFor(() =>
      expect(document.activeElement.textContent).toBe("Minha conta")
    );

    teclar("Tab");

    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).not.toBe(gatilho());
  });
});
