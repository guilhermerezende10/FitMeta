// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const getInfoBasica = vi.fn();
const salvarInfoBasica = vi.fn();
const getCurrentUser = vi.fn();
const atualizarNome = vi.fn();
const atualizarEmail = vi.fn();
const atualizarSenha = vi.fn();

vi.mock("../services/apiPlanos", () => ({
  getInfoBasica: (...a) => getInfoBasica(...a),
  salvarInfoBasica: (...a) => salvarInfoBasica(...a),
}));

vi.mock("../services/apiAuth", () => ({
  getCurrentUser: () => getCurrentUser(),
  atualizarNome: (...a) => atualizarNome(...a),
  atualizarEmail: (...a) => atualizarEmail(...a),
  atualizarSenha: (...a) => atualizarSenha(...a),
}));

const { default: Perfil } = await import("./Perfil");

const LINHA = {
  nome: "Rafael",
  idade: 18,
  sexo: "masculino",
  peso: 98,
  altura: 180,
};

const USUARIO = {
  id: "u1",
  role: "authenticated",
  email: "rafael@exemplo.com",
  user_metadata: { nome: "Rafa do cadastro" },
  identities: [{ provider: "email" }],
};

function montar() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

const campo = (rotulo) => screen.getByLabelText(rotulo);
const botao = (nome) => screen.getByRole("button", { name: nome });

async function esperarConta() {
  await waitFor(() => expect(screen.queryByLabelText(/^nome$/i)).toBeTruthy());
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
  for (const m of [
    getInfoBasica,
    salvarInfoBasica,
    getCurrentUser,
    atualizarNome,
    atualizarEmail,
    atualizarSenha,
  ])
    m.mockReset();

  getCurrentUser.mockResolvedValue(USUARIO);
  getInfoBasica.mockResolvedValue(LINHA);
  salvarInfoBasica.mockResolvedValue(undefined);
  atualizarNome.mockResolvedValue(USUARIO);
  atualizarEmail.mockResolvedValue(undefined);
  atualizarSenha.mockResolvedValue(undefined);
});

afterEach(cleanup);

describe("Minha conta — estrutura", () => {
  it("tem os três blocos de cadastro", async () => {
    montar();
    await esperarConta();

    // "Nome" não é título solto: o título do cartão virou o rótulo do campo,
    // para não repetir a mesma palavra duas vezes em sequência.
    expect(screen.getByLabelText(/^nome$/i)).toBeTruthy();
    for (const titulo of [/^e-mail$/i, /^senha$/i])
      expect(screen.getByRole("heading", { name: titulo })).toBeTruthy();
  });

  it("mostra o e-mail com que a pessoa entra hoje", async () => {
    montar();
    await esperarConta();

    expect(screen.getAllByText(USUARIO.email).length).toBeGreaterThan(0);
  });

  it("o cartão de identidade diz por onde a pessoa entra", async () => {
    montar();
    await esperarConta();

    expect(screen.getByText(/entra com e-mail e senha/i)).toBeTruthy();
    expect(screen.queryByText(/entra com google/i)).toBeNull();
  });
});

describe("Minha conta — botão só vive com alteração", () => {
  const salvar = () => screen.getByRole("button", { name: /^salvar$/i });

  it("Salvar nasce desabilitado", async () => {
    // A tela abria com três botões roxos convidando a salvar o que ninguém
    // tinha mexido.
    montar();
    await esperarConta();
    await waitFor(() => expect(campo(/^nome$/i).value).toBe("Rafael"));

    expect(salvar().disabled).toBe(true);
  });

  it("editar o nome habilita, e voltar ao valor original desabilita de novo", async () => {
    montar();
    await esperarConta();
    await waitFor(() => expect(campo(/^nome$/i).value).toBe("Rafael"));

    digitar(campo(/^nome$/i), "Rafael Barros");
    await waitFor(() => expect(salvar().disabled).toBe(false));

    digitar(campo(/^nome$/i), "Rafael");
    await waitFor(() => expect(salvar().disabled).toBe(true));
  });

  it("Trocar senha só habilita com os três campos preenchidos", async () => {
    montar();
    await esperarConta();

    const trocar = () => screen.getByRole("button", { name: /trocar senha/i });
    expect(trocar().disabled).toBe(true);

    digitar(campo(/senha atual/i), "antiga123");
    digitar(campo(/^nova senha$/i), "novasenha");
    await waitFor(() => expect(trocar().disabled).toBe(true));

    digitar(campo(/confirmar nova senha/i), "novasenha");
    await waitFor(() => expect(trocar().disabled).toBe(false));
  });

  it("Enviar confirmação só habilita com algo digitado", async () => {
    montar();
    await esperarConta();

    const enviar = () => screen.getByRole("button", { name: /enviar confirmação/i });
    expect(enviar().disabled).toBe(true);

    digitar(campo(/novo e-mail/i), "n");
    await waitFor(() => expect(enviar().disabled).toBe(false));
  });
});

