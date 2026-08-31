// @vitest-environment jsdom
import { StrictMode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * O mock é na camada de acesso a dados, e não no cliente Supabase cru: assim o
 * teste exercita os hooks do React Query de verdade (gh#16) e não depende de
 * ambiente nem de rede.
 */
const getInfoBasica = vi.fn();
const salvarInfoBasica = vi.fn();
const getCurrentUser = vi.fn();

vi.mock("../../services/apiPlanos", () => ({
  getInfoBasica: (...a) => getInfoBasica(...a),
  salvarInfoBasica: (...a) => salvarInfoBasica(...a),
}));

vi.mock("../../services/apiAuth", () => ({
  getCurrentUser: () => getCurrentUser(),
}));

const { default: InfoBasicasStep } = await import("./InfoBasicasStep");
const { FormProvider } = await import("../../context/FormContext");
const { FLUXO_TREINO } = await import("./fluxos");
const { CHAVE } = await import("../../context/persistencia");

const LINHA = {
  nome: "Rafa",
  idade: 30,
  sexo: "masculino",
  peso: 80,
  altura: 178,
};

// StrictMode é o que o app usa em main.jsx, e é onde nasceu o bug de
// carregamento infinito: monta, limpa e monta de novo.
function montar() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <FormProvider>
            <InfoBasicasStep fluxo={FLUXO_TREINO} />
          </FormProvider>
        </MemoryRouter>
      </QueryClientProvider>
    </StrictMode>
  );
}

const carregando = () => screen.queryByText("Carregando seus dados…");
const campoNome = () => screen.queryByLabelText(/nome/i);

beforeEach(() => {
  // Desde a gh#24 o FormProvider hidrata do sessionStorage, que sobrevive
  // entre casos do mesmo arquivo.
  sessionStorage.clear();
  getInfoBasica.mockReset();
  salvarInfoBasica.mockReset();
  getCurrentUser.mockReset();
  getCurrentUser.mockResolvedValue({ id: "u1", role: "authenticated" });
  getInfoBasica.mockResolvedValue(null);
});

afterEach(cleanup);

describe("InfoBasicasStep — carregamento", () => {
  it("mostra o carregamento antes de a busca responder", () => {
    montar();
    expect(carregando()).toBeTruthy();
  });

  it("sai do carregamento mesmo sob StrictMode (gh#17)", async () => {
    // Regressão: uma guarda por ref fazia a segunda montagem do StrictMode
    // sair antes de buscar, e o skeleton ficava para sempre.
    montar();
    await waitFor(() => expect(carregando()).toBeNull());
    expect(campoNome()).toBeTruthy();
  });
});

describe("InfoBasicasStep — semeadura", () => {
  it("preenche os campos com o que está salvo", async () => {
    getInfoBasica.mockResolvedValue(LINHA);
    montar();

    await waitFor(() => expect(carregando()).toBeNull());

    expect(campoNome().value).toBe("Rafa");
    expect(screen.getByLabelText(/idade/i).value).toBe("30");
    expect(screen.getByLabelText(/peso/i).value).toBe("80");
    expect(screen.getByLabelText(/altura/i).value).toBe("178");
  });

  it("busca com o id vindo da query do usuário, sem getUser próprio (gh#16)", async () => {
    getInfoBasica.mockResolvedValue(LINHA);
    montar();

    await waitFor(() => expect(getInfoBasica).toHaveBeenCalled());
    expect(getInfoBasica).toHaveBeenCalledWith("u1");
  });

  it("usuário novo: campos vazios, sem erro e sem carregamento preso", async () => {
    getInfoBasica.mockResolvedValue(null);
    montar();

    await waitFor(() => expect(carregando()).toBeNull());
    expect(campoNome().value).toBe("");
  });

  it("sem sessão: não busca a linha e libera o formulário", async () => {
    getCurrentUser.mockResolvedValue(null);
    montar();

    await waitFor(() => expect(carregando()).toBeNull());
    expect(getInfoBasica).not.toHaveBeenCalled();
    expect(campoNome()).toBeTruthy();
  });
});

describe("InfoBasicasStep — rascunho da sessão tem precedência (gh#24)", () => {
  it("com rascunho salvo, não mostra carregamento e mantém o que foi digitado", async () => {
    // O rascunho é o que o usuário digitou nesta sessão e ainda não gravou.
    // Semear por cima com o valor do banco apagaria a edição em curso.
    sessionStorage.setItem(
      CHAVE,
      JSON.stringify({
        infoBasicas: {
          nome: "Digitado agora",
          idade: "",
          peso: "",
          altura: "",
          sexo: "",
        },
        treinoAnswers: {},
        nutricaoAnswers: {},
        pageIndex: 1,
      })
    );
    getInfoBasica.mockResolvedValue(LINHA);

    montar();

    expect(carregando()).toBeNull();
    expect(campoNome().value).toBe("Digitado agora");

    // A query pode até rodar — o que não pode é sobrescrever o rascunho.
    await waitFor(() => expect(campoNome().value).toBe("Digitado agora"));
  });
});

describe("InfoBasicasStep — falha não pode travar o formulário", () => {
  it("erro na consulta ainda libera os campos para digitação", async () => {
    getInfoBasica.mockRejectedValue(new Error("rede caiu"));
    montar();

    await waitFor(() => expect(carregando()).toBeNull());
    expect(campoNome()).toBeTruthy();
    expect(campoNome().value).toBe("");
  });

  it("erro ao obter o usuário também libera os campos", async () => {
    getCurrentUser.mockRejectedValue(new Error("sem sessão"));
    montar();

    await waitFor(() => expect(carregando()).toBeNull());
    expect(campoNome()).toBeTruthy();
  });
});
