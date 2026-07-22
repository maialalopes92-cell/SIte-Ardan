import { Service, Project, ProcessStep, ServicePage } from "./types";

export const COMPANY_INFO = {
  name: "Grupo Ardan",
  tagline: "Construção e reforma com soluções completas para sua obra",
  subTagline: "Executamos serviços de construção civil, reformas, instalações, energia solar e acabamentos residenciais e comerciais, reunindo diferentes especialidades para entregar mais praticidade, organização e qualidade ao cliente.",
  slogan: "Da alvenaria ao acabamento, cuidamos de cada etapa da sua obra.",
  whatsappLink: "https://wa.me/5511945591563?text=Olá!%20Encontrei%20o%20Grupo%20Ardan%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20orçamento.",
  phoneFormatted: "(11) 94559-1563",
  phoneRaw: "+5511945591563",
  email: "contato@grupoardan.com.br",
  address: "São Paulo, Grande ABC e Região Metropolitana",
  workingHours: "Segunda a Sexta, das 08h às 18h; Sábado, das 08h às 13h",
  instagram: "https://www.instagram.com/grupoardan_/",
  facebook: "https://facebook.com/grupoardan",
  stats: [
    { value: "5+", label: "Anos de Experiência" },
    { value: "150+", label: "Obras Concluídas" },
    { value: "100%", label: "Prazos Cumpridos" },
    { value: "15+", label: "Especialistas na Equipe" }
  ]
};

const solarService: Service = {
  id: "placas-solares",
  iconName: "Sun",
  title: "Instalação de Placas Solares",
  shortDescription: "Mão de obra para instalação de sistemas fotovoltaicos com fixação segura, infraestrutura elétrica e acabamento organizado.",
  longDescription: "Executamos a instalação de placas solares com mão de obra especializada para residências, comércios e empresas. Cuidamos da fixação dos módulos, passagem de cabos, infraestrutura elétrica e organização dos pontos de instalação, sempre conforme as condições do local e o sistema contratado.",
  features: [
    "Fixação de módulos fotovoltaicos em telhados e estruturas adequadas",
    "Passagem e organização de cabos solares",
    "Infraestrutura elétrica para conexão do sistema",
    "Apoio na instalação de inversores e proteções conforme necessidade do local",
    "Execução limpa, segura e alinhada ao acabamento do imóvel"
  ],
  imageUrl: "/images/ardan-placas-solares.png"
};

