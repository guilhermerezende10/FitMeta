// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const getInfoBasica = vi.fn();
const salvarInfoBasica = vi.fn();
const getCurrentUser = vi.fn();

vi.mock("../services/apiPlanos", () => ({
  getInfoBasica: (...a) => getInfoBasica(...a),
  salvarInfoBasica: (...a) => salvarInfoBasica(...a),
}));

vi.mock("../services/apiAuth", () => ({
  getCurrentUser: () => getCurrentUser(),
}));

const { default: Perfil } = await import("./Perfil");
const { chaves } = await import("../services/usePlanos");

const LINHA = {
  nome: "Rafael",
  idade: 18,
  sexo: "masculino",
  peso: 98,
  altura: 180,
};

let queryClient;

function montar() {
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <Perfil />
    </QueryClientProvider>
  );
}

const campo = (rotulo) => screen.getByLabelText(rotulo);
const botaoSalvar = () => screen.getByRole("button", { name: /salvar/i });

async function esperarFormulario() {
  await waitFor(() => expect(screen.queryByLabelText(/nome/i)).toBeTruthy());
}

function digitar(elemento, valor) {
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  ).set;
  act(() => {
    setter.call(elemento, valor);
    elemento.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

beforeEach(() => {
  getInfoBasica.mockReset();
  salvarInfoBasica.mockReset();
  getCurrentUser.mockReset();
  getCurrentUser.mockResolvedValue({ id: "u1", role: "authenticated" });
  getInfoBasica.mockResolvedValue(LINHA);
  salvarInfoBasica.mockResolvedValue(undefined);
});

afterEach(cleanup);

describe("Perfil — carregamento", () => {
  it("exibe os cinco campos preenchidos com o que está salvo", async () => {
    montar();
    await esperarFormulario();

    expect(campo(/nome/i).value).toBe("Rafael");
    expect(campo(/idade/i).value).toBe("18");
    expect(campo(/peso/i).value).toBe("98");
    expect(campo(/altura/i).value).toBe("180");
    expect(screen.getByRole("radio", { name: "Masculino" })).toHaveProperty(
      "ariaChecked",
      "true"
    );
  });

  it("usuário sem info_basica vê formulário vazio utilizável, não erro", async () => {
    // Quem entrou pelo Google e nunca respondeu questionário não tem linha.
    getInfoBasica.mockResolvedValue(null);
    montar();
    await esperarFormulario();

    expect(campo(/nome/i).value).toBe("");
    expect(screen.queryByRole("alert")).toBeNull();
    expect(botaoSalvar()).toBeTruthy();
  });

  it("falha ao carregar mostra erro com opção de tentar de novo", async () => {
    getInfoBasica.mockRejectedValue(new Error("rede caiu"));
    montar();

    await waitFor(() => expect(screen.queryByRole("alert")).toBeTruthy());
    expect(screen.getByRole("button", { name: /tentar novamente/i })).toBeTruthy();
  });
});

describe("Perfil — validação", () => {
  it("rejeita peso fora da faixa com a mensagem do questionário", async () => {
    montar();
    await esperarFormulario();

    digitar(campo(/peso/i), "500");
    act(() => botaoSalvar().click());

    await waitFor(() =>
      expect(screen.queryByText("Informe um peso entre 30 e 300 kg.")).toBeTruthy()
    );
    expect(salvarInfoBasica).not.toHaveBeenCalled();
  });

  it.each([
    ["idade", /idade/i, "150", "Informe uma idade entre 10 e 100."],
    ["altura", /altura/i, "300", "Informe uma altura entre 100 e 250 cm."],
  ])("rejeita %s fora da faixa", async (_, rotulo, valor, mensagem) => {
    montar();
    await esperarFormulario();

    digitar(campo(rotulo), valor);
    act(() => botaoSalvar().click());

    await waitFor(() => expect(screen.queryByText(mensagem)).toBeTruthy());
    expect(salvarInfoBasica).not.toHaveBeenCalled();
  });

  it("o erro some assim que o campo é corrigido", async () => {
    montar();
    await esperarFormulario();

    digitar(campo(/peso/i), "500");
    act(() => botaoSalvar().click());
    await waitFor(() =>
      expect(screen.queryByText("Informe um peso entre 30 e 300 kg.")).toBeTruthy()
    );

    digitar(campo(/peso/i), "95");
    await waitFor(() =>
      expect(screen.queryByText("Informe um peso entre 30 e 300 kg.")).toBeNull()
    );
  });
});

describe("Perfil — gravação", () => {
  it("salva os valores editados e confirma na tela", async () => {
    montar();
    await esperarFormulario();

    digitar(campo(/peso/i), "95");
    await act(async () => botaoSalvar().click());

    await waitFor(() => expect(salvarInfoBasica).toHaveBeenCalled());
    expect(salvarInfoBasica.mock.calls[0][0]).toMatchObject({
      userId: "u1",
      peso: "95",
      nome: "Rafael",
    });
    await waitFor(() => expect(screen.queryByText("Dados atualizados")).toBeTruthy());
  });

  it("invalida info_basica ao salvar, para Minha nutrição recalcular (gh#25)", async () => {
    // Ponto central da feature: editar o peso aqui precisa mudar a
    // recomendação sem exigir refazer o questionário.
    //
    // A asserção é sobre haver nova busca, e não sobre o cache ficar vazio:
    // esta tela está inscrita na mesma query, então o React Query repopula
    // imediatamente após a remoção. O que importa é que o valor servido a
    // partir daqui veio do banco, e não do cache anterior.
    montar();
    await esperarFormulario();

    const buscasAntes = getInfoBasica.mock.calls.length;
    getInfoBasica.mockResolvedValue({ ...LINHA, peso: 95 });

    digitar(campo(/peso/i), "95");
    await act(async () => botaoSalvar().click());

    await waitFor(() => expect(salvarInfoBasica).toHaveBeenCalled());
    await waitFor(() =>
      expect(getInfoBasica.mock.calls.length).toBeGreaterThan(buscasAntes)
    );
    await waitFor(() =>
      expect(queryClient.getQueryData(chaves.infoBasica("u1"))).toMatchObject({
        peso: 95,
      })
    );
  });

  it("falha de rede mostra erro sem perder o que foi digitado", async () => {
    salvarInfoBasica.mockRejectedValue(new Error("rede caiu"));
    montar();
    await esperarFormulario();

    digitar(campo(/peso/i), "95");
    await act(async () => botaoSalvar().click());

    await waitFor(() => expect(screen.queryByRole("alert")).toBeTruthy());
    expect(campo(/peso/i).value).toBe("95");
    expect(screen.queryByText("Dados atualizados")).toBeNull();
  });

  it("editar de novo tira a confirmação, que vale para o que está salvo", async () => {
    montar();
    await esperarFormulario();

    await act(async () => botaoSalvar().click());
    await waitFor(() => expect(screen.queryByText("Dados atualizados")).toBeTruthy());

    digitar(campo(/nome/i), "Rafa");
    await waitFor(() => expect(screen.queryByText("Dados atualizados")).toBeNull());
  });
});
