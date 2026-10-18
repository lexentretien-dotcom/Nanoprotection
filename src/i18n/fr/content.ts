export type ServiceItem = {
  slug: string;
  name: string;
  summary: string;
  intendedUse: string;
  benefits: string[];
  suitable: string[];
  notSuitable: string[];
  method: string[];
  maintenance: string;
  warranty: string;
  alternative: string;
  seoTitle: string;
  seoDescription: string;
};

const services = {
  index: {
    title: "Nos traitements",
    intro: "Chaque service est présenté avec ses avantages, ses limites et les cas où une autre solution est préférable.",
    readMore: "Lire les détails",
    metaTitle: "Nos traitements de toiture",
    metaDescription:
      "Inspection, rajeunissement et protection préventive de toitures en bardeaux d'asphalte. Découvrez ce qui convient à votre toiture, et ce qui n'y convient pas.",
  },
  labels: {
    what: "À quoi ça sert",
    benefits: "Avantages",
    how: "Comment ça se passe",
    suitable: "Toitures qui conviennent",
    notSuitable: "Quand ce n'est pas la bonne solution",
    upkeep: "Entretien et garantie",
    otherSolution: "Et si une autre solution est préférable?",
  },
  items: [
    {
      slug: "inspection-evaluation",
      name: "Inspection et évaluation de toiture",
      summary:
        "Un technicien examine votre toiture et vous dit franchement si elle peut être préservée, réparée ou si elle doit être remplacée.",
      intendedUse: "Savoir où en est votre toiture avant de dépenser quoi que ce soit.",
      benefits: [
        "Un avis clair, sans obligation d'acheter un traitement",
        "Les signes de vieillissement expliqués avec des photos",
        "Une recommandation écrite qui sépare réparation, préservation et remplacement",
      ],
      suitable: [
        "Toiture en bardeaux d'asphalte de n'importe quel âge",
        "Propriétaires qui comparent préservation et remplacement",
      ],
      notSuitable: [
        "Urgence active (fuite en cours): contactez d'abord un couvreur pour une réparation d'urgence",
      ],
      method: [
        "Échange par téléphone ou formulaire",
        "Visite sur place et examen de la surface",
        "Photos et notes de l'état de la toiture",
        "Recommandation expliquée de vive voix, puis par écrit",
      ],
      maintenance:
        "Une nouvelle inspection est conseillée à intervalles réguliers, surtout après un hiver rigoureux.",
      warranty:
        "L'inspection ne comporte pas de garantie de résultat. Elle fournit un avis professionnel à un moment donné.",
      alternative:
        "Si votre toiture est en fin de vie ou présente des dommages de structure, nous vous le dirons et vous recommanderons une réparation ou un remplacement.",
      seoTitle: "Inspection de toiture au Québec | Évaluation gratuite",
      seoDescription:
        "Faites évaluer votre toiture en bardeaux d'asphalte. Avis honnête: préservation, réparation ou remplacement. Demandez votre évaluation gratuite.",
    },
    {
      slug: "rajeunissement-toiture",
      name: "Rajeunissement de toiture",
      summary:
        "Un traitement de surface appliqué sur des bardeaux d'asphalte encore sains, pour aider à prolonger leur vie utile sans tout arracher.",
      intendedUse:
        "Toitures d'âge moyen dont les bardeaux montrent de l'usure mais ne sont pas détruits.",
      benefits: [
        "Évite un remplacement prématuré lorsque la toiture est encore saine",
        "Travaux généralement plus courts qu'un remplacement complet",
        "Peu de débris, puisque rien n'est arraché",
      ],
      suitable: [
        "Bardeaux d'asphalte sans dommage structurel",
        "Pas d'infiltration d'eau active",
        "Propriétaires qui veulent rester plusieurs années dans la maison",
      ],
      notSuitable: [
        "Bardeaux fendillés en profondeur ou décollés à grande échelle",
        "Pontage endommagé ou fuites actives",
        "Toiture en fin de vie",
      ],
      method: [
        "Inspection et confirmation de l'admissibilité",
        "Réparations mineures et nettoyage de la surface",
        "Application du produit par un technicien formé",
        "Contrôle final et remise des documents de garantie, s'il y a lieu",
      ],
      maintenance:
        "Un suivi périodique est recommandé. Le calendrier précis dépend du produit et des conditions de garantie.",
      warranty:
        "Une garantie limitée du fabricant peut s'appliquer selon l'âge, l'état de la toiture et le produit. Les conditions sont remises par écrit avant les travaux.",
      alternative:
        "Lorsque la toiture est trop abîmée, le remplacement demeure la bonne solution. Un traitement ne remplace pas une réparation structurelle.",
      seoTitle: "Rajeunissement de toiture en bardeaux d'asphalte | Québec",
      seoDescription:
        "Le rajeunissement de toiture peut prolonger la vie de bardeaux d'asphalte encore sains. Découvrez quand c'est approprié et quand remplacer.",
    },
    {
      slug: "protection-preventive",
      name: "Protection préventive",
      summary:
        "Un traitement appliqué tôt sur une toiture récente pour ralentir l'usure causée par le soleil, l'eau et le gel.",
      intendedUse: "Toitures récentes en bon état, avant que le vieillissement n'apparaisse.",
      benefits: [
        "Agit avant les dommages plutôt qu'après",
        "Cadre d'entretien planifiable",
        "Utile dans un climat à cycles de gel et de dégel",
      ],
      suitable: [
        "Toiture de moins de quelques années, sans défaut",
        "Propriétaires qui veulent protéger un investissement récent",
      ],
      notSuitable: ["Toiture déjà endommagée: une réparation passe en premier"],
      method: [
        "Inspection et confirmation de l'admissibilité",
        "Nettoyage de la surface",
        "Application du produit",
        "Contrôle final",
      ],
      maintenance: "Suivi périodique conseillé selon les recommandations du fabricant.",
      warranty:
        "Les conditions de garantie dépendent du produit et de l'état de la toiture. Elles sont fournies par écrit avant les travaux.",
      alternative:
        "Si votre toiture a déjà plusieurs années, le rajeunissement ou une simple inspection peut être plus approprié.",
      seoTitle: "Protection préventive de toiture | Bardeaux d'asphalte au Québec",
      seoDescription:
        "Protégez une toiture récente avant l'usure. Découvrez la protection préventive et ses limites, avec un avis honnête sur ce qui convient à votre maison.",
    },
  ] as ServiceItem[],
};

