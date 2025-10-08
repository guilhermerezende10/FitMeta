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
    <div>
      <div
        className="absolute top-7 left-5 text-2xl p-3"
        onClick={handleBackPage}
      >
        <IoIosArrowBack className="text-brand-bgDarkGray" />
      </div>
      <Title>Políticas de Privacidade - FitMeta</Title>
      <div className="flex flex-col gap-4 text-black">
        <h2>Última atualização: 02 de outubro de 2025</h2>
        <Text>
          A sua privacidade é importante para nós. Esta Política de Privacidade
          descreve como a FitMeta coleta, usa, armazena e protege as informações
          dos usuários ao utilizar nossa plataforma.
        </Text>
        <Text>
          A sua privacidade é importante para nós. Esta Política de Privacidade
          descreve como a FitMeta coleta, usa, armazena e protege as informações
          dos usuários ao utilizar nossa plataforma. Ao acessar ou se cadastrar
          no site, você concorda com as práticas descritas abaixo.
        </Text>
        <Text>
          1. Informações que Coletamos Ao utilizar a plataforma, podemos coletar
          os seguintes dados pessoais: • Nome • E-mail • Dados fornecidos por
          terceiros no login (Google, Facebook, Apple ID) • Informações de
          navegação (cookies, endereço IP, tempo de uso da plataforma,
          preferências, etc.)
        </Text>
        <Text>
          2. Como Utilizamos seus Dados Os dados coletados são utilizados para:
          • Criar e gerenciar sua conta na plataforma; • Personalizar seu plano
          de treino de acordo com suas preferências; • Melhorar sua experiência
          de navegação e uso; • Comunicar atualizações, novidades e conteúdos
          motivacionais; • Garantir a segurança da plataforma; • Cumprir
          obrigações legais.
        </Text>
        <Text>
          3. Compartilhamento de Dados com Terceiros Seus dados não são vendidos
          a terceiros. No entanto, podemos compartilhar informações com: •
          Serviços de login (Google, Facebook, Apple ID) — apenas para
          autenticação segura; • Serviços de hospedagem e análise de dados (como
          Google Analytics), com finalidade de melhoria de desempenho e
          navegação. Todos os terceiros parceiros estão em conformidade com as
          leis de proteção de dados.
        </Text>
        <Text>
          4. Uso de Cookies Utilizamos cookies para: • Lembrar suas
          preferências; • Melhorar a navegação; • Realizar análises sobre o uso
          da plataforma. Você pode, a qualquer momento, bloquear o uso de
          cookies através das configurações do seu navegador, embora isso possa
          afetar a funcionalidade da plataforma.
        </Text>
        <Text>
          5. Segurança dos Dados Adotamos medidas técnicas e organizacionais
          para proteger seus dados contra: • Acesso não autorizado; • Alteração;
          • Divulgação ou destruição indevida. Apesar dos nossos esforços,
          nenhum sistema é 100% seguro. Portanto, recomendamos que você mantenha
          sua senha confidencial e evite usá-la em outros serviços.
        </Text>
        <Text>
          6. Seus Direitos como Titular de Dados (LGPD) Nos termos da Lei Geral
          de Proteção de Dados (LGPD - Lei nº 13.709/2018), você tem o direito
          de: • Confirmar a existência de tratamento de dados; • Acessar os
          dados coletados; • Corrigir dados incompletos, inexatos ou
          desatualizados; • Solicitar a anonimização, bloqueio ou eliminação dos
          dados; • Revogar o consentimento a qualquer momento. Para exercer
          qualquer desses direitos, entre em contato através do e-mail:
          gymtechtcc@gmail.com.
        </Text>

        <Text>
          7. Armazenamento e Retenção Seus dados são armazenados enquanto sua
          conta estiver ativa ou conforme necessário para fins legais,
          administrativos e de segurança. Após a exclusão da conta, os dados
          podem ser mantidos por um período limitado para cumprir obrigações
          legais.
        </Text>
        <Text>
          {" "}
          8. Alterações nesta Política Podemos atualizar esta Política de
          Privacidade periodicamente. A versão mais recente estará sempre
          disponível em nosso site. Recomendamos que você revise este documento
          com frequência. O uso continuado da plataforma após as alterações
          implica sua concordância com a nova versão.
        </Text>
        <Text>
          9. Contato Em caso de dúvidas sobre esta Política de Privacidade ou
          sobre o uso de seus dados pessoais, entre em contato: 📧 E-mail:
          gymtechtcc@gmail.com 📍 Endereço: Praia Grande – São Paulo, Brasil
        </Text>
        <Text>
          Ao utilizar o FitMeta, você concorda com esta Política de Privacidade.{" "}
        </Text>
      </div>
    </div>
  );
}

export default PoliticasPrivacidade;
