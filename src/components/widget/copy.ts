/** All customer-facing text of the quote widget. French only, as requested. */
export const widgetCopy = {
  progressLabel: "Progression de la demande",
  stepOf: "Étape {n} sur 3",
  steps: ["Secteur", "Service", "Coordonnées"],
  edit: "Modifier",
  back: "Retour",
  next: "Continuer",

  s1: {
    label: "Desservons-nous votre secteur?",
    placeholder: "Votre code postal (ex. J4K 2T4)",
    cta: "Vérifier mon secteur",
    errors: {
      invalid: "Entrez un code postal canadien valide (ex. J4K 2T4).",
      outside: "Nous desservons uniquement le Québec. Ce code postal est à l'extérieur de notre territoire.",
    },
  },

  s2: {
    good: "Bonne nouvelle! Nous desservons votre secteur.",
    pending: "Merci! Notre équipe confirmera avec vous si nous desservons votre secteur.",
    postalLabel: "Code postal",
    municipalityLabel: "Dans quelle municipalité se trouve la propriété?",
    municipalityHint: "Cela nous permet de confirmer la couverture de votre secteur.",
    municipalityError: "Indiquez la municipalité.",
    question: "Quel service recherchez-vous?",
    prominent: "Notre spécialité",
    serviceError: "Choisissez un service pour continuer.",
    services: [
      { key: "gonano-protection", label: "Protection de toiture GoNano", primary: true },
      { key: "revitalisation", label: "Revitalisation des bardeaux d'asphalte", primary: true },
      { key: "membrane", label: "Protection de membrane élastomère", primary: false },
      { key: "beton-bois", label: "Protection du béton ou du bois", primary: false },
      { key: "reparation", label: "Réparation ou remplacement de toiture", primary: false },
      { key: "inconnu", label: "Je ne sais pas encore", primary: false },
    ],
  },

  s3: {
    title: "Obtenez votre bilan de toiture gratuit",
    subtitle: "Choisissez le moment qui vous convient. Sans frais et sans engagement.",
    dayLabel: "Jour préféré",
    windowLabel: "Période préférée",
    asap: "Dès que possible",
    windows: [
      { value: "matin", label: "Matin", hint: "8 h à 12 h" },
      { value: "apres-midi", label: "Après-midi", hint: "12 h à 16 h" },
      { value: "soir", label: "Soir", hint: "16 h à 20 h" },
      { value: "peu-importe", label: "Peu importe", hint: "" },
    ],
    preferenceNote: "Il s'agit d'une préférence, pas d'une réservation. Nous confirmons le rendez-vous avec vous.",
    name: "Nom complet",
    phone: "Téléphone",
    email: "Courriel",
    postal: "Code postal",
    service: "Service choisi",
    consentBefore: "J'accepte que Les Experts Nano Protection Toitures utilise ces renseignements pour répondre à ma demande, comme décrit dans la ",
    consentLink: "politique de confidentialité",
    consentAfter: ".",
    cta: "Demander mon bilan gratuit",
    sending: "Envoi en cours...",
  },

  s4: {
    title: "Merci!",
    text: "Merci! Votre demande a bien été reçue. Notre équipe communiquera avec vous prochainement pour confirmer les prochaines étapes.",
    preference: "Votre préférence (à confirmer):",
    service: "Service demandé:",
    postal: "Code postal:",
    pendingNote: "Nous confirmerons aussi que votre secteur est desservi.",
  },
} as const;
