export type FaqItem = { q: string; a: string };
export type FaqCategory = { id: string; label: string; items: FaqItem[] };

export const faqCategories: FaqCategory[] = [
  {
    id: "produits",
    label: "Produits",
    items: [
      {
        q: "Qu'est-ce que GoNano?",
        a: "GoNano est une marque de traitements de surface pour toitures en bardeaux d'asphalte. Nous sommes applicateurs de ces produits. Nous ne sommes pas le fabricant. Pour les spécifications techniques, la documentation du fabricant fait foi.",
      },
      {
        q: "Les trois produits s'appliquent-ils ensemble?",
        a: "Non. Chaque produit a un usage visé, souvent lié à l'âge et à l'état de la toiture. Nous recommandons le produit qui convient après l'inspection, pas les trois par défaut.",
      },
    ],
  },
  {
    id: "technologie",
    label: "Technologie",
    items: [
      {
        q: "Comment fonctionne un traitement de toiture?",
        a: "Le produit est appliqué sur la surface des bardeaux pour aider à les protéger contre l'eau, le soleil et le gel. L'effet réel dépend de l'état de départ de la toiture. Un traitement ne répare pas des bardeaux déjà détruits.",
      },
      {
        q: "Les résultats sont-ils prouvés de façon indépendante?",
        a: "Les données de performance que nous citons proviennent du fabricant. Nous les présentons comme telles et nous ne les faisons pas passer pour des études indépendantes.",
      },
    ],
  },
  {
    id: "tarification",
    label: "Tarification",
    items: [
      {
        q: "Combien coûte un traitement?",
        a: "Le prix dépend de la superficie, de l'accessibilité et de l'état de la toiture. Nous ne publions pas de prix fixe sans avoir vu la toiture. L'évaluation est gratuite et la soumission écrite précise le prix avant tout travail.",
      },
      {
        q: "Est-ce moins cher qu'un remplacement?",
        a: "Souvent, un traitement coûte moins cher qu'un remplacement complet, mais seulement si la toiture est admissible. Nous comparons les deux options avec vous, y compris lorsque le remplacement est la meilleure décision.",
      },
    ],
  },
  {
    id: "garantie",
    label: "Garantie",
    items: [
      {
        q: "Quelle garantie est offerte?",
        a: "Une garantie du fabricant peut s'appliquer selon l'âge de la toiture, son état et le produit utilisé. Les conditions exactes vous sont remises par écrit avant les travaux. Nous ne promettons pas une durée sans connaître votre cas.",
      },
    ],
  },
  {
    id: "installation",
    label: "Installation",
    items: [
      {
        q: "Combien de temps dure l'application?",
        a: "Pour une maison résidentielle typique, l'application se fait généralement en une journée, mais la durée varie selon la superficie, la préparation requise et la météo.",
      },
      {
        q: "Faut-il être présent?",
        a: "Votre présence n'est pas obligatoire pendant l'application. Nous vous contactons avant et après les travaux.",
      },
    ],
  },
  {
    id: "securite",
    label: "Sécurité",
    items: [
      {
        q: "Le traitement est-il sécuritaire pour la maison, le terrain et les animaux?",
        a: "Nous suivons les consignes de sécurité du fabricant lors de l'application. Pour les détails (fiche de données de sécurité, délais d'attente, précautions pour le terrain et les animaux), nous vous remettons la documentation officielle du produit utilisé.",
      },
    ],
  },
  {
    id: "entretien",
    label: "Entretien",
    items: [
      {
        q: "Que se passe-t-il après le traitement?",
        a: "Nous vous remettons les documents liés à votre produit et vos conditions de garantie, s'il y a lieu. Nous recommandons un suivi périodique, car aucun traitement ne dispense d'inspecter sa toiture.",
      },
    ],
  },
  {
    id: "admissibilite",
    label: "Admissibilité des toitures",
    items: [
      {
        q: "Ma toiture peut-elle être traitée?",
        a: "Cela dépend de son matériau, de son âge et de son état. Le traitement vise les bardeaux d'asphalte encore sains. Une toiture avec des fuites, des bardeaux fendus en profondeur ou un pontage endommagé doit d'abord être réparée, ou remplacée.",
      },
      {
        q: "Peut-on traiter une toiture de 15 ans?",
        a: "C'est possible lorsque les bardeaux sont encore sains. Seule une inspection permet de le confirmer. L'âge seul ne décide pas.",
      },
      {
        q: "Comment décidez-vous entre réparer, préserver et remplacer?",
        a: "Nous regardons l'état des bardeaux, du pontage et des solins. S'il y a un dommage structurel ou une fuite, on répare ou on remplace. Si la toiture est saine mais usée en surface, la préservation peut être pertinente. Notre recommandation est écrite.",
      },
    ],
  },
  {
    id: "zones",
    label: "Zones desservies",
    items: [
      {
        q: "Quelles régions desservez-vous?",
        a: "Consultez la page Zones desservies pour la liste à jour. Si votre secteur n'y figure pas, écrivez-nous: nous vous dirons honnêtement si nous pouvons nous y rendre.",
      },
    ],
  },
];

export const allFaqItems = faqCategories.flatMap((c) => c.items);
