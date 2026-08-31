// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const salvarRespostas = vi.fn();
const getCurrentUser = vi.fn();
const navigate = vi.fn();

vi.mock("../../services/apiPlanos", () => ({
  salvarRespostas: (...a) => salvarRespostas(...a),
}));

vi.mock("../../services/apiAuth", () => ({
  getCurrentUser: () => getCurrentUser(),
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
const { chaves } = await import("../../services/usePlanos");

let despachar;
let queryClient;

function Sonda() {
  const { dispatch } = useForm();
  despachar = dispatch;
  return null;
}

function montar(fluxo = FLUXO_TREINO) {
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <FormProvider>
          <Sonda />
          <PerguntasStep fluxo={fluxo} />
        </FormProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

const guardado = () => JSON.parse(sessionStorage.getItem(CHAVE) ?? "null");
const botaoProximo = () =>
  screen.getByRole("button", { name: /próximo|proximo|finalizar|ver resultado/i });

beforeEach(() => {
  sessionStorage.clear();
  salvarRespostas.mockReset();
  getCurrentUser.mockReset();
  navigate.mockReset();
  getCurrentUser.mockResolvedValue({ id: "u1", role: "authenticated" });
  salvarRespostas.mockResolvedValue(undefined);
});

afterEach(cleanup);

/** Preenche as respostas e avança até a última pergunta do fluxo. */
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

async function concluir() {
  // Esperar a *chamada* de getCurrentUser não basta: entre a chamada e o
  // usuário chegar ao componente há um render. Clicar nesse intervalo faz o
  // handler cair no ramo de "sem sessão". O cache preenchido é o sinal exato.
  await waitFor(() => expect(queryClient.getQueryData(["user"])).toBeTruthy());
  await act(async () => {
    botaoProximo().click();
  });
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
    await concluir();

    await waitFor(() => expect(salvarRespostas).toHaveBeenCalled());
    await waitFor(() => expect(guardado().treinoAnswers).toEqual({}));

    // Sem isto, "Refazer questionário" reabriria com tudo já marcado.
    expect(guardado().infoBasicas.nome).toBe("");
    expect(guardado().pageIndex).toBe(1);
    expect(navigate).toHaveBeenCalledWith(FLUXO_TREINO.resultado);
  });

  it("falha ao gravar preserva o rascunho — o usuário pode tentar de novo", async () => {
    salvarRespostas.mockRejectedValue(new Error("rede caiu"));
    montar();
    chegarNaUltimaPergunta();
    await concluir();

    await waitFor(() => expect(salvarRespostas).toHaveBeenCalled());
    expect(guardado().treinoAnswers).not.toEqual({});
    expect(navigate).not.toHaveBeenCalled();
  });
});

describe("PerguntasStep — gravação pelo React Query (gh#16)", () => {
  it("usa o id da query do usuário, sem getUser próprio", async () => {
    montar();
    chegarNaUltimaPergunta();
    await concluir();

    await waitFor(() => expect(salvarRespostas).toHaveBeenCalled());

    const [argumentos] = salvarRespostas.mock.calls[0];
    expect(argumentos.ehNutricao).toBe(false);
    expect(argumentos.payload.user_id).toBe("u1");
    // Colunas e formato idênticos aos que o upsert já gravava.
    expect(Object.keys(argumentos.payload).sort()).toEqual([
      "duracao",
      "freq_treino",
      "user_id",
    ]);
  });

  it("remove o cache dos planos, para a tela de resultado não mostrar o anterior", async () => {
    // É o risco que a issue aponta como o maior: invalidar apenas marcaria
    // como obsoleto, e a tela de resultado renderizaria o plano antigo antes
    // de o refetch chegar.
    queryClientSemear();
    montar();
    queryClientSemear();
    chegarNaUltimaPergunta();
    await concluir();

    await waitFor(() => expect(salvarRespostas).toHaveBeenCalled());
    await waitFor(() =>
      expect(queryClient.getQueryData(chaves.treino("u1"))).toBeUndefined()
    );
    expect(queryClient.getQueryData(chaves.nutricao("u1"))).toBeUndefined();
    expect(queryClient.getQueryData(chaves.infoBasica("u1"))).toBeUndefined();
  });
});

function queryClientSemear() {
  if (!queryClient) return;
  queryClient.setQueryData(chaves.treino("u1"), { freq_treino: "antigo" });
  queryClient.setQueryData(chaves.nutricao("u1"), { objetivo: "antigo" });
  queryClient.setQueryData(chaves.infoBasica("u1"), { nome: "antigo" });
}