describe("Minha conta — nome", () => {
  it("semeia de info_basica, que é o que a barra lateral mostra", async () => {
    montar();
    await esperarConta();

    await waitFor(() => expect(campo(/^nome$/i).value).toBe("Rafael"));
  });

  it("sem linha em info_basica, semeia do cadastro", async () => {
    getInfoBasica.mockResolvedValue(null);
    montar();
    await esperarConta();

    await waitFor(() => expect(campo(/^nome$/i).value).toBe("Rafa do cadastro"));
  });

  it("grava nos dois lugares, sem tocar nas outras colunas", async () => {
    montar();
    await esperarConta();
    await waitFor(() => expect(campo(/^nome$/i).value).toBe("Rafael"));

    digitar(campo(/^nome$/i), "Rafael Barros");
    await act(async () => botao(/^salvar$/i).click());

    await waitFor(() => expect(atualizarNome).toHaveBeenCalled());
    expect(atualizarNome.mock.calls[0][0]).toEqual({ nome: "Rafael Barros" });
    expect(salvarInfoBasica.mock.calls[0][0]).toMatchObject({
      nome: "Rafael Barros",
      idade: "18",
      sexo: "masculino",
      peso: "98",
      altura: "180",
    });
  });

  it("sem linha em info_basica, não cria uma só para guardar o nome", async () => {
    // `salvarInfoBasica` faz `Number("")`, que é 0. Criar linha aqui gravaria
    // idade, peso e altura zerados, e o calculadorMacros consumiria um corpo
    // de 0 kg.
    getInfoBasica.mockResolvedValue(null);
    montar();
    await esperarConta();
    await waitFor(() => expect(campo(/^nome$/i).value).toBe("Rafa do cadastro"));

    digitar(campo(/^nome$/i), "Rafael");
    await act(async () => botao(/^salvar$/i).click());

    await waitFor(() => expect(atualizarNome).toHaveBeenCalled());
    expect(salvarInfoBasica).not.toHaveBeenCalled();
  });

  it("nome vazio não vai ao servidor", async () => {
    montar();
    await esperarConta();

    digitar(campo(/^nome$/i), "   ");
    await act(async () => botao(/^salvar$/i).click());

    await waitFor(() =>
      expect(screen.queryByText("Informe seu nome.")).toBeTruthy()
    );
    expect(atualizarNome).not.toHaveBeenCalled();
    expect(salvarInfoBasica).not.toHaveBeenCalled();
  });
});

describe("Minha conta — e-mail", () => {
  it("avisa que a troca só vale depois do link, e não mostra o novo como atual", async () => {
    montar();
    await esperarConta();

    digitar(campo(/novo e-mail/i), "novo@exemplo.com");
    await act(async () => botao(/enviar confirmação/i).click());

    await waitFor(() =>
      expect(screen.queryByText(/novo@exemplo\.com/)).toBeTruthy()
    );
    expect(screen.getByText(/só muda depois/i)).toBeTruthy();
    // O endereço atual continua sendo o antigo: nada mudou ainda.
    expect(screen.getAllByText(USUARIO.email).length).toBeGreaterThan(0);
    // E dá para voltar ao formulário sem recarregar a tela.
    expect(screen.getByRole("button", { name: /usar outro e-mail/i })).toBeTruthy();
  });

  it("recusa e-mail inválido antes de chamar o servidor", async () => {
    montar();
    await esperarConta();

    digitar(campo(/novo e-mail/i), "sem-arroba");
    await act(async () => botao(/enviar confirmação/i).click());

    await waitFor(() =>
      expect(screen.queryByText("Informe um e-mail válido.")).toBeTruthy()
    );
    expect(atualizarEmail).not.toHaveBeenCalled();
  });

  it("recusa o mesmo e-mail que já está em uso", async () => {
    montar();
    await esperarConta();

    digitar(campo(/novo e-mail/i), USUARIO.email.toUpperCase());
    await act(async () => botao(/enviar confirmação/i).click());

    await waitFor(() =>
      expect(screen.queryByText(/diferente do atual/i)).toBeTruthy()
    );
    expect(atualizarEmail).not.toHaveBeenCalled();
  });

  it("e-mail já cadastrado vira frase legível", async () => {
    atualizarEmail.mockRejectedValue(new Error("User already registered"));
    montar();
    await esperarConta();

    digitar(campo(/novo e-mail/i), "ocupado@exemplo.com");
    await act(async () => botao(/enviar confirmação/i).click());

    await waitFor(() =>
      expect(screen.queryByText(/já está cadastrado/i)).toBeTruthy()
    );
  });
});

