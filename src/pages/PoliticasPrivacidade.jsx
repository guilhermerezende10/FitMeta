import { IoIosArrowBack } from "react-icons/io";
import Text from "../ui/Text";
import Title from "../ui/Title";
import { useNavigate } from "react-router-dom";

function PoliticasPrivacidade() {
  const navigate = useNavigate();

  function handleBackPage() {
    navigate(-1);
  }

  return (
    <div className="min-h-screen w-full text-black flex flex-col items-center px-4 py-8 relative">

      {/* BOTÃO DE VOLTAR */}
      <div
        className="absolute top-6 left-4 text-2xl p-2 cursor-pointer"
        onClick={handleBackPage}
      >
        <IoIosArrowBack className="text-brand-bgDarkGray" />
      </div>

      {/* TÍTULO */}
      <Title className="font-bold text-2xl md:text-3xl text-center mb-6 mt-14">
        Políticas de Privacidade - FitMeta
      </Title>

      {/* CONTEÚDO */}
      <div className="flex flex-col gap-4 w-full max-w-3xl text-justify">

        <h2 className="text-sm text-gray-600 text-center mb-2">
          Última atualização: 02 de outubro de 2025
        </h2>

        <Text>
          A sua privacidade é importante para nós. Esta Política de Privacidade
          descreve como a FitMeta coleta, usa, armazena e protege as informações
          dos usuários ao utilizar nossa plataforma.
        </Text>

        <Text>
          Ao acessar ou se cadastrar no site, você concorda com as práticas
          descritas abaixo.
        </Text>

        <Text>
          <strong>1. Informações que coletamos</strong><br />
          • Nome<br />
          • E-mail<br />
          • Dados fornecidos por terceiros no login (Google, Facebook, Apple ID)<br />
          • Informações de navegação (cookies, endereço IP, tempo de uso,
          preferências, etc.)
        </Text>

        <Text>
          <strong>2. Como utilizamos seus dados</strong><br />
          • Criar e gerenciar sua conta na plataforma<br />
          • Personalizar seu plano de treino<br />
          • Melhorar sua experiência de uso<br />
          • Comunicar atualizações e novidades<br />
          • Garantir a segurança da plataforma<br />
          • Cumprir obrigações legais
        </Text>

        <Text>
          <strong>3. Compartilhamento de dados</strong><br />
          Seus dados não são vendidos a terceiros. Podemos compartilhá-los apenas
          com serviços essenciais como autenticação (Google, Facebook, Apple ID)
          e análise de desempenho (ex: Google Analytics), sempre respeitando a LGPD.
        </Text>

        <Text>
          <strong>4. Uso de cookies</strong><br />
          Utilizamos cookies para lembrar preferências, melhorar a navegação
          e gerar dados estatísticos. Você pode desativá-los no navegador,
          porém isso pode afetar algumas funções do site.
        </Text>

        <Text>
          <strong>5. Segurança dos dados</strong><br />
          Aplicamos medidas para proteger suas informações. Ainda assim,
          nenhum sistema é 100% seguro, então recomendamos manter sua senha confidencial.
        </Text>

        <Text>
          <strong>6. Seus direitos (LGPD)</strong><br />
          Você pode solicitar acesso, correção, exclusão ou revogação do
          consentimento dos seus dados pelo e-mail: <strong>gymtechtcc@gmail.com</strong>.
        </Text>

        <Text>
          <strong>7. Armazenamento</strong><br />
          Seus dados são mantidos enquanto a conta estiver ativa ou conforme
          exigido por lei.
        </Text>

        <Text>
          <strong>8. Alterações nesta política</strong><br />
          Esta política pode ser atualizada. Recomendamos que ela seja revisada periodicamente.
        </Text>

        <Text>
          <strong>9. Contato</strong><br />
          📧 gymtechtcc@gmail.com<br />
          📍 Praia Grande – São Paulo, Brasil
        </Text>

        <Text className="text-center font-semibold mt-6">
          Ao utilizar o FitMeta, você concorda com esta Política de Privacidade.
        </Text>

      </div>
    </div>
  );
}

export default PoliticasPrivacidade;
