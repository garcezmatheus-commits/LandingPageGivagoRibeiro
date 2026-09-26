/**
 * Conteúdo fixo do site.
 *
 * Centralizado aqui para que ajustes de texto não exijam mexer em componente.
 * As notícias e os vídeos vêm de fora (WordPress e YouTube) — ver lib/wordpress.ts.
 */

export const MANDATO = {
  nome: "Givago Ribeiro",
  cargo: "Vereador de Santa Maria",
  slogan: "Gestão com Raiz, Disciplina e Resultado",
  descricao:
    "Gestão com Raiz, Disciplina e Resultado. Comprometido com o desenvolvimento sustentável e a qualidade de vida dos santamarienses.",
  gabinete: "Gabinete 04",
  endereco: {
    local: "Câmara Municipal de Vereadores",
    rua: "Rua Vale Machado, nº 1415",
    bairro: "Centro - Santa Maria/RS",
    cep: "CEP 97010-530",
  },
  telefone: "(55) 3220-7220",
  email: "givagoribeirobr@gmail.com",
  atendimento: ["Segunda a quinta-feira", "08h às 12h e 13h30 às 17h30", "Sexta-feira: 07h30 às 13h30"],
  redes: {
    instagram: "https://www.instagram.com/givagoribeirobr",
    facebook: "https://www.facebook.com/givagokayak",
    youtube: "https://www.youtube.com/@givagoribeirobr",
    blog: "https://givagoribeirobr.wordpress.com",
  },
} as const;

export const NAVEGACAO = [
  { rotulo: "Início", href: "/#inicio" },
  { rotulo: "Apresentação", href: "/#apresentacao" },
  { rotulo: "Pilares", href: "/#pilares" },
  { rotulo: "Notícias", href: "/noticias" },
  { rotulo: "YouTube", href: "/#youtube" },
  { rotulo: "Contato", href: "/#contato" },
] as const;

export const DESTAQUES = [
  {
    id: "proximidade-bairros",
    icone: "MapPin",
    titulo: "Proximidade com os Bairros",
    descricao: "Presença ativa no Campestre e em toda Santa Maria.",
    cor: "text-primary",
    bgCor: "bg-primary/10",
  },
  {
    id: "gestao-disciplina",
    icone: "Target",
    titulo: "Gestão com Disciplina",
    descricao: "Planejamento, metas e prestação de contas.",
    cor: "text-secondary",
    bgCor: "bg-secondary/10",
  },
  {
    id: "desenvolvimento-sustentavel",
    icone: "Leaf",
    titulo: "Desenvolvimento Sustentável",
    descricao: "Economia, natureza e gente no centro das decisões.",
    cor: "text-primary",
    bgCor: "bg-primary/10",
  },
  {
    id: "esporte-transforma",
    icone: "Trophy",
    titulo: "Esporte que Transforma",
    descricao: "Da escola ao alto rendimento, educação e cidadania.",
    cor: "text-secondary",
    bgCor: "bg-secondary/10",
  },
] as const;

export interface Frente {
  titulo: string;
  descricao: string;
}

export interface Pilar {
  id: string;
  numero: number;
  slug: string;
  icone: string;
  titulo: string;
  /**
   * Título do card na página inicial: problema da cidade + frente de trabalho,
   * a pedido do Givago. É plataforma, não entrega, então nunca "criamos".
   * A página do pilar mantém o titulo completo.
   */
  chamada: string;
  tituloCurto: string;
  descricao: string;
  subtitulo: string;
  sobre: string[];
  frentes: Frente[];
  imagem: string;
  imagemAlt: string;
  cor: string;
  bgCor: string;
}

