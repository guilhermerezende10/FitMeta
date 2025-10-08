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
    <div>
      <div
        className="absolute top-7 left-5 text-2xl p-3 cursor-pointer"
        onClick={handleBackPage}
      >
        <IoIosArrowBack className="text-brand-bgDarkGray" />
      </div>

      <Title>Termos de Uso - FitMeta</Title>

      <div className="flex flex-col gap-4 text-black">
        <h2>Última atualização: 02 de outubro de 2025</h2>

        <Text>
          Bem-vindo à FitMeta, uma plataforma digital desenvolvida para apoiar
          pessoas que praticam musculação e buscam melhorar seu desempenho
          físico e motivacional. Ao acessar ou utilizar nosso site, você
          concorda com os presentes Termos de Uso. Caso não concorde com qualquer
          parte destes termos, por favor, não utilize a plataforma.
        </Text>

        <Text>
          1. A FitMeta é uma plataforma online com foco na
          musculação e desenvolvimento físico saudável, oferecendo:
          <br />• Personalização de treinos conforme objetivos individuais;
          <br />• Conteúdos motivacionais e educacionais;
          <br />• Apoio de profissionais da área fitness;
          <br />• Histórias inspiradoras de atletas e treinadores;
          <br />• Contribuição social com incentivo à saúde e constância nos
          treinos.
        </Text>

        <Text>
          2. Elegibilidade e Responsabilidade do Usuário
          <br />
          2.1 Requisitos — O uso da FitMeta é indicado para maiores de 18 anos.
          Menores de idade podem acessar o site apenas com autorização e
          supervisão de um responsável legal.
          <br />
          2.2 Saúde e Condições Físicas — A FitMeta não é indicada para pessoas
          com condições físicas especiais ou lesões que exijam treinos ou dietas
          adaptadas. Recomendamos sempre a consulta com um médico antes de
          iniciar qualquer plano de treino.
          <br />
          2.3 Responsabilidades do Usuário — Ao se cadastrar e utilizar a
          FitMeta, você se compromete a:
          <br />• Fornecer informações reais no momento do cadastro;
          <br />• Manter a confidencialidade de suas credenciais de acesso;
          <br />• Utilizar a plataforma apenas para fins lícitos e pessoais.
        </Text>

        <Text>
          3. Cadastro e Acesso — Para acessar os serviços personalizados, o
          usuário deverá criar uma conta, fornecendo nome e e-mail, podendo
          também utilizar login via Google, Facebook ou Apple ID. O usuário é
          totalmente responsável por qualquer atividade realizada em sua conta.
        </Text>

        <Text>
          4. Coleta e Uso de Dados
          <br />
          4.1 Dados Coletados — Coletamos informações como:
          <br />• Nome e e-mail;
          <br />• Cookies e dados de navegação;
          <br />• Dados fornecidos por terceiros (Google, Facebook, Apple ID).
          <br />
          4.2 Cookies — Utilizamos cookies para melhorar a experiência do
          usuário, personalizar conteúdos e analisar o tráfego da plataforma.
          Para mais detalhes, consulte nossa Política de Privacidade (a ser
          redigida separadamente).
        </Text>

        <Text>
          5. Propriedade Intelectual — Todo o conteúdo presente na FitMeta
          (textos, imagens, vídeos, design, logotipo, estrutura da plataforma) é
          de propriedade exclusiva da equipe FitMeta e está protegido pelas leis
          de direitos autorais e propriedade intelectual. É proibido copiar,
          reproduzir, distribuir ou modificar qualquer parte do conteúdo sem
          autorização prévia.
        </Text>

        <Text>
          6. Funcionalidades e Serviços — Os serviços oferecidos incluem, mas
          não se limitam a:
          <br />• Treinos personalizados conforme meta (hipertrofia, definição,
          força, etc.);
          <br />• Seção motivacional com vídeos, depoimentos e histórias de
          atletas;
          <br />• Certificação e participação de profissionais da área;
          <br />• Conteúdo social e inspirador sobre musculação.
          <br />
          A FitMeta não oferece planos alimentares personalizados, nem se
          responsabiliza por resultados físicos individuais.
        </Text>

        <Text>
          7. Limitações de Responsabilidade — A FitMeta não se responsabiliza
          por:
          <br />• Lesões, problemas de saúde ou qualquer dano resultante do uso
          indevido das orientações fornecidas;
          <br />• Dados incorretos fornecidos pelo usuário;
          <br />• Falhas técnicas, indisponibilidades temporárias ou bugs no
          site.
          <br />
          Todo conteúdo é fornecido com fins informativos e motivacionais, e não
          substitui a orientação de um profissional de saúde, médico ou educador
          físico.
        </Text>

        <Text>
          8. Encerramento de Conta — O usuário pode, a qualquer momento,
          solicitar o encerramento de sua conta através do e-mail de contato
          oficial. A FitMeta reserva-se o direito de suspender ou excluir contas
          em caso de uso indevido da plataforma.
        </Text>

        <Text>
          9. Alterações nos Termos — Estes Termos de Uso podem ser atualizados a
          qualquer momento. Recomendamos que o usuário revise esta página
          periodicamente. A continuidade do uso da plataforma após qualquer
          alteração será considerada como aceitação dos novos termos.
        </Text>

        <Text>
          10. Contato e Informações Legais — Em caso de dúvidas, sugestões ou
          solicitações relacionadas a estes Termos, entre em contato:
          <br />📧 E-mail oficial: gymtechtcc@gmail.com
          <br />📍 Localização: Praia Grande – São Paulo, Brasil
        </Text>

        <Text>
          Ao utilizar o FitMeta, você declara estar ciente, de acordo e
          vinculado aos presentes Termos de Uso.
        </Text>
      </div>
    </div>
  );
}

export default TermosDeUso;
