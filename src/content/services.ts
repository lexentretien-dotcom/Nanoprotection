/**
 * Services. Only services marked `confirmed: true` are published.
 * Hydrofuge and others stay hidden until the business confirms them.
 */
export type Service = {
  slug: string;
  name: string;
  confirmed: boolean;
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

export const services: Service[] = [
  {
    slug: "inspection-evaluation",
    name: "Inspection et évaluation de toiture",
    confirmed: true,
    summary:
      "Un technicien examine votre toiture et vous dit franchement si elle peut être préservée, réparée ou si elle doit être remplacée.",
    intendedUse:
      "Savoir où en est votre toiture avant de dépenser quoi que ce soit.",
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
    maintenance: "Une nouvelle inspection est conseillée à intervalles réguliers, surtout après un hiver rigoureux.",
    warranty: "L'inspection ne comporte pas de garantie de résultat. Elle fournit un avis professionnel à un moment donné.",
    alternative:
      "Si votre toiture est en fin de vie ou présente des dommages de structure, nous vous le dirons et vous recommanderons une réparation ou un remplacement.",
    seoTitle: "Inspection de toiture au Québec | Évaluation gratuite",
    seoDescription:
      "Faites évaluer votre toiture en bardeaux d'asphalte. Avis honnête: préservation, réparation ou remplacement. Demandez votre évaluation gratuite.",
  },
  {
    slug: "rajeunissement-toiture",
    name: "Rajeunissement de toiture",
    confirmed: true,
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
    maintenance: "Un suivi périodique est recommandé. Le calendrier précis dépend du produit et des conditions de garantie.",
    warranty:
      "Une garantie du fabricant peut être offerte selon l'âge, l'état de la toiture et le produit. Les conditions sont remises par écrit avant les travaux.",
    alternative:
      "Lorsque la toiture est trop abîmée, le remplacement demeure la bonne solution. Un traitement ne remplace pas une réparation structurelle.",
    seoTitle: "Rajeunissement de toiture en bardeaux d'asphalte | Québec",
    seoDescription:
      "Le rajeunissement de toiture peut prolonger la vie de bardeaux d'asphalte encore sains. Découvrez quand c'est approprié et quand remplacer.",
  },
  {
    slug: "protection-preventive",
    name: "Protection préventive",
    confirmed: true,
    summary:
      "Un traitement appliqué tôt sur une toiture récente pour ralentir l'usure causée par le soleil, l'eau et le gel.",
    intendedUse:
      "Toitures récentes en bon état, avant que le vieillissement n'apparaisse.",
    benefits: [
      "Agit avant les dommages plutôt qu'après",
      "Cadre d'entretien planifiable",
      "Utile dans un climat à cycles de gel et de dégel",
    ],
    suitable: [
      "Toiture de moins de quelques années, sans défaut",
      "Propriétaires qui veulent protéger un investissement récent",
    ],
    notSuitable: [
      "Toiture déjà endommagée: une réparation passe en premier",
    ],
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
  {
    slug: "traitement-hydrofuge",
    name: "Traitement hydrofuge",
    confirmed: false,
    summary: "",
    intendedUse: "",
    benefits: [],
    suitable: [],
    notSuitable: [],
    method: [],
    maintenance: "",
    warranty: "",
    alternative: "",
    seoTitle: "",
    seoDescription: "",
  },
];

export const publishedServices = services.filter((s) => s.confirmed);
