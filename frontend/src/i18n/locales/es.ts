/**
 * Spanish (Español) dictionary. Must satisfy the same shape as `en`.
 */
const es = {
  navigation: {
    calculator: 'Calculadora',
    howItWorks: 'Cómo funciona',
    riskManagement: 'Gestión de Riesgo',
    supportedBrokers: 'Brokers compatibles',
    supportedInstruments: 'Instrumentos compatibles',
    about: 'Acerca de',
    contact: 'Contacto',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Uso',
    accounts: 'Cuentas',
    history: 'Historial',
    login: 'Iniciar sesión',
    getStarted: 'Comenzar',
    logout: 'Cerrar sesión',
    language: 'Idioma',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    signedInAs: 'Sesión iniciada como {{email}}',
    showPassword: 'Mostrar contraseña',
    hidePassword: 'Ocultar contraseña',
    switchToLight: 'Cambiar a tema claro',
    switchToDark: 'Cambiar a tema oscuro',
    home: 'Inicio de GoldRisk',
  },

  footer: {
    tagline: 'Calculadora de riesgo para operadores de XAUUSD',
    navigation: 'Navegación',
    legal: 'Legal',
    disclaimer: 'Aviso legal',
    disclaimerText:
      'GoldRisk es una herramienta de cálculo y no ejecuta operaciones ni ofrece asesoramiento financiero.',
    copyright: '© {{year}} GoldRisk. Todos los derechos reservados.',
  },

  common: {
    loading: 'Cargando',
    somethingWentWrong: 'Algo salió mal',
    close: 'Cerrar',
    retry: 'Reintentar',
  },

  home: {
    hero: {
      badge: 'Tamaño de Posición XAUUSD',
      title: 'Conoce tu riesgo antes de entrar.',
      body: 'GoldRisk calcula el tamaño de la posición para tu operación de XAUUSD usando el saldo de tu cuenta, el riesgo, el precio de entrada y el stop loss.',
      primaryCta: 'Calcula Tu Posición',
      secondaryCta: 'Cómo Funciona',
    },
    preview: {
      account: 'EXNESS STANDARD CENT',
      symbol: 'XAUUSDc',
      balance: 'Saldo',
      risk: 'Riesgo',
      position: 'Posición',
      entry: 'Entrada',
      stopLoss: 'Stop Loss',
      takeProfit: 'Take Profit',
      recommendedLot: 'Lote Recomendado',
      slDistance: 'Distancia SL',
      riskReward: 'Riesgo / Recompensa',
    },
    problem: {
      eyebrow: 'El Problema',
      title: 'Tamaño de posición sin adivinar',
      body: 'Las posiciones sobredimensionadas son como mueren la mayoría de las cuentas. Sin un método fijo, el riesgo lo decide la sensación — y al mercado no le importa lo seguro que te sentías al entrar.',
    },
    workflow: {
      eyebrow: 'Cómo funciona',
      title: 'Tres pasos hacia una posición ajustada a tu riesgo',
      steps: [
        {
          title: 'Define Tu Riesgo',
          body: 'Elige la cantidad que estás dispuesto a perder, como un monto fijo o un porcentaje de tu saldo.',
        },
        {
          title: 'Define Tu Operación',
          body: 'Introduce tu entrada, stop loss y un take profit opcional para la posición de oro.',
        },
        {
          title: 'Obtén Tu Tamaño de Posición',
          body: 'GoldRisk convierte tu riesgo y distancia de stop en el tamaño de lote — redondeado a la baja según el paso de tu broker.',
        }
      ],
    },
    features: {
      eyebrow: 'Por qué GoldRisk',
      title: 'Hecho para traders que respetan el riesgo',
      cards: [
        {
          title: 'Tamaño de Posición de Precisión',
          body: 'El lote se deriva de tu riesgo y distancia de stop, no del tamaño del saldo ni de la intuición. Matemática exacta, hasta el paso de lote de tu broker.',
        },
        {
          title: 'Cálculos Priorizando el Riesgo',
          body: 'Tú decides cuánto estás dispuesto a perder antes de que exista el número. El cálculo sirve a esa decisión.',
        },
        {
          title: 'Configuración Rápida de la Operación',
          body: 'Elige una cuenta, define el riesgo, marca tus niveles y presiona Calcular. Una posición totalmente dimensionada en segundos.',
        },
        {
          title: 'Historial de Cálculos',
          body: 'Cada cálculo guardado conserva sus entradas y salidas exactas, para que puedas revisar tus decisiones más tarde.',
        }
      ],
    },
    education: {
      eyebrow: 'Gestión de riesgo',
      title: 'Las cinco ideas tras un sizing seguro',
      items: [
        {
          title: 'Riesgo por operación',
          body: 'Decide el máximo que perderás si la operación se cierra con stop — normalmente un porcentaje pequeño y fijo de tu cuenta.',
        },
        {
          title: 'Disciplina de stop loss',
          body: 'Tu stop loss define la peor pérdida aceptable de la operación. Sin él, el tamaño de posición no tiene sentido.',
        },
        {
          title: 'Tamaño de posición',
          body: 'El tamaño del lote es la palanca que convierte tu distancia de stop exactamente en el riesgo que aceptaste.',
        },
        {
          title: 'Recompensa / riesgo',
          body: 'Compara tu distancia de take profit con la de stop loss antes de entrar. Las ratios favorables dan a la operación espacio para ser correcta.',
        },
        {
          title: 'Por qué importa el tamaño del lote',
          body: 'Un lote sobredimensionado puede borrar el trabajo de docenas de operaciones disciplinadas. El sizing protege tu supervivencia.',
        }
      ],
    },
    environment: {
      eyebrow: 'Entorno de trading',
      title: 'Configurado para el entorno de referencia',
      body: 'GoldRisk viene configurado para Exness Standard Cent y XAUUSDc. Puedes añadir otros brokers e instrumentos tras iniciar sesión como tus propias especificaciones de cuenta.',
      currentlyConfigured: 'Actualmente configurado',
    },
    security: {
      eyebrow: 'Seguridad y cuentas',
      title: 'Tus datos siguen siendo tuyos',
      cards: [
        {
          title: 'Autenticación segura',
          body: 'Las cuentas están protegidas por autenticación basada en JWT. Tu sesión es privada en tu dispositivo.',
        },
        {
          title: 'Datos de cuenta privados',
          body: 'Tus cuentas de trading y saldos solo son visibles para ti. Guarda especificaciones para reutilizarlas en la calculadora.',
        },
        {
          title: 'Cuentas de trading guardadas',
          body: 'Mantén tus brokers, tipos de cuenta, divisas y contratos de instrumentos listos para el sizing con un clic.',
        },
        {
          title: 'Historial de cálculos',
          body: 'Un registro persistente de cada cálculo, con las entradas y resultados exactos.',
        }
      ],
    },
    finalCta: {
      title: 'Convierte tu configuración de operación en un tamaño de posición preciso.',
      body: 'Abre la calculadora de GoldRisk y dimensiona tu próxima operación de oro al riesgo que realmente elegiste.',
      button: 'Login and Get Started',
    }
  },

  psc: {
    eyebrow: 'Guía pública',
    title: 'Calculadora de Tamaño de Posición',
    intro:
      'El dimensionamiento de posición es la práctica de decidir cuán grande debe ser una operación según la cantidad de dinero que estás dispuesto a arriesgar. Esta página explica la idea, qué necesita de ti y exactamente cómo GoldRisk la convierte en un tamaño de lote.',
    whatIsTitle: '¿Qué es el dimensionamiento de posición?',
    whatIsBody:
      'El dimensionamiento determina cuán grande debe ser una operación según la cantidad de dinero que el operador está dispuesto a arriesgar. En lugar de preguntar "¿cuánto puedo comprar?", pregunta "¿cuánto estoy dispuesto a perder si esta operación va en mi contra?" — y calcula el tamaño de la operación a la inversa a partir de esa respuesta.',
    whyTitle: 'Por qué importa',
    whyBody:
      'El dimensionamiento protege el capital de operación, controla el riesgo, evita posiciones sobredimensionadas y mantiene el riesgo constante operación tras operación. Conecta el tamaño de tu cuenta, tu stop-loss y el tamaño de tu posición en un plan coherente: ninguna operación individual puede dañar seriamente tu cuenta.',
    requiredTitle: '¿Qué se necesita para calcular el tamaño de posición?',
    required: [
      { title: 'Saldo de la cuenta', body: 'Tu punto de partida: el capital de la cuenta con la que planeas operar.' },
      { title: 'Importe o porcentaje de riesgo', body: 'Cuánto de ese saldo estás dispuesto a perder si la operación alcanza su stop-loss.' },
      { title: 'COMPRA o VENTA', body: 'La dirección de la posición, que decide en qué lado del precio debe situarse tu stop-loss.' },
      { title: 'Precio de entrada', body: 'El precio al que esperas abrir la posición.' },
      { title: 'Stop-loss', body: 'El precio donde la operación se cierra con pérdidas. Su distancia desde la entrada determina el tamaño de lote.' },
      { title: 'Take-profit opcional', body: 'El precio donde la operación se cierra con ganancias. Opcional, pero habilita el riesgo/beneficio y el beneficio potencial.' },
      { title: 'Especificaciones del instrumento / cuenta', body: 'Tamaño del contrato, lote mínimo y máximo y paso de lote del instrumento que operas.' }
    ],
    howTitle: 'Cómo funciona GoldRisk',
    howBody:
      'GoldRisk sigue un único camino: tu saldo determina tu importe de riesgo, tu entrada y tu stop-loss definen la distancia de stop-loss, y esa distancia convierte el riesgo en un tamaño de lote.',
    flow: [
      'Saldo de la cuenta',
      'Importe de riesgo',
      'Precio de entrada',
      'Stop-loss',
      'Distancia SL',
      'Tamaño de posición',
      'Lote recomendado',
    ],
    exampleTitle: 'Ejemplo',
    exampleIntro:
      'El caso de referencia con el que se prueba GoldRisk, usando la cuenta integrada Exness Standard Cent y XAUUSDc:',
    example: {
      account: 'Cuenta',
      risk: 'Riesgo',
      result: 'Resultado',
      balanceLine: 'Saldo {{amount}} USC',
      riskLine: 'Dirección {{position}} · Entrada {{entry}} · SL {{sl}} · TP {{tp}}',
      recommendedLot: 'Lote recomendado',
    },
    exampleSlDistance: 'Distancia SL',
    exampleExactLot: 'Lote exacto',
    exampleRecommendedLot: 'Lote recomendado',
    exampleRisk: 'Riesgo',
    exampleRiskReward: 'Riesgo / beneficio',
    examplePotentialProfit: 'Beneficio potencial',
    note:
      'Estas cifras reflejan el motor de cálculo actual y probado. Ejecuta la calculadora en vivo para ver los valores exactos de tu propia configuración.',
    howToUseTitle: 'Cómo usar GoldRisk',
    howToUse: [
      'Elige tu cuenta',
      'Introduce tu saldo',
      'Define tu riesgo',
      'Selecciona COMPRA o VENTA',
      'Introduce tu precio de entrada',
      'Introduce tu stop-loss',
      'Introduce opcionalmente un take-profit',
      'Revisa el Lote recomendado',
      'Decide si ejecutas la operación tú mismo',
    ],
    disclaimer:
      'GoldRisk no coloca operaciones. Es una herramienta de cálculo y gestión de riesgo. Tú decides si ejecutas la operación, dónde y con qué broker.',
    mistakesTitle: 'Errores comunes',
    mistakes: [
      { title: 'Elegir un lote solo por el saldo', body: 'Un saldo mayor puede asumir una pérdida mayor, pero el saldo por sí solo nunca indica qué es seguro. La distancia de stop-loss decide qué cabe.' },
      { title: 'Ignorar la distancia de stop-loss', body: 'Un stop-loss amplio con un riesgo fijo implica un lote menor. Elegir primero el lote y dejar que el stop caiga donde caiga elimina tu control.' },
      { title: 'Subir el lote por confianza', body: 'La confianza no cambia las matemáticas. Una operación dimensionada más allá de tu plan de riesgo es una decisión de riesgo, no de trading.' },
      { title: 'Arriesgar demasiado en una sola operación', body: 'Una única pérdida sobredimensionada puede borrar el trabajo de muchas buenas operaciones. Un riesgo pequeño y constante te mantiene en el juego.' },
      { title: 'Confundir el apalancamiento con el riesgo aceptable', body: 'El apalancamiento aumenta el tamaño de la posición; no cambia cuánto deberías perder en una operación. Tu porcentaje de riesgo es lo que te protege.' }
    ],
    ctaTitle: '¿Listo para calcular tu tamaño de posición?',
    ctaBody: 'Inicia sesión y dimensiona tu próxima operación de oro al riesgo que realmente elegiste.',
    ctaButton: 'Inicia sesión y comienza',
    ctaGuide: 'Ver el recorrido completo',
  },

  hiw: {
    eyebrow: 'Recorrido',
    title: 'Cómo funciona GoldRisk',
    intro:
      'GoldRisk convierte tu tolerancia al riesgo y la distancia de stop-loss en un tamaño de posición. Todo el flujo gira en torno a una pregunta: ¿qué tamaño de lote mantiene esta operación dentro del riesgo que elegiste?',
    steps: [
      { title: 'Elige tu cuenta', body: 'Selecciona una cuenta de operación o introduce manualmente tu saldo, divisa y especificación del instrumento.' },
      { title: 'Define el riesgo que aceptas', body: 'Decide cuánto estás dispuesto a perder: un importe fijo en USD o en divisa de la cuenta, o un porcentaje de tu saldo.' },
      { title: 'Define tus niveles', body: 'Introduce tu precio de entrada y stop-loss para el oro. Añade un take-profit opcional para desbloquear el riesgo/beneficio y el beneficio potencial.' },
      { title: 'Obtén tu tamaño de posición', body: 'GoldRisk calcula el lote exacto para tu riesgo, lo redondea hacia abajo al paso de lote de tu broker y te avisa si cae fuera del mínimo/máximo.' },
      { title: 'Revisa y decide', body: 'Comprueba el Lote recomendado, el riesgo real tras el redondeo y el riesgo/beneficio. GoldRisk nunca coloca operaciones: la ejecución siempre es tuya.' }
    ],
    ctaTitle: 'Pruébalo tú mismo',
    ctaBody: 'Aprende primero las matemáticas.',
    ctaButton: 'Guía de tamaño de posición',
  },

  risk: {
    eyebrow: 'Educación',
    title: 'Gestión de riesgo',
    intro:
      'El dimensionamiento es una parte de la gestión de riesgo. El principio central sobre el que se construye GoldRisk es simple: decide cuánto de tu cuenta estás dispuesto a perder en una operación antes de entrar, no después.',
    principles: [
      { title: 'Decide tu riesgo antes de entrar', body: 'Acuerda la cantidad que estás dispuesto a perder mientras la posición sigue siendo una idea, y busca el tamaño que la ajusta.' },
      { title: 'El tamaño sigue al stop-loss', body: 'La distancia de stop-loss y tu importe de riesgo deciden el tamaño de lote, no el saldo ni el optimismo.' },
      { title: 'Mantén el riesgo constante', body: 'Arriesgar una cantidad similar en cada operación mantiene las pérdidas predecibles y permite que una racha de pérdidas siga siendo soportable.' },
      { title: 'Respeta los límites del broker', body: 'Los lotes mínimo y máximo y el paso de lote acotan cada cálculo. GoldRisk redondea hacia abajo, nunca hacia arriba, para no aumentar el riesgo.' }
    ],
    disclaimer:
      'Ninguna calculadora, incluida GoldRisk, predice ni garantiza resultados de mercado. Una posición dimensionada a tu riesgo sigue dependiendo de que el precio se mueva donde esperabas. El trabajo de GoldRisk es solo mantener la pérdida de una operación detenida dentro del importe que elegiste arriesgar.',
    ctaTitle: 'Ponlo en práctica',
    ctaBody: 'Dimensiona tu próxima posición con matemáticas reales.',
    ctaButton: 'Inicia sesión y comienza',
  },

  brokers: {
    eyebrow: 'Referencia',
    title: 'Brokers compatibles',
    intro:
      'GoldRisk te permite configurar la especificación del contrato XAUUSD de cualquier broker en tus cuentas. La lista siguiente es información de referencia sobre tipos de cuenta cent y micro comunes; no afirma que cada especificación haya sido verificada en la calculadora.',
    configuredTitle: 'Entorno configurado actualmente',
    configuredBody:
      'El motor de cálculo incluye Exness Standard Cent y el contrato XAUUSDc (tamaño de contrato 1, lote mínimo 0.01, lote máximo 200, paso de lote 0.01). Puedes añadir cuentas y especificaciones para otros brokers tras iniciar sesión a través de la página Cuentas; pero GoldRisk solo garantiza resultados para las configuraciones que introduces y verificas tú mismo.',
    currentlyConfigured: 'Configurado actualmente',
    reference: 'Referencia',
    note:
      'Los datos de los brokers cambian con frecuencia. Confirma el tamaño de contrato, los límites de lote y el paso actuales en tu plataforma antes de confiar en cualquier cálculo. GoldRisk nunca coloca operaciones y no está afiliado a ninguno de los brokers enumerados.',
    seeInstruments: 'Consulta los instrumentos de oro disponibles abajo:',
    linkInstruments: 'Instrumentos compatibles',
    list: [
      'Cuentas denominadas en centavos para operar oro con saldos pequeños.',
      'Operativa con cuentas cent y CFDs de oro en MetaTrader.',
      'Cuenta cent con CFDs de oro; el entorno de referencia actualmente configurado para XAUUSDc.',
      'Cuentas ProCent en centavos para operadores de menor saldo.',
      'Cuentas cent para operar a escala de práctica con pares de oro.',
      'Cuentas denominadas en centavos con instrumentos de oro.',
      'Las cuentas micro permiten operar con pasos de contrato más pequeños.',
      'Cuentas Standard Cent con CFDs de oro.',
      'Broker minorista que ofrece CFDs de oro en MetaTrader.',
      'Cuentas de spread bruto con precios ajustados en oro.',
    ],
  },

  inst: {
    eyebrow: 'Referencia',
    title: 'Instrumentos compatibles',
    intro:
      'La calculadora está configurada hoy para un entorno: la cuenta Exness Standard Cent operando XAUUSDc. Otros instrumentos pueden añadirse como especificaciones de cuenta, pero GoldRisk no garantiza su configuración hasta que sea verificada.',
    cardSubtitle: 'Oro vs Dólar estadounidense — contrato cent',
    currentlyConfigured: 'Configurado actualmente',
    whatTitle: 'Qué significa XAUUSDc',
    whatBody:
      'XAU es el símbolo del oro, USD es el dólar estadounidense y la "c" final indica el contrato cent ofrecido en cuentas cent. El oro se cotiza en USD por onza troy, y el contrato cent cotiza las posiciones en unidades de una centésima de lote estándar, por lo que los saldos en USC (dólares cent) se corresponden directamente con tamaños nocionales pequeños en USD.',
    contractTitle: 'Contrato configurado',
    contractSize: 'Tamaño del contrato',
    minimumLot: 'Lote mínimo',
    maximumLot: 'Lote máximo',
    lotStep: 'Paso de lote',
    note:
      'Puedes introducir instrumentos y brokers adicionales como especificaciones de cuenta tras iniciar sesión. GoldRisk usará los datos de contrato que proporciones, así que confirma siempre las cifras contra la plataforma de tu broker antes de confiar en un cálculo.',
    seeBrokers: 'Revisa la lista de brokers:',
    linkBrokers: 'Brokers compatibles',
  },

  about: {
    eyebrow: 'Acerca de',
    title: 'Acerca de GoldRisk',
    intro:
      'GoldRisk es una herramienta de cálculo enfocada para operadores de oro. Existe para responder bien una sola pregunta: cuán grande debe ser esta posición según el riesgo que estoy dispuesto a asumir — y nada más.',
    focusTitle: 'En qué nos enfocamos',
    focusBody:
      'Las herramientas de trading suelen derivar hacia el ruido: señales, noticias y predicciones. GoldRisk se mantiene deliberadamente enfocado. Te ofrece un cálculo de tamaño de posición transparente y determinista, guarda tu historial y te permite gestionar las cuentas y especificaciones que realmente operas.',
    notDoTitle: 'Lo que no hacemos',
    notDoBody:
      'GoldRisk no coloca operaciones, gestiona posiciones ni predice mercados. Es una herramienta de cálculo y gestión de riesgo. Cada operación, y cada decisión sobre dónde y si ejecutarla, te pertenece.',
    transparencyTitle: 'Transparencia',
    transparencyBody:
      'El motor de cálculo se prueba contra un caso de referencia documentado, y tu historial guarda las entradas y salidas exactas de cada cálculo para que los resultados puedan revisarse y verificarse siempre.',
  },

  contact: {
    title: 'Contacto',
    description:
      'Se añadirá un formulario de contacto cuando GoldRisk tenga un backend por el que enviar mensajes. Hasta entonces, escríbenos por correo.',
  },

  privacy: {
    title: 'Política de privacidad',
    description:
      'La política de privacidad completa de GoldRisk se está redactando junto con las funciones de cuentas y manejo de datos que describirá. Esta página se sustituirá por la política completa antes del lanzamiento de esas funciones.',
  },

  terms: {
    title: 'Términos de uso',
    description:
      'Los términos de uso completos de GoldRisk se están redactando y aparecerán aquí antes de que se habilite la creación de cuentas.',
  },

  notFound: {
    title: 'Página no encontrada',
    body: 'La página que buscas no existe o se ha movido.',
    back: 'Volver al inicio',
  },

  auth: {
    welcomeBack: 'Bienvenido de nuevo',
    loginSubtitle: 'Inicia sesión en tu espacio de trabajo GoldRisk.',
    email: 'Correo electrónico',
    password: 'Contraseña',
    emailPlaceholder: 'you@example.com',
    passwordPlaceholder: '••••••••',
    loggingIn: 'Iniciando sesión…',
    login: 'Iniciar sesión',
    noAccount: '¿Nuevo en GoldRisk?',
    createAccount: 'Crear una cuenta',
    createTitle: 'Crea tu cuenta',
    createSubtitle: 'Una cuenta para tus cuentas, historial y dimensionamiento de posición.',
    name: 'Nombre',
    namePlaceholder: 'Tu nombre',
    passwordTooShort: 'La contraseña debe tener al menos 8 caracteres.',
    passwordsDoNotMatch: 'Las contraseñas no coinciden.',
    confirmPassword: 'Confirmar contraseña',
    confirmPlaceholder: 'Repite tu contraseña',
    creatingAccount: 'Creando cuenta…',
    createButton: 'Crear cuenta',
    hasAccount: '¿Ya tienes una cuenta?',
    nameRequired: 'Introduce tu nombre.',
    passwordPlaceholderLong: 'Al menos 8 caracteres',
    or: 'o',
    continueWithGoogle: 'Continuar con Google',
    signUpWithGoogle: 'Regístrate con Google',
    googleSignInFailed: 'El inicio de sesión con Google falló. Inténtalo de nuevo o usa el correo electrónico y la contraseña.',
  },

  calcPage: {
    title:'Calculadora de Tamaño de Posición',    subtitle: 'Calcula el tamaño del lote para tu operación de XAUUSD según el riesgo que has definido.',
    historyNotePre: 'Los cálculos guardados aparecen en la página ',
    historyNotePost: ', donde puedes revisar las entradas y resultados exactos en cualquier momento.',
  },

  calc: {
    tradeInputs: 'Datos de la operación',
    tradeSetup: 'Configuración de la operación',
    currencyChipUsc: '{{value}} {{currency}} = $1',
    currencyChipUsd: 'Cuenta en USD',
    loadingAccounts: 'Cargando cuentas guardadas…',
    loadingOptions: 'Cargando…',
    tradingAccount: 'Cuenta de trading',
    builtIn: '{{name}} (integrada)',
    basic: 'Básico',
    advanced: 'Avanzado',
    symbol: 'Símbolo',
    contractSize: 'Tamaño del contrato',
    minMaxLot: 'Lote mín. / máx.',
    lotStep: 'Paso de lote',
    accountCurrency: 'Divisa de la cuenta',
    usdConversion: 'Conversión a USD',
    usdConversionValue: '1 USD = {{value}}',
    broker: 'Broker',
    riskMode: 'Modo de riesgo',
    riskModePercentage: 'Porcentaje del saldo',
    riskModeFixed: 'Importe fijo (USD)',
    riskModeAccountCurrency: 'Divisa de la cuenta',
    riskAmount: 'Importe de riesgo',
    position: 'Posición',
    buy: 'Comprar',
    sell: 'Vender',
    entryPrice: 'Precio de entrada',
    stopLoss: 'Stop-loss',
    takeProfit: 'Take-profit',
    tpHint: 'Opcional: habilita riesgo/beneficio y beneficio potencial',
    checkInputs: 'Revisa tus datos',
    fixSetup: 'Corrige la configuración de la operación',
    calculate: 'Calcular',
    clear: 'Limpiar',
    saveCalculation: 'Guardar cálculo',
    saving: 'Guardando…',
    saved: 'Guardado en el historial.',
    saveFailed: 'No se pudo guardar. Inténtalo de nuevo.',
    loginToSave: 'para guardar cálculos en tu historial.',
  },

  result: {
    recommendedLot: 'Lote recomendado',
    positionResult: 'Resultado de la posición',
    copyLot: 'Copiar lote',
    copied: 'Copiado',
    lotNote: 'El riesgo nunca supera el importe definido: se redondea hacia abajo al paso de lote del broker.',
    exactLot: 'Tamaño de lote exacto',
    lots: 'lotes',
    slDistance: 'Distancia de stop-loss',
    intendedRisk: 'Riesgo previsto',
    actualRisk: 'Riesgo real (redondeado)',
    riskReward: 'Riesgo / beneficio',
    potentialProfit: 'Beneficio potencial',
    empty:
      'Introduce los datos de tu operación y pulsa Calcular. Las pérdidas pueden superar rápidamente tu presupuesto: revisa el riesgo real antes de colocar la orden.',
    invalid: 'Nada que mostrar hasta que los datos pasen las comprobaciones de configuración.',
  },

  marquee: {
    label: 'Anuncios de GoldRisk',
    welcome: 'Bienvenido a GoldRisk, la calculadora de tamaño de posición para XAUUSD.',
    tagline: 'Ajusta cada operación de oro al riesgo que realmente elegiste.',
    slogan: 'Tamaño de posición de precisión, hasta el paso de lote de tu broker.',
    newUsers: '¿Nuevo en GoldRisk?',
    existingUsers: '¿Ya tienes cuenta?',
  },

  calcGuide: {
    title: 'Cómo calcula GoldRisk el tamaño de posición',
    intro:
      'Tu saldo define cuánto puedes arriesgar, tu stop loss define dónde la operación deja de ser aceptable y la distancia entre tu entrada y tu stop loss se convierte en un tamaño de lote. Un camino determinista, sin conjeturas.',
    steps: [
      {
        title: 'Saldo de la cuenta',
        body: 'Tu capital inicial, en la moneda de la cuenta (p. ej. USC en una cuenta cent). El riesgo que aceptas se expresa sobre esto.',
      },
      {
        title: 'Monto de riesgo',
        body: 'Cuánto estás dispuesto a perder, elegido como porcentaje del saldo, monto fijo en USD o monto fijo en la moneda de la cuenta.',
      },
      {
        title: 'Distancia de stop loss',
        body: 'La diferencia absoluta entre tu precio de entrada y tu stop loss, en el lado correcto del precio para COMPRA o VENTA.',
      },
      {
        title: 'Especificación del contrato',
        body: 'Tamaño del contrato, lote mínimo y máximo y paso de lote del instrumento: las reglas del broker que el resultado debe cumplir.',
      },
      {
        title: 'Tamaño exacto de posición',
        body: 'GoldRisk divide el valor expuesto de un lote entre la distancia de stop loss y lo escala hasta tu monto de riesgo.',
      },
      {
        title: 'Redondeo del paso de lote',
        body: 'El lote exacto se redondea hacia abajo hasta el paso de lote de tu broker. Así el riesgo real queda en o por debajo de lo que elegiste.',
      },
      {
        title: 'Lote recomendado',
        body: 'El tamaño final y ejecutable. GoldRisk te avisa cuando queda por debajo del mínimo o por encima del máximo.',
      },
    ],
    topics: [
      {
        title: 'Por qué importa el stop loss',
        body: 'El stop loss es el único precio que controlas y que define tu peor pérdida aceptable. Sin él, el tamaño de posición no tiene ancla.',
      },
      {
        title: 'Por qué importa el porcentaje de riesgo',
        body: 'Un porcentaje constante mantiene cada operación lo bastante pequeña para que una racha de pérdidas siga siendo sobrevivable: la matemática que te mantiene operando.',
      },
      {
        title: '¿Qué es el lote recomendado?',
        body: 'Es el lote más grande que tu broker permite en o por debajo de tu riesgo elegido. El riesgo real puede ser menor, nunca mayor.',
      },
      {
        title: 'GoldRisk y XAUUSDc',
        body: 'GoldRisk viene configurado para Exness Standard Cent y el contrato XAUUSDc (tamaño de contrato 1, lote mínimo 0.01, lote máximo 200, paso 0.01).',
      },
    ],
  },

  accounts: {
    title: 'Cuentas de trading',
    subtitleEmpty:
      'Crea una cuenta para usar su saldo y especificaciones de instrumento en la calculadora.',
    subtitleOne: '{{count}} cuenta — la calculadora la usa para saldo, divisa y límites de lote.',
    subtitleMany: '{{count}} cuentas — la calculadora las usa para saldo, divisa y límites de lote.',
    newAccount: 'Nueva cuenta',
    createAccount: 'Crear cuenta',
    editAccount: 'Editar {{name}}',
    saveChanges: 'Guardar cambios',
    cancel: 'Cancelar',
    saving: 'Guardando…',
    unableToLoad: 'No se pudieron cargar tus cuentas',
    retry: 'Reintentar',
    loading: 'Cargando cuentas…',
    emptyTitle: 'Aún no hay cuentas',
    emptyBody:
      'Crea tu primera cuenta de trading — por ejemplo la Exness Standard Cent con XAUUSDc — y la calculadora podrá cargar automáticamente su saldo y límites de lote.',
    emptyCreate: 'Crear cuenta',
    delete: 'Eliminar',
    confirm: 'Confirmar eliminación',
    edit: 'Editar',
    default: 'Predeterminada',
    active: 'Activa',
    inactive: 'Inactiva',
    balance: 'Saldo',
    usdConversion: 'Conversión a USD',
    usdConversionValue: '1 USD = {{value}}',
    currency: 'Divisa',
    created: 'Creada',
    symbol: 'Símbolo',
    contractSize: 'Tamaño del contrato',
    minLot: 'Lote mín.',
    maxLot: 'Lote máx.',
    lotStep: 'Paso de lote',
    specTitle: 'Especificaciones del símbolo',
    addSpec: '+ Añadir especificación',
    loadingSpecs: 'Cargando especificaciones…',
    noSpecs: 'Aún no hay especificaciones. Añade una para usar esta cuenta en la calculadora.',
    specContract: 'Contrato',
    specMinMax: 'Mín. / Máx.',
    specStep: 'Paso',
    accountName: 'Nombre de la cuenta',
    broker: 'Broker',
    accountType: 'Tipo de cuenta',
    usdConversionLabel: 'Conversión a USD',
    usdConversionHint: 'Unidades de divisa de la cuenta por 1 USD (100 para cuentas cent)',
    balanceLabel: 'Saldo',
    accountNameRequired: 'El nombre de la cuenta es obligatorio.',
    brokerRequired: 'El broker es obligatorio.',
    accountTypeRequired: 'El tipo de cuenta es obligatorio.',
    currencyRequired: 'La divisa es obligatoria.',
    positiveValue: 'Introduce un valor mayor que 0.',
    nonNegativeValue: 'Introduce un valor mayor o igual que 0.',
    symbolRequired: 'El símbolo es obligatorio.',
    minMaxConflict: 'El lote mínimo no puede superar el lote máximo.',
    stepConflict: 'El paso de lote no puede superar el lote máximo.',
  },

  history: {
    title: 'Historial de cálculos',
    subtitleEmpty: 'Tus cálculos guardados aparecerán aquí.',
    subtitleCount: '{{count}} cálculo',
    subtitleCountOther: '{{count}} cálculos',
    unableToLoad: 'No se pudo cargar tu historial de cálculos',
    apiUnreachable: 'La API no es accesible desde este entorno.',
    tryAgain: 'Inténtalo de nuevo.',
    retry: 'Reintentar',
    loading: 'Cargando historial…',
    emptyTitle: 'Aún no hay historial de cálculos',
    emptyBody: 'Tus cálculos guardados aparecerán aquí después de calcular una posición.',
    goToCalculator: 'Ir a la calculadora',
    details: 'Detalles',
    delete: 'Eliminar',
    lot: 'Lote',
    entry: 'Entrada',
    savedAt: '{{date}} a las {{time}}',
  },

  modal: {
    detailLabel: 'Detalles del cálculo',
    savedAt: 'Guardado el {{date}} a las {{time}}',
    closeDetails: 'Cerrar detalles',
    close: 'Cerrar',
    loading: 'Cargando detalles…',
    unableToLoad: 'No se pudo cargar este cálculo',
    accountBroker: 'Cuenta / broker',
    calculationId: 'ID del cálculo',
    instrument: 'Instrumento',
    direction: 'Dirección',
    entryPrice: 'Precio de entrada',
    balance: 'Saldo',
    riskMode: 'Modo de riesgo',
    riskAmount: 'Importe de riesgo',
    stopLoss: 'Stop-loss',
    takeProfit: 'Take-profit',
    contractSize: 'Tamaño del contrato',
    results: 'Resultados',
    slDistance: 'Distancia SL',
    exactLot: 'Lote exacto',
    recommendedLot: 'Lote recomendado',
    actualRisk: 'Riesgo real',
    riskReward: 'Riesgo / beneficio',
    potentialProfit: 'Beneficio potencial',
    ariaLabel: 'Detalles del cálculo {{position}} {{symbol}}',
  },

  engine: {
    entryValid: 'Introduce un precio de entrada válido.',
    entryRequired: 'El precio de entrada es obligatorio.',
    stopLossValid: 'Introduce un stop-loss válido.',
    stopLossRequired: 'El Stop-loss es obligatorio.',
    riskValid: 'Introduce un importe de riesgo válido.',
    riskRequired: 'El importe de riesgo es obligatorio.',
    balanceValid: 'Introduce un saldo de cuenta válido.',
    balanceRequiredForPercent:
      'El saldo de la cuenta es obligatorio cuando se usa un riesgo porcentual.',
    entryGreaterThanZero: 'El precio de entrada debe ser mayor que cero.',
    stopLossGreaterThanZero: 'El Stop-loss debe ser mayor que cero.',
    riskGreaterThanZero: 'El importe de riesgo debe ser mayor que cero.',
    balanceGreaterThanZeroPercent:
      'El saldo de la cuenta debe ser mayor que cero al usar un riesgo porcentual.',
    identical: 'La entrada y el Stop-loss no pueden ser idénticos.',
    buySlBelow: 'Para COMPRA, el Stop-loss debe estar por debajo del precio de entrada.',
    buyTpAbove: 'Para COMPRA, el Take-profit debe estar por encima del precio de entrada.',
    sellSlAbove: 'Para VENTA, el Stop-loss debe estar por encima del precio de entrada.',
    sellTpBelow: 'Para VENTA, el Take-profit debe estar por debajo del precio de entrada.',
    lotBelowMin:
      'El lote requerido ({{exact}}) está por debajo del mínimo de {{min}} del broker. Usar el lote mínimo podría superar el riesgo seleccionado.',
    lotExceedsMax:
      'El lote requerido supera el máximo de {{max}} del broker. El riesgo queda limitado por el lote máximo y el riesgo real será menor que el previsto.',
  }
}

export default es

