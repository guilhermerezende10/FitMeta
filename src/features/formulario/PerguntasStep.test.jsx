// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const getUser = vi.fn();
const upsert = vi.fn();
const navigate = vi.fn();

vi.mock("../../services/supabase", () => ({
  default: {
    auth: { getUser: () => getUser() },
    from: () => ({ upsert: (...a) => upsert(...a) }),
  },
}));

vi.mock("react-router-dom", async (original) => ({
  ...(await original()),
  useNavigate: () => navigate,
}));

const { default: PerguntasStep } = await import("./PerguntasStep");
const { FormProvider } = await import("../../context/FormContext");
const { useForm } = await import("../../context/useForm");
const { FLUXO_TREINO } = await import("./fluxos");
const { CHAVE } = await import("../../context/persistencia");

let despachar;

function Sonda() {
  const { dispatch } = useForm();
  despachar = dispatch;
  return null;
}

function montar(fluxo = FLUXO_TREINO) {
  return render(
    <MemoryRouter>
      <FormProvider>
        <Sonda />
        <PerguntasStep fluxo={fluxo} />
      </FormProvider>
    </MemoryRouter>
  );
}

const guardado = () => JSON.parse(sessionStorage.getItem(CHAVE) ?? "null");

beforeEach(() => {
  sessionStorage.clear();
  getUser.mockReset();
  upsert.mockReset();
  navigate.mockReset();
  getUser.mockResolvedValue({ data: { user: { id: "u1" } }, error: null });
  upsert.mockResolvedValue({ error: null });
});

afterEach(cleanup);

/** Preenche a etapa 1 e as respostas, e vai até a última pergunta do fluxo. */
function chegarNaUltimaPergunta() {
  const ultima = FLUXO_TREINO.perguntas[FLUXO_TREINO.perguntas.length - 1];
  act(() => {
    despachar({ type: "SET_INFO", payload: { field: "nome", value: "Rafa" } });
    for (const p of FLUXO_TREINO.perguntas) {
      despachar({
        type: "SET_TREINO_ANSWER",
        payload: { questionIndex: p.index, option: p.options[0] },
      });
    }
    for (let i = 1; i < ultima.index; i++) despachar({ type: "NEXT_PAGE" });
  });
  return ultima;
}

describe("PerguntasStep — conclusão limpa o rascunho (gh#24)", () => {
  it("o rascunho existe enquanto o questionário está em andamento", () => {
    montar();
    chegarNaUltimaPergunta();
    expect(guardado().treinoAnswers).not.toEqual({});
    expect(guardado().infoBasicas.nome).toBe("Rafa");
  });

  it("após gravar no banco, o rascunho volta ao estado inicial", async () => {
    montar();
    chegarNaUltimaPergunta();

    await act(async () => {
      screen.getByRole("button", { name: /próximo|proximo|finalizar|ver resultado/i }).click();
    });

    await waitFor(() => expect(upsert).toHaveBeenCalled());
    await waitFor(() => expect(guardado().treinoAnswers).toEqual({}));

    // Sem isto, "Refazer questionário" reabriria com tudo já marcado.
    expect(guardado().infoBasicas.nome).toBe("");
    expect(guardado().pageIndex).toBe(1);
    expect(navigate).toHaveBeenCalledWith(FLUXO_TREINO.resultado);
  });

  it("falha ao gravar preserva o rascunho — o usuário pode tentar de novo", async () => {
    upsert.mockResolvedValue({ error: new Error("rede caiu") });
    montar();
    chegarNaUltimaPergunta();

    await act(async () => {
      screen.getByRole("button", { name: /próximo|proximo|finalizar|ver resultado/i }).click();
    });

    await waitFor(() => expect(upsert).toHaveBeenCalled());
    expect(guardado().treinoAnswers).not.toEqual({});
    expect(navigate).not.toHaveBeenCalled();
  });
});