export type ProductItem = {
  slug: string;
  name: string;
  roofAge: string;
  lifeAdded: string;
  summary: string;
  recommendedUse: string;
  compatibility: string;
  considerations: string;
  warranty: string;
  limitations: string;
};

const products = {
  metaTitle: "Produits GoNano: NuRoof Fortify, Revive et Bio-Boost",
  metaDescription:
    "Comparez les produits GoNano NuRoof Fortify, Revive et Bio-Boost: âge de toiture visé, usage, application, garantie du fabricant et limites.",
  title: "Les produits GoNano.",
  intro:
    "Trois produits, trois situations. Ils ne sont pas interchangeables et ne s'appliquent pas tous ensemble.",
  pickLabel: "Choisir un produit à mettre en évidence",
  tableCaption:
    "Comparaison des produits GoNano par âge de toiture, durée de vie ajoutée, usage, compatibilité, application, garantie et limites",
  tableRegion: "Tableau comparatif des produits",
  criterion: "Critère",
  rows: {
    roofAge: "Âge de la toiture visé",
    lifeAdded: "Durée de vie ajoutée (selon le fabricant)",
    recommendedUse: "Usage recommandé",
    compatibility: "Compatibilité",
    considerations: "Application",
    warranty: "Garantie du fabricant",
    limitations: "Limites",
  },
  note: "Les produits ne sont pas interchangeables et ne s'appliquent pas tous ensemble sur chaque toiture. Les durées de vie ajoutées et les périodes de garantie proviennent du fabricant. Elles dépendent de l'état de la toiture et sont confirmées avant tout travail.",
  items: [
    {
      slug: "nuroof-fortify",
      name: "NuRoof Fortify",
      roofAge: "Toitures de 0 à 5 ans",
      lifeAdded: "10 à 15 ans ajoutés",
      summary:
        "Pensé pour les toitures récentes, dans une logique de protection préventive avant que le vieillissement ne s'installe.",
      recommendedUse:
        "Toiture récente en bon état, pour ralentir le vieillissement des bardeaux.",
      compatibility: "Bardeaux d'asphalte (et membranes SBS, pour les produits Fortify seulement).",
      considerations:
        "Évaluation de la santé de la toiture (RHS), nettoyage et préparation de la surface avant l'application. Conditions météo adéquates requises.",
      warranty:
        "Garantie limitée du fabricant: 12 à 15 ans (1 couche), selon le score de santé de la toiture. Conditions remises par écrit avant les travaux.",
      limitations: "Ne répare pas les fuites, les solins ni les problèmes de structure.",
    },
    {
      slug: "nuroof-revive",
      name: "NuRoof Revive",
      roofAge: "Toitures de 5 à 20 ans",
      lifeAdded: "5 à 10 ans ajoutés",
      summary:
        "Conçu pour les toitures qui montrent les premiers signes d'usure et qui sont encore saines dans l'ensemble.",
      recommendedUse:
        "Toiture d'âge moyen, avec une usure de surface mais sans dommage structurel.",
      compatibility:
        "Bardeaux d'asphalte dont l'état est jugé admissible après inspection. Non offert sur membrane SBS.",
      considerations:
        "Inspection préalable obligatoire. Les réparations mineures sont faites avant le traitement.",
      warranty:
        "Garantie limitée du fabricant: 7 à 10 ans, selon le score de santé de la toiture. Conditions remises par écrit avant les travaux.",
      limitations:
        "Ne remplace pas le remplacement d'une toiture en fin de vie. Ne règle pas les infiltrations d'eau existantes.",
    },
    {
      slug: "nuroof-bio-boost",
      name: "NuRoof Bio-Boost",
      roofAge: "Toitures de 10 ans et plus",
      lifeAdded: "3 à 5 ans ajoutés",
      summary:
        "Traitement de transition destiné aux toitures plus âgées, pour gagner quelques années avant un remplacement.",
      recommendedUse:
        "Toiture de 10 ans et plus qui n'est pas encore à remplacer, comme solution de transition.",
      compatibility:
        "Bardeaux d'asphalte. Non offert sur membrane SBS.",
      considerations:
        "Évaluation de la santé de la toiture (RHS) et inspection préalable. Les réparations nécessaires sont faites avant.",
      warranty:
        "Garantie limitée du fabricant: 3 à 5 ans, selon le score de santé de la toiture (désigné « Boost » dans les conditions de garantie).",
      limitations:
        "Gain de durée de vie plus modeste. Ne s'applique pas à toutes les toitures et ne remplace pas les réparations nécessaires.",
    },
  ] as ProductItem[],

  warranty: {
    title: "Garantie limitée du fabricant",
    intro:
      "Les produits NuRoof sont couverts par une garantie limitée de GoNano lorsqu'ils sont appliqués par un entrepreneur certifié sur une toiture admissible. Voici un résumé. Seul le document officiel fait foi.",
    coversTitle: "Ce qui est couvert",
    covers: [
      "Que la surface traitée ne se décolle pas, ne gondole pas et ne se déforme pas prématurément à cause du traitement.",
      "L'infiltration d'eau à travers le corps même du bardeau traité. Les autres points d'entrée (solins, cheminées, évents, noues, etc.) sont exclus.",
    ],
    remedyTitle: "Si un défaut couvert est confirmé",
    remedy: [
      "Inspection sans frais par un entrepreneur certifié.",
      "Retraitement gratuit de la zone touchée.",
      "Si le défaut persiste 12 mois après le retraitement, indemnité pour les matériaux de toiture, calculée au prorata selon l'année et le produit.",
    ],
    conditionsTitle: "Conditions à connaître",
    conditions: [
      "Score de santé de la toiture (RHS) évalué par un entrepreneur certifié, au-dessus du minimum exigé.",
      "Enregistrement de la garantie dans les 30 jours suivant le traitement.",
      "Entretien raisonnable: gouttières propres, débris enlevés, branches élaguées.",
      "Transférable une seule fois à un propriétaire ultérieur, avec avis écrit dans les 30 jours suivant la vente.",
      "Couverture plafonnée à 5 000 pi² traités par propriété (réduite proportionnellement au-delà).",
    ],
    exclusionsTitle: "Principales exclusions",
    exclusions: [
      "Les dommages de grêle, sauf la couverture de 5 ans du système Fortify Elite (état « bon »), pour des grêlons vérifiés de 2 po ou moins.",
      "Les dommages consécutifs: intérieur, support de toiture, moisissures.",
      "Les défauts, fuites ou infiltrations présents avant le traitement.",
    ],
    consumer:
      "Vos droits en vertu de la Loi sur la protection du consommateur du Québec ne sont pas touchés par cette garantie.",
    tableTitle: "Périodes de couverture par produit",
    tableCaption: "Périodes de couverture de la garantie limitée GoNano selon le produit et le score de santé de la toiture",
    tableHead: { product: "Produit", state: "État de la toiture (score RHS)", layers: "Couches", period: "Période de couverture" },
    layersUnit: "×",
    rows: [
      { product: "NuRoof Boost", state: "Faible (35 à 43)", layers: "1", period: "5 ans" },
      { product: "NuRoof Boost", state: "Critique (21 à 34)", layers: "1", period: "5 ans" },
      { product: "NuRoof Boost", state: "À remplacer (0 à 20)", layers: "1", period: "3 ans" },
      { product: "NuRoof Revive", state: "Vieillissant (44 à 74)", layers: "1", period: "10 ans" },
      { product: "NuRoof Revive", state: "Faible (35 à 43)", layers: "1", period: "7 ans" },
      { product: "NuRoof Revive", state: "Critique (21 à 34)", layers: "1", period: "7 ans" },
      { product: "Boost + Fortify", state: "Faible ou critique (21 à 43)", layers: "2", period: "10 ans" },
      { product: "Revive + Fortify", state: "Vieillissant (44 à 74)", layers: "2", period: "12 ans" },
      { product: "NuRoof Fortify", state: "Bon (90 à 100)", layers: "1", period: "15 ans" },
      { product: "NuRoof Fortify", state: "Passable (75 à 89)", layers: "1", period: "12 ans" },
      { product: "Fortify Elite", state: "Bon (90 à 100)", layers: "2", period: "20 ans, plus 5 ans contre la grêle" },
      { product: "Fortify Elite", state: "Passable (75 à 89)", layers: "2", period: "15 ans" },
    ],
    source: "Source: Conditions générales de la garantie limitée de GoNano (Les Produits GoNano Inc.). Résumé non contractuel.",
    pdf: "Lire la garantie officielle (PDF, en français)",
  },
};

