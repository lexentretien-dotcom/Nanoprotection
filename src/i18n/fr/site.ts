export const site = {
  hoursText: "Du lundi au dimanche, de 8 h à 20 h",
  breadcrumbs: { home: "Accueil", label: "Fil d'Ariane" },
  defaultTitle: "Préservation de toiture au Québec",
  defaultDescription:
    "Préservation et protection de toitures en bardeaux d'asphalte au Québec. Inspection, recommandation honnête et traitements GoNano. Demandez une évaluation gratuite.",
  titleSuffix: "Nano Protection",
  ogImageAlt: "Les Experts Nano Protection Toitures",
  orgDescription:
    "Traitements de préservation et de protection de toitures en bardeaux d'asphalte au Québec, avec les produits GoNano.",

  regionsTitle: "Zones de service",
  regionsIntro: "Nous desservons plusieurs régions du Québec :",
  regions: [
    { slug: "rive-sud-montreal", name: "Rive-Sud de Montréal", detail: "" },
    { slug: "saguenay-lac-saint-jean", name: "Saguenay-Lac-Saint-Jean", detail: "" },
    { slug: "sherbrooke", name: "Grande région de Sherbrooke", detail: "" },
  ],

  coordinates: {
    title: "Coordonnées",
    phone: "Téléphone",
    email: "Courriel",
    hours: "Heures d'ouverture",
  },

  testimonials: {
    title: "Ce que disent nos clients",
    stagingEmpty:
      "Aperçu de la section. Aucun témoignage vérifié pour l'instant: ajoutez de vrais commentaires de clients, avec leur autorisation écrite, dans src/content/projects.ts. Cette carte n'apparaît pas en production tant qu'il n'y en a pas.",
    ratingLabel: "{n} étoiles sur 5",
  },

  trust: {
    items: [
      {
        icon: "certified",
        title: "Installateur autorisé GoNano",
        text: "Revendeur et installateur autorisé des produits GoNano.",
      },
      {
        icon: "honest",
        title: "Évaluation sans pression",
        text: "Nous examinons votre toiture. Si elle n'est pas admissible au traitement, nous vous le disons franchement.",
      },
      {
        icon: "reply",
        title: "Réponse en 24 h",
        text: "Réponse garantie en 24 h à votre demande d'évaluation, sans frais et sans engagement.",
      },
      {
        icon: "oneDay",
        title: "Application en une journée",
        text: "Généralement complétée en une journée pour une maison typique, sans arracher votre toiture.",
      },
    ],
    note: "Selon la superficie, la préparation requise et la météo.",
  },

  ctaBand: {
    title: "Savoir où en est votre toiture, sans engagement.",
    text: "Un technicien examine votre toiture et vous dit franchement si elle peut être préservée, réparée ou doit être remplacée.",
  },

  footer: {
    blurb:
      "Préservation et protection de toitures en bardeaux d'asphalte, avec les traitements GoNano. Un avis honnête, d'abord.",
    treatments: "Traitements",
    productsLink: "Produits GoNano",
    technologyLink: "Technologie",
    resources: "Ressources",
    resourceLinks: [
      { href: "/blogue", label: "Blogue" },
      { href: "/faq", label: "Questions fréquentes" },
      { href: "/realisations", label: "Réalisations" },
      { href: "/zones-desservies", label: "Zones desservies" },
      { href: "/a-propos", label: "À propos" },
      { href: "/contact", label: "Contact" },
    ],
    regions: "Régions",
    certifications: "Licence et certifications",
    certs: {
      gonano: "Certifié GoNano",
      contractor: "Contracteur certifié",
      rbq: "Licence RBQ",
    },
    certAlt: {
      gonano: "Logo GoNano",
      contractor: "Revendeur et installateur autorisé GoNano",
      rbq: "Régie du bâtiment du Québec",
    },
    officialWarranty: "Garantie officielle (PDF)",
    toConfirm: "à confirmer",
    rights: "© {year} Les Experts Nano Protection Toitures. Tous droits réservés.",
    legal: [
      { href: "/confidentialite", label: "Confidentialité" },
      { href: "/conditions-utilisation", label: "Conditions d'utilisation" },
      { href: "/temoins", label: "Témoins" },
      { href: "/mentions-legales", label: "Mentions légales" },
    ],
    disclaimer:
      "GoNano est une marque de son propriétaire. Nous sommes installateur autorisé de ces produits et n'en sommes pas le fabricant. Les renseignements sur ce site sont de nature générale et ne remplacent pas une inspection sur place.",
  },


  sticky: { callAria: "Appeler le {phone}" },
};

export type Site = typeof site;