export const PILARES: Pilar[] = [
  {
    id: "desenvolvimento-sustentavel-e-inovacao",
    numero: 1,
    slug: "pilar-1",
    icone: "Leaf",
    titulo: "Desenvolvimento Sustentável e Inovação",
    chamada: "Emprego sem destruir a natureza: desenvolvimento sustentável e inovação",
    tituloCurto: "Desenvolvimento Sustentável",
    descricao:
      "Transformar a vocação natural de Santa Maria em desenvolvimento econômico, com inovação, empreendedorismo e proteção ambiental.",
    subtitulo:
      "Transformar a vocação natural de Santa Maria em desenvolvimento econômico",
    sobre: [
      "Santa Maria possui um enorme potencial para se tornar referência em desenvolvimento sustentável no Rio Grande do Sul. Com sua localização estratégica, universidades de excelência e qualidade de vida, a cidade pode atrair investimentos verdes e formar uma nova geração de empreendedores conscientes.",
      "Este pilar representa o compromisso com um crescimento econômico que respeite o meio ambiente e beneficie toda a comunidade, garantindo um futuro próspero para as próximas gerações.",
    ],
    frentes: [
      {
        titulo: "Distritos de inovação verde e apoio a startups locais",
        descricao:
          "Fomentar a criação de ambientes propícios para o desenvolvimento de negócios inovadores que valorizem a sustentabilidade ambiental e gerem emprego e renda para os santamarienses.",
      },
      {
        titulo: "Infraestrutura sustentável (mobilidade ativa, energia limpa)",
        descricao:
          "Promover investimentos em ciclovias, calçadas acessíveis e soluções de energia renovável para tornar Santa Maria uma cidade mais sustentável e eficiente.",
      },
      {
        titulo: "Regularização e proteção de áreas sensíveis",
        descricao:
          "Garantir a preservação de áreas ambientalmente frágeis, como nascentes e mata ciliar, por meio de políticas públicas de regularização fundiária e fiscalização.",
      },
      {
        titulo: "Parcerias com universidades para P&D aplicado",
        descricao:
          "Fortalecer a conexão entre o poder público e as instituições de ensino superior para desenvolver pesquisas aplicadas que beneficiem a comunidade.",
      },
    ],
    imagem: "/images/pilar-sustentabilidade.webp",
    imagemAlt:
      "Givago Ribeiro em área verde de Santa Maria, evidenciando compromisso com desenvolvimento sustentável.",
    cor: "text-primary",
    bgCor: "bg-primary/10",
  },
  {
    id: "esporte-como-ferramenta-de-educacao",
    numero: 2,
    slug: "pilar-2",
    icone: "Trophy",
    titulo: "Esporte como Ferramenta de Educação",
    chamada: "Criança no esporte, criança na escola: esporte como ferramenta de educação",
    tituloCurto: "Esporte como Educação",
    descricao:
      "O esporte como caminho para a formação cidadã, melhoria do desempenho escolar e inclusão social.",
    subtitulo:
      "O esporte como caminho para a formação cidadã e inclusão social",
    sobre: [
      "Givago Ribeiro é atleta de canoagem e educador esportivo, e sabe em primeira mão como o esporte pode transformar vidas. A prática esportiva ensina disciplina, trabalho em equipe, resiliência e respeito, valores essenciais para a formação de cidadãos conscientes.",
      "Este pilar busca democratizar o acesso ao esporte de qualidade para todas as crianças e jovens de Santa Maria, independente de sua condição socioeconômica, utilizando o esporte como ferramenta de inclusão e desenvolvimento social.",
    ],
    frentes: [
      {
        titulo: "Núcleos esportivos em escolas e bairros",
        descricao:
          "Expandir a oferta de atividades esportivas para crianças e jovens em todas as regiões da cidade, garantindo acesso democrático à prática esportiva.",
      },
      {
        titulo: "Calendário anual de festivais e ligas escolares",
        descricao:
          "Organizar competições regulares que incentivem a participação dos estudantes e fortaleçam o espírito esportivo nas escolas municipais e estaduais.",
      },
      {
        titulo: "Bolsa-atleta municipal e apoio psicopedagógico",
        descricao:
          "Criar programas de apoio financeiro e educacional para jovens talentos esportivos, garantindo que possam conciliar treino e estudos.",
      },
      {
        titulo: "Integração esporte-saúde-assistência social",
        descricao:
          "Articular políticas públicas que utilizem o esporte como ferramenta de promoção da saúde e inclusão social para famílias em vulnerabilidade.",
      },
    ],
    imagem: "/images/pilar-esporte.webp",
    imagemAlt: "Givago orientando jovens em atividade esportiva escolar.",
    cor: "text-secondary",
    bgCor: "bg-secondary/10",
  },
  {
    id: "identidade-local-cultura-e-economia-criativa",
    numero: 3,
    slug: "pilar-3",
    icone: "Palette",
    titulo: "Valorização da Identidade Local, Cultura e Economia Criativa",
    chamada: "Para o talento local virar renda: cultura e economia criativa",
    tituloCurto: "Cultura e Economia Criativa",
    descricao:
      "Fortalecer a cultura, a memória e as expressões criativas de Santa Maria, ativando a economia por meio de turismo e festivais.",
    subtitulo:
      "Valorização da identidade local, cultura e economia criativa",
    sobre: [
      "Santa Maria é uma cidade rica em história, tradições e manifestações culturais. Do Campestre ao Centro, cada bairro guarda histórias e talentos que merecem ser valorizados e potencializados como motores de desenvolvimento econômico.",
      "Este pilar reconhece a economia criativa como estratégia de desenvolvimento, conectando cultura, turismo e geração de renda para construir uma cidade que valoriza suas raízes enquanto projeta o futuro.",
    ],
    frentes: [
      {
        titulo: "Roteiros de turismo de experiência nos bairros",
        descricao:
          "Desenvolver roteiros turísticos que valorizem a história, gastronomia e tradições dos bairros de Santa Maria, atraindo visitantes e movimentando a economia local.",
      },
      {
        titulo: "Programas de apoio a artistas e empreendedores criativos",
        descricao:
          "Criar políticas de fomento à economia criativa, incluindo editais, espaços de trabalho compartilhado e capacitação profissional para artistas e artesãos.",
      },
      {
        titulo: "Revitalização de espaços culturais e memória comunitária",
        descricao:
          "Recuperar e valorizar espaços históricos e culturais da cidade, preservando a memória coletiva e criando locais de convívio e manifestação artística.",
      },
      {
        titulo: "Eventos que conectem cultura, gastronomia e economia local",
        descricao:
          "Apoiar a realização de festivais e eventos que divulguem a produção cultural e gastronômica de Santa Maria, gerando renda para produtores locais.",
      },
    ],
    imagem: "/images/pilar-cultura.webp",
    imagemAlt: "Feira cultural em Santa Maria com artesãos e famílias.",
    cor: "text-terracotta",
    bgCor: "bg-terracotta/10",
  },
  {
    id: "qualidade-de-vida-e-cuidado-nos-bairros",
    numero: 4,
    slug: "pilar-4",
    icone: "Heart",
    titulo: "Qualidade de Vida e Cuidado nos Bairros",
    chamada: "Nenhum bairro esquecido: qualidade de vida e cuidado nos bairros",
    tituloCurto: "Qualidade de Vida nos Bairros",
    descricao:
      "Cuidar do que importa no dia a dia: saúde perto de casa, educação acolhedora, ruas seguras e praças vivas.",
    subtitulo:
      "Cuidar do que importa no dia a dia das famílias santamarienses",
    sobre: [
      "A qualidade de vida de uma cidade se mede pelo cuidado com o dia a dia das pessoas. Ruas bem cuidadas, saúde acessível, educação de qualidade e espaços de lazer são direitos fundamentais de todos os cidadãos.",
      "Este pilar representa o compromisso com o atendimento das necessidades básicas de cada bairro, garantindo que todas as regiões de Santa Maria recebam atenção equivalente do poder público, com foco na saúde, segurança e bem-estar das famílias.",
    ],
    frentes: [
      {
        titulo: "Mutirões de zeladoria, iluminação e pavimentação",
        descricao:
          "Realizar ações integradas de manutenção urbana nos bairros, garantindo ruas iluminadas, calçadas seguras e infraestrutura bem conservada.",
      },
      {
        titulo: "Saúde da família, teleatendimento e prevenção",
        descricao:
          "Fortalecer a atenção primária à saúde, expandindo o acesso a consultas médicas, exames preventivos e atendimento remoto para moradores de todas as regiões.",
      },
      {
        titulo: "Parques de bairro e academias ao ar livre",
        descricao:
          "Criar espaços de lazer e prática esportiva em cada região da cidade, promovendo qualidade de vida e convivência comunitária.",
      },
      {
        titulo: "Segurança comunitária integrada",
        descricao:
          "Articular ações de segurança pública com a participação da comunidade, fortalecendo vínculos entre moradores, guarda municipal e polícia.",
      },
    ],
    imagem: "/images/pilar-bairros.webp",
    imagemAlt: "Givago em diálogo com moradores em rua de bairro de Santa Maria.",
    cor: "text-primary",
    bgCor: "bg-primary/10",
  },
];

