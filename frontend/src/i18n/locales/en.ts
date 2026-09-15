/**
 * English dictionary — the source of truth for the translation key
 * structure. Every other locale must satisfy the shape defined here
 * (`satisfies Dict` in `./index.ts`), so a key added here must be added
 * to all seven languages before the build passes.
 */
const en = {
  navigation: {
    calculator: 'Calculator',
    howItWorks: 'How It Works',
    riskManagement: 'Risk Management',
    supportedBrokers: 'Supported Brokers',
    supportedInstruments: 'Supported Instruments',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    accounts: 'Accounts',
    history: 'History',
    login: 'Log in',
    getStarted: 'Get Started',
    logout: 'Sign out',
    language: 'Language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    signedInAs: 'Signed in as {{email}}',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    home: 'GoldRisk home',
  },

  footer: {
    tagline: 'Risk calculator for XAUUSD traders',
    navigation: 'Navigation',
    legal: 'Legal',
    disclaimer: 'Disclaimer',
    disclaimerText:
      'GoldRisk is a calculation tool and does not execute trades or provide financial advice.',
    copyright: '© {{year}} GoldRisk. All rights reserved.',
  },

  common: {
    loading: 'Loading',
    somethingWentWrong: 'Something went wrong',
    close: 'Close',
    retry: 'Try again',
  },

  home: {
    hero: {
      badge: 'XAUUSD Position Sizing',
      title: 'Know your risk before you enter.',
      body: 'GoldRisk calculates the position size for your XAUUSD trade using your account balance, risk, entry price and stop loss.',
      primaryCta: 'Calculate Your Position',
      secondaryCta: 'How It Works',
    },
    preview: {
      account: 'EXNESS STANDARD CENT',
      symbol: 'XAUUSDc',
      balance: 'Balance',
      risk: 'Risk',
      position: 'Position',
      entry: 'Entry',
      stopLoss: 'Stop Loss',
      takeProfit: 'Take Profit',
      recommendedLot: 'Recommended Lot',
      slDistance: 'SL Distance',
      riskReward: 'Risk / Reward',
    },
    problem: {
      eyebrow: 'The Problem',
      title: 'Position sizing without the guesswork',
      body: 'Oversized positions are how most accounts die. Without a fixed method, risk is decided by feeling — and the market does not care how confident you felt when you entered.',
    },
    workflow: {
      eyebrow: 'How it works',
      title: 'Three steps to a risk-matched position',
      steps: [
        {
          title: 'Set Your Risk',
          body: 'Choose the amount you are willing to lose, as a fixed amount or a percentage of your balance.',
        },
        {
          title: 'Define Your Trade',
          body: 'Enter your entry, stop loss, and an optional take profit for the gold position.',
        },
        {
          title: 'Get Your Position Size',
          body: 'GoldRisk converts your risk and stop distance into the lot size — rounded down to your broker’s lot step.',
        }
      ],
    },
    features: {
      eyebrow: 'Why GoldRisk',
      title: 'Built for traders who respect risk',
      cards: [
        {
          title: 'Precision Position Sizing',
          body: 'The lot is derived from your risk and stop distance, not from balance size or guesswork. Exact math, down to your broker’s lot step.',
        },
        {
          title: 'Risk-First Calculations',
          body: 'You decide what you are willing to lose before the number exists. The calculation serves that decision.',
        },
        {
          title: 'Fast Trade Setup',
          body: 'Pick an account, set risk, mark your levels, and press Calculate. A fully sized position in seconds.',
        },
        {
          title: 'Calculation History',
          body: 'Every saved calculation keeps its exact inputs and outputs, so your sizing decisions can be reviewed later.',
        }
      ],
    },
    education: {
      eyebrow: 'Risk management',
      title: 'The five ideas behind safe sizing',
      items: [
        {
          title: 'Risk per trade',
          body: 'Decide the maximum you will lose if the trade stops out — typically a small, fixed percentage of your account.',
        },
        {
          title: 'Stop-loss discipline',
          body: 'Your stop loss defines the trade’s worst acceptable loss. Without one, position size has no meaning.',
        },
        {
          title: 'Position size',
          body: 'The lot size is the lever that turns your stop distance into exactly the risk you accepted.',
        },
        {
          title: 'Reward / risk',
          body: 'Compare your take-profit distance to your stop-loss distance before entry. Favorable ratios give the trade room to be right.',
        },
        {
          title: 'Why lot size matters',
          body: 'One oversized lot can erase the work of dozens of disciplined trades. Size protects your survival.',
        }
      ],
    },
    environment: {
      eyebrow: 'Trading environment',
      title: 'Configured for the reference environment',
      body: 'GoldRisk ships configured for Exness Standard Cent and XAUUSDc. Other brokers and instruments can be added after login as your own account specifications.',
      currentlyConfigured: 'Currently configured',
    },
    security: {
      eyebrow: 'Security & accounts',
      title: 'Your data stays yours',
      cards: [
        {
          title: 'Secure authentication',
          body: 'Accounts are protected by JWT-based authentication. Your session is private to your device.',
        },
        {
          title: 'Private account data',
          body: 'Your trading accounts and balances are visible only to you. Store account specifications for reuse in the calculator.',
        },
        {
          title: 'Saved trading accounts',
          body: 'Keep your brokers, account types, currencies, and instrument contracts ready for one-click sizing.',
        },
        {
          title: 'Calculation history',
          body: 'A persistent journal of every calculation, with the exact inputs and results.',
        }
      ],
    },
    finalCta: {
      title: 'Turn your trade setup into a precise position size.',
      body: 'Open the GoldRisk calculator and size your next gold trade to the risk you actually chose.',
      button: 'Open GoldRisk Calculator',
    }
  },

  psc: {
    eyebrow: 'Public guide',
    title: 'Position Size Calculator',
    intro:
      'Position sizing is the practice of deciding how large a trade should be based on the amount of money you are willing to risk. This page explains the idea, what it needs from you, and exactly how GoldRisk turns it into a lot size.',
    whatIsTitle: 'What is position sizing?',
    whatIsBody:
      'Position sizing determines how large a trade should be based on the amount of money the trader is willing to risk. Instead of asking "how much can I buy?", it asks "how much am I prepared to lose if this trade goes against me?" — and works the trade size backwards from that answer.',
    whyTitle: 'Why it matters',
    whyBody:
      'Position sizing protects trading capital, controls risk, avoids oversized positions, and keeps risk consistent from trade to trade. It connects your account size, your stop loss, and your position size into one coherent plan — so no single trade can do serious damage to your account.',
    requiredTitle: 'What is required to calculate position size?',
    required: [
      {
        title: 'Account balance',
        body: 'Your starting point — the capital in the account you plan to trade with.',
      },
      {
        title: 'Risk amount or risk percentage',
        body: 'How much of that balance you are willing to lose if the trade hits its stop loss.',
      },
      {
        title: 'BUY or SELL',
        body: 'The direction of the position, which decides which side of price your stop loss must sit on.',
      },
      {
        title: 'Entry price',
        body: 'The price at which you expect to open the position.',
      },
      {
        title: 'Stop loss',
        body: 'The price where the trade is closed at a loss. Its distance from entry drives the lot size.',
      },
      {
        title: 'Optional take profit',
        body: 'The price where the trade is closed at a profit. Optional, but it enables risk/reward and potential profit.',
      },
      {
        title: 'Instrument / account specifications',
        body: 'Contract size, minimum and maximum lot, and lot step for the instrument you trade.',
      }
    ],
    howTitle: 'How GoldRisk works',
    howBody:
      'GoldRisk follows one path: your balance decides your risk amount, your entry and stop loss define the stop-loss distance, and that distance converts the risk into a lot size.',
    flow: [
      'Account Balance',
      'Risk Amount',
      'Entry Price',
      'Stop Loss',
      'SL Distance',
      'Position Size',
      'Recommended Lot',
    ],
    exampleTitle: 'Example',
    exampleIntro:
      'The reference case GoldRisk is tested against, using the built-in Exness Standard Cent account and XAUUSDc:',
    example: {
      account: 'Account',
      risk: 'Risk',
      result: 'Result',
      balanceLine: 'Balance {{amount}} USC',
      riskLine: 'Direction {{position}} · Entry {{entry}} · SL {{sl}} · TP {{tp}}',
      recommendedLot: 'Recommended Lot',
    },
    exampleSlDistance: 'SL distance',
    exampleExactLot: 'Exact lot',
    exampleRecommendedLot: 'Recommended lot',
    exampleRisk: 'Risk',
    exampleRiskReward: 'Risk / reward',
    examplePotentialProfit: 'Potential profit',
    note:
      'These numbers reflect the current, tested calculation engine. Run the live calculator to see the exact values for your own setup.',
    howToUseTitle: 'How to use GoldRisk',
    howToUse: [
      'Choose your account',
      'Enter your balance',
      'Set your risk',
      'Select BUY or SELL',
      'Enter your entry price',
      'Enter your stop loss',
      'Optionally enter a take profit',
      'Review the Recommended Lot',
      'Decide whether to execute the trade yourself',
    ],
    disclaimer:
      'GoldRisk does not place trades. It is a calculation and risk-management tool. You decide whether and where to execute the trade, at a broker of your choosing.',
    mistakesTitle: 'Common mistakes',
    mistakes: [
      {
        title: 'Choosing a lot from the balance alone',
        body: 'A bigger balance can take a bigger loss, but balance alone never tells you what is safe. The stop-loss distance decides what fits.',
      },
      {
        title: 'Ignoring stop-loss distance',
        body: 'A wide stop loss with a fixed risk means a smaller lot. Picking a lot first and letting the stop fall wherever it lands removes your control.',
      },
      {
        title: 'Raising the lot because you are confident',
        body: 'Confidence does not change math. A trade sized beyond your risk plan is a risk decision, not a trading decision.',
      },
      {
        title: 'Risking too much on one trade',
        body: 'A single oversized loss can erase the work of many good trades. Consistent, small risk keeps you in the game.',
      },
      {
        title: 'Confusing leverage with acceptable risk',
        body: 'Leverage increases position size, it does not change how much you should lose on one trade. Your risk percentage is what protects you.',
      }
    ],
    ctaTitle: 'Ready to calculate your position size?',
    ctaBody: 'Log in and size your next gold trade to the risk you actually chose.',
    ctaButton: 'Login and Get Started',
    ctaGuide: 'See the full walkthrough',
  },

  hiw: {
    eyebrow: 'Walkthrough',
    title: 'How GoldRisk works',
    intro:
      'GoldRisk turns your risk tolerance and stop-loss distance into a position size. The whole flow is designed around one question: what lot size keeps this trade inside the risk you chose?',
    steps: [
      {
        title: 'Choose your account',
        body: 'Select a trading account or enter your balance, currency, and instrument specification manually.',
      },
      {
        title: 'Set the risk you accept',
        body: 'Decide how much you are willing to lose — as a fixed amount in USD or account currency, or as a percentage of your balance.',
      },
      {
        title: 'Set your trade levels',
        body: 'Enter your entry price and stop loss for gold. Add an optional take profit to unlock risk/reward and potential profit.',
      },
      {
        title: 'Get your position size',
        body: 'GoldRisk computes the exact lot for your risk, rounds it down to your broker’s lot step, and warns you if it falls outside the min/max.',
      },
      {
        title: 'Review and decide',
        body: 'Check the Recommended Lot, the actual risk after rounding, and the risk/reward. GoldRisk never places trades — execution is always yours.',
      }
    ],
    ctaTitle: 'Try it yourself',
    ctaBody: 'Learn more about the math first.',
    ctaButton: 'Position size guide',
  },

  risk: {
    eyebrow: 'Education',
    title: 'Risk management',
    intro:
      'Position sizing is one part of managing risk. The core principle GoldRisk is built around is simple: decide how much of your account you are willing to lose on a trade before you enter it, not after.',
    principles: [
      {
        title: 'Decide your risk before you enter',
        body: 'Agree on the amount you are willing to lose on a trade while the position is still just an idea, then find the size that matches it.',
      },
      {
        title: 'Position size follows the stop loss',
        body: 'Your stop-loss distance and your risk amount decide the lot size — not your balance, and not your optimism.',
      },
      {
        title: 'Keep risk consistent',
        body: 'Risking a similar amount on every trade keeps losses predictable and lets a string of losing trades stay survivable.',
      },
      {
        title: 'Respect the broker’s limits',
        body: 'Minimum and maximum lots, and the lot step, bound every calculation. GoldRisk rounds down rather than round up into higher risk.',
      }
    ],
    disclaimer:
      'No calculator, including GoldRisk, predicts or guarantees market outcomes. A position sized to your risk still depends on the price moving where you expected. GoldRisk’s job is only to keep the loss from a stopped-out trade inside the amount you chose to risk.',
    ctaTitle: 'Put it into practice',
    ctaBody: 'Size your next position with real math.',
    ctaButton: 'Login and Get Started',
  },

  brokers: {
    eyebrow: 'Reference',
    title: 'Supported brokers',
    intro:
      'GoldRisk lets you configure any broker’s XAUUSD contract specification in your accounts. The list below is reference information about common cent and micro account types — it does not claim that every specification has been verified in the calculator.',
    configuredTitle: 'Currently configured environment',
    configuredBody:
      'The calculator engine ships with Exness Standard Cent and the XAUUSDc contract (contract size 1, min lot 0.01, max lot 200, lot step 0.01). You can add additional accounts and specifications for other brokers after logging in through the Accounts page — but GoldRisk only guarantees results for configurations you enter and verify yourself.',
    currentlyConfigured: 'Currently configured',
    reference: 'Reference',
    note:
      'Broker details change frequently. Confirm the current contract size, lot limits, and step on your platform before trusting any position-size calculation. GoldRisk never places trades and is not affiliated with any broker listed here.',
    seeInstruments: 'See the gold instruments available below:',
    linkInstruments: 'Supported instruments',
    list: [
      'Cent-denominated accounts for small-balance gold trading.',
      'Cent-account trading with gold CFDs on MetaTrader.',
      'Cent account with gold CFDs; the reference environment currently configured for XAUUSDc.',
      'ProCent accounts sized in cents for lower-balance traders.',
      'Cent accounts for practice-scale trading with gold pairs.',
      'Cent-denominated accounts with gold instruments.',
      'Micro accounts let you trade in smaller contract steps.',
      'Standard Cent accounts with gold CFDs.',
      'Retail broker offering gold CFDs on MetaTrader.',
      'Raw-spread accounts with tight pricing on gold.',
    ],
  },

  inst: {
    eyebrow: 'Reference',
    title: 'Supported instruments',
    intro:
      'The calculator is configured for one environment today: the Exness Standard Cent account trading XAUUSDc. Other instruments can be added as account specifications, but GoldRisk does not guarantee their configuration until verified.',
    cardSubtitle: 'Gold vs US Dollar — cent contract',
    currentlyConfigured: 'Currently configured',
    whatTitle: 'What XAUUSDc means',
    whatBody:
      'XAU is the symbol for gold, USD is the US dollar, and the trailing "c" denotes the cent contract offered on cent accounts. Gold is quoted in USD per troy ounce, and the cent contract prices positions in units of one hundredth of a standard lot, so balances in USC (cent dollars) map directly to small USD notional sizes.',
    contractTitle: 'Configured contract',
    contractSize: 'Contract size',
    minimumLot: 'Minimum lot',
    maximumLot: 'Maximum lot',
    lotStep: 'Lot step',
    note:
      'Additional instruments and brokers can be entered as account specifications after logging in. GoldRisk will use whatever contract data you provide, so always confirm the numbers against your broker’s platform before relying on a calculation.',
    seeBrokers: 'Review the broker list:',
    linkBrokers: 'Supported brokers',
  },

  about: {
    eyebrow: 'About',
    title: 'About GoldRisk',
    intro:
      'GoldRisk is a focused calculation tool for gold traders. It exists to answer one question well — how big should this position be, given the risk I am willing to take — and nothing beyond that.',
    focusTitle: 'What we focus on',
    focusBody:
      'Trading tools often drift toward noise: signals, news, and predictions. GoldRisk stays deliberately narrow. It gives you a transparent, deterministic position-size calculation, saves your history, and lets you manage the accounts and contract specifications you actually trade.',
    notDoTitle: 'What we do not do',
    notDoBody:
      'GoldRisk does not place trades, manage positions, or predict markets. It is a calculation and risk-management tool. Every trade, and every decision about where and whether to execute it, belongs to you.',
    transparencyTitle: 'Transparency',
    transparencyBody:
      'The calculation engine is tested against a documented reference case, and your saved history keeps the exact inputs and outputs of every calculation so results can always be reviewed and re-checked.',
  },

  contact: {
    title: 'Contact',
    description:
      'A contact form will be added once GoldRisk has a backend to send messages through. Until then, reach out by email.',
  },

  privacy: {
    title: 'Privacy policy',
    description:
      'GoldRisk’s full privacy policy is being drafted alongside the account and data-handling features it will describe. This page will be replaced with the complete policy before those features launch.',
  },

  terms: {
    title: 'Terms of use',
    description:
      'GoldRisk’s full terms of use are being drafted and will appear here before account creation is enabled.',
  },

  notFound: {
    title: 'Page not found',
    body: 'The page you’re looking for doesn’t exist or has moved.',
    back: 'Back to home',
  },

  auth: {
    welcomeBack: 'Welcome back',
    loginSubtitle: 'Log in to your GoldRisk workspace.',
    email: 'Email',
    password: 'Password',
    emailPlaceholder: 'you@example.com',
    passwordPlaceholder: '••••••••',
    loggingIn: 'Logging in…',
    login: 'Log in',
    noAccount: 'New to GoldRisk?',
    createAccount: 'Create an account',
    createTitle: 'Create your account',
    createSubtitle: 'One account for your accounts, history, and position sizing.',
    name: 'Name',
    namePlaceholder: 'Your name',
    passwordTooShort: 'Password must be at least 8 characters long.',
    passwordsDoNotMatch: 'Passwords do not match.',
    confirmPassword: 'Confirm password',
    confirmPlaceholder: 'Repeat your password',
    creatingAccount: 'Creating account…',
    createButton: 'Create account',
    hasAccount: 'Already have an account?',
    nameRequired: 'Please enter your name.',
    passwordPlaceholderLong: 'At least 8 characters',
    or: 'or',
    continueWithGoogle: 'Continue with Google',
    signUpWithGoogle: 'Sign up with Google',
    googleUnavailable: 'Google sign-in is not available yet. Use email and password for now.',
  },

  calcPage: {
    title:'Position Size Calculator',    subtitle: 'Calculate the lot size for your XAUUSD trade based on your defined risk.',
    historyNotePre: 'Saved calculations appear on the ',
    historyNotePost: ' page, where you can review the exact inputs and results at any time.',
  },

  calc: {
    tradeInputs: 'Trade Inputs',
    tradeSetup: 'Trade Setup',
    currencyChipUsc: '{{value}} {{currency}} = $1',
    currencyChipUsd: 'USD account',
    loadingAccounts: 'Loading saved accounts…',
    loadingOptions: 'Loading…',
    tradingAccount: 'Trading account',
    builtIn: '{{name}} (built-in)',
    basic: 'Basic',
    advanced: 'Advanced',
    symbol: 'Symbol',
    contractSize: 'Contract size',
    minMaxLot: 'Min / Max lot',
    lotStep: 'Lot step',
    accountCurrency: 'Account currency',
    usdConversion: 'USD conversion',
    usdConversionValue: '1 USD = {{value}}',
    broker: 'Broker',
    riskMode: 'Risk mode',
    riskModePercentage: 'Percentage of balance',
    riskModeFixed: 'Fixed amount (USD)',
    riskModeAccountCurrency: 'Account currency',
    riskAmount: 'Risk amount',
    position: 'Position',
    buy: 'Buy',
    sell: 'Sell',
    entryPrice: 'Entry price',
    stopLoss: 'Stop loss',
    takeProfit: 'Take profit',
    tpHint: 'Optional — enables risk/reward and potential profit',
    checkInputs: 'Check your inputs',
    fixSetup: 'Please fix the trade setup',
    calculate: 'Calculate',
    clear: 'Clear',
    saveCalculation: 'Save calculation',
    saving: 'Saving…',
    saved: 'Saved to history.',
    saveFailed: 'Failed to save. Please try again.',
    loginToSave: 'to save calculations to your history.',
  },

  result: {
    recommendedLot: 'Recommended lot',
    positionResult: 'Position Result',
    copyLot: 'Copy lot',
    copied: 'Copied',
    lotNote: 'Risk never exceeds the amount you set — rounded down to the broker’s lot step.',
    exactLot: 'Exact lot size',
    lots: 'lots',
    slDistance: 'Stop-loss distance',
    intendedRisk: 'Intended risk',
    actualRisk: 'Actual risk (rounded)',
    riskReward: 'Risk / reward',
    potentialProfit: 'Potential profit',
    empty:
      'Enter your trade details and press Calculate. Losing trades can quickly exceed your budget — review the actual risk before placing the order.',
    invalid: 'Nothing to show until the inputs pass the trade-setup checks.',
  },

  marquee: {
    label: 'GoldRisk announcements',
    welcome: 'Welcome to GoldRisk — the XAUUSD position-size calculator.',
    tagline: 'Size every gold trade to the risk you actually chose.',
    slogan: 'Precision position sizing, down to your broker’s lot step.',
    newUsers: 'New to GoldRisk?',
    existingUsers: 'Existing user?',
  },

  calcGuide: {
    title: 'How GoldRisk Calculates Position Size',
    intro:
      'Your balance defines what you can risk, your stop loss defines where the trade becomes unacceptable, and the distance between your entry and stop loss is converted into a lot size. One deterministic path, no guesswork.',
    steps: [
      {
        title: 'Account balance',
        body: 'Your starting capital, in the account’s currency (e.g. USC on a cent account). The risk you accept is expressed against this.',
      },
      {
        title: 'Risk amount',
        body: 'How much you are willing to lose, chosen as a percentage of balance, a fixed USD amount, or a fixed account-currency amount.',
      },
      {
        title: 'Stop-loss distance',
        body: 'The absolute difference between your entry price and stop loss, on the correct side of price for BUY or SELL.',
      },
      {
        title: 'Contract specification',
        body: 'Contract size, minimum and maximum lot, and lot step for the instrument you trade — the broker’s rules the result must obey.',
      },
      {
        title: 'Exact position size',
        body: 'GoldRisk divides the exposed value of one lot by the stop-loss distance and scales it down to your risk amount.',
      },
      {
        title: 'Lot-step rounding',
        body: 'The exact lot is rounded down to your broker’s lot step. This keeps the actual risk at or below what you chose.',
      },
      {
        title: 'Recommended lot',
        body: 'The final, executable size. GoldRisk warns you when it falls below the minimum or above the maximum lot.',
      },
    ],
    topics: [
      {
        title: 'Why Stop Loss Matters',
        body: 'The stop loss is the one price you control that defines your worst acceptable loss. Without it, position size has no anchor.',
      },
      {
        title: 'Why Risk Percentage Matters',
        body: 'A consistent percentage keeps each trade small enough that a string of losses stays survivable — the math that keeps you trading.',
      },
      {
        title: 'What Is Recommended Lot?',
        body: 'It is the largest lot your broker allows at or below your chosen risk. Actual risk may be lower, never higher.',
      },
      {
        title: 'GoldRisk and XAUUSDc',
        body: 'GoldRisk ships configured for Exness Standard Cent and the XAUUSDc contract (contract size 1, min lot 0.01, max lot 200, step 0.01).',
      },
    ],
  },

  accounts: {
    title: 'Trading Accounts',
    subtitleEmpty:
      'Create an account to use its balance and instrument specifications in the calculator.',
    subtitleOne: '{{count}} account — used by the calculator for balance, currency, and lot limits.',
    subtitleMany: '{{count}} accounts — used by the calculator for balance, currency, and lot limits.',
    newAccount: 'New account',
    createAccount: 'Create account',
    editAccount: 'Edit {{name}}',
    saveChanges: 'Save changes',
    cancel: 'Cancel',
    saving: 'Saving…',
    unableToLoad: 'Unable to load your accounts',
    retry: 'Try again',
    loading: 'Loading accounts…',
    emptyTitle: 'No accounts yet',
    emptyBody:
      'Create your first trading account — for example the Exness Standard Cent with XAUUSDc — and the calculator can load its balance and lot limits automatically.',
    emptyCreate: 'Create account',
    delete: 'Delete',
    confirm: 'Confirm Delete',
    edit: 'Edit',
    default: 'Default',
    active: 'Active',
    inactive: 'Inactive',
    balance: 'Balance',
    usdConversion: 'USD conversion',
    usdConversionValue: '1 USD = {{value}}',
    currency: 'Currency',
    created: 'Created',
    symbol: 'Symbol',
    contractSize: 'Contract size',
    minLot: 'Min lot',
    maxLot: 'Max lot',
    lotStep: 'Lot step',
    specTitle: 'Symbol specifications',
    addSpec: '+ Add specification',
    loadingSpecs: 'Loading specifications…',
    noSpecs: 'No specifications yet. Add one to use this account in the calculator.',
    specContract: 'Contract',
    specMinMax: 'Min / Max',
    specStep: 'Step',
    accountName: 'Account name',
    broker: 'Broker',
    accountType: 'Account type',
    usdConversionLabel: 'USD conversion',
    usdConversionHint: 'Units of account currency per 1 USD (100 for cent accounts)',
    balanceLabel: 'Balance',
    accountNameRequired: 'Account name is required.',
    brokerRequired: 'Broker is required.',
    accountTypeRequired: 'Account type is required.',
    currencyRequired: 'Currency is required.',
    positiveValue: 'Enter a value greater than 0.',
    nonNegativeValue: 'Enter a value greater than or equal to 0.',
    symbolRequired: 'Symbol is required.',
    minMaxConflict: 'Minimum lot cannot exceed maximum lot.',
    stepConflict: 'Lot step cannot exceed maximum lot.',
  },

  history: {
    title: 'Calculation History',
    subtitleEmpty: 'Your saved calculations will appear here.',
    subtitleCount: '{{count}} calculation',
    subtitleCountOther: '{{count}} calculations',
    unableToLoad: 'Unable to load your calculation history',
    apiUnreachable: 'The API is not reachable from this environment.',
    tryAgain: 'Please try again.',
    retry: 'Try again',
    loading: 'Loading history…',
    emptyTitle: 'No calculation history yet',
    emptyBody: 'Your saved calculations will appear here after you calculate a position.',
    goToCalculator: 'Go to Calculator',
    details: 'Details',
    delete: 'Delete',
    lot: 'Lot',
    entry: 'Entry',
    savedAt: '{{date}} at {{time}}',
  },

  modal: {
    detailLabel: 'Calculation details',
    savedAt: 'Saved {{date}} at {{time}}',
    closeDetails: 'Close details',
    close: 'Close',
    loading: 'Loading details…',
    unableToLoad: 'Unable to load this calculation',
    accountBroker: 'Account / broker',
    calculationId: 'Calculation ID',
    instrument: 'Instrument',
    direction: 'Direction',
    entryPrice: 'Entry price',
    balance: 'Balance',
    riskMode: 'Risk mode',
    riskAmount: 'Risk amount',
    stopLoss: 'Stop loss',
    takeProfit: 'Take profit',
    contractSize: 'Contract size',
    results: 'Results',
    slDistance: 'SL distance',
    exactLot: 'Exact lot',
    recommendedLot: 'Recommended lot',
    actualRisk: 'Actual risk',
    riskReward: 'Risk / reward',
    potentialProfit: 'Potential profit',
    ariaLabel: '{{position}} {{symbol}} calculation details',
  },

  engine: {
    entryValid: 'Enter a valid entry price.',
    entryRequired: 'Entry price is required.',
    stopLossValid: 'Enter a valid stop loss.',
    stopLossRequired: 'Stop Loss is required.',
    riskValid: 'Enter a valid risk amount.',
    riskRequired: 'Risk amount is required.',
    balanceValid: 'Enter a valid account balance.',
    balanceRequiredForPercent:
      'Account balance is required when using a percentage risk.',
    entryGreaterThanZero: 'Entry price must be greater than zero.',
    stopLossGreaterThanZero: 'Stop Loss must be greater than zero.',
    riskGreaterThanZero: 'Risk amount must be greater than zero.',
    balanceGreaterThanZeroPercent:
      'Account balance must be greater than zero when using a percentage risk.',
    identical: 'Entry and Stop Loss cannot be identical.',
    buySlBelow: 'For BUY, Stop Loss must be below Entry price.',
    buyTpAbove: 'For BUY, Take Profit must be above Entry price.',
    sellSlAbove: 'For SELL, Stop Loss must be above Entry price.',
    sellTpBelow: 'For SELL, Take Profit must be below Entry price.',
    lotBelowMin:
      'The required lot ({{exact}}) is below the broker’s minimum of {{min}}. Using the minimum lot could exceed your selected risk.',
    lotExceedsMax:
      'The required lot exceeds the broker’s maximum of {{max}}. Risk is capped at the maximum lot and actual risk will be lower than intended.',
  }
}

export default en