describe("Minha conta — senha", () => {
  function preencherSenhas({ atual = "antiga123", nova, confirmacao }) {
    digitar(campo(/senha atual/i), atual);
    digitar(campo(/^nova senha$/i), nova);
    digitar(campo(/confirmar nova senha/i), confirmacao);
  }

  it("senhas diferentes não vão ao servidor", async () => {
    montar();
    await esperarConta();

    preencherSenhas({ nova: "novasenha", confirmacao: "outracoisa" });
    await act(async () => botao(/trocar senha/i).click());

    await waitFor(() =>
      expect(screen.queryByText("As senhas não coincidem.")).toBeTruthy()
    );
    expect(atualizarSenha).not.toHaveBeenCalled();
  });

  it("senha curta usa a mesma frase do cadastro", async () => {
    montar();
    await esperarConta();

    preencherSenhas({ nova: "abc", confirmacao: "abc" });
    await act(async () => botao(/trocar senha/i).click());

    await waitFor(() =>
      expect(
        screen.queryByText("A senha precisa de pelo menos 6 caracteres.")
      ).toBeTruthy()
    );
    expect(atualizarSenha).not.toHaveBeenCalled();
  });

  it("sucesso limpa os três campos", async () => {
    // Senha não pode ficar parada no DOM depois que a troca terminou.
    montar();
    await esperarConta();

    preencherSenhas({ nova: "novasenha", confirmacao: "novasenha" });
    await act(async () => botao(/trocar senha/i).click());

    await waitFor(() => expect(atualizarSenha).toHaveBeenCalled());
    expect(atualizarSenha.mock.calls[0][0]).toEqual({
      email: USUARIO.email,
      senhaAtual: "antiga123",
      novaSenha: "novasenha",
    });
    await waitFor(() =>
      expect(screen.queryByText("Senha atualizada")).toBeTruthy()
    );
    expect(campo(/senha atual/i).value).toBe("");
    expect(campo(/^nova senha$/i).value).toBe("");
    expect(campo(/confirmar nova senha/i).value).toBe("");
  });

  it("senha atual errada fala de senha, não de e-mail", async () => {
    // Quem confere a senha atual é um login por baixo, e ele devolve o erro
    // genérico do login. Repetir "E-mail ou senha incorretos" mandaria a
    // pessoa conferir um e-mail que ela nem digitou aqui.
    atualizarSenha.mockRejectedValue(new Error("Invalid login credentials"));
    montar();
    await esperarConta();

    preencherSenhas({ nova: "novasenha", confirmacao: "novasenha" });
    await act(async () => botao(/trocar senha/i).click());

    await waitFor(() =>
      expect(screen.queryByText("Senha atual incorreta.")).toBeTruthy()
    );
  });
});

describe("Minha conta — quem entra pelo Google", () => {
  beforeEach(() => {
    getCurrentUser.mockResolvedValue({
      ...USUARIO,
      identities: [{ provider: "google" }],
    });
  });

  it("não vê formulário de e-mail nem de senha, mas edita o nome", async () => {
    montar();
    await esperarConta();

    expect(screen.queryByLabelText(/novo e-mail/i)).toBeNull();
    expect(screen.queryByLabelText(/senha atual/i)).toBeNull();
    expect(screen.getAllByText(/pelo Google/i).length).toBeGreaterThan(0);
    expect(campo(/^nome$/i)).toBeTruthy();
    expect(screen.getByText(/entra com google/i)).toBeTruthy();
  });
});