export type StatusProjeto = "concluido" | "tramitando" | "parado" | "rejeitado";

export interface ProjetoDeLei {
  /** Nome técnico do projeto. Também vai no e-mail de "acompanhar projeto". */
  titulo: string;
  /**
   * Título exibido no card: a dor das pessoas ligada à solução, a pedido do
   * Givago. Sem chamada, o card mostra o nome técnico.
   */
  chamada?: string;
  numero: string;
  situacao: string;
  /** Por que não avançou. Só faz sentido em "parado" e "rejeitado". */
  motivo?: string;
}

/**
 * Números reais da produção do Givago na Câmara, de 2021 até hoje. As listas
 * abaixo são só os destaques, por isso a contagem não sai delas.
 *
 * Conferido projeto a projeto no portal da Câmara em 2026-09-13. Fica fora o
 * PLC 10/2025 (em tramitação, mas o processo registra a autoria como
 * Secretaria Legislativa). Ao mudar status de projeto, atualizar aqui.
 */
export const PRODUCAO_LEGISLATIVA = {
  desde: 2021,
  leis: 13,
  emTramitacao: 7,
} as const;

export const PROJETOS_CONCLUIDOS: ProjetoDeLei[] = [
  {
    titulo: "Mapa de Risco Ambiental",
    chamada: "Para prevenir alagamentos na cidade: criamos o Mapa de Risco Ambiental",
    numero: "PL nº 10217/2026 → Lei nº 7171/2026",
    situacao: "Institui o Mapa Municipal de Risco Ambiental Urbano, sancionado em 2026.",
  },
  {
    titulo: "Reconhecimento do Jogo do Câmbio",
    chamada: "Mais saúde e convivência para a terceira idade: reconhecemos o Jogo do Câmbio",
    numero: "PL nº 10160/2026 → Lei nº 7130/2026",
    situacao:
      "Reconhece o Jogo do Câmbio como esporte de valor social para a pessoa idosa e institui 1º de outubro como o seu dia municipal.",
  },
  {
    titulo: "Distrito Verde",
    chamada: "Crescer sem destruir: criamos o Distrito Verde",
    numero: "PL nº 10216/2026 → Lei nº 7141/2026",
    situacao:
      "Institui o Polo de Preservação Ambiental e Desenvolvimento Sustentável, sancionado em 2026.",
  },
];

