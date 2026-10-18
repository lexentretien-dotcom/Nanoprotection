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

export type ProductDetail = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  imageAlt: string;
  tagline: string;
  intro: string;
  features: { title: string; text: string }[];
  specs: { label: string; value: string }[];
  steps: string[];
  applicationNote: string;
  environment: { title: string; text: string; points: string[] };
  /** Names used in the warranty table rows (products.warranty.rows[].product) */
  warrantyProducts: string[];
  sheetLabel: string;
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

  viewProduct: "Voir la fiche du produit",
  cardImageAlt: "Bidon de {name}",
  detail: {
    back: "Tous les produits",
    featuresTitle: "Caractéristiques",
    specsTitle: "Fiche technique",
    applicationTitle: "Application",
    warrantyTitle: "Garantie du fabricant",
    warrantyIntro:
      "Périodes de couverture liées à ce produit, selon le score de santé de la toiture (RHS). Résumé non contractuel.",
    warrantyMore: "Lire la garantie officielle (PDF)",
    sheetCta: "Télécharger la fiche technique (PDF)",
    sourceNote: "Source: fiche technique du fabricant GoNano.",
    limitsTitle: "Ce que ce produit ne fait pas",
    compareCta: "Comparer avec les autres produits",
    ctaTitle: "Ce produit convient-il à votre toiture?",
    ctaText: "Seule une inspection permet de le savoir. Nous recommandons le produit qui convient, pas le plus cher.",
    backstopTitle: "Vos garanties existantes",
    backstop:
      "Un traitement peut soulever des questions chez le fabricant de vos bardeaux. C'est pourquoi la garantie de GoNano prévoit une clause de protection: si le fabricant de vos bardeaux refuse par écrit une réclamation parce que le traitement semble en être la cause, GoNano facilite sans frais le dépôt de la réclamation selon la garantie d'origine. GoNano n'assume pas de responsabilité financière au-delà de cette aide (garantie limitée, section 7). Si vous avez encore une garantie de bardeaux, nous la regardons avec vous avant les travaux.",
    sheetNameNote: "Fiche publiée par le fabricant sous le nom « Shingle Saver ».",
  },
  details: [
    {
      slug: "nuroof-fortify",
      metaTitle: "NuRoof Fortify: protection préventive des bardeaux d'asphalte",
      metaDescription:
        "Fiche du produit GoNano NuRoof Fortify, un scellant pénétrant transparent et respirant pour toitures de 0 à 5 ans: caractéristiques, application, garantie du fabricant.",
      imageAlt: "Bidon de NuRoof Fortify",
      tagline: "Le bouclier préventif des toitures récentes.",
      intro:
        "NuRoof Fortify est un scellant pénétrant à base de nanotechnologie, transparent et respirant, conçu pour protéger les bardeaux d'asphalte contre l'eau, le soleil et les cycles de gel et de dégel. Une fois appliquées, les nanoparticules se fixent à l'agrégat de surface et au bitume et créent un environnement hydrophobe.",
      features: [
        { title: "Imperméabilité", text: "Pénètre dans les bardeaux, réagit chimiquement dans les pores et les capillaires et crée une surface hydrophobe qui repousse l'eau." },
        { title: "100 % respirant", text: "Ne forme pas de film: l'humidité peut s'échapper, le produit ne la retient pas." },
        { title: "Adhérence renforcée", text: "Réagit avec le bitume et l'agrégat pour renforcer leur liaison." },
        { title: "Oxydation et rayons UV", text: "Réduit la création de liaisons polaires qui accélèrent le vieillissement et protège contre les rayons UV." },
        { title: "Gel et dégel", text: "Aide à prévenir la fissuration causée par l'eau qui s'infiltre." },
        { title: "Croissance organique", text: "Résiste aux moisissures, aux lichens, au mildiou et à l'efflorescence." },
        { title: "Finition mate naturelle", text: "Ne modifie pas l'apparence de la surface et reste stable à la lumière." },
        { title: "Vieillissement réduit", text: "Réduction du vieillissement allant jusqu'à 68 % lors d'un essai comparatif bardeau non traité et traité, selon le fabricant." },
      ],
      specs: [
        { label: "Contenu", value: "Bidon de 20 L (environ 5 gallons)" },
        { label: "Âge de toiture visé", value: "0 à 5 ans" },
        { label: "Base", value: "Solvant (excellente performance par temps froid)" },
        { label: "Ingrédients actifs", value: "Organosilanes et organosiloxanes à l'échelle nanométrique" },
        { label: "Apparence", value: "Transparent" },
        { label: "Odeur", value: "Légère: solvant / pétrole" },
        { label: "COV", value: "250 g/L au maximum" },
        { label: "Point d'éclair", value: "Supérieur à 77 °C" },
        { label: "Densité relative", value: "0,78 à 0,81 g/cm³" },
        { label: "Couverture", value: "50 à 70 pi² par litre (1 couche)" },
        { label: "Séchage", value: "4 à 6 h à 25 °C et 50 % d'humidité; hydrophobie complète en 7 jours" },
      ],
      steps: [
        "Nettoyer la surface (lavage à pression au besoin): elle doit être saine et exempte d'huile, de graisse, de cire et d'anciens scellants.",
        "Réparer les fissures et protéger les surfaces voisines: vitres, végétation, mobilier extérieur.",
        "Respecter la météo: air et surface entre 1 °C et 35 °C, et aucune pluie prévue dans les 12 heures.",
        "Faire un essai sur une petite surface et laisser sécher 5 à 7 jours avant de l'inspecter.",
        "Bien mélanger sans diluer, puis appliquer au rouleau, au pinceau ou au pulvérisateur basse pression, à saturation, en répartissant les flaques jusqu'à pénétration.",
      ],
      applicationNote:
        "Appliqué par un technicien formé. Ne prévient pas l'infiltration d'eau par des surfaces fissurées ou par des solins et un calfeutrage défectueux.",
      environment: {
        title: "Environnement",
        text: "Fortify est une formule à base de solvant, choisie pour sa performance par temps froid. Nous ne la présentons donc pas comme un produit écologique. En revanche, prolonger la vie d'une toiture existante plutôt que de la remplacer réduit les débris envoyés au site d'enfouissement.",
        points: [
          "Moins de débris de remplacement lorsque la toiture est préservée",
          "COV: 250 g/L au maximum (fiche technique)",
          "Consignes de sécurité remises avant les travaux",
        ],
      },
      warrantyProducts: ["NuRoof Fortify", "Fortify Elite"],
      sheetLabel: "Fiche technique de NuRoof Fortify",
    },
    {
      slug: "nuroof-revive",
      metaTitle: "NuRoof Revive: rajeunissement des bardeaux d'asphalte",
      metaDescription:
        "Fiche du produit GoNano NuRoof Revive, un traitement à la bio-huile pour toitures de 5 à 20 ans: caractéristiques, application, environnement, garantie du fabricant.",
      imageAlt: "Bidon de NuRoof Revive",
      tagline: "Redonner de la souplesse aux toitures qui vieillissent.",
      intro:
        "NuRoof Revive est une solution de rajeunissement et de protection des toitures en bardeaux d'asphalte. Selon le fabricant, elle améliore la flexibilité et la résilience de l'asphalte, aide à prévenir la fissuration et prolonge la durée de vie de la toiture jusqu'à 10 ans.",
      features: [
        { title: "Durabilité", text: "Appuyé par de la recherche, il offre une durabilité accrue aux toitures en asphalte." },
        { title: "Flexibilité", text: "Améliore la flexibilité et la résilience de l'asphalte pour une performance à long terme." },
        { title: "Prévention des fissures", text: "Aide à prévenir la fissuration et renforce la résistance à l'eau." },
        { title: "Durée de vie prolongée", text: "Prolonge la durée de vie des toitures en asphalte, jusqu'à 10 ans selon le fabricant." },
        { title: "100 % perméable à l'air", text: "Ne forme pas de film: l'humidité peut s'échapper sans effet néfaste." },
        { title: "Résistance à l'oxydation", text: "Réduit la création de liaisons polaires qui accélèrent le vieillissement." },
        { title: "Croissance organique réduite", text: "Prévient les moisissures, le mildiou, les lichens et l'efflorescence." },
        { title: "Finition naturelle", text: "Préserve l'apparence d'origine, sans dégradation due à la lumière." },
      ],
      specs: [
        { label: "Contenu", value: "20 litres" },
        { label: "Convient pour", value: "Toitures en bardeaux d'asphalte (5 à 20 ans)" },
        { label: "Ingrédients actifs", value: "Nano-silice, bio-huile, agents adhésifs pour toiture" },
        { label: "Apparence", value: "Clair et transparent" },
        { label: "Odeur", value: "Légère: pétrole / bio-huile" },
        { label: "Emballage", value: "20 L et 176 L (autres formats sur demande spéciale)" },
        { label: "COV", value: "125 g/L au maximum" },
        { label: "Point d'éclair", value: "Supérieur à 90 °C" },
        { label: "Densité relative", value: "0,78 à 0,81 g/cm³" },
        { label: "Couverture", value: "50 à 70 pi² par litre (1 couche)" },
        { label: "Séchage", value: "4 à 6 h à 32 °C et 50 % d'humidité; résultats optimaux après 7 jours" },
      ],
      steps: [
        "S'assurer que le substrat est propre et sans débris; réparer les fissures et les zones endommagées.",
        "Protéger les surfaces voisines des éclaboussures.",
        "Bien mélanger le produit avant et pendant l'application.",
        "Appliquer au rouleau, au pinceau ou au pulvérisateur basse pression (non atomisant): 1 litre pour 50 à 70 pi², réparti uniformément jusqu'à pénétration.",
        "Laisser sécher 4 à 6 heures; les résultats sont optimaux après 7 jours.",
      ],
      applicationNote: "Appliqué par un technicien formé, après inspection et réparations mineures.",
      environment: {
        title: "Environnement et durabilité",
        text: "Revive contient une huile renouvelable et biodégradable, ce qui réduit l'utilisation d'additifs à base de pétrole (fiche technique du fabricant). Son contenu en COV est faible. Préserver une toiture existante réduit aussi les débris de remplacement.",
        points: [
          "Huile renouvelable et biodégradable",
          "COV: 125 g/L au maximum (fiche technique)",
          "Moins de débris de remplacement lorsque la toiture est préservée",
        ],
      },
      warrantyProducts: ["NuRoof Revive", "Revive + Fortify"],
      sheetLabel: "Fiche technique de NuRoof Revive",
    },
    {
      slug: "nuroof-bio-boost",
      metaTitle: "NuRoof Bio-Boost: protection économique des toitures de 10 ans et plus",
      metaDescription:
        "Fiche du produit GoNano NuRoof Bio-Boost, une protection économique à base de bio-huiles pour toitures de 10 ans et plus: caractéristiques, application, environnement, garantie.",
      imageAlt: "Bidon de NuRoof Bio-Boost",
      tagline: "Une protection de base, économique, pour les toitures de 10 ans et plus.",
      intro:
        "NuRoof Bio-Boost combine la nanotechnologie et des bio-huiles renouvelables. C'est une solution économique de protection et d'entretien qui, selon le fabricant, peut ajouter de 3 à 5 ans à la vie de la toiture lorsqu'elle est appliquée et entretenue correctement.",
      features: [
        { title: "Protection de base", text: "Offre une protection fondamentale grâce à une hydrorépellence à base de siloxane." },
        { title: "Formule écologique", text: "Contient des ingrédients biosourcés renouvelables, ce qui réduit l'impact environnemental." },
        { title: "Résistance à l'eau", text: "Aide à protéger contre les dommages causés par l'eau et réduit l'absorption dans les bardeaux." },
        { title: "Durée de vie prolongée, modérément", text: "Peut ajouter de 3 à 5 ans à la vie du toit lorsqu'il est appliqué et entretenu correctement." },
        { title: "Protection contre l'oxydation", text: "Ralentit le processus naturel d'oxydation des bardeaux." },
        { title: "Finition naturelle", text: "Préserve l'apparence d'origine du toit, sans ajouter de brillance." },
      ],
      specs: [
        { label: "Contenu", value: "20 litres (bidons d'environ 5 gallons)" },
        { label: "Convient pour", value: "Toitures en bardeaux d'asphalte (10 ans et plus)" },
        { label: "Ingrédients actifs", value: "Nanoparticule exclusive, bio-huile" },
        { label: "Apparence", value: "Jaune clair à ambre" },
        { label: "Odeur", value: "Légère: pétrole / bio-huile" },
        { label: "COV", value: "250 g/L au maximum" },
        { label: "Point d'éclair", value: "75 °C" },
        { label: "Densité relative", value: "0,82 g/cm³" },
        { label: "Couverture", value: "40 à 60 pi² par litre (1 couche)" },
        { label: "Séchage", value: "6 à 8 h à 32 °C et 50 % d'humidité; efficacité complète après 7 jours" },
      ],
      steps: [
        "S'assurer que la surface est propre et sans débris; réparer les fissures ou dommages visibles.",
        "Protéger les surfaces voisines pour éviter les projections.",
        "Bien agiter ou mélanger le produit avant et pendant l'application.",
        "Appliquer au rouleau, au pinceau ou au pulvérisateur basse pression sans atomisation: 1 litre par 40 à 60 pi², puis étaler les flaques avec un balai ou un rouleau.",
        "Laisser sécher 6 à 8 heures; l'efficacité est complète après 7 jours.",
      ],
      applicationNote: "Appliqué par un technicien formé, après inspection et réparations nécessaires.",
      environment: {
        title: "Environnement et durabilité",
        text: "Bio-Boost utilise des bio-huiles renouvelables pour réduire l'utilisation de pétrole, une alternative plus écologique qui conserve les propriétés de protection de base (fiche technique du fabricant). Préserver une toiture existante réduit aussi les débris de remplacement.",
        points: [
          "Contenu biosourcé renouvelable (bio-huiles)",
          "COV: 250 g/L au maximum (fiche technique)",
          "Moins de débris de remplacement lorsque la toiture est préservée",
        ],
      },
      warrantyProducts: ["NuRoof Boost", "Boost + Fortify"],
      sheetLabel: "Fiche technique de NuRoof Bio-Boost",
    },
  ] as ProductDetail[],

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