export type Products = typeof products;

const technology = {
  metaTitle: "La technologie GoNano expliquée simplement",
  metaDescription:
    "Comment un traitement GoNano agit dans le bardeau d'asphalte: photos au microscope, taille des particules, critères de test et limites. Une explication claire, sans exagération.",
  title: "La technologie GoNano, sans jargon.",
  intro:
    "Ce que visent ces traitements, ce que le fabricant montre et mesure, et ce qu'ils ne font pas.",
  source: "Source des données et des photos: GoNano (Les Produits GoNano Inc.). Ces données sont celles du fabricant et n'ont pas été vérifiées de façon indépendante.",

  how: {
    title: "Ce qui se passe dans le bardeau.",
    intro:
      "Au microscope, le fabricant montre ce qui arrive à un bardeau ordinaire lorsqu'il est traité avec GoNano.",
    steps: [
      { label: "Avant", caption: "Bardeau ordinaire", alt: "Surface d'un bardeau d'asphalte ordinaire vue au microscope" },
      { label: "Pendant", caption: "Une réaction de modification se produit partout dans le bardeau", alt: "Réaction de modification dans le bardeau pendant le traitement, vue au microscope" },
      { label: "Après", caption: "Bardeau modifié GoNano", alt: "Surface d'un bardeau d'asphalte modifié par GoNano vue au microscope" },
    ],
    credit: "Photographies au microscope: GoNano.",
  },

  particles: {
    title: "Assez petites pour entrer dans les pores.",
    intro:
      "Le fabricant explique que les particules GoNano sont assez petites pour pénétrer dans les pores de l'asphalte. Les particules des scellants traditionnels sont plus grosses: elles restent à la surface et forment une couche.",
    scaleTitle: "Taille relative des particules",
    scaleLabels: {
      pore: "Pore de l'asphalte",
      gonano: "GoNano NuRoof",
      penetrants: "Autres « pénétrants »",
      mixed: "Revêtements mixtes",
      silicone: "Silicone",
      acrylic: "Acrylique",
    },
    diagramTitle: "Dans le bardeau ou sur le bardeau",
    traditional: { title: "Scellants traditionnels", text: "Une couche qui se dépose sur la surface." },
    gonano: { title: "GoNano", text: "Des particules qui pénètrent dans les pores de l'asphalte." },
    note: "Illustration conceptuelle, pas à l'échelle. Les tailles relatives suivent le schéma du fabricant.",
  },

  aging: {
    title: "Pourquoi un bardeau vieillit.",
    intro: "Quatre mécanismes agissent en même temps sur une toiture en bardeaux d'asphalte.",
    items: [
      { icon: "sun", title: "Le soleil", text: "Les rayons ultraviolets dégradent peu à peu l'asphalte et les granules qui le protègent." },
      { icon: "thermo", title: "Le chaud et le froid", text: "Le bardeau se dilate et se contracte chaque jour et chaque saison, ce qui le fatigue." },
      { icon: "drop", title: "L'eau et le gel", text: "L'eau entre dans les petites fissures, gèle et les agrandit. Le climat québécois est exigeant." },
      { icon: "stack", title: "La perte de granules", text: "Quand les granules s'en vont, l'asphalte est exposé directement aux éléments." },
    ],
  },

  performance: {
    title: "Comparer la performance.",
    intro:
      "Évaluation du fabricant des produits NuRoof appliqués sur un bardeau de 15 ans, comparés à d'autres traitements à base d'huile bio ou de soya. Chaque case montre jusqu'à trois niveaux de performance.",
    caption: "Performance comparée des produits GoNano et d'autres traitements, par critère",
    criterion: "Critère",
    products: ["NuRoof Fortify", "NuRoof Revive", "Bio-Boost", "Autres traitements à base d'huile bio ou de soya"],
    levelText: "{n} niveau(x) sur 3",
    header: [
      { label: "Âge du matériau", values: ["0 à 5 ans", "5 à 20 ans", "10 ans et plus", "Tout âge"] },
      { label: "Durée de vie ajoutée", values: ["10 à 15 ans", "5 à 10 ans", "3 à 5 ans", "Jusqu'à 3 ans"] },
    ],
    rows: [
      { label: "Respirabilité", levels: [3, 3, 3, 3] },
      { label: "Revitalisation", levels: [3, 3, 2, 2] },
      { label: "Résistance aux intempéries", levels: [3, 2, 1, 0] },
      { label: "Résistance à la grêle", levels: [3, 2, 1, 0] },
      { label: "Résistance au vent", levels: [3, 2, 1, 0] },
      { label: "Résistance aux forces d'arrachement", levels: [3, 2, 1, 0] },
      { label: "Résistance à la chaleur", levels: [3, 2, 1, 0] },
      { label: "Résistance aux rayons UV", levels: [3, 2, 1, 0] },
      { label: "Protection contre la perte de granules", levels: [3, 2, 1, 0] },
      { label: "Résistance aux cycles de gel-dégel", levels: [3, 2, 0, 0] },
      { label: "Protection contre les algues, moisissures et taches", levels: [3, 2, 0, 0] },
    ],
    note: "Échelle et méthode d'évaluation du fabricant, non vérifiées de façon indépendante.",
  },

  tests: {
    title: "Critères de test et certifications.",
    intro:
      "Bardeau neuf comparé à un bardeau de 15 ans traité avec GoNano NuRoof, selon les exigences de performance d'une nouvelle toiture en bardeaux du Code international du bâtiment (IBC) et du Code national du bâtiment du Canada (CNB).",
    caption: "Résultats d'essais: bardeau typique neuf et bardeau de 15 ans traité avec GoNano NuRoof",
    head: { category: "Catégorie", standard: "Norme d'essai", typical: "Bardeau typique, à l'installation", treated: "GoNano NuRoof sur un toit de 15 ans" },
    provenLabel: "Prouvé scientifiquement (selon GoNano)",
    rows: [
      { category: "Résistance aux impacts", standard: "UL 2218", typical: "Conforme (classe 2)", treated: "Dépasse (classe 3 et plus)", exceeds: true },
      { category: "Résistance au vent", standard: "ASTM D3161", typical: "Conforme (97 km/h)", treated: "Dépasse (177 km/h)", exceeds: true },
      { category: "Barrière contre l'humidité", standard: "proven", typical: "Conforme", treated: "Dépasse", exceeds: true },
      { category: "Hydrofuge", standard: "proven", typical: "Non", treated: "Dépasse", exceeds: true },
      { category: "Élimination de la mousse et des algues", standard: "proven", typical: "Non", treated: "Dépasse", exceeds: true },
      { category: "Résistance aux forces de soulèvement", standard: "ASTM D7158", typical: "Conforme", treated: "Conforme", exceeds: false },
      { category: "Résistance au feu", standard: "ASTM E108", typical: "Conforme", treated: "Conforme", exceeds: false },
      { category: "Résistance aux rayons UV", standard: "ASTM D4329", typical: "Conforme", treated: "Conforme", exceeds: false },
      { category: "Résistance à la déchirure", standard: "ASTM D3462", typical: "Conforme", treated: "Conforme", exceeds: false },
    ],
    note: "Résultats fournis par le fabricant. Demandez-nous les rapports d'essai: nous vous les remettons avec la fiche technique.",
  },

  limits: {
    title: "Préservation ou réparation?",
    preservation: "La préservation",
    preservationText: "agit sur des bardeaux encore sains pour ralentir l'usure.",
    repair: "La réparation",
    repairText:
      "corrige un défaut: un bardeau manquant, un solin brisé, une fuite. Un traitement de surface ne remplace jamais une réparation nécessaire.",
    notTitle: "Ce que le traitement ne fait pas",
    notList: [
      "Il ne répare pas les fuites ni les solins endommagés.",
      "Il ne corrige pas un pontage abîmé.",
      "Il ne rend pas une toiture en fin de vie comme neuve.",
      "Il ne dispense pas d'inspecter sa toiture périodiquement.",
    ],
    docsTitle: "Documentation",
    docsText:
      "Les fiches techniques et les fiches de données de sécurité des produits utilisés sont remises sur demande avant tout travail. La garantie du fabricant est résumée sur la page Produits.",
    warrantyLink: "Voir la garantie du fabricant",
  },
};