export const PROJETOS_EM_TRAMITE: ProjetoDeLei[] = [
  {
    titulo: "Zeladoria Comunitária",
    chamada: "Bairro cuidado por quem vive nele: propomos a Zeladoria Comunitária",
    numero: "PL 10290",
    situacao: "Aguardando em Comunicação Interna para avançar nas comissões.",
  },
  {
    titulo: "Código de Posturas",
    chamada: "Lixo jogado em terreno baldio: propomos a fiscalização feita junto com a comunidade",
    numero: "PLC nº 5/2026",
    situacao:
      "Em fase de elaboração de Relatório Final pela Comissão Especial (atualmente sob relatoria do Ver. Guilherme Badke).",
  },
];

/**
 * Projetos que não avançaram, e o motivo.
 *
 * Mostrar o que travou é o que separa prestação de contas de propaganda —
 * quase nenhum mandato publica isso. A lista está vazia de propósito: só
 * entra aqui informação conferida na Câmara. Enquanto vazia, a seção de
 * transparência não é exibida.
 *
 * Para publicar, adicione objetos com titulo, numero, situacao e motivo.
 */
/**
 * Perfil oficial do vereador no CITTA, o sistema legislativo da Câmara de
 * Santa Maria. É a fonte primária: quem quiser conferir a tramitação sem
 * depender do que este site diz, consulta direto na origem.
 */
