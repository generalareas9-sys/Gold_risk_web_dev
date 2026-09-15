/**
 * Portuguese (Português) dictionary. Must satisfy the same shape as `en`.
 */
const pt = {
  navigation: {
    calculator: 'Calculadora',
    howItWorks: 'Como funciona',
    riskManagement: 'Gestão de risco',
    supportedBrokers: 'Corretoras compatíveis',
    supportedInstruments: 'Instrumentos compatíveis',
    about: 'Sobre',
    contact: 'Contato',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Uso',
    accounts: 'Contas',
    history: 'Histórico',
    login: 'Entrar',
    getStarted: 'Começar',
    logout: 'Sair',
    language: 'Idioma',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    signedInAs: 'Conectado como {{email}}',
    showPassword: 'Mostrar senha',
    hidePassword: 'Ocultar senha',
    switchToLight: 'Mudar para tema claro',
    switchToDark: 'Mudar para tema escuro',
    home: 'Início do GoldRisk',
  },

  footer: {
    tagline: 'Calculadora de risco para traders de XAUUSD',
    navigation: 'Navegação',
    legal: 'Legal',
    disclaimer: 'Aviso legal',
    disclaimerText:
      'O GoldRisk é uma ferramenta de cálculo; não executa negociações nem oferece aconselhamento financeiro.',
    copyright: '© {{year}} GoldRisk. Todos os direitos reservados.',
  },

  common: {
    loading: 'Carregando',
    somethingWentWrong: 'Algo deu errado',
    close: 'Fechar',
    retry: 'Tentar novamente',
  },

  home: {
    hero: {
      badge: 'Dimensionamento de Posição XAUUSD',
      title: 'Conheça seu risco antes de entrar.',
      body: 'O GoldRisk calcula o tamanho da posição para sua operação XAUUSD usando o saldo da conta, o risco, o preço de entrada e o stop loss.',
      primaryCta: 'Calcule Sua Posição',
      secondaryCta: 'Como Funciona',
    },
    preview: {
      account: 'EXNESS STANDARD CENT',
      symbol: 'XAUUSDc',
      balance: 'Saldo',
      risk: 'Risco',
      position: 'Posição',
      entry: 'Entrada',
      stopLoss: 'Stop Loss',
      takeProfit: 'Take Profit',
      recommendedLot: 'Lote Recomendado',
      slDistance: 'Distância SL',
      riskReward: 'Risco / Recompensa',
    },
    problem: {
      eyebrow: 'O Problema',
      title: 'Dimensionamento de posição sem adivinhação',
      body: 'Posições superdimensionadas são como a maioria das contas morre. Sem um método fixo, o risco é decidido pelo sentimento — e o mercado não se importa com o quanto você se sentia confiante ao entrar.',
    },
    workflow: {
      eyebrow: 'Como funciona',
      title: 'Três passos até uma posição ajustada ao seu risco',
      steps: [
        {
          title: 'Defina Seu Risco',
          body: 'Escolha o valor que você aceita perder, como um montante fixo ou um percentual do seu saldo.',
        },
        {
          title: 'Defina Sua Operação',
          body: 'Informe entrada, stop loss e um take profit opcional para a posição em ouro.',
        },
        {
          title: 'Obtenha o Tamanho da Posição',
          body: 'O GoldRisk converte seu risco e distância de stop no tamanho do lote — arredondado para baixo conforme o passo do seu broker.',
        }
      ],
    },
    features: {
      eyebrow: 'Por que o GoldRisk',
      title: 'Feito para traders que respeitam o risco',
      cards: [
        {
          title: 'Dimensionamento de Precisão',
          body: 'O lote deriva do seu risco e da distância de stop, não do tamanho do saldo nem de achismo. Matemática exata, até o passo de lote do seu broker.',
        },
        {
          title: 'Cálculos Voltados ao Risco',
          body: 'Você decide quanto quer perder antes de o número existir. O cálculo serve essa decisão.',
        },
        {
          title: 'Configuração Rápida',
          body: 'Escolha uma conta, defina o risco, marque seus níveis e pressione Calcular. Uma posição totalmente dimensionada em segundos.',
        },
        {
          title: 'Histórico de Cálculos',
          body: 'Cada cálculo salvo mantém suas entradas e saídas exatas, para você revisar suas decisões depois.',
        }
      ],
    },
    education: {
      eyebrow: 'Gestão de risco',
      title: 'As cinco ideias por trás de um sizing seguro',
      items: [
        {
          title: 'Risco por operação',
          body: 'Defina o máximo que perderá se a operação for encerrada pelo stop — normalmente um pequeno percentual fixo da sua conta.',
        },
        {
          title: 'Disciplina de stop loss',
          body: 'Seu stop loss define a pior perda aceitável da operação. Sem ele, o tamanho da posição não tem significado.',
        },
        {
          title: 'Tamanho da posição',
          body: 'O tamanho do lote é a alavanca que transforma sua distância de stop exatamente no risco que você aceitou.',
        },
        {
          title: 'Recompensa / risco',
          body: 'Compare sua distância de take profit com a de stop loss antes de entrar. Proporções favoráveis dão à operação espaço para estar certa.',
        },
        {
          title: 'Por que o tamanho do lote importa',
          body: 'Um lote superdimensionado pode apagar o trabalho de dezenas de operações disciplinadas. O dimensionamento protege sua sobrevivência.',
        }
      ],
    },
    environment: {
      eyebrow: 'Ambiente de trading',
      title: 'Configurado para o ambiente de referência',
      body: 'O GoldRisk vem configurado para Exness Standard Cent e XAUUSDc. Outros brokers e instrumentos podem ser adicionados após o login como suas próprias especificações de conta.',
      currentlyConfigured: 'Atualmente configurado',
    },
    security: {
      eyebrow: 'Segurança e contas',
      title: 'Seus dados continuam seus',
      cards: [
        {
          title: 'Autenticação segura',
          body: 'Contas protegidas por autenticação baseada em JWT. Sua sessão é privada no seu dispositivo.',
        },
        {
          title: 'Dados de conta privados',
          body: 'Suas contas de trading e saldos são visíveis apenas para você. Guarde especificações para reutilizar na calculadora.',
        },
        {
          title: 'Contas de trading salvas',
          body: 'Mantenha seus brokers, tipos de conta, moedas e contratos de instrumentos prontos para dimensionar em um clique.',
        },
        {
          title: 'Histórico de cálculos',
          body: 'Um registro persistente de cada cálculo, com as entradas e os resultados exatos.',
        }
      ],
    },
    finalCta: {
      title: 'Transforme seu setup em um tamanho de posição preciso.',
      body: 'Abra a calculadora GoldRisk e dimensione sua próxima operação de ouro pelo risco que você de fato escolheu.',
      button: 'Abrir a Calculadora GoldRisk',
    }
  },

  psc: {
    eyebrow: 'Guia público',
    title: 'Calculadora de Tamanho de Posição',
    intro:
      'Dimensionamento de posição é a prática de decidir o tamanho de uma operação com base no valor que você está disposto a arriscar. Esta página explica a ideia, o que ela exige de você e exatamente como o GoldRisk a transforma em um tamanho de lote.',
    whatIsTitle: 'O que é dimensionamento de posição?',
    whatIsBody:
      'O dimensionamento determina o tamanho de uma operação com base no valor que o trader está disposto a arriscar. Em vez de perguntar "quanto posso comprar?", pergunta "quanto estou disposto a perder se essa operação for contra mim?" — e calcula a operação de trás para frente a partir dessa resposta.',
    whyTitle: 'Por que isso importa',
    whyBody:
      'O dimensionamento protege o capital de negociação, mantém o risco sob controle, evita operações superdimensionadas e mantém o risco constante operação após operação. Ele conecta o tamanho da sua conta, o seu stop-loss e o tamanho da sua posição em um plano coeso: nenhuma operação individual pode danificar seriamente sua conta.',
    requiredTitle: 'O que é necessário para calcular o tamanho de posição?',
    required: [
      { title: 'Saldo da conta', body: 'Seu ponto de partida: o capital da conta com a qual você planeja negociar.' },
      { title: 'Valor ou percentual de risco', body: 'Quanto desse saldo você aceita perder se a operação atingir o stop-loss.' },
      { title: 'COMPRA ou VENDA', body: 'A direção da sua posição, que decide de que lado do preço o seu stop-loss deve ficar.' },
      { title: 'Preço de entrada', body: 'O preço pelo qual você planeja abrir a posição.' },
      { title: 'Stop-loss', body: 'O preço em que a operação é encerrada com perda. A distância dele até a entrada determina o tamanho do lote.' },
      { title: 'Take-profit (opcional)', body: 'O preço em que a operação é encerrada com lucro. Opcional, mas ativa o risco/retorno e o lucro potencial.' },
      { title: 'Especificações de instrumento / conta', body: 'O tamanho do contrato, os lotes mínimo e máximo e o passo de lote do instrumento que você negocia.' }
    ],
    howTitle: 'Como o GoldRisk funciona',
    howBody:
      'O GoldRisk segue um único caminho: seu saldo define seu valor de risco, sua entrada e seu stop-loss definem a distância do stop-loss, e essa distância converte o risco em um tamanho de lote.',
    flow: [
      'Saldo da conta',
      'Valor de risco',
      'Preço de entrada',
      'Stop-loss',
      'Distância SL',
      'Tamanho da posição',
      'Lote recomendado',
    ],
    exampleTitle: 'Exemplo',
    exampleIntro:
      'O caso de referência usado para testar o GoldRisk, com a conta integrada Exness Standard Cent e XAUUSDc:',
    example: {
      account: 'Conta',
      risk: 'Risco',
      result: 'Resultado',
      balanceLine: 'Saldo {{amount}} USC',
      riskLine: 'Direção {{position}} · Entrada {{entry}} · SL {{sl}} · TP {{tp}}',
      recommendedLot: 'Lote recomendado',
    },
    exampleSlDistance: 'Distância SL',
    exampleExactLot: 'Lote exato',
    exampleRecommendedLot: 'Lote recomendado',
    exampleRisk: 'Risco',
    exampleRiskReward: 'Risco / retorno',
    examplePotentialProfit: 'Lucro potencial',
    note:
      'Esses números refletem o mecanismo de cálculo atual e testado. Execute a calculadora ao vivo para ver os valores exatos da sua própria configuração.',
    howToUseTitle: 'Como usar o GoldRisk',
    howToUse: [
      'Escolha sua conta',
      'Informe seu saldo',
      'Defina seu risco',
      'Selecione COMPRA ou VENDA',
      'Informe seu preço de entrada',
      'Informe seu stop-loss',
      'Informe opcionalmente um take-profit',
      'Revise o lote recomendado',
      'Decida você mesmo se executa a operação',
    ],
    disclaimer:
      'O GoldRisk não executa ordens. É uma ferramenta de cálculo e gestão de risco. Você decide se executa a operação, onde e com qual corretora.',
    mistakesTitle: 'Erros comuns',
    mistakes: [
      { title: 'Escolher o lote apenas pelo saldo', body: 'Um saldo maior pode suportar uma perda maior, mas o saldo sozinho nunca diz o que é seguro. A distância do stop-loss decide o que cabe.' },
      { title: 'Ignorar a distância do stop-loss', body: 'Um stop-loss amplo com risco fixo significa um lote menor. Escolher o lote primeiro e deixar o stop cair onde cair elimina seu controle.' },
      { title: 'Aumentar o lote por confiança', body: 'Confiança não muda a matemática. Uma operação dimensionada além do seu plano de risco é uma decisão de risco, não de negociação.' },
      { title: 'Arriscar demais em uma única operação', body: 'Uma única perda superdimensionada pode apagar o trabalho de muitas boas operações. Um risco pequeno e constante mantém você no jogo.' },
      { title: 'Confundir alavancagem com risco aceitável', body: 'A alavancagem aumenta o tamanho da posição; não muda quanto você deve perder em uma operação. Seu percentual de risco é o que protege você.' }
    ],
    ctaTitle: 'Pronto para calcular o tamanho da sua posição?',
    ctaBody: 'Entre e dimensione sua próxima operação de ouro pelo risco que você realmente escolheu.',
    ctaButton: 'Entre para começar',
    ctaGuide: 'Ver o passo a passo completo',
  },

  hiw: {
    eyebrow: 'Passo a passo',
    title: 'Como o GoldRisk funciona',
    intro:
      'O GoldRisk converte sua tolerância a risco e a distância do stop-loss em um tamanho de posição. Todo o fluxo gira em torno de uma pergunta: que tamanho de lote mantém essa operação dentro do risco que você escolheu?',
    steps: [
      { title: 'Escolha sua conta', body: 'Selecione uma conta de negociação ou informe manualmente seu saldo, moeda e especificação do instrumento.' },
      { title: 'Defina o risco que você aceita', body: 'Decida quanto está disposto a perder: um valor fixo em USD ou na moeda da conta, ou um percentual do seu saldo.' },
      { title: 'Defina seus níveis', body: 'Informe seu preço de entrada e stop-loss para o ouro. Adicione um take-profit opcional para liberar o risco/retorno e o lucro potencial.' },
      { title: 'Obtenha o tamanho da sua posição', body: 'O GoldRisk calcula o lote exato para o seu risco, arredonda para baixo até o passo de lote da sua corretora e avisa se o tamanho sair dos limites mínimo/máximo.' },
      { title: 'Revise e decida', body: 'Confira o lote recomendado, o risco real após o arredondamento e o risco/retorno. O GoldRisk nunca executa ordens: a execução é sempre sua.' }
    ],
    ctaTitle: 'Experimente você mesmo',
    ctaBody: 'Aprenda primeiro a matemática.',
    ctaButton: 'Guia de tamanho de posição',
  },

  risk: {
    eyebrow: 'Educação',
    title: 'Gestão de risco',
    intro:
      'O dimensionamento é uma parte da gestão de risco. O princípio central sobre o qual o GoldRisk é construído é simples: decida o quanto da sua conta você aceita perder em uma operação antes de entrar, não depois.',
    principles: [
      { title: 'Decida seu risco antes de entrar', body: 'Combine o valor que você aceita perder enquanto a posição ainda é uma ideia e procure o tamanho que o ajusta.' },
      { title: 'O tamanho segue o stop-loss', body: 'A distância do stop-loss e o seu valor de risco decidem o tamanho do lote, não o saldo nem o otimismo.' },
      { title: 'Mantenha o risco constante', body: 'Arriscar um valor semelhante em cada operação mantém as perdas previsíveis e permite que uma sequência de perdas continue suportável.' },
      { title: 'Respeite os limites da corretora', body: 'Os lotes mínimo e máximo e o passo de lote limitam cada cálculo. O GoldRisk arredonda para baixo, nunca para cima, para não aumentar o risco.' }
    ],
    disclaimer:
      'Nenhuma calculadora, incluindo o GoldRisk, prevê ou garante resultados de mercado. Uma posição dimensionada para o seu risco ainda depende de o preço se mover na direção esperada. O trabalho do GoldRisk é apenas manter a perda de uma operação interrompida dentro do valor que você escolheu arriscar.',
    ctaTitle: 'Coloque em prática',
    ctaBody: 'Dimensione sua próxima posição com matemática real.',
    ctaButton: 'Entre para começar',
  },

  brokers: {
    eyebrow: 'Referência',
    title: 'Corretoras compatíveis',
    intro:
      'O GoldRisk permite configurar a especificação do contrato XAUUSD de qualquer corretora nas suas contas. A lista a seguir é informação de referência sobre tipos de conta cent e micro comuns; não afirma que cada especificação foi verificada na calculadora.',
    configuredTitle: 'Ambiente atualmente configurado',
    configuredBody:
      'O mecanismo de cálculo inclui Exness Standard Cent e o contrato XAUUSDc (tamanho do contrato 1, lote mínimo 0.01, lote máximo 200, passo de lote 0.01). Você pode adicionar contas e especificações de outras corretoras após entrar pela página Contas; mas o GoldRisk só garante resultados para as configurações que você informa e verifica.',
    currentlyConfigured: 'Atualmente configurado',
    reference: 'Referência',
    note:
      'Os dados das corretoras mudam com frequência. Confirme o tamanho do contrato, os limites de lote e o passo atuais na sua plataforma antes de confiar em qualquer cálculo. O GoldRisk não executa ordens e não é afiliado a nenhuma das corretoras listadas.',
    seeInstruments: 'Veja os instrumentos de ouro disponíveis abaixo:',
    linkInstruments: 'Instrumentos compatíveis',
    list: [
      'Contas denominadas em centavos para negociar ouro com saldos pequenos.',
      'Negociação com contas cent e CFDs de ouro via MetaTrader.',
      'Conta cent com CFD de ouro; o ambiente de referência atualmente configurado para XAUUSDc.',
      'Contas ProCent em centavos para traders com menor capital.',
      'Contas cent para negociar pares de ouro em escala de prática.',
      'Contas denominadas em centavos com instrumentos de ouro.',
      'Contas micro permitem negociar com passos de contrato menores.',
      'Contas Standard Cent com CFD de ouro.',
      'Corretora de varejo que oferece CFDs de ouro no MetaTrader.',
      'Contas de spread bruto com preços ajustados em ouro.',
    ],
  },

  inst: {
    eyebrow: 'Referência',
    title: 'Instrumentos compatíveis',
    intro:
      'A calculadora está configurada hoje para um ambiente: a conta Exness Standard Cent negociando XAUUSDc. Outros instrumentos podem ser adicionados como especificações de conta, mas o GoldRisk não garante a configuração até que seja verificada.',
    cardSubtitle: 'Ouro vs. dólar americano — contrato cent',
    currentlyConfigured: 'Atualmente configurado',
    whatTitle: 'O que significa XAUUSDc',
    whatBody:
      'XAU é o símbolo do ouro, USD é o dólar americano e o "c" final indica o contrato cent oferecido em contas cent. O ouro é cotado em USD por onça troy, e o contrato cent expressa as posições em unidades de um centésimo de lote padrão, de modo que saldos em USC (dólares cent) correspondem diretamente a pequenos valores nocionais em USD.',
    contractTitle: 'Contrato configurado',
    contractSize: 'Tamanho do contrato',
    minimumLot: 'Lote mínimo',
    maximumLot: 'Lote máximo',
    lotStep: 'Passo de lote',
    note:
      'Você pode inserir instrumentos e corretoras adicionais como especificações de conta após entrar. O GoldRisk usará os dados de contrato que você fornecer, então confirme sempre os números na plataforma da sua corretora antes de confiar em um cálculo.',
    seeBrokers: 'Veja a lista de corretoras:',
    linkBrokers: 'Corretoras compatíveis',
  },

  about: {
    eyebrow: 'Sobre',
    title: 'Sobre o GoldRisk',
    intro:
      'O GoldRisk é uma ferramenta de cálculo focada para traders de ouro. Existe para responder bem a uma única pergunta: quão grande deve ser esta posição dado o risco que estou disposto a assumir — e nada mais.',
    focusTitle: 'No que nos concentramos',
    focusBody:
      'Ferramentas de trading costumam derivar para o ruído: sinais, notícias, previsões. O GoldRisk permanece deliberadamente focado. Ele fornece um cálculo de dimensionamento transparente e determinístico, guarda seu histórico e permite gerenciar as contas e especificações com as quais você realmente negocia.',
    notDoTitle: 'O que não fazemos',
    notDoBody:
      'O GoldRisk não executa ordens, não gerencia posições e não prevê mercados. É uma ferramenta de cálculo e gestão de risco. Cada operação, e cada decisão sobre onde e se executar, pertence a você.',
    transparencyTitle: 'Transparência',
    transparencyBody:
      'O mecanismo de cálculo é testado contra um caso de referência documentado, e seu histórico guarda as entradas e saídas exatas de cada cálculo para que os resultados possam sempre ser revisados e verificados.',
  },

  contact: {
    title: 'Contato',
    description:
      'Um formulário de contato será adicionado quando o GoldRisk tiver um backend pelo qual enviar mensagens. Até lá, escreva para nós por e-mail.',
  },

  privacy: {
    title: 'Política de privacidade',
    description:
      'A política de privacidade completa do GoldRisk está sendo redigida junto com os recursos de contas e tratamento de dados que ela descreverá. Esta página será substituída pela política completa antes do lançamento desses recursos.',
  },

  terms: {
    title: 'Termos de uso',
    description:
      'Os termos de uso completos do GoldRisk estão sendo redigidos e aparecerão aqui antes de a criação de contas ser habilitada.',
  },

  notFound: {
    title: 'Página não encontrada',
    body: 'A página que você procura não existe ou foi movida.',
    back: 'Voltar ao início',
  },

  auth: {
    welcomeBack: 'Bem-vindo de volta',
    loginSubtitle: 'Entre no seu espaço de trabalho GoldRisk.',
    email: 'E-mail',
    password: 'Senha',
    emailPlaceholder: 'voce@exemplo.com',
    passwordPlaceholder: '••••••••',
    loggingIn: 'Entrando…',
    login: 'Entrar',
    noAccount: 'Novo no GoldRisk?',
    createAccount: 'Criar uma conta',
    createTitle: 'Crie sua conta',
    createSubtitle: 'Uma conta para suas contas, histórico e dimensionamento de posição.',
    name: 'Nome',
    namePlaceholder: 'Seu nome',
    passwordTooShort: 'A senha deve ter pelo menos 8 caracteres.',
    passwordsDoNotMatch: 'As senhas não coincidem.',
    confirmPassword: 'Confirmar senha',
    confirmPlaceholder: 'Repita sua senha',
    creatingAccount: 'Criando conta…',
    createButton: 'Criar conta',
    hasAccount: 'Já tem uma conta?',
    nameRequired: 'Informe seu nome.',
    passwordPlaceholderLong: 'Pelo menos 8 caracteres',
    or: 'ou',
    continueWithGoogle: 'Continuar com o Google',
    signUpWithGoogle: 'Cadastre-se com o Google',
    googleUnavailable: 'O login com Google ainda não está disponível. Use e-mail e senha por enquanto.',
  },

  calcPage: {
    title:'Calculadora de Tamanho de Posição',    subtitle: 'Calcule o tamanho do lote para sua operação XAUUSD com base no risco que você definiu.',
    historyNotePre: 'Os cálculos salvos aparecem na página ',
    historyNotePost: ', onde você pode revisar as entradas e os resultados exatos a qualquer momento.',
  },

  calc: {
    tradeInputs: 'Detalhes da operação',
    tradeSetup: 'Configuração da operação',
    currencyChipUsc: '{{value}} {{currency}} = $1',
    currencyChipUsd: 'Conta em USD',
    loadingAccounts: 'Carregando contas salvas…',
    loadingOptions: 'Carregando…',
    tradingAccount: 'Conta de negociação',
    builtIn: '{{name}} (integrada)',
    basic: 'Básico',
    advanced: 'Avançado',
    symbol: 'Símbolo',
    contractSize: 'Tamanho do contrato',
    minMaxLot: 'Lote mín. / máx.',
    lotStep: 'Passo de lote',
    accountCurrency: 'Moeda da conta',
    usdConversion: 'Conversão para USD',
    usdConversionValue: '1 USD = {{value}}',
    broker: 'Corretora',
    riskMode: 'Modo de risco',
    riskModePercentage: 'Percentual do saldo',
    riskModeFixed: 'Valor fixo (USD)',
    riskModeAccountCurrency: 'Moeda da conta',
    riskAmount: 'Valor de risco',
    position: 'Posição',
    buy: 'Comprar',
    sell: 'Vender',
    entryPrice: 'Preço de entrada',
    stopLoss: 'Stop-loss',
    takeProfit: 'Take-profit',
    tpHint: 'Opcional: ativa risco/retorno e lucro potencial',
    checkInputs: 'Revise seus dados',
    fixSetup: 'Corrija a configuração da operação',
    calculate: 'Calcular',
    clear: 'Limpar',
    saveCalculation: 'Salvar cálculo',
    saving: 'Salvando…',
    saved: 'Salvo no histórico.',
    saveFailed: 'Não foi possível salvar. Tente novamente.',
    loginToSave: 'para salvar cálculos no seu histórico.',
  },

  result: {
    recommendedLot: 'Lote recomendado',
    positionResult: 'Resultado da posição',
    copyLot: 'Copiar lote',
    copied: 'Copiado',
    lotNote: 'O risco nunca excede o valor definido: é arredondado para baixo até o passo de lote da corretora.',
    exactLot: 'Tamanho de lote exato',
    lots: 'lotes',
    slDistance: 'Distância do stop-loss',
    intendedRisk: 'Risco previsto',
    actualRisk: 'Risco real (arredondado)',
    riskReward: 'Risco / retorno',
    potentialProfit: 'Lucro potencial',
    empty:
      'Informe os dados da sua operação e clique em Calcular. As perdas podem exceder rapidamente seu orçamento: revise o risco real antes de colocar a ordem.',
    invalid: 'Nada a mostrar até que os dados passem nas verificações de configuração.',
  },

  marquee: {
    label: 'Anúncios da GoldRisk',
    welcome: 'Bem-vindo à GoldRisk — a calculadora de tamanho de posição para XAUUSD.',
    tagline: 'Ajuste cada operação de ouro ao risco que você realmente escolheu.',
    slogan: 'Cálculo de posição de precisão, até o passo de lote da sua corretora.',
    newUsers: 'Novo na GoldRisk?',
    existingUsers: 'Já tem conta?',
  },

  calcGuide: {
    title: 'Como a GoldRisk calcula o tamanho da posição',
    intro:
      'Seu saldo define o que você pode arriscar, seu stop loss define onde a operação se torna inaceitável e a distância entre sua entrada e seu stop loss é convertida em um tamanho de lote. Um caminho determinístico, sem adivinhação.',
    steps: [
      {
        title: 'Saldo da conta',
        body: 'Seu capital inicial, na moeda da conta (por exemplo, USC em uma conta cent). O risco que você aceita é expresso sobre isso.',
      },
      {
        title: 'Valor de risco',
        body: 'Quanto você está disposto a perder, escolhido como porcentagem do saldo, valor fixo em USD ou valor fixo na moeda da conta.',
      },
      {
        title: 'Distância do stop loss',
        body: 'A diferença absoluta entre seu preço de entrada e o stop loss, no lado correto do preço para COMPRA ou VENDA.',
      },
      {
        title: 'Especificação do contrato',
        body: 'Tamanho do contrato, lote mínimo e máximo e passo de lote do instrumento — as regras da corretora que o resultado deve respeitar.',
      },
      {
        title: 'Tamanho exato da posição',
        body: 'A GoldRisk divide o valor exposto de um lote pela distância do stop loss e o reduz ao seu valor de risco.',
      },
      {
        title: 'Arredondamento do passo de lote',
        body: 'O lote exato é arredondado para baixo até o passo de lote da sua corretora. Isso mantém o risco real em ou abaixo do seu valor escolhido.',
      },
      {
        title: 'Lote recomendado',
        body: 'O tamanho final e executável. A GoldRisk avisa quando ele fica abaixo do mínimo ou acima do máximo.',
      },
    ],
    topics: [
      {
        title: 'Por que o stop loss importa',
        body: 'O stop loss é o único preço que você controla e que define sua pior perda aceitável. Sem ele, o tamanho da posição não tem âncora.',
      },
      {
        title: 'Por que a porcentagem de risco importa',
        body: 'Uma porcentagem consistente mantém cada operação pequena o suficiente para que uma sequência de perdas continue sobrevivível — a matemática que mantém você operando.',
      },
      {
        title: 'O que é lote recomendado?',
        body: 'É o maior lote que sua corretora permite no nível ou abaixo do risco escolhido. O risco real pode ser menor, nunca maior.',
      },
      {
        title: 'GoldRisk e XAUUSDc',
        body: 'A GoldRisk vem configurada para Exness Standard Cent e o contrato XAUUSDc (tamanho do contrato 1, lote mínimo 0.01, lote máximo 200, passo 0.01).',
      },
    ],
  },

  accounts: {
    title: 'Contas de negociação',
    subtitleEmpty:
      'Crie uma conta para usar o saldo e as especificações do instrumento na calculadora.',
    subtitleOne: '{{count}} conta — a calculadora a usa para saldo, moeda e limites de lote.',
    subtitleMany: '{{count}} contas — a calculadora as usa para saldo, moeda e limites de lote.',
    newAccount: 'Nova conta',
    createAccount: 'Criar conta',
    editAccount: 'Editar {{name}}',
    saveChanges: 'Salvar alterações',
    cancel: 'Cancelar',
    saving: 'Salvando…',
    unableToLoad: 'Não foi possível carregar suas contas',
    retry: 'Tentar novamente',
    loading: 'Carregando contas…',
    emptyTitle: 'Ainda não há contas',
    emptyBody:
      'Crie sua primeira conta de negociação — por exemplo, Exness Standard Cent com XAUUSDc — e a calculadora poderá carregar automaticamente o saldo e os limites de lote.',
    emptyCreate: 'Criar conta',
    delete: 'Excluir',
    confirm: 'Confirmar exclusão',
    edit: 'Editar',
    default: 'Padrão',
    active: 'Ativa',
    inactive: 'Inativa',
    balance: 'Saldo',
    usdConversion: 'Conversão para USD',
    usdConversionValue: '1 USD = {{value}}',
    currency: 'Moeda',
    created: 'Criada',
    symbol: 'Símbolo',
    contractSize: 'Tamanho do contrato',
    minLot: 'Lote mín.',
    maxLot: 'Lote máx.',
    lotStep: 'Passo de lote',
    specTitle: 'Especificações do símbolo',
    addSpec: '+ Adicionar especificação',
    loadingSpecs: 'Carregando especificações…',
    noSpecs: 'Ainda não há especificações. Adicione uma para usar esta conta na calculadora.',
    specContract: 'Contrato',
    specMinMax: 'Mín. / Máx.',
    specStep: 'Passo',
    accountName: 'Nome da conta',
    broker: 'Corretora',
    accountType: 'Tipo da conta',
    usdConversionLabel: 'Conversão para USD',
    usdConversionHint: 'Unidades da moeda da conta por 1 USD (100 para contas cent)',
    balanceLabel: 'Saldo',
    accountNameRequired: 'O nome da conta é obrigatório.',
    brokerRequired: 'A corretora é obrigatória.',
    accountTypeRequired: 'O tipo da conta é obrigatório.',
    currencyRequired: 'A moeda é obrigatória.',
    positiveValue: 'Informe um valor maior que 0.',
    nonNegativeValue: 'Informe um valor maior ou igual a 0.',
    symbolRequired: 'O símbolo é obrigatório.',
    minMaxConflict: 'O lote mínimo não pode exceder o lote máximo.',
    stepConflict: 'O passo de lote não pode exceder o lote máximo.',
  },

  history: {
    title: 'Histórico de cálculos',
    subtitleEmpty: 'Seus cálculos salvos aparecerão aqui.',
    subtitleCount: '{{count}} cálculo',
    subtitleCountOther: '{{count}} cálculos',
    unableToLoad: 'Não foi possível carregar seu histórico de cálculos',
    apiUnreachable: 'A API não está acessível neste ambiente.',
    tryAgain: 'Tente novamente.',
    retry: 'Tentar novamente',
    loading: 'Carregando histórico…',
    emptyTitle: 'Ainda não há histórico de cálculos',
    emptyBody: 'Seus cálculos salvos aparecerão aqui depois que você calcular uma posição.',
    goToCalculator: 'Ir para a calculadora',
    details: 'Detalhes',
    delete: 'Excluir',
    lot: 'Lote',
    entry: 'Entrada',
    savedAt: '{{date}} às {{time}}',
  },

  modal: {
    detailLabel: 'Detalhes do cálculo',
    savedAt: 'Salvo em {{date}} às {{time}}',
    closeDetails: 'Fechar detalhes',
    close: 'Fechar',
    loading: 'Carregando detalhes…',
    unableToLoad: 'Não foi possível carregar este cálculo',
    accountBroker: 'Conta / corretora',
    calculationId: 'ID do cálculo',
    instrument: 'Instrumento',
    direction: 'Direção',
    entryPrice: 'Preço de entrada',
    balance: 'Saldo',
    riskMode: 'Modo de risco',
    riskAmount: 'Valor de risco',
    stopLoss: 'Stop-loss',
    takeProfit: 'Take-profit',
    contractSize: 'Tamanho do contrato',
    results: 'Resultados',
    slDistance: 'Distância SL',
    exactLot: 'Lote exato',
    recommendedLot: 'Lote recomendado',
    actualRisk: 'Risco real',
    riskReward: 'Risco / retorno',
    potentialProfit: 'Lucro potencial',
    ariaLabel: 'Detalhes do cálculo {{position}} {{symbol}}',
  },

  engine: {
    entryValid: 'Informe um preço de entrada válido.',
    entryRequired: 'O preço de entrada é obrigatório.',
    stopLossValid: 'Informe um stop-loss válido.',
    stopLossRequired: 'O stop-loss é obrigatório.',
    riskValid: 'Informe um valor de risco válido.',
    riskRequired: 'O valor de risco é obrigatório.',
    balanceValid: 'Informe um saldo de conta válido.',
    balanceRequiredForPercent:
      'O saldo da conta é obrigatório quando se usa risco percentual.',
    entryGreaterThanZero: 'O preço de entrada deve ser maior que zero.',
    stopLossGreaterThanZero: 'O stop-loss deve ser maior que zero.',
    riskGreaterThanZero: 'O valor de risco deve ser maior que zero.',
    balanceGreaterThanZeroPercent:
      'O saldo da conta deve ser maior que zero ao usar risco percentual.',
    identical: 'A entrada e o stop-loss não podem ser idênticos.',
    buySlBelow: 'Para COMPRA, o stop-loss deve estar abaixo do preço de entrada.',
    buyTpAbove: 'Para COMPRA, o take-profit deve estar acima do preço de entrada.',
    sellSlAbove: 'Para VENDA, o stop-loss deve estar acima do preço de entrada.',
    sellTpBelow: 'Para VENDA, o take-profit deve estar abaixo do preço de entrada.',
    lotBelowMin:
      'O lote necessário ({{exact}}) está abaixo do mínimo de {{min}} da corretora. Usar o lote mínimo pode exceder o risco selecionado.',
    lotExceedsMax:
      'O lote necessário excede o máximo de {{max}} da corretora. O risco é limitado pelo lote máximo e o risco real será menor que o previsto.',
  }
}

export default pt