export type Technology = typeof technology;

const faq = {
  metaTitle: "Questions fréquentes sur les traitements de toiture",
  metaDescription:
    "Produits, technologie, tarification, garantie, installation, sécurité et admissibilité: les réponses claires aux questions les plus courantes.",
  title: "Questions fréquentes.",
  intro: "Des réponses directes, avec leurs limites.",
  categories: [
    {
      id: "produits",
      label: "Produits",
      items: [
        {
          q: "Qu'est-ce que GoNano?",
          a: "GoNano est une marque de traitements de surface pour toitures en bardeaux d'asphalte. Nous sommes installateur autorisé de ces produits. Nous ne sommes pas le fabricant. Pour les spécifications techniques, la documentation du fabricant fait foi.",
        },
        {
          q: "Les trois produits s'appliquent-ils ensemble?",
          a: "Non. Chaque produit a un usage visé, lié à l'âge et à l'état de la toiture. Nous recommandons le produit qui convient après l'inspection, pas les trois par défaut. Certains systèmes à deux couches existent, mais seulement lorsque l'état de la toiture le justifie.",
        },
      ],
    },
    {
      id: "technologie",
      label: "Technologie",
      items: [
        {
          q: "Comment fonctionne un traitement de toiture?",
          a: "Le produit est appliqué sur la surface des bardeaux. Le fabricant explique que ses particules, très petites, pénètrent dans les pores de l'asphalte plutôt que de former une couche en surface. L'effet réel dépend de l'état de départ de la toiture. Un traitement ne répare pas des bardeaux déjà détruits.",
        },
        {
          q: "Les résultats sont-ils prouvés de façon indépendante?",
          a: "Les données de performance et les résultats d'essais que nous présentons proviennent du fabricant. Nous les présentons comme telles et nous ne les faisons pas passer pour des études indépendantes.",
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
          a: "Une garantie limitée du fabricant s'applique lorsque la toiture est admissible. Selon le produit et le score de santé de la toiture, la période de couverture va de 3 à 20 ans. Les conditions complètes, dont les exclusions, sont dans le document officiel, que vous pouvez lire en bas de chaque page.",
        },
        {
          q: "La garantie est-elle transférable?",
          a: "Oui, une seule fois, à un propriétaire ultérieur, avec un avis écrit dans les 30 jours suivant la vente.",
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
          a: "Nous vous remettons les documents liés à votre produit et à votre garantie. Nous recommandons un suivi périodique, car aucun traitement ne dispense d'inspecter sa toiture. La garantie exige aussi un entretien raisonnable: gouttières propres, débris enlevés, branches élaguées.",
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
          a: "Nous desservons la Rive-Sud de Montréal, le Saguenay-Lac-Saint-Jean et la grande région de Sherbrooke. Si votre secteur n'y figure pas, écrivez-nous: nous vous dirons honnêtement si nous pouvons nous y rendre.",
        },
        {
          q: "En combien de temps répondez-vous?",
          a: "Nous garantissons une réponse en 24 h à toute demande d'évaluation.",
        },
      ],
    },
  ],
};

export type Faq = typeof faq;

export const content = { services, products, technology, faq };
export type Content = typeof content;
