import { Service, Project, ProcessStep, Testimonial } from "./types";

export const COMPANY_INFO = {
  name: "Grupo Ardan",
  tagline: "Construção e reforma com soluções completas para sua obra",
  subTagline: "Executamos serviços de construção civil, reformas, instalações e acabamentos residenciais e comerciais, reunindo diferentes especialidades para entregar mais praticidade, organização e qualidade ao cliente.",
  slogan: "Da alvenaria ao acabamento, cuidamos de cada etapa da sua obra.",
  whatsappLink: "https://wa.me/5511945591563?text=Olá!%20Encontrei%20o%20Grupo%20Ardan%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20orçamento.",
  phoneFormatted: "(11) 94559-1563",
  phoneRaw: "+5511945591563",
  email: "contato@grupoardan.com.br",
  address: "São Paulo, Grande ABC e Região Metropolitana",
  workingHours: "Segunda a Sexta, das 08h às 18h; Sábado, das 08h às 13h",
  instagram: "https://instagram.com/grupoardan",
  facebook: "https://facebook.com/grupoardan",
  stats: [
    { value: "5+", label: "Anos de Experiência" },
    { value: "150+", label: "Obras Concluídas" },
    { value: "100%", label: "Prazos Cumpridos" },
    { value: "15+", label: "Especialistas na Equipe" }
  ]
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

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Apartamento Premium Vila Mariana",
    category: "Residencial",
    description: "Reforma total de apartamento de 120m², integrando a sala com a varanda gourmet, refazendo todas as instalações de iluminação e revestimentos.",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    area: "120 m²",
    duration: "75 dias",
    location: "Vila Mariana, São Paulo - SP",
    details: [
      "Demolições e adequações conforme liberação do cliente/condomínio",
      "Porcelanato de 1,20m x 1,20m assentado em conceito integrado",
      "Instalação de iluminação em trilhos eletrificados e rasgos de luz",
      "Refação de 3 banheiros completos com nichos esculpidos em mármore"
    ]
  },
  {
    id: "proj-2",
    title: "Escritório Corporativo Paulista",
    category: "Comercial",
    description: "Adequação completa de conjunto comercial de 240m² na Avenida Paulista para receber uma renomada banca de advocacia, com foco em isolamento acústico.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    area: "240 m²",
    duration: "45 dias",
    location: "Bela Vista, São Paulo - SP",
    details: [
      "Divisórias em Drywall com isolamento em lã de rocha de alta densidade",
      "Piso vinílico acústico e rodapés de alta durabilidade",
      "Rede lógica e elétrica de alta capacidade com cabeamento estruturado Cat6",
      "Obra entregue em cronograma acelerado operando em horários alternativos"
    ]
  },
  {
    id: "proj-3",
    title: "Sobrado Moderno Alphaville",
    category: "Construção",
    description: "Construção de residência unifamiliar moderna de alto padrão, desde as fundações de concreto armado até a entrega das chaves e paisagismo.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    area: "350 m²",
    duration: "10 meses",
    location: "Barueri, Grande SP",
    details: [
      "Estrutura completa em concreto armado e lajes protendidas",
      "Esquadrias de alumínio sob medida com persianas integradas",
      "Revestimento de fachada com porcelanato amadeirado e pedras naturais",
      "Piscina em concreto armado revestida com pastilhas de porcelana"
    ]
  },
  {
    id: "proj-4",
    title: "Clínica de Estética nos Jardins",
    category: "Comercial",
    description: "Reforma de casarão comercial com adequação de salas para procedimentos estéticos, respeitando todas as exigências sanitárias e regulatórias da ANVISA.",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    area: "180 m²",
    duration: "60 dias",
    location: "Jardins, São Paulo - SP",
    details: [
      "Adequação de encanamento de água e esgoto em todas as salas",
      "Aplicação de tintas epóxi super laváveis e pisos vinílicos homogêneos",
      "Rebaixamento total em gesso acartonado aramado com iluminação difusa",
      "Infraestrutura dedicada de exaustão e ar-condicionado individual"
    ]
  },
  {
    id: "proj-5",
    title: "Cobertura Duplex em Moema",
    category: "Acabamentos",
    description: "Atualização de acabamentos e área externa em cobertura duplex, incluindo instalação de deck de madeira de lei, spa e revestimentos cimentícios.",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    area: "210 m²",
    duration: "50 dias",
    location: "Moema, São Paulo - SP",
    details: [
      "Instalação de SPA com hidromassagem e deck elevado em madeira Cumaru",
      "Pintura texturizada em cimento queimado na área de lazer",
      "Assentamento de revestimentos de pedra vulcânica (Hijau) na piscina",
      "Refação de impermeabilização integral da laje externa"
    ]
  },
  {
    id: "proj-6",
    title: "Apartamento Compacto Pinheiros",
    category: "Residencial",
    description: "Reforma planejada de estúdio residencial de 45m², otimizando espaços com divisória móvel em serralheria, marcenaria planejada e iluminação focal.",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    area: "45 m²",
    duration: "30 dias",
    location: "Pinheiros, São Paulo - SP",
    details: [
      "Integração total do estúdio através do nivelamento do piso da sacada",
      "Pintura geral e instalação de forro de drywall plano",
      "Montagem de estrutura metálica sob medida para painéis divisórios",
      "Planejamento rápido executado perfeitamente em curto prazo"
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
    answer: "Atendemos toda a Capital de São Paulo (Zona Sul, Zona Oeste, Zona Leste, Zona Norte e Centro), a região do Grande ABC (Santo André, São Bernardo do Campo, São Caetano do Sul e Diadema) e cidades vizinhas da Região Metropolitana (como Barueri/Alphaville, Guarulhos e Osasco)."
  },
  {
    question: "Qual é a garantia oferecida para os serviços prestados?",
    answer: "Oferecemos garantia sobre os serviços executados conforme o tipo de trabalho contratado, incluindo instalações, hidráulica, acabamentos e impermeabilização realizada por nossa equipe. Tudo é alinhado em orçamento antes do início."
  }
];
