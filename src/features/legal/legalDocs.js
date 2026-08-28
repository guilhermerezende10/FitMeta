/**
 * Copy dos documentos legais, preservada exatamente como estava nas telas
 * antigas. Estruturada para que Política e Termos compartilhem o mesmo
 * template de documento (FM-18).
 *
 * Os provedores citados no texto acompanham o que o app de fato implementa:
 * apenas login Google (`registerGoogle` em apiAuth.js). Ver FM-16 / gh#2.
 */

const P = (text) => ({ type: "p", text });
const UL = (items) => ({ type: "ul", items });
const CONTATO = { type: "contato" };

export const ULTIMA_ATUALIZACAO = "02 de outubro de 2025";

export const EMAIL_CONTATO = "gymtechtcc@gmail.com";
export const ENDERECO_CONTATO = "Praia Grande – São Paulo, Brasil";

export const POLITICA = {
  slug: "politica",
  titulo: "Política de Privacidade",
  rota: "/politicas-privacidade",
  fechamento:
    "Ao utilizar o FitMeta, você concorda com esta Política de Privacidade.",
  intro: [
    "A sua privacidade é importante para nós. Esta Política de Privacidade descreve como a FitMeta coleta, usa, armazena e protege as informações dos usuários ao utilizar nossa plataforma.",
    "Ao acessar ou se cadastrar no site, você concorda com as práticas descritas abaixo.",
  ],
  secoes: [
    {
      n: 1,
      titulo: "Informações que coletamos",
      blocos: [
        UL([
          "Nome",
          "E-mail",
          "Dados fornecidos por terceiros no login (Google)",
          "Informações de navegação (cookies, endereço IP, tempo de uso, preferências, etc.)",
        ]),
      ],
    },
    {
      n: 2,
      titulo: "Como utilizamos seus dados",
      blocos: [
        UL([
          "Criar e gerenciar sua conta na plataforma",
          "Personalizar seu plano de treino",
          "Melhorar sua experiência de uso",
          "Comunicar atualizações e novidades",
          "Garantir a segurança da plataforma",
          "Cumprir obrigações legais",
        ]),
      ],
    },
    {
      n: 3,
      titulo: "Compartilhamento de dados",
      blocos: [
        P(
          "Seus dados não são vendidos a terceiros. Podemos compartilhá-los apenas com serviços essenciais como autenticação (Google), sempre respeitando a LGPD."
        ),
      ],
    },
    {
      n: 4,
      titulo: "Uso de cookies",
      blocos: [
        P(
          "Utilizamos cookies para lembrar preferências, melhorar a navegação e gerar dados estatísticos. Você pode desativá-los no navegador, porém isso pode afetar algumas funções do site."
        ),
      ],
    },
    {
      n: 5,
      titulo: "Segurança dos dados",
      blocos: [
        P(
          "Aplicamos medidas para proteger suas informações. Ainda assim, nenhum sistema é 100% seguro, então recomendamos manter sua senha confidencial."
        ),
      ],
    },
    {
      n: 6,
      titulo: "Seus direitos (LGPD)",
      blocos: [
        {
          type: "p-email",
          text: "Você pode solicitar acesso, correção, exclusão ou revogação do consentimento dos seus dados pelo e-mail: ",
          email: EMAIL_CONTATO,
          depois: ".",
        },
      ],
    },
    {
      n: 7,
      titulo: "Armazenamento",
      blocos: [
        P(
          "Seus dados são mantidos enquanto a conta estiver ativa ou conforme exigido por lei."
        ),
      ],
    },
    {
      n: 8,
      titulo: "Alterações nesta política",
      blocos: [
        P(
          "Esta política pode ser atualizada. Recomendamos que ela seja revisada periodicamente."
        ),
      ],
    },
    { n: 9, titulo: "Contato", blocos: [CONTATO] },
  ],
};

export const TERMOS = {
  slug: "termos",
  titulo: "Termos de Uso",
  rota: "/termos-de-uso",
  fechamento: "Ao utilizar o FitMeta, você concorda com estes Termos de Uso.",
  intro: [
    "Bem-vindo à FitMeta, uma plataforma digital desenvolvida para apoiar pessoas que praticam musculação e buscam melhorar seu desempenho físico e motivacional. Ao acessar ou utilizar nosso site, você concorda com os presentes Termos de Uso.",
  ],
  secoes: [
    {
      n: 1,
      titulo: "Sobre a plataforma",
      blocos: [
        P(
          "A FitMeta é uma plataforma online focada em musculação e desenvolvimento físico saudável, oferecendo:"
        ),
        UL([
          "Personalização de treinos",
          "Conteúdos positivos e educacionais",
          "Apoio e inspiração fitness",
          "Histórias motivacionais",
        ]),
      ],
    },
    {
      n: 2,
      titulo: "Elegibilidade e responsabilidade",
      blocos: [
        P(
          "O uso é indicado para maiores de 18 anos. Menores devem ter autorização. A plataforma não substitui avaliação médica ou profissional."
        ),
        UL([
          "Fornecer informações reais",
          "Manter sua senha segura",
          "Uso pessoal e lícito",
        ]),
      ],
    },
    {
      n: 3,
      titulo: "Cadastro",
      blocos: [
        P(
          "Para acessar áreas personalizadas, é necessário criar uma conta ou realizar login com Google. O usuário é responsável por todas as atividades em sua conta."
        ),
      ],
    },
    {
      n: 4,
      titulo: "Coleta de dados",
      blocos: [
        P(
          "Coletamos: nome, e-mail, cookies, informações de navegação e dados de login via terceiros, sempre seguindo princípios da LGPD."
        ),
      ],
    },
    {
      n: 5,
      titulo: "Propriedade intelectual",
      blocos: [
        P(
          "Todo conteúdo da FitMeta é protegido. Não é permitido copiar ou redistribuir sem autorização."
        ),
      ],
    },
    {
      n: 6,
      titulo: "Serviços oferecidos",
      blocos: [
        UL([
          "Treinos básicos por objetivo",
          "Conteúdo educacional e motivacional",
          "Inspiração para constância",
        ]),
        P("A FitMeta não oferece dietas personalizadas nem garante resultados."),
      ],
    },
    {
      n: 7,
      titulo: "Limitações de responsabilidade",
      blocos: [
        P(
          "A FitMeta não se responsabiliza por lesões, problemas de saúde ou resultados insatisfatórios. Sempre procure um profissional qualificado."
        ),
      ],
    },
    {
      n: 8,
      titulo: "Encerramento de conta",
      blocos: [
        P(
          "O usuário pode solicitar o encerramento da conta a qualquer momento pelo e-mail oficial."
        ),
      ],
    },
    {
      n: 9,
      titulo: "Alterações",
      blocos: [
        P(
          "Estes termos podem sofrer alterações. O uso contínuo da plataforma implica concordância."
        ),
      ],
    },
    { n: 10, titulo: "Contato", blocos: [CONTATO] },
  ],
};