export const SERVICES: Service[] = [
  {
    id: "alvenaria",
    iconName: "Hammer",
    title: "Alvenaria & Construção",
    shortDescription: "Construção de paredes, muros, rebocos, bases e etapas iniciais da obra com execução cuidadosa.",
    longDescription: "Realizamos a parte bruta da obra com mão de obra especializada. Do preparo da base ao levantamento de paredes, lajes residenciais e rebocos internos e externos, aplicamos boas práticas de alinhamento, prumo, esquadro e acabamento.",
    features: [
      "Bases, fundações leves e vigas de baldrame",
      "Levantamento de paredes e muros",
      "Reboco e emboço técnico de alta aderência",
      "Instalação de contra-marcos e vergas",
      "Execução de lajes residenciais"
    ],
    imageUrl: "/images/ardan-obra-estrutura.png"
  },
  {
    id: "residencial",
    iconName: "Home",
    title: "Reformas Residenciais",
    shortDescription: "Reformas completas ou parciais para casas e apartamentos de alto padrão.",
    longDescription: "Transformamos o seu lar com tranquilidade. Cuidamos de reformas completas (derrubada de paredes para integração de ambientes, substituição de revestimentos) e parciais (banheiros, cozinhas, varandas gourmet), garantindo o cuidado absoluto com os móveis e o condomínio.",
    features: [
      "Integração de ambientes (conceito aberto)",
      "Reformas completas de banheiros e cozinhas",
      "Adequação de layout interno",
      "Proteção e isolamento acústico/térmico",
      "Coordenação de equipe limpa e organizada"
    ],
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "comercial",
    iconName: "Briefcase",
    title: "Reformas Comerciais & Escritórios",
    shortDescription: "Projetos corporativos e comerciais executados com rapidez e eficiência técnica.",
    longDescription: "Focamos em prazos curtos e flexibilidade de horários para minimizar os impactos no seu negócio. Adequamos salas comerciais, consultórios, escritórios corporativos e lojas seguindo rigorosamente as exigências das normas técnicas e do seu cronograma de inauguração.",
    features: [
      "Instalação rápida de drywall e divisórias",
      "Iluminação comercial e cabeamento estruturado",
      "Revestimentos comerciais de alta resistência",
      "Trabalho em turnos especiais (noturno/finais de semana)",
      "Adequação às normas de acessibilidade e segurança"
    ],
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "instalacoes",
    iconName: "Zap",
    title: "Instalações Hidráulicas & Elétricas",
    shortDescription: "Sistemas elétricos e hidráulicos seguros, modernos e dimensionados corretamente.",
    longDescription: "A parte técnica que precisa funcionar todos os dias. Executamos quadros elétricos modernos, passagens de fiação, tubulações de água fria/quente, esgotos, e infraestrutura de ar-condicionado. Trabalhamos para evitar problemas crônicos como vazamentos ou sobrecarga elétrica.",
    features: [
      "Refação de prumadas e tubulações de cobre/PPR/PEX",
      "Montagem de quadros de disjuntores atualizados",
      "Infraestrutura completa para ar-condicionado",
      "Instalação de aquecedores a gás e pressurizadores",
      "Pontos de iluminação em LED e automação residencial"
    ],
    imageUrl: "/images/ardan-eletrica-quadro.png"
  },
  solarService,
  {
    id: "ar-condicionado",
    iconName: "Snowflake",
    title: "Instalação de Ar-Condicionado",
    shortDescription: "Instalação técnica de aparelhos split, infraestrutura frigorígena e acabamento limpo para residências e empresas.",
    longDescription: "Executamos a instalação completa de sistemas de ar-condicionado com cuidado técnico em cada etapa: escolha do ponto ideal, passagem de tubulação frigorígena, dreno, alimentação elétrica e fixação das unidades. O serviço é planejado para preservar o acabamento do imóvel, garantir eficiência do equipamento e evitar problemas como vazamentos, mau escoamento ou perda de desempenho.",
    features: [
      "Instalação de aparelhos split, inverter e multi-split",
      "Infraestrutura frigorígena com tubulação de cobre isolada",
      "Execução de dreno, suportes e acabamento dos pontos",
      "Ponto elétrico dedicado e conferência de carga",
      "Teste de funcionamento, vedação e orientação de uso"
    ],
    imageUrl: "/images/ardan-split-instalacao.png"
  },
  {
    id: "manutencao-preventiva-corretiva",
    iconName: "Wrench",
    title: "Manutenção Preventiva & Corretiva",
    shortDescription: "Atendimentos técnicos para preservar instalações, corrigir falhas e evitar paradas inesperadas.",
    longDescription: "Atuamos com manutenção preventiva e corretiva em imóveis residenciais, comerciais e corporativos, identificando riscos antes que se transformem em prejuízos. Realizamos inspeções, reparos, ajustes e substituições com foco em segurança, conservação do patrimônio e continuidade de uso dos ambientes.",
    features: [
      "Vistorias preventivas em elétrica, hidráulica e acabamentos",
      "Correção de vazamentos, infiltrações e falhas pontuais",
      "Reparos em tomadas, iluminação, quadros e pontos de consumo",
      "Manutenção de portas, fechaduras, pisos, rejuntes e pintura",
      "Atendimento programado para empresas, condomínios e residências"
    ],
    imageUrl: "/images/ardan-condensadora-manutencao.png"
  },
  {
    id: "acabamentos",
    iconName: "Sparkles",
    title: "Acabamentos & Revestimentos",
    shortDescription: "Instalação fina de porcelanatos, revestimentos especiais e pintura de alto padrão.",
    longDescription: "O detalhe final que valoriza o imóvel. Nossa equipe é especialista no assentamento de porcelanatos de grandes formatos (lastras), pastilhas, cerâmicas, pisos vinílicos/laminados e na execução de pintura fina (massa corrida, pintura mecanizada airless, cimento queimado e texturas).",
    features: [
      "Assentamento de porcelanatos e grandes formatos",
      "Instalação de rodapés de poliestireno e madeira",
      "Pintura fina com acabamento aveludado e fosco",
      "Efeito cimento queimado e revestimentos especiais",
      "Cortes em meia-esquadria precisos de 45°"
    ],
    imageUrl: "/images/ardan-assentamento-piso.png"
  },
  {
    id: "gesso",
    iconName: "Layers",
    title: "Gesso & Drywall",
    shortDescription: "Teto rebaixado, sancas iluminadas e divisórias acústicas para ambientes modernos.",
    longDescription: "Criamos tetos e divisórias planas e prontas para receber pintura. Executamos sancas decorativas de gesso, nichos embutidos, rebaixamento de teto para embutir iluminação e paredes em drywall com isolamento termoacústico de alta performance.",
    features: [
      "Teto rebaixado (forro aramado e estruturado)",
      "Paredes de Drywall com lã de rocha para acústica",
      "Sancas, rasgos de luz e cortineiros iluminados",
      "Nichos decorativos e molduras de gesso",
      "Tratamento profissional de juntas (sem trincas)"
    ],
    imageUrl: "/images/ardan-drywall-instalacao.png"
  }
];

