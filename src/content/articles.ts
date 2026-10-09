/**
 * Educational articles. Drafted for review: they contain no statistics or
 * performance figures, and `sources` is intentionally empty until credible
 * references are attached. Each article needs a named author and an expert
 * review before the site is indexed (see docs/PENDING-INFO.md).
 */
export type ArticleSection = { heading: string; paragraphs: string[] };
export type Article = {
  slug: string;
  title: string;
  description: string;
  published: string;
  reviewed: boolean;
  sections: ArticleSection[];
  sources: { label: string; url: string }[];
};

export const articles: Article[] = [
  {
    slug: "comment-savoir-si-votre-toiture-doit-etre-remplacee",
    title: "Comment savoir si votre toiture doit être remplacée?",
    description:
      "Les signes qui indiquent qu'une toiture en bardeaux d'asphalte arrive en fin de vie, et ceux qui laissent encore de la marge.",
    published: "2026-10-09",
    reviewed: false,
    sections: [
      {
        heading: "Commencez par regarder, pas par deviner",
        paragraphs: [
          "Une toiture en bardeaux d'asphalte vieillit lentement, et de façon inégale. Le versant exposé au sud n'a pas le même visage que celui qui reste à l'ombre. Avant de décider quoi que ce soit, il vaut mieux observer ce que vous voyez réellement.",
          "Depuis le sol, avec des jumelles, vous pouvez déjà repérer beaucoup de choses sans monter sur le toit. Ne montez jamais sur une toiture glissante ou sans équipement de sécurité.",
        ],
      },
      {
        heading: "Les signes qui pointent vers le remplacement",
        paragraphs: [
          "Des bardeaux fendillés en profondeur, qui se recourbent ou se décollent sur de grandes surfaces, sont un signal sérieux. Il en va de même des fuites répétées, des taches d'humidité au plafond ou d'un pontage qui s'affaisse.",
          "Lorsque la couche de granules est presque disparue par endroits et que l'asphalte est à nu, le bardeau ne protège plus comme prévu.",
        ],
      },
      {
        heading: "Les signes qui laissent encore des options",
        paragraphs: [
          "Une usure de surface, une perte légère de granules ou quelques bardeaux isolés abîmés ne signifient pas automatiquement qu'il faut tout remplacer. Dans ces cas, une réparation ciblée, ou une préservation si la toiture est saine dans l'ensemble, peut être envisagée.",
        ],
      },
      {
        heading: "Pourquoi une inspection change tout",
        paragraphs: [
          "Seule une inspection sur place permet de distinguer l'usure normale d'un vrai problème. Une recommandation honnête sépare trois choses: ce qui doit être réparé, ce qui peut être préservé et ce qui doit être remplacé.",
        ],
      },
    ],
    sources: [],
  },
  {
    slug: "rajeunissement-ou-remplacement-de-toiture",
    title: "Rajeunissement de toiture ou remplacement: comment choisir?",
    description:
      "Les critères concrets pour décider entre préserver une toiture existante et la remplacer complètement.",
    published: "2026-10-09",
    reviewed: false,
    sections: [
      {
        heading: "Deux solutions pour deux situations",
        paragraphs: [
          "Le rajeunissement s'adresse à une toiture dont les bardeaux sont encore sains mais usés en surface. Le remplacement s'impose lorsque la structure du revêtement est atteinte.",
          "Les deux ne sont pas en concurrence. Elles répondent à des états de toiture différents.",
        ],
      },
      {
        heading: "Les questions à vous poser",
        paragraphs: [
          "Y a-t-il des fuites actives? Les bardeaux sont-ils fendus ou décollés? Combien de temps comptez-vous rester dans la maison? Quel budget pouvez-vous consacrer cette année?",
          "Si la réponse à la première ou à la deuxième question est oui, le traitement n'est généralement pas la bonne première étape.",
        ],
      },
      {
        heading: "Ce qu'un traitement ne fait pas",
        paragraphs: [
          "Un traitement de surface ne remplace pas des solins endommagés, un pontage pourri ou des bardeaux détruits. Si quelqu'un vous promet le contraire, demandez-lui de l'écrire.",
        ],
      },
      {
        heading: "Demander une deuxième lecture",
        paragraphs: [
          "Quel que soit votre choix, faites expliquer la recommandation par écrit. Un bon entrepreneur accepte que vous compariez, et vous dit aussi quand le remplacement est la meilleure décision.",
        ],
      },
    ],
    sources: [],
  },
  {
    slug: "duree-de-vie-bardeau-asphalte",
    title: "Quelle est la durée de vie d'un bardeau d'asphalte?",
    description:
      "Ce qui fait vieillir un bardeau d'asphalte, et pourquoi la durée de vie varie autant d'une maison à l'autre.",
    published: "2026-10-09",
    reviewed: false,
    sections: [
      {
        heading: "Il n'y a pas un chiffre unique",
        paragraphs: [
          "La durée de vie d'un bardeau dépend de sa qualité, de l'orientation du toit, de la ventilation de l'entretoit, de la pose et du climat. Deux maisons voisines peuvent vieillir très différemment.",
        ],
      },
      {
        heading: "Les facteurs qui comptent le plus",
        paragraphs: [
          "Le soleil dégrade les composants du bardeau avec le temps. L'eau et le gel s'infiltrent dans les moindres fissures. Une mauvaise ventilation fait monter la chaleur sous le toit.",
          "Dans un climat comme celui du Québec, les cycles répétés de gel et de dégel sont particulièrement exigeants.",
        ],
      },
      {
        heading: "Ce que vous pouvez faire",
        paragraphs: [
          "Faire inspecter la toiture après les hivers difficiles, garder les gouttières propres, vérifier la ventilation et réparer rapidement les petits défauts allongent la vie utile d'un toit.",
        ],
      },
    ],
    sources: [],
  },
  {
    slug: "hiver-quebecois-et-toitures",
    title: "Comment l'hiver québécois affecte-t-il les toitures?",
    description:
      "Gel, dégel, glace et neige: comment l'hiver met votre toiture à l'épreuve, et comment limiter les dégâts.",
    published: "2026-10-09",
    reviewed: false,
    sections: [
      {
        heading: "Le gel et le dégel, d'abord",
        paragraphs: [
          "L'eau s'infiltre dans les petites fissures, gèle, prend de l'expansion, puis dégèle. Répété sur plusieurs hivers, ce cycle agrandit les défauts.",
        ],
      },
      {
        heading: "La glace en bordure de toit",
        paragraphs: [
          "Quand la chaleur de la maison fait fondre la neige par en dessous, l'eau regèle au bord du toit et peut remonter sous les bardeaux. Une bonne isolation et une bonne ventilation réduisent ce risque.",
        ],
      },
      {
        heading: "Après l'hiver",
        paragraphs: [
          "Le printemps est un bon moment pour regarder l'état de la toiture. Cherchez des bardeaux déplacés, des granules dans les gouttières et des taches d'humidité à l'intérieur.",
        ],
      },
    ],
    sources: [],
  },
  {
    slug: "signes-vieillissement-toiture",
    title: "Quels sont les signes de vieillissement d'une toiture?",
    description:
      "Un guide simple pour reconnaître l'usure normale et distinguer ce qui demande une action.",
    published: "2026-10-09",
    reviewed: false,
    sections: [
      {
        heading: "Les signes visibles depuis le sol",
        paragraphs: [
          "Un changement de couleur, des zones plus foncées, des bardeaux relevés ou des lignes qui ondulent sont les premiers indices. Des mousses ou des algues sur les versants ombragés sont fréquentes.",
        ],
      },
      {
        heading: "Les signes dans la maison",
        paragraphs: [
          "Des taches d'eau au plafond, de la peinture qui cloque près des murs extérieurs ou de l'humidité dans l'entretoit demandent une vérification rapide.",
        ],
      },
      {
        heading: "Quand agir",
        paragraphs: [
          "Plus on agit tôt, plus il reste d'options. Une inspection au premier doute coûte souvent moins cher qu'attendre qu'une fuite apparaisse.",
        ],
      },
    ],
    sources: [],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
