/**
 * French (Français) dictionary. Must satisfy the same shape as `en`.
 */
const fr = {
  navigation: {
    calculator: 'Calculateur',
    howItWorks: 'Fonctionnement',
    riskManagement: 'Gestion du risque',
    supportedBrokers: 'Brokers pris en charge',
    supportedInstruments: 'Instruments pris en charge',
    about: 'À propos',
    contact: 'Contact',
    privacy: 'Politique de confidentialité',
    terms: "Conditions d'utilisation",
    accounts: 'Comptes',
    history: 'Historique',
    login: 'Se connecter',
    getStarted: 'Commencer',
    logout: 'Se déconnecter',
    language: 'Langue',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    signedInAs: 'Connecté en tant que {{email}},',
    showPassword: 'Afficher le mot de passe',
    hidePassword: 'Masquer le mot de passe',
    switchToLight: 'Passer au thème clair',
    switchToDark: 'Passer au thème sombre',
    home: 'Accueil GoldRisk',
  },

  footer: {
    tagline: 'Calculateur de risque pour traders XAUUSD',
    navigation: 'Navigation',
    legal: 'Mentions légales',
    disclaimer: 'Avis de non-responsabilité',
    disclaimerText:
      "GoldRisk est un outil de calcul ; il n'exécute aucune transaction et ne fournit aucun conseil financier.",
    copyright: '© {{year}} GoldRisk. Tous droits réservés.',
  },

  common: {
    loading: 'Chargement',
    somethingWentWrong: "Une erreur s'est produite",
    close: 'Fermer',
    retry: 'Réessayer',
  },

  home: {
    hero: {
      badge: 'Dimensionnement de Position XAUUSD',
      title: 'Connaissez votre risque avant d’entrer.',
      body: 'GoldRisk calcule la taille de position de votre opération XAUUSD à partir du solde de votre compte, de votre risque, de votre prix d’entrée et de votre stop loss.',
      primaryCta: 'Calculer Votre Position',
      secondaryCta: 'Comment Ça Marche',
    },
    preview: {
      account: 'EXNESS STANDARD CENT',
      symbol: 'XAUUSDc',
      balance: 'Solde',
      risk: 'Risque',
      position: 'Position',
      entry: 'Entrée',
      stopLoss: 'Stop Loss',
      takeProfit: 'Take Profit',
      recommendedLot: 'Lot Recommandé',
      slDistance: 'Distance SL',
      riskReward: 'Risque / Récompense',
    },
    problem: {
      eyebrow: 'Le Problème',
      title: 'Un dimensionnement de position sans approximations',
      body: 'Les positions surdimensionnées sont la manière dont la plupart des comptes meurent. Sans méthode fixe, le risque est décidé par l’impression — et le marché ne se soucie pas de votre confiance au moment d’entrer.',
    },
    workflow: {
      eyebrow: 'Comment ça marche',
      title: 'Trois étapes vers une position adaptée à votre risque',
      steps: [
        {
          title: 'Définissez Votre Risque',
          body: 'Choisissez le montant que vous acceptez de perdre, en montant fixe ou en pourcentage de votre solde.',
        },
        {
          title: 'Définissez Votre Opération',
          body: 'Saisissez votre entrée, votre stop loss et un take profit facultatif pour la position sur l’or.',
        },
        {
          title: 'Obtenez Votre Taille de Position',
          body: 'GoldRisk convertit votre risque et votre distance de stop en taille de lot — arrondie au pas de votre broker.',
        }
      ],
    },
    features: {
      eyebrow: 'Pourquoi GoldRisk',
      title: 'Conçu pour les traders qui respectent le risque',
      cards: [
        {
          title: 'Dimensionnement de Précision',
          body: 'Le lot découle de votre risque et de votre distance de stop, pas de la taille du solde ni de l’intuition. Des maths exactes, jusqu’au pas de lot de votre broker.',
        },
        {
          title: 'Calculs Axés sur le Risque',
          body: 'Vous décidez ce que vous acceptez de perdre avant même que le chiffre existe. Le calcul sert cette décision.',
        },
        {
          title: 'Configuration Rapide',
          body: 'Choisissez un compte, fixez le risque, marquez vos niveaux et appuyez sur Calculer. Une position entièrement dimensionnée en quelques secondes.',
        },
        {
          title: 'Historique des Calculs',
          body: 'Chaque calcul enregistré conserve ses entrées et sorties exactes, pour revoir vos décisions plus tard.',
        }
      ],
    },
    education: {
      eyebrow: 'Gestion du risque',
      title: 'Les cinq idées d’un dimensionnement sûr',
      items: [
        {
          title: 'Risque par opération',
          body: 'Décidez du maximum que vous perdrez si l’opération est stoppée — en général un petit pourcentage fixe de votre compte.',
        },
        {
          title: 'Discipline du stop loss',
          body: 'Votre stop loss définit la pire perte acceptable de l’opération. Sans lui, la taille de position n’a aucun sens.',
        },
        {
          title: 'Taille de position',
          body: 'La taille du lot est le levier qui transforme votre distance de stop en exactement le risque accepté.',
        },
        {
          title: 'Récompense / risque',
          body: 'Comparez votre distance de take profit à votre distance de stop loss avant d’entrer. Des ratios favorables laissent à l’opération la place d’avoir raison.',
        },
        {
          title: 'Pourquoi la taille du lot compte',
          body: 'Un lot surdimensionné peut effacer le travail de dizaines de trades disciplinés. Le dimensionnement protège votre survie.',
        }
      ],
    },
    environment: {
      eyebrow: 'Environnement de trading',
      title: 'Configuré pour l’environnement de référence',
      body: 'GoldRisk est livré configuré pour Exness Standard Cent et XAUUSDc. D’autres brokers et instruments peuvent être ajoutés après connexion comme vos propres spécifications de compte.',
      currentlyConfigured: 'Actuellement configuré',
    },
    security: {
      eyebrow: 'Sécurité et comptes',
      title: 'Vos données restent les vôtres',
      cards: [
        {
          title: 'Authentification sécurisée',
          body: 'Les comptes sont protégés par une authentification type JWT. Votre session est privée sur votre appareil.',
        },
        {
          title: 'Données de compte privées',
          body: 'Vos comptes de trading et soldes ne sont visibles que par vous. Stockez des spécifications pour les réutiliser dans la calculatrice.',
        },
        {
          title: 'Comptes de trading enregistrés',
          body: 'Gardez vos brokers, types de compte, devises et contrats d’instruments prêts pour un dimensionnement en un clic.',
        },
        {
          title: 'Historique des calculs',
          body: 'Un journal persistant de chaque calcul, avec les entrées et résultats exacts.',
        }
      ],
    },
    finalCta: {
      title: 'Transformez votre configuration en taille de position précise.',
      body: 'Ouvrez la calculatrice GoldRisk et dimensionnez votre prochaine opération sur l’or au risque que vous avez réellement choisi.',
      button: 'Ouvrir la Calculatrice GoldRisk',
    }
  },

  psc: {
    eyebrow: 'Guide public',
    title: 'Calculateur de taille de position',
    intro:
      'Le dimensionnement de position est la pratique qui consiste à décider de la taille d’un trade selon le montant que tu es prêt à risquer. Cette page explique l’idée, ce qu’elle exige de toi et comment GoldRisk la transforme en taille de lots.',
    whatIsTitle: 'Qu’est-ce que le dimensionnement de position ?',
    whatIsBody:
      'Le dimensionnement détermine la taille d’un trade selon le montant que le trader est prêt à risquer. Au lieu de se demander « combien puis-je acheter ? », il demande « combien suis-je prêt à perdre si ce trade va contre moi ? » et calcule le trade à l’envers à partir de cette réponse.',
    whyTitle: 'Pourquoi c’est important',
    whyBody:
      'Le dimensionnement protège le capital de trading, le risque se maîtrise, il évite les trades surdimensionnés et garde le risque constant d’un trade à l’autre. Il relie la taille de ton compte, ton stop-loss et la taille de ta position dans un plan cohérent : aucun trade unique ne peut gravement endommager ton compte.',
    requiredTitle: 'Que faut-il pour calculer une taille de position ?',
    required: [
      { title: 'Solde du compte', body: 'Ton point de départ : le capital du compte avec lequel tu prévois de trader.' },
      { title: 'Montant ou pourcentage de risque', body: 'Combien de ce solde tu acceptes de perdre si le trade atteint son stop-loss.' },
      { title: 'ACHAT ou VENTE', body: 'La direction de ta position, qui détermine de quel côté du prix ton stop-loss doit se trouver.' },
      { title: 'Prix d’entrée', body: 'Le prix auquel tu prévois d’ouvrir la position.' },
      { title: 'Stop-loss', body: 'Le prix où le trade est clos en perte. Sa distance depuis l’entrée détermine la taille de lots.' },
      { title: 'Take-profit (facultatif)', body: 'Le prix où le trade est clos en profit. Facultatif, mais il active le rapport risque/bénéfice et le bénéfice potentiel.' },
      { title: 'Spécifications instrument / compte', body: 'La taille du contrat, les lots minimum et maximum ainsi que le pas de lots de l’instrument que tu négocies.' }
    ],
    howTitle: 'Comment fonctionne GoldRisk',
    howBody:
      'GoldRisk suit un seul chemin : ton solde définit ton montant de risque, ton entrée et ton stop-loss définissent la distance de stop-loss, et cette distance convertit le risque en une taille de lots.',
    flow: [
      'Solde du compte',
      'Montant de risque',
      'Prix d’entrée',
      'Stop-loss',
      'Distance SL',
      'Taille de position',
      'Lots recommandés',
    ],
    exampleTitle: 'Exemple',
    exampleIntro:
      'Le cas de référence utilisé pour tester GoldRisk, avec le compte intégré Exness Standard Cent et XAUUSDc :',
    example: {
      account: 'Compte',
      risk: 'Risque',
      result: 'Résultat',
      balanceLine: 'Solde {{amount}}, USC',
      riskLine: 'Direction {{position}}, · Entrée {{entry}}, · SL {{sl}}, · TP {{tp}},',
      recommendedLot: 'Lots recommandés',
    },
    exampleSlDistance: 'Distance SL',
    exampleExactLot: 'Lots exacts',
    exampleRecommendedLot: 'Lots recommandés',
    exampleRisk: 'Risque',
    exampleRiskReward: 'Risque / bénéfice',
    examplePotentialProfit: 'Bénéfice potentiel',
    note:
      'Ces chiffres reflètent le moteur de calcul actuel et testé. Exécute le calculateur en direct pour voir les valeurs exactes de ta propre configuration.',
    howToUseTitle: 'Comment utiliser GoldRisk',
    howToUse: [
      'Choisis ton compte',
      'Saisis ton solde',
      'Définis ton risque',
      'Sélectionne ACHAT ou VENTE',
      'Saisis ton prix d’entrée',
      'Saisis ton stop-loss',
      'Saisis éventuellement un take-profit',
      'Vérifie les lots recommandés',
      'Décide toi-même d’exécuter le trade',
    ],
    disclaimer:
      'GoldRisk ne passe pas d’ordres. C’est un outil de calcul et de gestion du risque. C’est toi qui décides d’exécuter le trade, où et avec quel broker.',
    mistakesTitle: 'Erreurs courantes',
    mistakes: [
      { title: 'Choisir les lots uniquement selon le solde', body: 'Un solde plus élevé peut encaisser une perte plus élevée, mais le solde seul ne dit jamais ce qui est sûr. La distance de stop-loss décide de ce qui est possible.' },
      { title: 'Ignorer la distance de stop-loss', body: 'Un stop-loss large avec un risque fixe implique des lots plus petits. Choisir d’abord les lots puis laisser le stop tomber où il veut supprime ton contrôle.' },
      { title: 'Augmenter les lots par confiance', body: 'La confiance ne change pas les mathématiques. Un trade dimensionné au-delà de ton plan de risque est une décision de risque, pas une décision de trading.' },
      { title: 'Risquer trop sur un seul trade', body: 'Une seule perte surdimensionnée peut effacer le travail de nombreux bons trades. Un risque faible et constant te garde dans la partie.' },
      { title: 'Confondre le levier et le risque acceptable', body: 'Le levier augmente la taille de la position ; il ne change pas combien tu devrais perdre sur un trade. Ton pourcentage de risque est ce qui te protège.' }
    ],
    ctaTitle: 'Prêt à calculer la taille de ta position ?',
    ctaBody: 'Connecte-toi et dimensionne ton prochain trade sur l’or au risque que tu as réellement choisi.',
    ctaButton: 'Se connecter pour commencer',
    ctaGuide: 'Voir le parcours complet',
  },

  hiw: {
    eyebrow: 'Parcours',
    title: 'Comment fonctionne GoldRisk',
    intro:
      'GoldRisk convertit ta tolérance au risque et ta distance de stop-loss en une taille de position. Tout le flux tourne autour d’une question : quelle taille de lots garde ce trade dans le risque que tu as choisi ?',
    steps: [
      { title: 'Choisis ton compte', body: 'Sélectionne un compte de trading ou saisis manuellement ton solde, ta devise et la spécification d’instrument.' },
      { title: 'Définis le risque que tu acceptes', body: 'Décide combien tu es prêt à perdre : un montant fixe en USD ou en devise du compte, ou un pourcentage de ton solde.' },
      { title: 'Définis tes niveaux', body: 'Saisis ton prix d’entrée et ton stop-loss pour l’or. Ajoute un take-profit facultatif pour débloquer le rapport risque/bénéfice et le bénéfice potentiel.' },
      { title: 'Obtiens la taille de ta position', body: 'GoldRisk calcule les lots exacts pour ton risque, les arrondit au pas de lots de ton broker et te prévient si la taille sort des limites minimum/maximum.' },
      { title: 'Vérifie et décide', body: 'Contrôle les lots recommandés, le risque réel après arrondi et le rapport risque/bénéfice. GoldRisk ne passe jamais d’ordres : l’exécution t’appartient toujours.' }
    ],
    ctaTitle: 'Essaie par toi-même',
    ctaBody: 'Apprends d’abord les mathématiques.',
    ctaButton: 'Guide de dimensionnement de position',
  },

  risk: {
    eyebrow: 'Formation',
    title: 'Gestion du risque',
    intro:
      'Le dimensionnement n’est qu’une partie de la gestion du risque. Le principe central sur lequel GoldRisk est construit est simple : décide combien de ton compte tu acceptes de perdre sur un trade avant d’entrer, pas après.',
    principles: [
      { title: 'Décide ton risque avant d’entrer', body: 'Conviens du montant que tu acceptes de perdre tant que la position n’est qu’une idée, puis cherche la taille qui l’ajuste.' },
      { title: 'La taille suit le stop-loss', body: 'La distance de stop-loss et ton montant de risque décident de la taille des lots, pas le solde ni l’optimisme.' },
      { title: 'Maintiens le risque constant', body: 'Risquer un montant similaire sur chaque trade rend les pertes prévisibles et permet à une série de pertes de rester supportable.' },
      { title: 'Respecte les limites du broker', body: 'Les lots minimum et maximum ainsi que le pas de lots bornent chaque calcul. GoldRisk arrondit vers le bas, jamais vers le haut, pour ne pas augmenter le risque.' }
    ],
    disclaimer:
      'Aucun calculateur, y compris GoldRisk, ne prédit ni ne garantit les résultats du marché. Une position dimensionnée à ton risque dépend toujours du fait que le prix aille dans la direction attendue. Le travail de GoldRisk est seulement de garder la perte d’un trade stoppée dans le montant que tu as choisi de risquer.',
    ctaTitle: 'Mets-le en pratique',
    ctaBody: 'Dimensionne ta prochaine position avec de vraies mathématiques.',
    ctaButton: 'Se connecter pour commencer',
  },

  brokers: {
    eyebrow: 'Référence',
    title: 'Brokers pris en charge',
    intro:
      'GoldRisk te permet de configurer la spécification du contrat XAUUSD de n’importe quel broker dans tes comptes. La liste suivante est une information de référence sur les types de comptes cent et micro courants ; elle n’affirme pas que chaque spécification a été vérifiée dans le calculateur.',
    configuredTitle: 'Environnement actuellement configuré',
    configuredBody:
      'Le moteur de calcul inclut Exness Standard Cent et le contrat XAUUSDc (taille du contrat 1, lot minimum 0.01, lot maximum 200, pas de lots 0.01). Tu peux ajouter des comptes et spécifications pour d’autres brokers après connexion via la page Comptes ; mais GoldRisk ne garantit les résultats que pour les configurations que tu saisis et vérifies toi-même.',
    currentlyConfigured: 'Actuellement configuré',
    reference: 'Référence',
    note:
      'Les données des brokers évoluent souvent. Confirme la taille du contrat, les limites de lots et le pas actuels sur ta plateforme avant de te fier à un calcul. GoldRisk ne passe jamais d’ordres et n’est affilié à aucun des brokers listés.',
    seeInstruments: 'Voir les instruments or disponibles ci-dessous :',
    linkInstruments: 'Instruments pris en charge',
    list: [
      'Comptes libellés en cents pour trader l’or avec de petits soldes.',
      'Trading de comptes cent et de CFD or via MetaTrader.',
      'Compte cent avec CFD or ; l’environnement de référence actuellement configuré pour XAUUSDc.',
      'Comptes ProCent en cents pour les traders aux soldes plus modestes.',
      'Comptes cent pour trader à l’échelle d’entraînement les paires or.',
      'Comptes libellés en cents avec instruments or.',
      'Les comptes micro permettent de trader avec de plus petits pas de contrat.',
      'Comptes Standard Cent avec CFD or.',
      'Broker de détail proposant des CFD or sur MetaTrader.',
      'Comptes à spread brut avec prix ajustés sur l’or.',
    ],
  },

  inst: {
    eyebrow: 'Référence',
    title: 'Instruments pris en charge',
    intro:
      'Le calculateur est aujourd’hui configuré pour un seul environnement : le compte Exness Standard Cent négociant XAUUSDc. D’autres instruments peuvent être ajoutés comme spécifications de compte, mais GoldRisk ne garantit pas leur configuration tant qu’elle n’est pas vérifiée.',
    cardSubtitle: 'Or contre dollar américain — contrat cent',
    currentlyConfigured: 'Actuellement configuré',
    whatTitle: 'Ce que signifie XAUUSDc',
    whatBody:
      'XAU est le symbole de l’or, USD le dollar américain et le « c » final indique le contrat cent proposé sur les comptes cent. L’or est coté en USD par once troy, et le contrat cent exprime les positions en unités d’un centième de lot standard, de sorte que les soldes en USC (dollars cent) correspondent directement à de petits montants notionnels en USD.',
    contractTitle: 'Contrat configuré',
    contractSize: 'Taille du contrat',
    minimumLot: 'Lot minimum',
    maximumLot: 'Lot maximum',
    lotStep: 'Pas de lots',
    note:
      'Tu peux saisir des instruments et brokers supplémentaires comme spécifications de compte après connexion. GoldRisk utilisera les données de contrat que tu fournis, alors vérifie toujours les chiffres sur la plateforme de ton broker avant de te fier à un calcul.',
    seeBrokers: 'Consulte la liste des brokers :',
    linkBrokers: 'Brokers pris en charge',
  },

  about: {
    eyebrow: 'À propos',
    title: 'À propos de GoldRisk',
    intro:
      'GoldRisk est un outil de calcul ciblé pour les traders sur l’or. Il existe pour bien répondre à une seule question : quelle taille doit avoir cette position selon le risque que je suis prêt à prendre — et rien de plus.',
    focusTitle: 'Ce sur quoi nous nous concentrons',
    focusBody:
      'Les outils de trading dérivent souvent vers le bruit : signaux, actualités, prédictions. GoldRisk reste volontairement ciblé. Il fournit un calcul de dimensionnement transparent et déterministe, enregistre ton historique et te permet de gérer les comptes et spécifications que tu négocies réellement.',
    notDoTitle: 'Ce que nous ne faisons pas',
    notDoBody:
      'GoldRisk ne passe pas d’ordres, ne gère pas de positions et ne prédit pas les marchés. C’est un outil de calcul et de gestion du risque. Chaque trade, et chaque décision sur où exécuter et s’il faut exécuter, t’appartient.',
    transparencyTitle: 'Transparence',
    transparencyBody:
      'Le moteur de calcul est testé contre un cas de référence documenté, et ton historique enregistre les entrées et sorties exactes de chaque calcul afin que les résultats puissent toujours être revus et vérifiés.',
  },

  contact: {
    title: 'Contact',
    description:
      'Un formulaire de contact sera ajouté lorsque GoldRisk disposera d’un backend par lequel envoyer les messages. En attendant, écris-nous par e-mail.',
  },

  privacy: {
    title: 'Politique de confidentialité',
    description:
      'La politique de confidentialité complète de GoldRisk est rédigée en même temps que les fonctions de comptes et de traitement des données qu’elle décrira. Cette page sera remplacée par la politique complète avant le lancement de ces fonctions.',
  },

  terms: {
    title: "Conditions d'utilisation",
    description:
      'Les conditions d’utilisation complètes de GoldRisk sont en cours de rédaction et apparaîtront ici avant l’activation de la création de comptes.',
  },

  notFound: {
    title: 'Page introuvable',
    body: 'La page que tu cherches n’existe pas ou a été déplacée.',
    back: 'Retour à l’accueil',
  },

  auth: {
    welcomeBack: 'Bon retour',
    loginSubtitle: 'Connecte-toi à ton espace de travail GoldRisk.',
    email: 'Adresse e-mail',
    password: 'Mot de passe',
    emailPlaceholder: 'vous@exemple.com',
    passwordPlaceholder: '••••••••',
    loggingIn: 'Connexion…',
    login: 'Se connecter',
    noAccount: 'Nouveau sur GoldRisk ?',
    createAccount: 'Créer un compte',
    createTitle: 'Crée ton compte',
    createSubtitle: 'Un compte pour tes comptes, ton historique et le dimensionnement de position.',
    name: 'Nom',
    namePlaceholder: 'Ton nom',
    passwordTooShort: 'Le mot de passe doit comporter au moins 8 caractères.',
    passwordsDoNotMatch: 'Les mots de passe ne correspondent pas.',
    confirmPassword: 'Confirmer le mot de passe',
    confirmPlaceholder: 'Répète ton mot de passe',
    creatingAccount: 'Création du compte…',
    createButton: 'Créer le compte',
    hasAccount: 'Tu as déjà un compte ?',
    nameRequired: 'Saisis ton nom.',
    passwordPlaceholderLong: 'Au moins 8 caractères',
    or: 'ou',
    continueWithGoogle: 'Continuer avec Google',
    signUpWithGoogle: "S'inscrire avec Google",
    googleUnavailable:
      "La connexion avec Google n'est pas encore disponible. Utilisez pour l'instant l'e-mail et le mot de passe.",
  },

  calcPage: {
    title:'Calculateur de taille de position',    subtitle: 'Calculez la taille du lot de votre opération XAUUSD en fonction du risque que vous avez défini.',
    historyNotePre: 'Les calculs enregistrés apparaissent sur la page ',
    historyNotePost: ', où tu peux consulter les entrées et résultats exacts à tout moment.',
  },

  calc: {
    tradeInputs: 'Détails du trade',
    tradeSetup: 'Configuration de l’opération',
    currencyChipUsc: '{{value}} {{currency}} = 1 $',
    currencyChipUsd: 'Compte en USD',
    loadingAccounts: 'Chargement des comptes enregistrés…',
    loadingOptions: 'Chargement…',
    tradingAccount: 'Compte de trading',
    builtIn: '{{name}} (intégré)',
    basic: 'Basique',
    advanced: 'Avancé',
    symbol: 'Symbole',
    contractSize: 'Taille du contrat',
    minMaxLot: 'Lot min. / max.',
    lotStep: 'Pas de lots',
    accountCurrency: 'Devise du compte',
    usdConversion: 'Conversion en USD',
    usdConversionValue: '1 USD = {{value}}',
    broker: 'Broker',
    riskMode: 'Mode de risque',
    riskModePercentage: 'Pourcentage du solde',
    riskModeFixed: 'Montant fixe (USD)',
    riskModeAccountCurrency: 'Devise du compte',
    riskAmount: 'Montant de risque',
    position: 'Position',
    buy: 'Achat',
    sell: 'Vente',
    entryPrice: 'Prix d’entrée',
    stopLoss: 'Stop-loss',
    takeProfit: 'Take-profit',
    tpHint: 'Facultatif : active le rapport risque/bénéfice et le bénéfice potentiel',
    checkInputs: 'Vérifie tes données',
    fixSetup: 'Corrige la configuration du trade',
    calculate: 'Calculer',
    clear: 'Effacer',
    saveCalculation: 'Enregistrer le calcul',
    saving: 'Enregistrement…',
    saved: 'Enregistré dans l’historique.',
    saveFailed: 'Impossible d’enregistrer. Réessaie.',
    loginToSave: 'pour enregistrer des calculs dans ton historique.',
  },

  result: {
    recommendedLot: 'Lots recommandés',
    positionResult: 'Résultat de la position',
    copyLot: 'Copier les lots',
    copied: 'Copié',
    lotNote: 'Le risque ne dépasse jamais le montant défini : il est arrondi au pas de lots du broker.',
    exactLot: 'Taille de lots exacte',
    lots: 'lots',
    slDistance: 'Distance de stop-loss',
    intendedRisk: 'Risque prévu',
    actualRisk: 'Risque réel (arrondi)',
    riskReward: 'Risque / bénéfice',
    potentialProfit: 'Bénéfice potentiel',
    empty:
      'Saisis les détails de ton trade puis clique sur Calculer. Les pertes peuvent dépasser rapidement ton budget : vérifie le risque réel avant de passer l’ordre.',
    invalid: 'Rien à afficher tant que les données ne passent pas les vérifications de configuration.',
  },

  marquee: {
    label: 'Annonces GoldRisk',
    welcome: 'Bienvenue sur GoldRisk — le calculateur de taille de position XAUUSD.',
    tagline: 'Taille chaque trade sur l’or selon le risque que tu as réellement choisi.',
    slogan: 'Un calcul de position de précision, jusqu’au pas de lots de ton broker.',
    newUsers: 'Nouveau sur GoldRisk ?',
    existingUsers: 'Déjà client ?',
  },

  calcGuide: {
    title: 'Comment GoldRisk calcule la taille de position',
    intro:
      'Ton solde définit ce que tu peux risquer, ton stop-loss définit le point où le trade devient inacceptable et la distance entre ton entrée et ton stop-loss est convertie en taille de lots. Un chemin déterministe, sans approximation.',
    steps: [
      {
        title: 'Solde du compte',
        body: 'Ton capital de départ, dans la devise du compte (p. ex. USC sur un compte cent). Le risque que tu acceptes s’y exprime en pourcentage.',
      },
      {
        title: 'Montant du risque',
        body: 'Combien tu es prêt à perdre, choisi comme pourcentage du solde, montant fixe en USD ou montant fixe dans la devise du compte.',
      },
      {
        title: 'Distance de stop-loss',
        body: 'La différence absolue entre ton prix d’entrée et ton stop-loss, du bon côté du prix pour un achat (BUY) ou une vente (SELL).',
      },
      {
        title: 'Spécification du contrat',
        body: 'Taille du contrat, lots minimum et maximum et pas de lots de l’instrument : les règles du broker que le résultat doit respecter.',
      },
      {
        title: 'Taille de position exacte',
        body: 'GoldRisk divise la valeur exposée d’un lot par la distance de stop-loss et la réduit à ton montant de risque.',
      },
      {
        title: 'Arrondi au pas de lots',
        body: 'Le lot exact est arrondi au pas de lots inférieur de ton broker. Le risque réel reste ainsi égal ou inférieur à ton choix.',
      },
      {
        title: 'Lot recommandé',
        body: 'La taille finale et exécutable. GoldRisk t’avertit si elle tombe sous le minimum ou au-dessus du maximum.',
      },
    ],
    topics: [
      {
        title: 'Pourquoi le stop-loss est important',
        body: 'Le stop-loss est le seul prix que tu contrôles et qui définit ta perte maximale acceptable. Sans lui, la taille de position n’a aucun ancrage.',
      },
      {
        title: 'Pourquoi le pourcentage de risque est important',
        body: 'Un pourcentage constant maintient chaque trade assez petit pour qu’une série de pertes reste surmontable — la mathématique qui te garde opérationnel.',
      },
      {
        title: 'Qu’est-ce que le lot recommandé ?',
        body: 'C’est le plus grand lot que ton broker autorise à ou sous ton risque choisi. Le risque réel peut être inférieur, jamais supérieur.',
      },
      {
        title: 'GoldRisk et XAUUSDc',
        body: 'GoldRisk est configuré pour Exness Standard Cent et le contrat XAUUSDc (taille de contrat 1, lot minimum 0.01, lot maximum 200, pas 0.01).',
      },
    ],
  },

  accounts: {
    title: 'Comptes de trading',
    subtitleEmpty:
      'Crée un compte pour utiliser son solde et ses spécifications d’instrument dans le calculateur.',
    subtitleOne: '{{count}} compte — le calculateur l’utilise pour le solde, la devise et les limites de lots.',
    subtitleMany: '{{count}} comptes — le calculateur les utilise pour le solde, la devise et les limites de lots.',
    newAccount: 'Nouveau compte',
    createAccount: 'Créer un compte',
    editAccount: 'Modifier {{name}}',
    saveChanges: 'Enregistrer les modifications',
    cancel: 'Annuler',
    saving: 'Enregistrement…',
    unableToLoad: 'Impossible de charger tes comptes',
    retry: 'Réessayer',
    loading: 'Chargement des comptes…',
    emptyTitle: 'Aucun compte pour l’instant',
    emptyBody:
      'Crée ton premier compte de trading — par exemple Exness Standard Cent avec XAUUSDc — et le calculateur pourra charger automatiquement son solde et ses limites de lots.',
    emptyCreate: 'Créer un compte',
    delete: 'Supprimer',
    confirm: 'Confirmer la suppression',
    edit: 'Modifier',
    default: 'Par défaut',
    active: 'Actif',
    inactive: 'Inactif',
    balance: 'Solde',
    usdConversion: 'Conversion en USD',
    usdConversionValue: '1 USD = {{value}}',
    currency: 'Devise',
    created: 'Créé',
    symbol: 'Symbole',
    contractSize: 'Taille du contrat',
    minLot: 'Lot min.',
    maxLot: 'Lot max.',
    lotStep: 'Pas de lots',
    specTitle: 'Spécifications du symbole',
    addSpec: '+ Ajouter une spécification',
    loadingSpecs: 'Chargement des spécifications…',
    noSpecs: 'Aucune spécification pour l’instant. Ajoutes-en une pour utiliser ce compte dans le calculateur.',
    specContract: 'Contrat',
    specMinMax: 'Min. / Max.',
    specStep: 'Pas',
    accountName: 'Nom du compte',
    broker: 'Broker',
    accountType: 'Type de compte',
    usdConversionLabel: 'Conversion en USD',
    usdConversionHint: 'Unités de devise du compte pour 1 USD (100 pour les comptes cent)',
    balanceLabel: 'Solde',
    accountNameRequired: 'Le nom du compte est obligatoire.',
    brokerRequired: 'Le broker est obligatoire.',
    accountTypeRequired: 'Le type de compte est obligatoire.',
    currencyRequired: 'La devise est obligatoire.',
    positiveValue: 'Saisis une valeur supérieure à 0.',
    nonNegativeValue: 'Saisis une valeur supérieure ou égale à 0.',
    symbolRequired: 'Le symbole est obligatoire.',
    minMaxConflict: 'Le lot minimum ne peut pas dépasser le lot maximum.',
    stepConflict: 'Le pas de lots ne peut pas dépasser le lot maximum.',
  },

  history: {
    title: 'Historique des calculs',
    subtitleEmpty: 'Tes calculs enregistrés apparaîtront ici.',
    subtitleCount: '{{count}} calcul',
    subtitleCountOther: '{{count}} calculs',
    unableToLoad: 'Impossible de charger ton historique de calculs',
    apiUnreachable: 'L’API est inaccessible depuis cet environnement.',
    tryAgain: 'Réessaie.',
    retry: 'Réessayer',
    loading: 'Chargement de l’historique…',
    emptyTitle: 'Aucun historique de calculs pour l’instant',
    emptyBody: 'Tes calculs enregistrés apparaîtront ici après avoir calculé une position.',
    goToCalculator: 'Aller au calculateur',
    details: 'Détails',
    delete: 'Supprimer',
    lot: 'Lots',
    entry: 'Entrée',
    savedAt: '{{date}} à {{time}}',
  },

  modal: {
    detailLabel: 'Détails du calcul',
    savedAt: 'Enregistré le {{date}} à {{time}}',
    closeDetails: 'Fermer les détails',
    close: 'Fermer',
    loading: 'Chargement des détails…',
    unableToLoad: 'Impossible de charger ce calcul',
    accountBroker: 'Compte / broker',
    calculationId: 'ID du calcul',
    instrument: 'Instrument',
    direction: 'Direction',
    entryPrice: 'Prix d’entrée',
    balance: 'Solde',
    riskMode: 'Mode de risque',
    riskAmount: 'Montant de risque',
    stopLoss: 'Stop-loss',
    takeProfit: 'Take-profit',
    contractSize: 'Taille du contrat',
    results: 'Résultats',
    slDistance: 'Distance SL',
    exactLot: 'Lots exacts',
    recommendedLot: 'Lots recommandés',
    actualRisk: 'Risque réel',
    riskReward: 'Risque / bénéfice',
    potentialProfit: 'Bénéfice potentiel',
    ariaLabel: 'Détails du calcul {{position}} {{symbol}}',
  },

  engine: {
    entryValid: 'Saisis un prix d’entrée valide.',
    entryRequired: 'Le prix d’entrée est obligatoire.',
    stopLossValid: 'Saisis un stop-loss valide.',
    stopLossRequired: 'Le stop-loss est obligatoire.',
    riskValid: 'Saisis un montant de risque valide.',
    riskRequired: 'Le montant de risque est obligatoire.',
    balanceValid: 'Saisis un solde de compte valide.',
    balanceRequiredForPercent:
      'Le solde du compte est obligatoire pour un risque en pourcentage.',
    entryGreaterThanZero: 'Le prix d’entrée doit être supérieur à zéro.',
    stopLossGreaterThanZero: 'Le stop-loss doit être supérieur à zéro.',
    riskGreaterThanZero: 'Le montant de risque doit être supérieur à zéro.',
    balanceGreaterThanZeroPercent:
      'Le solde du compte doit être supérieur à zéro pour un risque en pourcentage.',
    identical: 'L’entrée et le stop-loss ne peuvent pas être identiques.',
    buySlBelow: 'Pour un ACHAT, le stop-loss doit être sous le prix d’entrée.',
    buyTpAbove: 'Pour un ACHAT, le take-profit doit être au-dessus du prix d’entrée.',
    sellSlAbove: 'Pour une VENTE, le stop-loss doit être au-dessus du prix d’entrée.',
    sellTpBelow: 'Pour une VENTE, le take-profit doit être sous le prix d’entrée.',
    lotBelowMin:
      'Les lots requis ({{exact}}) sont sous le minimum de {{min}} du broker. Utiliser le lot minimum pourrait dépasser le risque sélectionné.',
    lotExceedsMax:
      'Les lots requis dépassent le maximum de {{max}} du broker. Le risque est plafonné par le lot maximum et le risque réel sera inférieur au risque prévu.',
  }
}

export default fr