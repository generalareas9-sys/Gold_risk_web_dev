/**
 * German (Deutsch) dictionary. Must satisfy the same shape as `en`.
 */
const de = {
  navigation: {
    calculator: 'Rechner',
    howItWorks: 'So funktioniert es',
    riskManagement: 'Risikomanagement',
    supportedBrokers: 'Unterstützte Broker',
    supportedInstruments: 'Unterstützte Instrumente',
    about: 'Über uns',
    contact: 'Kontakt',
    privacy: 'Datenschutz',
    terms: 'Nutzungsbedingungen',
    accounts: 'Konten',
    history: 'Verlauf',
    login: 'Anmelden',
    getStarted: 'Loslegen',
    logout: 'Abmelden',
    language: 'Sprache',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    signedInAs: 'Angemeldet als {{email}}',
    showPassword: 'Passwort anzeigen',
    hidePassword: 'Passwort ausblenden',
    switchToLight: 'Zum hellen Design wechseln',
    switchToDark: 'Zum dunklen Design wechseln',
    home: 'GoldRisk-Startseite',
  },

  footer: {
    tagline: 'Risikorechner für XAUUSD-Trader',
    navigation: 'Navigation',
    legal: 'Rechtliches',
    disclaimer: 'Haftungsausschluss',
    disclaimerText:
      'GoldRisk ist ein Berechnungswerkzeug und führt keine Geschäfte aus und bietet keine Finanzberatung.',
    copyright: '© {{year}} GoldRisk. Alle Rechte vorbehalten.',
  },

  common: {
    loading: 'Wird geladen',
    somethingWentWrong: 'Etwas ist schiefgelaufen',
    close: 'Schließen',
    retry: 'Erneut versuchen',
  },

  home: {
    hero: {
      badge: 'XAUUSD-Positionsgrößen',
      title: 'Kennen Sie Ihr Risiko, bevor Sie einsteigen.',
      body: 'GoldRisk berechnet die Positionsgröße für Ihren XAUUSD-Trade aus Ihrem Kontostand, Ihrem Risiko, Ihrem Einstiegspreis und Ihrem Stop-Loss.',
      primaryCta: 'Position Berechnen',
      secondaryCta: 'So Funktioniert Es',
    },
    preview: {
      account: 'EXNESS STANDARD CENT',
      symbol: 'XAUUSDc',
      balance: 'Kontostand',
      risk: 'Risiko',
      position: 'Position',
      entry: 'Einstieg',
      stopLoss: 'Stop-Loss',
      takeProfit: 'Take-Profit',
      recommendedLot: 'Empfohlenes Lot',
      slDistance: 'SL-Distanz',
      riskReward: 'Risiko / Belohnung',
    },
    problem: {
      eyebrow: 'Das Problem',
      title: 'Positionsgrößen ohne Raten',
      body: 'Überdimensionierte Positionen sind der Grund, warum die meisten Konten sterben. Ohne feste Methode entscheidet das Gefühl über das Risiko — und der Markt kümmert es nicht, wie zuversichtlich Sie sich beim Einstieg fühlten.',
    },
    workflow: {
      eyebrow: 'So funktioniert es',
      title: 'Drei Schritte zu einer risikogerechten Position',
      steps: [
        {
          title: 'Risiko Festlegen',
          body: 'Wählen Sie den Betrag, den Sie verlieren können, als festen Betrag oder als Prozentsatz Ihres Kontostands.',
        },
        {
          title: 'Trade Definieren',
          body: 'Geben Sie Einstieg, Stop-Loss und einen optionalen Take-Profit für die Gold-Position ein.',
        },
        {
          title: 'Positionsgröße Erhalten',
          body: 'GoldRisk wandelt Ihr Risiko und Ihre Stop-Distanz in die Lotgröße um — abgerundet auf den Schritt Ihres Brokers.',
        }
      ],
    },
    features: {
      eyebrow: 'Warum GoldRisk',
      title: 'Gebaut für Trader, die Risiko respektieren',
      cards: [
        {
          title: 'Präzise Positionsgrößen',
          body: 'Das Lot leitet sich aus Risiko und Stop-Distanz ab, nicht aus der Kontogröße oder Bauchgefühl. Exakte Mathematik, bis zum Lot-Schritt Ihres Brokers.',
        },
        {
          title: 'Risk-First-Berechnung',
          body: 'Sie entscheiden, was Sie verlieren wollen, bevor die Zahl existiert. Die Berechnung dient dieser Entscheidung.',
        },
        {
          title: 'Schnelles Setup',
          body: 'Konto wählen, Risiko setzen, Niveaus markieren, Berechnen drücken. In Sekunden eine vollständig dimensionierte Position.',
        },
        {
          title: 'Berechnungsverlauf',
          body: 'Jede gespeicherte Berechnung behält ihre exakten Eingaben und Ausgaben, damit Sie Ihre Entscheidungen später prüfen können.',
        }
      ],
    },
    education: {
      eyebrow: 'Risikomanagement',
      title: 'Die fünf Ideen hinter sicherem Sizing',
      items: [
        {
          title: 'Risiko pro Trade',
          body: 'Bestimmen Sie das Maximum, das Sie verlieren, wenn der Trade gestoppt wird — meist ein kleiner, fester Prozentsatz Ihres Kontos.',
        },
        {
          title: 'Stop-Loss-Disziplin',
          body: 'Ihr Stop-Loss definiert den schlechtesten akzeptablen Verlust des Trades. Ohne ihn ist die Positionsgröße bedeutungslos.',
        },
        {
          title: 'Positionsgröße',
          body: 'Die Lotgröße ist der Hebel, der Ihre Stop-Distanz genau in das akzeptierte Risiko übersetzt.',
        },
        {
          title: 'Belohnung / Risiko',
          body: 'Vergleichen Sie vor dem Einstieg Ihre Take-Profit-Distanz mit Ihrer Stop-Loss-Distanz. Günstige Verhältnisse geben dem Trade Raum, richtig zu liegen.',
        },
        {
          title: 'Warum die Lotgröße zählt',
          body: 'Ein überdimensioniertes Lot kann die Arbeit dutzender disziplinierter Trades zunichte machen. Sizing schützt Ihr Überleben.',
        }
      ],
    },
    environment: {
      eyebrow: 'Handelsumgebung',
      title: 'Konfiguriert für die Referenzumgebung',
      body: 'GoldRisk wird für Exness Standard Cent und XAUUSDc konfiguriert ausgeliefert. Andere Broker und Instrumente können nach dem Login als eigene Kontospezifikationen hinzugefügt werden.',
      currentlyConfigured: 'Aktuell konfiguriert',
    },
    security: {
      eyebrow: 'Sicherheit und Konten',
      title: 'Ihre Daten bleiben bei Ihnen',
      cards: [
        {
          title: 'Sichere Authentifizierung',
          body: 'Konten werden durch JWT-basierte Authentifizierung geschützt. Ihre Sitzung ist auf Ihrem Gerät privat.',
        },
        {
          title: 'Private Kontodaten',
          body: 'Ihre Handelskonten und Kontostände sind nur für Sie sichtbar. Speichern Sie Spezifikationen zur Wiederverwendung im Rechner.',
        },
        {
          title: 'Gespeicherte Handelskonten',
          body: 'Halten Sie Ihre Broker, Kontotypen, Währungen und Instrumentenkontrakte für One-Click-Sizing bereit.',
        },
        {
          title: 'Berechnungsverlauf',
          body: 'Ein dauerhaftes Journal jeder Berechnung mit exakten Eingaben und Ergebnissen.',
        }
      ],
    },
    finalCta: {
      title: 'Verwandeln Sie Ihr Setup in eine präzise Positionsgröße.',
      body: 'Öffnen Sie den GoldRisk-Rechner und dimensionieren Sie Ihren nächsten Gold-Trade auf das Risiko, das Sie tatsächlich gewählt haben.',
      button: 'GoldRisk-Rechner Öffnen',
    }
  },

  psc: {
    eyebrow: 'Öffentlicher Leitfaden',
    title: 'Rechner für Positionsgrößen',
    intro:
      'Positionsgrößen-Berechnung ist die Praxis, zu entscheiden, wie groß ein Trade sein sollte, basierend auf dem Betrag, den du zu riskieren bereit bist. Diese Seite erklärt die Idee, was sie von dir verlangt und wie GoldRisk sie in eine Losgröße umsetzt.',
    whatIsTitle: 'Was ist Positionsgrößen-Berechnung?',
    whatIsBody:
      'Die Positionsgröße bestimmt, wie groß ein Trade angesichts des Betrags sein sollte, den der Trader zu riskieren bereit ist. Statt zu fragen „Wie viel kann ich kaufen?“ fragt sie „Wie viel bin ich bereit zu verlieren, wenn dieser Trade gegen mich läuft?“ und berechnet den Trade von dieser Antwort rückwärts.',
    whyTitle: 'Warum das zählt',
    whyBody:
      'Die Positionsgröße schützt dein Handelskapital, hält das Risiko kontrollierbar, verhindert überdimensionierte Trades und hält das Risiko Trade für Trade konstant. Sie verbindet Kontogröße, Stop-Loss und Positionsgröße in einem stimmigen Plan: Kein einzelner Trade kann dein Konto ernsthaft beschädigen.',
    requiredTitle: 'Was wird für die Positionsgrößen-Berechnung benötigt?',
    required: [
      { title: 'Kontostand', body: 'Dein Ausgangspunkt: das Kapital des Kontos, mit dem du handeln möchtest.' },
      { title: 'Risikobetrag oder -prozentsatz', body: 'Wie viel von diesem Kontostand du bereit bist zu verlieren, wenn der Trade seinen Stop-Loss erreicht.' },
      { title: 'KAUF oder VERKAUF', body: 'Die Richtung deiner Position, die entscheidet, auf welcher Seite des Preises dein Stop-Loss liegen muss.' },
      { title: 'Einstiegspreis', body: 'Der Preis, zu dem du die Position eröffnen möchtest.' },
      { title: 'Stop-Loss', body: 'Der Preis, bei dem der Trade mit Verlust geschlossen wird. Sein Abstand zum Einstieg bestimmt die Losgröße.' },
      { title: 'Take-Profit (optional)', body: 'Der Preis, bei dem der Trade mit Gewinn geschlossen wird. Optional, aktiviert aber Risiko/Rendite und möglichen Gewinn.' },
      { title: 'Instrument-/Kontospezifikation', body: 'Kontraktgröße, Mindest- und Höchstlos sowie Los-Schritt des Instruments, das du handelst.' }
    ],
    howTitle: 'Wie GoldRisk funktioniert',
    howBody:
      'GoldRisk folgt einem einzigen Weg: Dein Kontostand bestimmt deinen Risikobetrag, dein Einstieg und Stop-Loss bestimmen die Stop-Loss-Distanz, und diese Distanz wandelt das Risiko in eine Losgröße um.',
    flow: [
      'Kontostand',
      'Risikobetrag',
      'Einstiegspreis',
      'Stop-Loss',
      'SL-Distanz',
      'Positionsgröße',
      'Empfohlenes Los',
    ],
    exampleTitle: 'Beispiel',
    exampleIntro:
      'Der Referenzfall, mit dem GoldRisk getestet wird, mit dem integrierten Konto Exness Standard Cent und XAUUSDc:',
    example: {
      account: 'Konto',
      risk: 'Risiko',
      result: 'Ergebnis',
      balanceLine: 'Kontostand {{amount}} USC',
      riskLine: 'Richtung {{position}} · Einstieg {{entry}} · SL {{sl}} · TP {{tp}}',
      recommendedLot: 'Empfohlenes Los',
    },
    exampleSlDistance: 'SL-Distanz',
    exampleExactLot: 'Exaktes Los',
    exampleRecommendedLot: 'Empfohlenes Los',
    exampleRisk: 'Risiko',
    exampleRiskReward: 'Risiko / Rendite',
    examplePotentialProfit: 'Möglicher Gewinn',
    note:
      'Diese Zahlen spiegeln die aktuelle, getestete Berechnungs-Engine. Führe den Rechner live aus, um die exakten Werte für deine eigene Konfiguration zu sehen.',
    howToUseTitle: 'So verwendest du GoldRisk',
    howToUse: [
      'Wähle dein Konto',
      'Gib deinen Kontostand ein',
      'Lege dein Risiko fest',
      'Wähle KAUF oder VERKAUF',
      'Gib deinen Einstiegspreis ein',
      'Gib deinen Stop-Loss ein',
      'Gib optional einen Take-Profit ein',
      'Prüfe das empfohlene Los',
      'Entscheide selbst, ob du den Trade ausführst',
    ],
    disclaimer:
      'GoldRisk platziert keine Aufträge. Es ist ein Werkzeug für Berechnung und Risikomanagement. Du entscheidest, ob du den Trade ausführst, wo und bei welchem Broker.',
    mistakesTitle: 'Häufige Fehler',
    mistakes: [
      { title: 'Los nur am Kontostand wählen', body: 'Ein höherer Kontostand kann höhere Verluste verkraften, aber der Kontostand allein sagt nie, was sicher ist. Die Stop-Loss-Distanz entscheidet, was hineinpasst.' },
      { title: 'Die Stop-Loss-Distanz ignorieren', body: 'Ein weiter Stop-Loss mit festem Risiko bedeutet ein kleineres Los. Zuerst das Los zu wählen und den Stop fallen zu lassen, wo er will, nimmt dir die Kontrolle.' },
      { title: 'Aus Selbstvertrauen das Los erhöhen', body: 'Selbstvertrauen ändert die Mathematik nicht. Ein Trade über deinen Risikoplan hinaus ist eine Risikoentscheidung, keine Handelsentscheidung.' },
      { title: 'Bei einem einzigen Trade zu viel riskieren', body: 'Ein einziger überdimensionierter Verlust kann die Arbeit vieler guter Trades zunichtemachen. Ein kleines, konstantes Risiko hält dich im Spiel.' },
      { title: 'Leverage mit akzeptablem Risiko verwechseln', body: 'Leverage vergrößert die Positionsgröße; es ändert nicht, wie viel du bei einem Trade verlieren solltest. Dein Risikoprozentsatz ist dein Schutz.' }
    ],
    ctaTitle: 'Bereit, deine Positionsgröße zu berechnen?',
    ctaBody: 'Melde dich an und dimensioniere deinen nächsten Gold-Trade auf das Risiko, das du wirklich gewählt hast.',
    ctaButton: 'Anmelden und loslegen',
    ctaGuide: 'Den vollständigen Ablauf ansehen',
  },

  hiw: {
    eyebrow: 'Ablauf',
    title: 'So funktioniert GoldRisk',
    intro:
      'GoldRisk wandelt deine Risikobereitschaft und die Stop-Loss-Distanz in eine Positionsgröße um. Der gesamte Ablauf hängt an einer Frage: Welche Losgröße hält diesen Trade innerhalb des Risikos, das du gewählt hast?',
    steps: [
      { title: 'Wähle dein Konto', body: 'Wähle ein Handelskonto oder gib manuell deinen Kontostand, deine Währung und die Instrumentenspezifikation ein.' },
      { title: 'Lege dein akzeptiertes Risiko fest', body: 'Entscheide, wie viel du verlieren möchtest: einen festen Betrag in USD oder Kontowährung oder einen Prozentsatz deines Kontostands.' },
      { title: 'Setze deine Kurse', body: 'Gib deinen Einstiegspreis und Stop-Loss für Gold ein. Füge optional einen Take-Profit hinzu, um Risiko/Rendite und möglichen Gewinn freizuschalten.' },
      { title: 'Erhalte deine Positionsgröße', body: 'GoldRisk berechnet das exakte Los für dein Risiko, rundet auf den Los-Schritt deines Brokers ab und warnt dich, wenn die Größe die Mindest-/Höchstgrenzen verlässt.' },
      { title: 'Prüfen und entscheiden', body: 'Kontrolliere das empfohlene Los, das reale Risiko nach dem Runden und das Verhältnis Risiko/Rendite. GoldRisk platziert nie Aufträge: Die Ausführung ist immer deine.' }
    ],
    ctaTitle: 'Probiere es selbst',
    ctaBody: 'Lerne zuerst die Mathematik.',
    ctaButton: 'Leitfaden zur Positionsgröße',
  },

  risk: {
    eyebrow: 'Bildung',
    title: 'Risikomanagement',
    intro:
      'Die Positionsgröße ist ein Teil des Risikomanagements. Das Kernprinzip, auf dem GoldRisk aufbaut, ist einfach: Entscheide vor dem Einstieg, wie viel von deinem Konto du bei einem Trade verlieren möchtest – nicht danach.',
    principles: [
      { title: 'Lege dein Risiko vor dem Einstieg fest', body: 'Vereinbare den Betrag, den du zu verlieren bereit bist, solange die Position nur eine Idee ist, und suche die Größe, die dazu passt.' },
      { title: 'Die Größe folgt dem Stop-Loss', body: 'Die Stop-Loss-Distanz und dein Risikobetrag bestimmen die Losgröße – nicht der Kontostand und nicht der Optimismus.' },
      { title: 'Halte das Risiko konstant', body: 'Bei jedem Trade einen ähnlichen Betrag zu riskieren macht Verluste vorhersehbar und hält auch eine Verlustserie erträglich.' },
      { title: 'Respektiere die Brokerlimits', body: 'Mindest- und Höchstlos sowie der Los-Schritt begrenzen jede Berechnung. GoldRisk rundet ab, nie auf, um das Risiko nicht zu erhöhen.' }
    ],
    disclaimer:
      'Kein Rechner, auch GoldRisk nicht, sagt Marktergebnisse voraus oder garantiert sie. Eine auf dein Risiko dimensionierte Position hängt weiterhin davon ab, dass der Preis in die erwartete Richtung läuft. GoldRisks Aufgabe ist nur, den gestoppten Verlust eines Trades innerhalb des Betrags zu halten, den du zu riskieren gewählt hast.',
    ctaTitle: 'Setze es in die Praxis um',
    ctaBody: 'Dimensioniere deine nächste Position mit echter Mathematik.',
    ctaButton: 'Anmelden und loslegen',
  },

  brokers: {
    eyebrow: 'Referenz',
    title: 'Unterstützte Broker',
    intro:
      'GoldRisk erlaubt dir, die XAUUSD-Kontraktspezifikation jedes Brokers in deinen Konten zu konfigurieren. Die folgende Liste ist Referenzinformation über gängige Cent- und Micro-Kontotypen; sie behauptet nicht, dass jede Spezifikation im Rechner verifiziert wurde.',
    configuredTitle: 'Derzeit konfigurierte Umgebung',
    configuredBody:
      'Die Berechnungs-Engine enthält Exness Standard Cent und den Kontrakt XAUUSDc (Kontraktgröße 1, Mindestlos 0.01, Höchstlos 200, Los-Schritt 0.01). Du kannst nach der Anmeldung über die Seite Konten Konten und Spezifikationen für andere Broker hinzufügen; aber GoldRisk garantiert Ergebnisse nur für Konfigurationen, die du selbst eingibst und verifizierst.',
    currentlyConfigured: 'Derzeit konfiguriert',
    reference: 'Referenz',
    note:
      'Brokerdaten ändern sich häufig. Bestätige Kontraktgröße, Loslimits und aktuellen Schritt auf deiner Plattform, bevor du dich auf eine Berechnung verlässt. GoldRisk platziert keine Aufträge und ist mit keinem der gelisteten Broker verbunden.',
    seeInstruments: 'Sieh dir unten die verfügbaren Gold-Instrumente an:',
    linkInstruments: 'Unterstützte Instrumente',
    list: [
      'Konten in Cent zur Gold-Währung für kleine Kontostände.',
      'Handel mit Cent-Konten und Gold-CFDs über MetaTrader.',
      'Cent-Konto mit Gold-CFD; die derzeit für XAUUSDc konfigurierte Referenzumgebung.',
      'ProCent-Konten in Cent für Trader mit kleinerem Budget.',
      'Cent-Konten zum Üben mit Goldpaaren in kleiner Skalierung.',
      'Konten in Cent mit Goldinstrumenten.',
      'Micro-Konten erlauben Handel mit kleineren Kontraktschritten.',
      'Standard-Cent-Konten mit Gold-CFD.',
      'Retail-Broker, der Gold-CFDs auf MetaTrader anbietet.',
      'Rohe-Spread-Konten mit auf Gold angepassten Kursen.',
    ],
  },

  inst: {
    eyebrow: 'Referenz',
    title: 'Unterstützte Instrumente',
    intro:
      'Der Rechner ist heute für eine Umgebung konfiguriert: das Konto Exness Standard Cent mit XAUUSDc. Andere Instrumente können als Kontospezifikationen hinzugefügt werden, aber GoldRisk garantiert ihre Konfiguration erst nach Verifikation.',
    cardSubtitle: 'Gold vs. US-Dollar – Cent-Kontrakt',
    currentlyConfigured: 'Derzeit konfiguriert',
    whatTitle: 'Was XAUUSDc bedeutet',
    whatBody:
      'XAU ist das Symbol für Gold, USD der US-Dollar und das abschließende „c“ kennzeichnet den Cent-Kontrakt, der auf Cent-Konten angeboten wird. Gold wird in USD je Feinunze notiert, und der Cent-Kontrakt stellt Positionen in Einheiten von einem Hundertstel eines Standard-Lots dar, sodass USC-Guthaben (Cent-Dollar) direkt kleinen nominalen USD-Beträgen entsprechen.',
    contractTitle: 'Konfigurierter Kontrakt',
    contractSize: 'Kontraktgröße',
    minimumLot: 'Mindestlos',
    maximumLot: 'Höchstlos',
    lotStep: 'Los-Schritt',
    note:
      'Du kannst nach der Anmeldung weitere Instrumente und Broker als Kontospezifikationen eingeben. GoldRisk verwendet die von dir angegebenen Kontraktdaten – bestätige daher Zahlen immer auf der Plattform deines Brokers, bevor du dich auf eine Berechnung verlässt.',
    seeBrokers: 'Sieh dir die Brokerliste an:',
    linkBrokers: 'Unterstützte Broker',
  },

  about: {
    eyebrow: 'Über uns',
    title: 'Über GoldRisk',
    intro:
      'GoldRisk ist ein fokussiertes Berechnungswerkzeug für Goldtrader. Es existiert, um eine einzige Frage gut zu beantworten: Wie groß sollte diese Position angesichts des Risikos sein, das ich bereit bin einzugehen – und nichts weiter.',
    focusTitle: 'Worauf wir uns konzentrieren',
    focusBody:
      'Trading-Tools driften oft ins Rauschen ab: Signale, Nachrichten, Prognosen. GoldRisk bleibt bewusst fokussiert. Es liefert eine transparente, deterministische Positionsgrößen-Berechnung, speichert deinen Verlauf und lässt dich die Konten und Spezifikationen verwalten, mit denen du wirklich handelst.',
    notDoTitle: 'Was wir nicht tun',
    notDoBody:
      'GoldRisk platziert keine Aufträge, verwaltet keine Positionen und prognostiziert keine Märkte. Es ist ein Werkzeug für Berechnung und Risikomanagement. Jeder Trade und jede Entscheidung, wo und ob er ausgeführt wird, liegt bei dir.',
    transparencyTitle: 'Transparenz',
    transparencyBody:
      'Die Berechnungs-Engine wird gegen einen dokumentierten Referenzfall getestet, und dein Verlauf speichert die exakten Eingaben und Ausgaben jeder Berechnung, sodass Ergebnisse jederzeit nachvollziehbar und verifizierbar bleiben.',
  },

  contact: {
    title: 'Kontakt',
    description:
      'Ein Kontaktformular wird hinzugefügt, sobald GoldRisk über ein Backend verfügt, über das Nachrichten übermittelt werden können. Bis dahin schreib uns per E-Mail.',
  },

  privacy: {
    title: 'Datenschutz',
    description:
      'Die vollständige Datenschutzrichtlinie von GoldRisk wird zusammen mit der Konten- und Datenverwaltung ausgearbeitet, die sie beschreiben wird. Diese Seite wird vor dem Start dieser Funktionen durch die vollständige Richtlinie ersetzt.',
  },

  terms: {
    title: 'Nutzungsbedingungen',
    description:
      'Die vollständigen Nutzungsbedingungen von GoldRisk werden ausgearbeitet und erscheinen hier, bevor die Kontoerstellung freigeschaltet wird.',
  },

  notFound: {
    title: 'Seite nicht gefunden',
    body: 'Die Seite, die du suchst, existiert nicht oder wurde verschoben.',
    back: 'Zurück zur Startseite',
  },

  auth: {
    welcomeBack: 'Willkommen zurück',
    loginSubtitle: 'Melde dich in deinem GoldRisk-Arbeitsbereich an.',
    email: 'E-Mail-Adresse',
    password: 'Passwort',
    emailPlaceholder: 'sie@beispiel.de',
    passwordPlaceholder: '••••••••',
    loggingIn: 'Anmeldung…',
    login: 'Anmelden',
    noAccount: 'Neu bei GoldRisk?',
    createAccount: 'Konto erstellen',
    createTitle: 'Erstelle dein Konto',
    createSubtitle: 'Ein Konto für deine Konten, deinen Verlauf und die Positionsgrößen-Berechnung.',
    name: 'Name',
    namePlaceholder: 'Dein Name',
    passwordTooShort: 'Das Passwort muss mindestens 8 Zeichen lang sein.',
    passwordsDoNotMatch: 'Die Passwörter stimmen nicht überein.',
    confirmPassword: 'Passwort bestätigen',
    confirmPlaceholder: 'Wiederhole dein Passwort',
    creatingAccount: 'Konto wird erstellt…',
    createButton: 'Konto erstellen',
    hasAccount: 'Du hast bereits ein Konto?',
    nameRequired: 'Gib deinen Namen ein.',
    passwordPlaceholderLong: 'Mindestens 8 Zeichen',
    or: 'oder',
    continueWithGoogle: 'Mit Google fortfahren',
    signUpWithGoogle: 'Registriere dich mit Google',
    googleUnavailable: 'Google-Anmeldung ist noch nicht verfügbar. Nutze vorerst E-Mail und Passwort.',
  },

  calcPage: {
    title:'Rechner für Positionsgrößen',    subtitle: 'Berechnen Sie die Lotgröße für Ihren XAUUSD-Trade auf Basis des von Ihnen definierten Risikos.',
    historyNotePre: 'Gespeicherte Berechnungen erscheinen auf der Seite ',
    historyNotePost: ', wo du die exakten Eingaben und Ergebnisse jederzeit einsehen kannst.',
  },

  calc: {
    tradeInputs: 'Handelsdetails',
    tradeSetup: 'Trade-Setup',
    currencyChipUsc: '{{value}} {{currency}} = 1 $',
    currencyChipUsd: 'Konto in USD',
    loadingAccounts: 'Gespeicherte Konten werden geladen…',
    loadingOptions: 'Wird geladen…',
    tradingAccount: 'Handelskonto',
    builtIn: '{{name}} (integriert)',
    basic: 'Einfach',
    advanced: 'Erweitert',
    symbol: 'Symbol',
    contractSize: 'Kontraktgröße',
    minMaxLot: 'Los min. / max.',
    lotStep: 'Los-Schritt',
    accountCurrency: 'Kontowährung',
    usdConversion: 'Umrechnung in USD',
    usdConversionValue: '1 USD = {{value}}',
    broker: 'Broker',
    riskMode: 'Risikomodell',
    riskModePercentage: 'Prozentsatz des Kontostands',
    riskModeFixed: 'Fester Betrag (USD)',
    riskModeAccountCurrency: 'Kontowährung',
    riskAmount: 'Risikobetrag',
    position: 'Position',
    buy: 'Kauf',
    sell: 'Verkauf',
    entryPrice: 'Einstiegspreis',
    stopLoss: 'Stop-Loss',
    takeProfit: 'Take-Profit',
    tpHint: 'Optional: aktiviert Risiko/Rendite und möglichen Gewinn',
    checkInputs: 'Prüfe deine Eingaben',
    fixSetup: 'Korrigiere die Handelseinstellungen',
    calculate: 'Berechnen',
    clear: 'Zurücksetzen',
    saveCalculation: 'Berechnung speichern',
    saving: 'Wird gespeichert…',
    saved: 'Im Verlauf gespeichert.',
    saveFailed: 'Speichern fehlgeschlagen. Versuche es erneut.',
    loginToSave: 'um Berechnungen im Verlauf zu speichern.',
  },

  result: {
    recommendedLot: 'Empfohlenes Los',
    positionResult: 'Positionsergebnis',
    copyLot: 'Los kopieren',
    copied: 'Kopiert',
    lotNote: 'Das Risiko überschreitet nie den definierten Betrag: Es wird auf den Los-Schritt des Brokers abgerundet.',
    exactLot: 'Exakte Losgröße',
    lots: 'Lose',
    slDistance: 'Stop-Loss-Distanz',
    intendedRisk: 'Geplantes Risiko',
    actualRisk: 'Reales Risiko (abgerundet)',
    riskReward: 'Risiko / Rendite',
    potentialProfit: 'Möglicher Gewinn',
    empty:
      'Gib deine Handelsdetails ein und klicke auf Berechnen. Verluste können dein Budget schnell übersteigen: Prüfe das reale Risiko, bevor du den Auftrag aufgibst.',
    invalid: 'Nichts anzuzeigen, bis die Daten die Einrichtungsprüfungen bestehen.',
  },

  marquee: {
    label: 'GoldRisk-Bekanntmachungen',
    welcome: 'Willkommen bei GoldRisk — dem XAUUSD-Positionsgrößen-Rechner.',
    tagline: 'Größenbestimmung jedes Gold-Trades nach dem Risiko, das du wirklich gewählt hast.',
    slogan: 'Präzise Positionsgrößenbestimmung bis zum Los-Schritt deines Brokers.',
    newUsers: 'Neu bei GoldRisk?',
    existingUsers: 'Schon Kunde?',
  },

  calcGuide: {
    title: 'So berechnet GoldRisk die Positionsgröße',
    intro:
      'Dein Kontostand bestimmt, was du riskieren kannst; dein Stop-Loss legt fest, wo der Trade inakzeptabel wird; und der Abstand zwischen Einstieg und Stop-Loss wird in eine Losgröße umgerechnet. Ein deterministischer Weg, ohne Raten.',
    steps: [
      {
        title: 'Kontostand',
        body: 'Dein Startkapital in der Währung des Kontos (z. B. USC bei einem Cent-Konto). Dein akzeptiertes Risiko wird darauf bezogen.',
      },
      {
        title: 'Risikobetrag',
        body: 'Wie viel du bereit bist zu verlieren: als Prozentsatz des Kontostands, als fester USD-Betrag oder als fester Betrag in Kontowährung.',
      },
      {
        title: 'Stop-Loss-Distanz',
        body: 'Die absolute Differenz zwischen Einstiegskurs und Stop-Loss, auf der für BUY oder SELL richtigen Kursseite.',
      },
      {
        title: 'Kontraktspezifikation',
        body: 'Kontraktgröße, Mindest- und Höchst-Los sowie Los-Schritt des Instruments — die Regeln des Brokers, die das Ergebnis einhalten muss.',
      },
      {
        title: 'Exakte Positionsgröße',
        body: 'GoldRisk teilt den exponierten Wert eines Loses durch die Stop-Loss-Distanz und skaliert ihn auf deinen Risikobetrag herunter.',
      },
      {
        title: 'Los-Schritt-Rundung',
        body: 'Das exakte Los wird auf den Los-Schritt deines Brokers abgerundet. So bleibt das reale Risiko bei oder unter deinem gewählten Betrag.',
      },
      {
        title: 'Empfohlenes Los',
        body: 'Die endgültige, handelbare Größe. GoldRisk warnt dich, wenn sie unter das Mindest- oder über das Höchst-Los fällt.',
      },
    ],
    topics: [
      {
        title: 'Warum der Stop-Loss wichtig ist',
        body: 'Der Stop-Loss ist der einzige Kurs, den du kontrollierst und der deinen größten akzeptablen Verlust definiert. Ohne ihn hat die Positionsgröße keinen Anker.',
      },
      {
        title: 'Warum der Risikoprozentsatz wichtig ist',
        body: 'Ein konstanter Prozentsatz hält jeden Trade klein genug, sodass eine Verlustserie überlebbar bleibt — die Mathematik, die dich im Spiel hält.',
      },
      {
        title: 'Was ist das empfohlene Los?',
        body: 'Es ist das größte Los, das dein Broker bei oder unter deinem gewählten Risiko erlaubt. Das reale Risiko kann geringer sein, nie höher.',
      },
      {
        title: 'GoldRisk und XAUUSDc',
        body: 'GoldRisk ist für Exness Standard Cent und den XAUUSDc-Kontrakt konfiguriert (Kontraktgröße 1, Mindest-Los 0.01, Höchst-Los 200, Schritt 0.01).',
      },
    ],
  },

  accounts: {
    title: 'Handelskonten',
    subtitleEmpty:
      'Erstelle ein Konto, um seinen Kontostand und seine Instrumentenspezifikationen im Rechner zu nutzen.',
    subtitleOne: '{{count}} Konto – der Rechner nutzt es für Kontostand, Währung und Loslimits.',
    subtitleMany: '{{count}} Konten – der Rechner nutzt sie für Kontostand, Währung und Loslimits.',
    newAccount: 'Neues Konto',
    createAccount: 'Konto erstellen',
    editAccount: '{{name}} bearbeiten',
    saveChanges: 'Änderungen speichern',
    cancel: 'Abbrechen',
    saving: 'Wird gespeichert…',
    unableToLoad: 'Deine Konten konnten nicht geladen werden',
    retry: 'Erneut versuchen',
    loading: 'Konten werden geladen…',
    emptyTitle: 'Noch keine Konten',
    emptyBody:
      'Erstelle dein erstes Handelskonto – zum Beispiel Exness Standard Cent mit XAUUSDc – und der Rechner kann Kontostand und Loslimits automatisch laden.',
    emptyCreate: 'Konto erstellen',
    delete: 'Löschen',
    confirm: 'Löschung bestätigen',
    edit: 'Bearbeiten',
    default: 'Standard',
    active: 'Aktiv',
    inactive: 'Inaktiv',
    balance: 'Kontostand',
    usdConversion: 'Umrechnung in USD',
    usdConversionValue: '1 USD = {{value}}',
    currency: 'Währung',
    created: 'Erstellt',
    symbol: 'Symbol',
    contractSize: 'Kontraktgröße',
    minLot: 'Los min.',
    maxLot: 'Los max.',
    lotStep: 'Los-Schritt',
    specTitle: 'Symbolspezifikationen',
    addSpec: '+ Spezifikation hinzufügen',
    loadingSpecs: 'Spezifikationen werden geladen…',
    noSpecs: 'Noch keine Spezifikationen. Füge eine hinzu, um dieses Konto im Rechner zu verwenden.',
    specContract: 'Kontrakt',
    specMinMax: 'Min. / Max.',
    specStep: 'Schritt',
    accountName: 'Kontoname',
    broker: 'Broker',
    accountType: 'Kontotyp',
    usdConversionLabel: 'Umrechnung in USD',
    usdConversionHint: 'Kontowährungseinheiten je 1 USD (100 für Cent-Konten)',
    balanceLabel: 'Kontostand',
    accountNameRequired: 'Der Kontoname ist erforderlich.',
    brokerRequired: 'Der Broker ist erforderlich.',
    accountTypeRequired: 'Der Kontotyp ist erforderlich.',
    currencyRequired: 'Die Währung ist erforderlich.',
    positiveValue: 'Gib einen Wert größer als 0 ein.',
    nonNegativeValue: 'Gib einen Wert größer oder gleich 0 ein.',
    symbolRequired: 'Das Symbol ist erforderlich.',
    minMaxConflict: 'Das Mindestlos darf das Höchstlos nicht überschreiten.',
    stepConflict: 'Der Los-Schritt darf das Höchstlos nicht überschreiten.',
  },

  history: {
    title: 'Berechnungsverlauf',
    subtitleEmpty: 'Deine gespeicherten Berechnungen erscheinen hier.',
    subtitleCount: '{{count}} Berechnung',
    subtitleCountOther: '{{count}} Berechnungen',
    unableToLoad: 'Dein Berechnungsverlauf konnte nicht geladen werden',
    apiUnreachable: 'Die API ist in dieser Umgebung nicht erreichbar.',
    tryAgain: 'Versuche es erneut.',
    retry: 'Erneut versuchen',
    loading: 'Verlauf wird geladen…',
    emptyTitle: 'Noch kein Berechnungsverlauf',
    emptyBody: 'Deine gespeicherten Berechnungen erscheinen hier, nachdem du eine Position berechnet hast.',
    goToCalculator: 'Zum Rechner',
    details: 'Details',
    delete: 'Löschen',
    lot: 'Los',
    entry: 'Einstieg',
    savedAt: '{{date}} um {{time}} Uhr',
  },

  modal: {
    detailLabel: 'Berechnungsdetails',
    savedAt: 'Gespeichert am {{date}} um {{time}} Uhr',
    closeDetails: 'Details schließen',
    close: 'Schließen',
    loading: 'Details werden geladen…',
    unableToLoad: 'Diese Berechnung konnte nicht geladen werden',
    accountBroker: 'Konto / Broker',
    calculationId: 'Berechnungs-ID',
    instrument: 'Instrument',
    direction: 'Richtung',
    entryPrice: 'Einstiegspreis',
    balance: 'Kontostand',
    riskMode: 'Risikomodell',
    riskAmount: 'Risikobetrag',
    stopLoss: 'Stop-Loss',
    takeProfit: 'Take-Profit',
    contractSize: 'Kontraktgröße',
    results: 'Ergebnisse',
    slDistance: 'SL-Distanz',
    exactLot: 'Exaktes Los',
    recommendedLot: 'Empfohlenes Los',
    actualRisk: 'Reales Risiko',
    riskReward: 'Risiko / Rendite',
    potentialProfit: 'Möglicher Gewinn',
    ariaLabel: 'Details der Berechnung {{position}} {{symbol}}',
  },

  engine: {
    entryValid: 'Gib einen gültigen Einstiegspreis ein.',
    entryRequired: 'Der Einstiegspreis ist erforderlich.',
    stopLossValid: 'Gib einen gültigen Stop-Loss ein.',
    stopLossRequired: 'Der Stop-Loss ist erforderlich.',
    riskValid: 'Gib einen gültigen Risikobetrag ein.',
    riskRequired: 'Der Risikobetrag ist erforderlich.',
    balanceValid: 'Gib einen gültigen Kontostand ein.',
    balanceRequiredForPercent:
      'Der Kontostand ist bei prozentualem Risiko erforderlich.',
    entryGreaterThanZero: 'Der Einstiegspreis muss größer als null sein.',
    stopLossGreaterThanZero: 'Der Stop-Loss muss größer als null sein.',
    riskGreaterThanZero: 'Der Risikobetrag muss größer als null sein.',
    balanceGreaterThanZeroPercent:
      'Der Kontostand muss größer als null sein, wenn ein prozentuales Risiko verwendet wird.',
    identical: 'Einstieg und Stop-Loss dürfen nicht identisch sein.',
    buySlBelow: 'Bei KAUF muss der Stop-Loss unter dem Einstiegspreis liegen.',
    buyTpAbove: 'Bei KAUF muss der Take-Profit über dem Einstiegspreis liegen.',
    sellSlAbove: 'Bei VERKAUF muss der Stop-Loss über dem Einstiegspreis liegen.',
    sellTpBelow: 'Bei VERKAUF muss der Take-Profit unter dem Einstiegspreis liegen.',
    lotBelowMin:
      'Das benötigte Los ({{exact}}) liegt unter dem Minimum von {{min}} des Brokers. Die Verwendung des Mindestlos könnte das gewählte Risiko überschreiten.',
    lotExceedsMax:
      'Das benötigte Los überschreitet das Maximum von {{max}} des Brokers. Das Risiko wird vom Höchstlos begrenzt und das reale Risiko wird geringer sein als geplant.',
  }
}

export default de