export const SERVICE_PAGES: ServicePage[] = [
  {
    serviceId: "alvenaria",
    path: "/alvenaria",
    title: "Alvenaria e Construção em São Paulo e ABC | Grupo Ardan",
    metaDescription: "Mão de obra para alvenaria, construção de paredes, muros, reboco, bases e etapas iniciais de obra em São Paulo, Grande ABC e Região Metropolitana.",
    h1: "Alvenaria e construção com mão de obra especializada",
    shortName: "alvenaria",
    intro: "Executamos serviços de alvenaria para obras, reformas e adequações, cuidando de paredes, muros, rebocos, bases e preparo do ambiente para as próximas etapas.",
    imageUrl: "/images/ardan-obra-estrutura.png",
    formService: "Alvenaria",
    keywords: ["alvenaria em São Paulo", "pedreiro no ABC", "construção de parede", "reboco e emboço", "mão de obra construção civil"],
    highlights: ["Atendimento em São Paulo e Grande ABC", "Execução organizada", "Serviço alinhado ao escopo combinado"],
    inclusions: ["Levantamento de paredes e muros", "Reboco, emboço e regularização", "Bases, pequenas fundações e ajustes de obra", "Preparo para instalações e acabamento"],
    localText: "Atendemos obras residenciais e comerciais em São Paulo, Grande ABC e Região Metropolitana, conforme agenda e escopo do serviço.",
    faqs: [
      { question: "O Grupo Ardan faz pequenos serviços de alvenaria?", answer: "Sim. Atendemos desde ajustes pontuais até etapas maiores dentro de reformas e obras." },
      { question: "Vocês fazem reboco e regularização de paredes?", answer: "Sim. Executamos reboco, emboço, regularização e preparo para acabamento." }
    ]
  },
  {
    serviceId: "residencial",
    path: "/reformas-residenciais",
    title: "Reforma Residencial em São Paulo e ABC | Grupo Ardan",
    metaDescription: "Reforma residencial para casas e apartamentos com mão de obra especializada em alvenaria, elétrica, hidráulica, gesso, pintura e acabamentos.",
    h1: "Reforma residencial para casas e apartamentos",
    shortName: "reforma residencial",
    intro: "Ajudamos a transformar ambientes residenciais com organização, cuidado com o imóvel e execução por etapas, da preparação ao acabamento.",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    formService: "Reforma Residencial",
    keywords: ["reforma residencial São Paulo", "reforma de apartamento", "reforma de casa", "mão de obra para reforma"],
    highlights: ["Proteção do ambiente", "Equipe sob coordenação", "Comunicação durante a obra"],
    inclusions: ["Reformas de cozinhas, banheiros e áreas internas", "Adequação de pontos elétricos e hidráulicos", "Gesso, pintura e revestimentos", "Acabamentos finais e limpeza do local"],
    localText: "Atendimento para reformas residenciais em São Paulo, Grande ABC e cidades próximas da Região Metropolitana.",
    faqs: [
      { question: "Vocês fazem reforma parcial?", answer: "Sim. Podemos atender um único ambiente, como banheiro, cozinha, varanda ou área de serviço." },
      { question: "O orçamento pode separar mão de obra e materiais?", answer: "Sim. O escopo pode ser organizado de forma transparente conforme a necessidade do cliente." }
    ]
  },
  {
    serviceId: "comercial",
    path: "/reformas-comerciais",
    title: "Reforma Comercial em São Paulo e ABC | Grupo Ardan",
    metaDescription: "Mão de obra para reforma comercial, escritórios, lojas e salas empresariais com elétrica, hidráulica, drywall, pintura e acabamentos.",
    h1: "Reforma comercial para lojas, salas e escritórios",
    shortName: "reforma comercial",
    intro: "Executamos reformas comerciais com foco em organização, prazo combinado e acabamento adequado para o funcionamento do seu negócio.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    formService: "Reforma Comercial",
    keywords: ["reforma comercial São Paulo", "reforma de escritório", "reforma de loja", "mão de obra comercial"],
    highlights: ["Execução por etapas", "Adequação do ambiente", "Atendimento conforme agenda"],
    inclusions: ["Adequação de layout", "Instalações elétricas e hidráulicas", "Drywall, pintura e acabamentos", "Ajustes para salas, lojas e escritórios"],
    localText: "Atendimento para empresas, comércios e escritórios em São Paulo, ABC e Região Metropolitana.",
    faqs: [
      { question: "Vocês atendem lojas e escritórios?", answer: "Sim. Atendemos ambientes comerciais conforme escopo, prazo e disponibilidade de agenda." },
      { question: "É possível fazer reforma fora do horário comercial?", answer: "Podemos avaliar a necessidade e combinar a melhor programação para reduzir impacto no funcionamento." }
    ]
  },
  {
    serviceId: "instalacoes",
    path: "/eletricista",
    title: "Eletricista em São Paulo e ABC | Grupo Ardan",
    metaDescription: "Serviços de eletricista para reformas, novos pontos, tomadas, iluminação, quadros, manutenção elétrica e infraestrutura em São Paulo e ABC.",
    h1: "Eletricista para reformas, instalações e manutenção",
    shortName: "serviço elétrico",
    intro: "Realizamos instalações elétricas, novos pontos, ajustes, iluminação, quadros e manutenção dentro de reformas residenciais e comerciais.",
    imageUrl: "/images/ardan-eletrica-quadro.png",
    formService: "Instalações",
    keywords: ["eletricista São Paulo", "eletricista ABC", "instalação elétrica", "manutenção elétrica", "quadro de disjuntores"],
    highlights: ["Novos pontos elétricos", "Iluminação e tomadas", "Organização e segurança na execução"],
    inclusions: ["Instalação e troca de tomadas e interruptores", "Passagem de fiação e conduítes", "Montagem e adequação de quadros", "Infraestrutura elétrica para equipamentos"],
    localText: "Atendemos serviços elétricos em São Paulo, Grande ABC e Região Metropolitana, principalmente em reformas, adequações e manutenções.",
    faqs: [
      { question: "Vocês fazem instalação de novos pontos?", answer: "Sim. Fazemos novos pontos de tomada, iluminação, interruptores e infraestrutura conforme a necessidade do ambiente." },
      { question: "Atendem manutenção elétrica corretiva?", answer: "Sim. Avaliamos falhas pontuais e executamos correções combinadas no orçamento." }
    ]
  },
  {
    serviceId: "instalacoes",
    path: "/encanador",
    title: "Encanador em São Paulo e ABC | Grupo Ardan",
    metaDescription: "Serviços hidráulicos e encanador para reformas, vazamentos, novos pontos de água, esgoto, registros e tubulações em São Paulo e ABC.",
    h1: "Encanador para reformas e instalações hidráulicas",
    shortName: "serviço hidráulico",
    intro: "Executamos instalações hidráulicas em reformas, correções de vazamentos, novos pontos de água, esgoto, registros e adequações em ambientes residenciais e comerciais.",
    imageUrl: "/images/ardan-obra-estrutura.png",
    formService: "Instalações",
    keywords: ["encanador São Paulo", "encanador ABC", "instalação hidráulica", "vazamento", "ponto de água"],
    highlights: ["Novos pontos hidráulicos", "Correção de vazamentos", "Execução alinhada ao acabamento"],
    inclusions: ["Pontos de água fria e quente", "Tubulações, registros e conexões", "Correção de vazamentos e infiltrações pontuais", "Infraestrutura hidráulica para cozinhas, banheiros e áreas de serviço"],
    localText: "Atendimento hidráulico em São Paulo, Grande ABC e Região Metropolitana para reformas, adequações e manutenções.",
    faqs: [
      { question: "Vocês fazem novos pontos hidráulicos?", answer: "Sim. Executamos pontos de água, esgoto e ajustes de tubulação conforme o local." },
      { question: "Atendem vazamentos?", answer: "Sim. Podemos avaliar e corrigir vazamentos pontuais dentro do escopo combinado." }
    ]
  },
  {
    serviceId: "placas-solares",
    path: "/instalacao-placas-solares",
    title: "Instalação de Placas Solares em São Paulo e ABC | Grupo Ardan",
    metaDescription: "Mão de obra para instalação de placas solares, fixação de módulos, passagem de cabos e infraestrutura elétrica para sistemas fotovoltaicos.",
    h1: "Instalação de placas solares com execução organizada",
    shortName: "placas solares",
    intro: "Executamos a mão de obra para instalação de placas solares, cuidando da fixação dos módulos, passagem de cabos, infraestrutura elétrica e acabamento do local.",
    imageUrl: "/images/ardan-placas-solares.png",
    formService: "Instalação de Placas Solares",
    keywords: ["instalação de placas solares", "energia solar São Paulo", "instalador solar ABC", "mão de obra fotovoltaica"],
    highlights: ["Fixação segura dos módulos", "Organização de cabos", "Acabamento limpo"],
    inclusions: ["Fixação de módulos fotovoltaicos", "Passagem e organização dos cabos", "Apoio na instalação de inversores", "Infraestrutura elétrica conforme sistema contratado"],
    localText: "Atendemos instalações solares em residências, comércios e empresas em São Paulo, Grande ABC e Região Metropolitana.",
    faqs: [
      { question: "Vocês vendem o kit solar?", answer: "O foco do Grupo Ardan é mão de obra para instalação e infraestrutura. O escopo é combinado conforme o sistema contratado." },
      { question: "Vocês instalam em telhado residencial?", answer: "Sim. Avaliamos o local e executamos a instalação conforme as condições de acesso, segurança e estrutura." }
    ]
  },
  {
    serviceId: "ar-condicionado",
    path: "/instalacao-ar-condicionado",
    title: "Instalação de Ar-Condicionado em São Paulo e ABC | Grupo Ardan",
    metaDescription: "Instalação de ar-condicionado split, condensadora, evaporadora, dreno, tubulação frigorígena e acabamento em São Paulo e ABC.",
    h1: "Instalação de ar-condicionado split",
    shortName: "instalação de ar-condicionado",
    intro: "Instalamos aparelhos de ar-condicionado split com cuidado na fixação, tubulação, dreno, ponto elétrico e acabamento do ambiente.",
    imageUrl: "/images/ardan-split-instalacao.png",
    formService: "Instalação de Ar-Condicionado",
    keywords: ["instalação de ar condicionado", "instalador de ar condicionado São Paulo", "instalação split ABC", "condensadora e evaporadora"],
    highlights: ["Split e inverter", "Dreno e tubulação", "Teste de funcionamento"],
    inclusions: ["Instalação de evaporadora e condensadora", "Tubulação frigorígena e isolamento", "Dreno e suporte", "Ponto elétrico conforme necessidade"],
    localText: "Atendemos instalação de ar-condicionado em São Paulo, Grande ABC e Região Metropolitana.",
    faqs: [
      { question: "Vocês instalam ar-condicionado split?", answer: "Sim. Instalamos aparelhos split, inverter e configurações compatíveis com o ambiente." },
      { question: "Vocês fazem infraestrutura para ar-condicionado?", answer: "Sim. Executamos tubulação, dreno, suporte e ponto elétrico conforme necessidade do local." }
    ]
  },
  {
    serviceId: "manutencao-preventiva-corretiva",
    path: "/manutencao-ar-condicionado",
    title: "Manutenção de Ar-Condicionado em São Paulo e ABC | Grupo Ardan",
    metaDescription: "Manutenção preventiva e corretiva de ar-condicionado, condensadora, evaporadora, limpeza, ajustes e correção de falhas em São Paulo e ABC.",
    h1: "Manutenção preventiva e corretiva de ar-condicionado",
    shortName: "manutenção de ar-condicionado",
    intro: "Atendemos manutenção de ar-condicionado para preservar desempenho, corrigir falhas e evitar paradas inesperadas em residências e empresas.",
    imageUrl: "/images/ardan-condensadora-manutencao.png",
    formService: "Manutenção Preventiva & Corretiva",
    keywords: ["manutenção de ar condicionado", "limpeza de ar condicionado", "manutenção preventiva ar condicionado", "condensadora"],
    highlights: ["Preventiva e corretiva", "Condensadora e evaporadora", "Atendimento programado"],
    inclusions: ["Limpeza e revisão conforme necessidade", "Correção de falhas pontuais", "Verificação de dreno e funcionamento", "Atendimento para residências e empresas"],
    localText: "Atendimento para manutenção de ar-condicionado em São Paulo, Grande ABC e Região Metropolitana.",
    faqs: [
      { question: "Vocês fazem manutenção preventiva?", answer: "Sim. Atendemos manutenção preventiva para reduzir falhas e preservar o funcionamento do equipamento." },
      { question: "Vocês corrigem falhas em condensadora?", answer: "Sim. Avaliamos o problema e executamos a correção possível conforme orçamento aprovado." }
    ]
  },
  {
    serviceId: "acabamentos",
    path: "/acabamentos",
    title: "Acabamentos, Pisos e Revestimentos em São Paulo e ABC | Grupo Ardan",
    metaDescription: "Assentamento de pisos, porcelanatos, revestimentos, pintura e acabamentos para reformas residenciais e comerciais em São Paulo e ABC.",
    h1: "Acabamentos, pisos e revestimentos",
    shortName: "acabamentos",
    intro: "Executamos acabamentos com cuidado no preparo da base, nivelamento, paginação, cortes, rejuntes, pintura e finalização visual do ambiente.",
    imageUrl: "/images/ardan-assentamento-piso.png",
    formService: "Acabamentos",
    keywords: ["assentamento de piso", "porcelanato São Paulo", "revestimento ABC", "pintura e acabamento"],
    highlights: ["Pisos e porcelanatos", "Pintura e arremates", "Cuidado com acabamento"],
    inclusions: ["Assentamento de pisos e revestimentos", "Cortes, rejuntes e arremates", "Pintura e preparo de superfícies", "Rodapés e finalizações"],
    localText: "Atendemos acabamentos residenciais e comerciais em São Paulo, Grande ABC e Região Metropolitana.",
    faqs: [
      { question: "Vocês assentam porcelanato?", answer: "Sim. Trabalhamos com pisos, porcelanatos, revestimentos e arremates." },
      { question: "Também fazem pintura?", answer: "Sim. A pintura pode entrar no escopo de acabamento conforme a necessidade da reforma." }
    ]
  },
  {
    serviceId: "gesso",
    path: "/gesso-drywall",
    title: "Gesso e Drywall em São Paulo e ABC | Grupo Ardan",
    metaDescription: "Serviços de gesso e drywall, forro, sancas, divisórias, cortineiros, rasgos de luz e preparo para pintura em São Paulo e ABC.",
    h1: "Gesso e drywall para reformas e acabamentos",
    shortName: "gesso e drywall",
    intro: "Executamos forros, sancas, divisórias, rasgos de luz, cortineiros e fechamentos em drywall com acabamento pronto para pintura.",
    imageUrl: "/images/ardan-drywall-instalacao.png",
    formService: "Gesso & Drywall",
    keywords: ["gesso São Paulo", "drywall ABC", "forro de gesso", "sanca de gesso", "divisória drywall"],
    highlights: ["Forros e sancas", "Divisórias em drywall", "Preparo para pintura"],
    inclusions: ["Forro de gesso e drywall", "Sancas, cortineiros e rasgos de luz", "Divisórias e fechamentos", "Tratamento de juntas"],
    localText: "Atendimento para gesso e drywall em São Paulo, Grande ABC e Região Metropolitana.",
    faqs: [
      { question: "Vocês fazem forro de drywall?", answer: "Sim. Executamos forros, divisórias e fechamentos em drywall." },
      { question: "O serviço já fica preparado para pintura?", answer: "Sim. Fazemos tratamento de juntas e preparo conforme acabamento combinado." }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "frente-alvenaria",
    title: "Alvenaria e Estrutura",
    category: "Alvenaria",
    description: "Execução de paredes, bases, rebocos, muros e etapas iniciais da obra conforme avaliação do local e necessidade do cliente.",
    imageUrl: "/images/ardan-obra-estrutura.png",
    area: "Sob avaliação",
    duration: "Conforme escopo",
    location: "São Paulo, Grande ABC e Região Metropolitana",
    details: [
      "Levantamento e regularização de paredes, muros e bases",
      "Preparo do ambiente para as próximas etapas da obra",
      "Execução com atenção a prumo, esquadro e alinhamento",
      "Organização do local e comunicação durante o serviço"
    ]
  },
  {
    id: "frente-instalacoes",
    title: "Instalações Elétricas e Hidráulicas",
    category: "Instalações",
    description: "Mão de obra para novos pontos, correções, adequações e infraestrutura elétrica ou hidráulica em reformas residenciais e comerciais.",
    imageUrl: "/images/ardan-eletrica-quadro.png",
    area: "Por ponto/ambiente",
    duration: "Conforme escopo",
    location: "Atendimento sob orçamento",
    details: [
      "Instalação e adequação de pontos elétricos e hidráulicos",
      "Passagem de tubulações, fiação e infraestrutura",
      "Correções pontuais em vazamentos, tomadas e iluminação",
      "Execução organizada para reduzir retrabalho na reforma"
    ]
  },
  {
    id: "frente-placas-solares",
    title: "Instalação de Placas Solares",
    category: "Energia solar",
    description: "Mão de obra para instalação de módulos fotovoltaicos, infraestrutura elétrica e acabamento organizado em residências e empresas.",
    imageUrl: "/images/ardan-placas-solares.png",
    area: "Por sistema",
    duration: "Conforme escopo",
    location: "Atendimento sob orçamento",
    details: [
      "Fixação de módulos solares em estrutura adequada",
      "Passagem e organização dos cabos do sistema",
      "Apoio na instalação de inversores e proteções",
      "Execução segura, limpa e alinhada ao local"
    ]
  },
  {
    id: "frente-acabamentos",
    title: "Acabamentos e Revestimentos",
    category: "Acabamentos",
    description: "Assentamento de pisos, porcelanatos, revestimentos e pintura com cuidado no nivelamento, paginação e acabamento visual.",
    imageUrl: "/images/ardan-assentamento-piso.png",
    area: "Sob medição",
    duration: "Conforme escopo",
    location: "Atendimento sob orçamento",
    details: [
      "Assentamento de pisos e revestimentos em áreas internas e externas",
      "Preparo, nivelamento e conferência da base antes da aplicação",
      "Cortes, arremates, rejuntes e finalizações com capricho",
      "Proteção das áreas de circulação durante o serviço"
    ]
  },
  {
    id: "frente-gesso-drywall",
    title: "Gesso e Drywall",
    category: "Drywall",
    description: "Execução de forros, sancas, divisórias e acabamentos em drywall para organizar ambientes e preparar a pintura final.",
    imageUrl: "/images/ardan-drywall-instalacao.png",
    area: "Sob medição",
    duration: "Conforme escopo",
    location: "Atendimento sob orçamento",
    details: [
      "Forros, sancas, rasgos de luz e cortineiros",
      "Divisórias e fechamentos em drywall",
      "Tratamento de juntas e preparo para pintura",
      "Execução limpa e alinhada ao acabamento do ambiente"
    ]
  },
  {
    id: "frente-ar-condicionado",
    title: "Instalação de Ar-Condicionado",
    category: "Ar-condicionado",
    description: "Instalação de aparelhos split, infraestrutura frigorígena, dreno, suporte e acabamento para residências e empresas.",
    imageUrl: "/images/ardan-split-instalacao.png",
    area: "Por equipamento",
    duration: "Conforme instalação",
    location: "Atendimento sob orçamento",
    details: [
      "Instalação de evaporadora e condensadora",
      "Tubulação frigorígena, dreno e suporte",
      "Ponto elétrico e acabamento conforme necessidade do local",
      "Teste de funcionamento e orientação de uso"
    ]
  },
  {
    id: "frente-manutencao",
    title: "Manutenção Preventiva e Corretiva",
    category: "Manutenção",
    description: "Atendimentos para corrigir falhas, preservar instalações e reduzir paradas inesperadas em ambientes residenciais e comerciais.",
    imageUrl: "/images/ardan-condensadora-manutencao.png",
    area: "Por chamado",
    duration: "Conforme diagnóstico",
    location: "Atendimento sob orçamento",
    details: [
      "Manutenção em ar-condicionado, elétrica, hidráulica e acabamentos",
      "Correção de falhas pontuais e ajustes programados",
      "Atendimento para residências, empresas e condomínios",
      "Registro do serviço executado conforme combinado"
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Visita Técnica & Alinhamento",
    subtitle: "Primeiro contato",
    description: "Agendamos uma visita técnica gratuita no local da obra para entender suas necessidades, conferir as medidas, avaliar o serviço desejado e alinhar a melhor forma de execução.",
    iconName: "Eye"
  },
  {
    number: 2,
    title: "Orçamento Detalhado & Transparente",
    subtitle: "Sem surpresas",
    description: "Enviamos uma proposta comercial transparente com o detalhamento de cada etapa, lista sugerida de materiais e mão de obra separada por fases. Você sabe exatamente onde cada centavo está sendo investido.",
    iconName: "FileText"
  },
  {
    number: 3,
    title: "Planejamento & Cronograma Físico",
    subtitle: "Controle total",
    description: "Elaboramos um cronograma semanal de atividades. Definimos marcos de entrega e combinamos as datas de compra e chegada de materiais de acabamento, evitando atrasos e gargalos de equipe.",
    iconName: "Calendar"
  },
  {
    number: 4,
    title: "Execução, Gestão & Organização",
    subtitle: "Cuidado em cada detalhe",
    description: "Nossos profissionais qualificados executam a obra com acompanhamento próximo. Enviamos atualizações por WhatsApp com fotos e vídeos das evoluções, mantendo a limpeza diária e o respeito às normas de condomínio.",
    iconName: "Hammer"
  },
  {
    number: 5,
    title: "Entrega Limpa & Garantia",
    subtitle: "Pronto para morar ou usar",
    description: "Fazemos uma conferência final dos acabamentos, tomadas e hidráulica executados. Entregamos a obra limpa e organizada, com garantia dos serviços realizados pela equipe.",
    iconName: "CheckCircle"
  }
];

export const FAQS = [
  {
    question: "Vocês fornecem também os materiais de construção ou apenas a mão de obra?",
    answer: "Trabalhamos de ambas as formas! O mais comum é fornecermos a mão de obra qualificada e o material básico de construção (areia, cimento, tijolo, canos, fios), enquanto o cliente escolhe e compra os materiais de acabamento (porcelanato, tintas, louças, luminárias) conforme seu gosto. No entanto, também podemos fechar pacotes no formato 'turnkey' (chave na mão), onde cuidamos de absolutamente tudo."
  },
  {
    question: "Como acompanho a evolução da minha obra se não posso ir ao local todos os dias?",
    answer: "Nós criamos um canal de comunicação exclusivo via WhatsApp onde enviamos relatórios semanais detalhados de evolução. Neles, anexamos fotos, vídeos explicativos e atualizações de cronograma. Você acompanha sua obra com total comodidade, de onde estiver."
  },
  {
    question: "Quais regiões de São Paulo o Grupo Ardan atende?",
    answer: "Atendemos a Capital de São Paulo, a região do Grande ABC e cidades da Região Metropolitana conforme disponibilidade de agenda."
  },
  {
    question: "Qual é a garantia oferecida para os serviços prestados?",
    answer: "Oferecemos garantia sobre os serviços executados conforme o tipo de trabalho contratado, incluindo instalações, energia solar, hidráulica, acabamentos e impermeabilização realizada por nossa equipe. Tudo é alinhado em orçamento antes do início."
  }
];
