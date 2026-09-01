import { Link } from "react-router-dom";

import CartaoIdentidade from "../features/conta/CartaoIdentidade";
import ContaEmail from "../features/conta/ContaEmail";
import ContaNome from "../features/conta/ContaNome";
import ContaSenha from "../features/conta/ContaSenha";
import { nomeExibido } from "../features/conta/nomeExibido";
import { ehLoginPorSenha } from "../features/conta/provedores";
import { useUser } from "../features/authentication/useUser";
import { useInfoBasica } from "../services/usePlanos";
import Spinner from "../ui/Spinner";

/**
 * Minha conta — nome de exibição, e-mail e senha.
 *
 * Até aqui `/perfil` era o formulário de peso, altura, idade e sexo, e não
 * havia lugar nenhum para trocar e-mail ou senha. As duas coisas foram
 * separadas por finalidade: o corpo alimenta as recomendações e agora vive em
 * **Meus dados**, alcançável pelo menu do rodapé da barra e de dentro da
 * Nutrição; o cadastro é sobre a conta e mora aqui.
 *
 * Cada bloco é um componente com sua própria mutação, seu próprio erro e sua
 * própria confirmação. Falhar ao trocar o e-mail não pode desfazer um nome que
 * já foi salvo, nem apagar a senha que a pessoa acabou de digitar.
 */
function Perfil() {
  const { user, isLoading } = useUser();
  const { dados } = useInfoBasica();

  if (isLoading) return <Spinner />;

  const porSenha = ehLoginPorSenha(user);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-display-l text-primary">
          Minha conta
        </h1>
        <p className="text-body text-secondary">
          Seus dados de cadastro. Peso, altura, idade e sexo ficam em{" "}
          <Link
            to="/meus-dados"
            className="text-accent-on-card underline underline-offset-2 outline-none hover:text-accent-hover focus-visible:shadow-focus"
          >
            Meus dados
          </Link>
          .
        </p>
      </div>

      <CartaoIdentidade
        nome={nomeExibido(dados, user)}
        email={user?.email ?? ""}
        porSenha={porSenha}
      />

      <ContaNome />
      <ContaEmail user={user} podeAlterar={porSenha} />
      <ContaSenha user={user} podeAlterar={porSenha} />
    </div>
  );
}

export default Perfil;
