// @vitest-environment jsdom
import { StrictMode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// O componente importa o cliente Supabase, que lança sem variáveis de
// ambiente (gh#20). O mock troca o módulo inteiro, então o teste não depende
// de ambiente nem de rede.
const getUser = vi.fn();
const maybeSingle = vi.fn();

vi.mock("../../services/supabase", () => ({
  default: {
    auth: { getUser: () => getUser() },
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle: () => maybeSingle() }) }),
    }),
  },
}));

const { default: InfoBasicasStep } = await import("./InfoBasicasStep");
const { FormProvider } = await import("../../context/FormContext");
const { FLUXO_TREINO } = await import("./fluxos");

const LINHA = {
  nome: "Rafa",
  idade: 30,
  sexo: "masculino",
  peso: 80,
  altura: 178,
};

// StrictMode é o que o app usa em main.jsx, e é onde o bug de carregamento
// infinito aparecia: monta, limpa e monta de novo.
function montar() {
  return render(
    <StrictMode>
      <MemoryRouter>
        <FormProvider>
          <InfoBasicasStep fluxo={FLUXO_TREINO} />
        </FormProvider>
      </MemoryRouter>
    </StrictMode>
  );
}

const carregando = () => screen.queryByText("Carregando seus dados…");
const campoNome = () => screen.queryByLabelText(/nome/i);

beforeEach(() => {
  // Desde a gh#24 o FormProvider hidrata do sessionStorage, que sobrevive
  // entre casos do mesmo arquivo. Sem limpar, o rascunho de um teste vazaria
  // para o seguinte e a etapa nem chegaria a buscar.
  sessionStorage.clear();
  getUser.mockReset();
  maybeSingle.mockReset();
  getUser.mockResolvedValue({ data: { user: { id: "u1" } }, error: null });
  maybeSingle.mockResolvedValue({ data: null, error: null });
});

afterEach(cleanup);

describe("InfoBasicasStep — carregamento", () => {
  it("mostra o carregamento antes de a busca responder", () => {
    montar();
    expect(carregando()).toBeTruthy();
  });

  it("sai do carregamento mesmo sob StrictMode (gh#17)", async () => {
    // Regressão: uma guarda por ref fazia a segunda montagem do StrictMode
    // sair antes de buscar, e o `finally` da primeira era pulado por já estar
    // cancelada — o skeleton ficava para sempre.
    montar();
    await waitFor(() => expect(carregando()).toBeNull());
    expect(campoNome()).toBeTruthy();
  });
});

describe("InfoBasicasStep — semeadura", () => {
  it("preenche os campos com o que está salvo", async () => {
    maybeSingle.mockResolvedValue({ data: LINHA, error: null });
    montar();

    await waitFor(() => expect(carregando()).toBeNull());

    expect(campoNome().value).toBe("Rafa");
    expect(screen.getByLabelText(/idade/i).value).toBe("30");
    expect(screen.getByLabelText(/peso/i).value).toBe("80");
    expect(screen.getByLabelText(/altura/i).value).toBe("178");
  });

  it("usuário novo: campos vazios, sem erro e sem carregamento preso", async () => {
    maybeSingle.mockResolvedValue({ data: null, error: null });
    montar();

    await waitFor(() => expect(carregando()).toBeNull());
    expect(campoNome().value).toBe("");
  });

  it("sem sessão: não busca a linha e libera o formulário", async () => {
    getUser.mockResolvedValue({ data: { user: null }, error: null });
    montar();

    await waitFor(() => expect(carregando()).toBeNull());
    expect(maybeSingle).not.toHaveBeenCalled();
    expect(campoNome()).toBeTruthy();
  });
});

describe("InfoBasicasStep — rascunho da sessão tem precedência (gh#24)", () => {
  it("com rascunho salvo, nem busca no banco e nem mostra carregamento", async () => {
    // O rascunho é o que o usuário digitou nesta sessão e ainda não gravou.
    // Semear por cima com o valor antigo do banco apagaria a edição em curso.
    const { CHAVE } = await import("../../context/persistencia");
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
    maybeSingle.mockResolvedValue({ data: LINHA, error: null });

    montar();

    expect(carregando()).toBeNull();
    expect(campoNome().value).toBe("Digitado agora");
    expect(maybeSingle).not.toHaveBeenCalled();
  });
});

describe("InfoBasicasStep — falha não pode travar o formulário", () => {
  it("erro na consulta ainda libera os campos para digitação", async () => {
    maybeSingle.mockRejectedValue(new Error("rede caiu"));
    montar();

    await waitFor(() => expect(carregando()).toBeNull());
    expect(campoNome()).toBeTruthy();
    expect(campoNome().value).toBe("");
  });

  it("erro ao obter o usuário também libera os campos", async () => {
    getUser.mockRejectedValue(new Error("sem sessão"));
    montar();

    await waitFor(() => expect(carregando()).toBeNull());
    expect(campoNome()).toBeTruthy();
  });
});
