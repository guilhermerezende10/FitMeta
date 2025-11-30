import { IoIosArrowBack } from "react-icons/io";
import Text from "../ui/Text";
import Title from "../ui/Title";
import { useNavigate } from "react-router-dom";

function TermosDeUso() {
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
        Termos de Uso - FitMeta
      </Title>

      {/* CONTEÚDO */}
      <div className="flex flex-col gap-4 w-full max-w-3xl text-justify">

        <h2 className="text-sm text-gray-600 text-center mb-2">
          Última atualização: 02 de outubro de 2025
        </h2>

        <Text>
          Bem-vindo à FitMeta, uma plataforma digital desenvolvida para apoiar
          pessoas que praticam musculação e buscam melhorar seu desempenho
          físico e motivacional. Ao acessar ou utilizar nosso site, você
          concorda com os presentes Termos de Uso.
        </Text>

        <Text>
          <strong>1. Sobre a plataforma</strong><br />
          A FitMeta é uma plataforma online focada em musculação e desenvolvimento
          físico saudável, oferecendo:
          <br />• Personalização de treinos
          <br />• Conteúdos positivos e educacionais
          <br />• Apoio e inspiração fitness
          <br />• Histórias motivacionais
        </Text>

        <Text>
          <strong>2. Elegibilidade e responsabilidade</strong><br />
          O uso é indicado para maiores de 18 anos. Menores devem ter autorização.
          A plataforma não substitui avaliação médica ou profissional.
          <br />• Fornecer informações reais
          <br />• Manter sua senha segura
          <br />• Uso pessoal e lícito
        </Text>

        <Text>
          <strong>3. Cadastro</strong><br />
          Para acessar áreas personalizadas, é necessário criar uma conta ou
          realizar login com Google, Facebook ou Apple ID.
          O usuário é responsável por todas as atividades em sua conta.
        </Text>

        <Text>
          <strong>4. Coleta de dados</strong><br />
          Coletamos: nome, e-mail, cookies, informações de navegação e dados de
          login via terceiros, sempre seguindo princípios da LGPD.
        </Text>

        <Text>
          <strong>5. Propriedade intelectual</strong><br />
          Todo conteúdo da FitMeta é protegido. Não é permitido copiar ou
          redistribuir sem autorização.
        </Text>

        <Text>
          <strong>6. Serviços oferecidos</strong><br />
          • Treinos básicos por objetivo
          <br />• Conteúdo educacional e motivacional
          <br />• Inspiração para constância
          <br />
          A FitMeta não oferece dietas personalizadas nem garante resultados.
        </Text>

        <Text>
          <strong>7. Limitações de responsabilidade</strong><br />
          A FitMeta não se responsabiliza por lesões, problemas de saúde ou
          resultados insatisfatórios. Sempre procure um profissional qualificado.
        </Text>

        <Text>
          <strong>8. Encerramento de conta</strong><br />
          O usuário pode solicitar o encerramento da conta a qualquer momento
          pelo e-mail oficial.
        </Text>

        <Text>
          <strong>9. Alterações</strong><br />
          Estes termos podem sofrer alterações. O uso contínuo da plataforma
          implica concordância.
        </Text>

        <Text>
          <strong>10. Contato</strong><br />
          📧 gymtechtcc@gmail.com
          <br />
          📍 Praia Grande – São Paulo, Brasil
        </Text>

        <Text className="text-center font-semibold mt-6">
          Ao utilizar o FitMeta, você concorda com estes Termos de Uso.
        </Text>

      </div>
    </div>
  );
}

export default TermosDeUso;