export const PERFIL_CITTA =
  "https://cmsantamaria.cittatec.com.br/portal-legislativo/vereadores/pessoas/233?legislatura=23";

export const PROJETOS_NAO_AVANCARAM: ProjetoDeLei[] = [];

export const BAIRROS = [
  "Campestre",
  "Centro",
  "Itararé",
  "Noal",
  "Patronato",
  "Passo d'Areia",
  "Bom Pastor",
  "Diácimo",
  "Juscelino Kubitschek",
  "Urlândia",
  "Outro",
] as const;

export const ASSUNTOS = [
  "Sugestão",
  "Demanda do Bairro",
  "Convite",
  "Parceria",
  "Imprensa",
  "Outros",
] as const;

export const TRAJETORIA = {
  formacao: [
    "Bacharel em Educação Física (FAMES)",
    "Pós-graduando em Gestão de Projetos e Programas Sociais (Universidade Estácio)",
  ],
  gestao: [
    "Secretário Adjunto de Esportes (2016)",
    "Superintendente de Esportes (2017-2020)",
    "Políticas de desenvolvimento humano e inclusão social",
  ],
  legislativa: [
    "Vereador de Santa Maria",
    "Líder do Governo na Câmara (2024 e 2025)",
    "Presidente da Câmara de Vereadores (2023)",
  ],
} as const;

/**
 * Entregas que se revezam no hero, depois da tela principal.
 *
 * Título no formato que o Givago pediu: a dor das pessoas, dois pontos, a
 * solução do mandato. A primeira parte sai em amarelo. O título fala da
 * cidade inteira (Santa Maria), não do bairro: o bairro fica no texto de
 * apoio, que é onde está o fato.
 *
 * Obra executada pela Prefeitura aparece com a Prefeitura como fonte e sem
 * valores: o mandato articulou a demanda, não executou a obra.
 *
 * `foto` usa classes literais de object-position porque o Tailwind só gera
 * classe que encontra escrita no código.
 *
 * Enquadramento: rosto no terço de cima, acima do título. No celular a foto
 * preenche pela altura e não sobra nada para subir, então usa-se scale com
 * origem na base (a foto cresce para cima, sem abrir vão). No desktop, onde
 * sobra altura, basta object-position.
 *
 * Fotos em pé (Rua Garibaldi, JESMA) usam posição em calc no desktop: a sobra
 * vertical muda com a proporção da tela, e um Y em % que acerta em 1440px
 * joga o rosto para o meio em 1024px ou para trás do menu em 1728px. Como a
 * foto preenche pela largura, a altura dela é proporcional a vw; "Xvh - Yvw"
 * crava o rosto a X% da altura da tela em qualquer largura. Y = posição do
 * rosto na foto × proporção (Rua: 45% × 4/3 = 60vw).
 * Testado em 375, 1024, 1440 e 1728px (2026-09-25).
 */
export interface EntregaHero {
  id: string;
  rotulo: string;
  dor: string;
  solucao: string;
  texto: string;
  fonte: string;
  imagem: string;
  alt: string;
  foto: string;
}

export const ENTREGAS_HERO: EntregaHero[] = [
  {
    id: "rua-garibaldi",
    rotulo: "Rua Garibaldi",
    dor: "Mais mobilidade em Santa Maria:",
    solucao: "rua pavimentada, bairro conectado",
    texto:
      "A Rua Garibaldi Luiz Schimitz ganhou pavimentação completa, sinalização e calçada. Uma demanda do bairro que o mandato levou adiante até virar obra.",
    fonte: "Obra da Prefeitura de Santa Maria",
    imagem: "/images/entregas/rua-garibaldi.webp",
    alt: "Givago na Rua Garibaldi Luiz Schimitz recém pavimentada",
    foto: "object-cover object-[12%_50%] scale-150 origin-[50%_100%] lg:scale-100 lg:object-[40%_calc(20vh_-_60vw)]",
  },
  {
    id: "ubs-campestre",
    rotulo: "UBS Campestre",
    dor: "Saúde perto de casa:",
    solucao: "Santa Maria ganha uma nova UBS",
    texto:
      "Com a ordem de serviço assinada, as máquinas já trabalham no terreno da nova Unidade Básica de Saúde do Campestre do Menino Deus.",
    fonte: "Obra da Prefeitura de Santa Maria",
    imagem: "/images/entregas/ubs-campestre.webp",
    alt: "Máquinas trabalhando no terreno da UBS Campestre, vista de drone",
    foto: "object-cover object-[55%_50%]",
  },
  {
    id: "conteineres",
    rotulo: "Contêineres",
    dor: "Cidade mais limpa:",
    solucao: "contêineres contra o lixo na rua",
    texto:
      "Contêineres de resíduos instalados no bairro garantem a destinação correta do lixo e ruas mais limpas no dia a dia.",
    // "Iniciativa", não "emenda": o Relatório de Mandato registra a instalação
    // como iniciativa do mandato, mas nenhuma emenda na Câmara cita contêineres
    // (conferido no portal em 2026-09-24). Trocar só com o documento da emenda.
    fonte: "Iniciativa do mandato",
    imagem: "/images/entregas/conteineres.webp",
    alt: "Givago ao lado de um contêiner de resíduos da Prefeitura de Santa Maria",
    foto: "object-cover object-[96%_40%] lg:object-[70%_40%]",
  },
  {
    id: "jesma",
    rotulo: "JESMA",
    dor: "Mais esporte na escola:",
    solucao: "os Jogos Escolares de Santa Maria viraram lei",
    texto:
      "A Lei nº 6.643/2022, de autoria do Givago, colocou o JESMA, os Jogos Escolares de Santa Maria, no calendário oficial da cidade.",
    fonte: "Lei Municipal nº 6.643/2022",
    imagem: "/images/entregas/jesma.webp",
    alt: "Estudantes correndo na pista de atletismo durante os jogos escolares",
    foto: "object-cover object-[50%_50%] scale-[1.35] origin-[55%_100%] lg:scale-100 lg:object-[50%_calc(25vh_-_52vw)]",
  },
  {
    id: "canoagem",
    rotulo: "Canoagem",
    dor: "Oportunidade para os jovens:",
    solucao: "o esporte que forma campeões em Santa Maria",
    texto:
      "Projeto desenvolvido pela ASENA no Distrito Verde forma talentos, fortalece o esporte e transforma realidades.",
    fonte: "Projeto ASENA no Distrito Verde",
    imagem: "/images/entregas/canoagem.webp",
    alt: "Dois atletas da ASENA comemorando dentro do caiaque",
    foto: "object-cover object-[40%_50%] scale-[1.3] origin-[35%_100%] lg:object-[50%_50%] lg:scale-125 lg:origin-[50%_100%]",
  },
];
