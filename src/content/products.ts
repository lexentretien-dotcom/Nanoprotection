/**
 * GoNano product data.
 *
 * Product names and the roof-age targeting come from the previous site and
 * must be confirmed against the current GoNano documentation. Any field that
 * is not confirmed says so explicitly instead of guessing.
 */
const TO_CONFIRM = "À confirmer avec la documentation GoNano";

export type Product = {
  slug: string;
  name: string;
  roofAge: string;
  summary: string;
  recommendedUse: string;
  compatibility: string;
  considerations: string;
  warranty: string;
  limitations: string;
};

export const products: Product[] = [
  {
    slug: "nuroof-fortify",
    name: "NuRoof Fortify",
    roofAge: "Toitures de moins de 5 ans",
    summary:
      "Pensé pour les toitures récentes, dans une logique de protection préventive avant que le vieillissement ne s'installe.",
    recommendedUse:
      "Toiture récente en bon état, pour ralentir le vieillissement des bardeaux.",
    compatibility: "Bardeaux d'asphalte en bon état.",
    considerations:
      "Nettoyage et préparation de la surface avant l'application. Conditions météo adéquates requises.",
    warranty:
      "Une garantie du fabricant peut s'appliquer selon l'âge, l'état de la toiture et le produit. Conditions à confirmer par écrit avant les travaux.",
    limitations:
      "Ne répare pas les fuites, les solins ni les problèmes de structure.",
  },
  {
    slug: "nuroof-revive",
    name: "NuRoof Revive",
    roofAge: "Toitures de 5 à 20 ans",
    summary:
      "Conçu pour les toitures qui montrent les premiers signes d'usure et qui sont encore saines dans l'ensemble.",
    recommendedUse:
      "Toiture d'âge moyen, avec une usure de surface mais sans dommage structurel.",
    compatibility: "Bardeaux d'asphalte dont l'état est jugé admissible après inspection.",
    considerations:
      "Inspection préalable obligatoire. Les réparations mineures sont faites avant le traitement.",
    warranty:
      "Une garantie du fabricant peut s'appliquer selon l'âge, l'état de la toiture et le produit. Conditions à confirmer par écrit avant les travaux.",
    limitations:
      "Ne remplace pas le remplacement d'une toiture en fin de vie. Ne règle pas les infiltrations d'eau existantes.",
  },
  {
    slug: "nuroof-bio-boost",
    name: "NuRoof Bio-Boost",
    roofAge: "Toitures de 10 ans et plus",
    summary:
      "Produit complémentaire destiné aux toitures plus âgées. Son rôle précis est à valider avec la documentation du fabricant.",
    recommendedUse: TO_CONFIRM,
    compatibility: TO_CONFIRM,
    considerations: TO_CONFIRM,
    warranty:
      "Conditions de garantie à confirmer par écrit, selon le produit et l'état de la toiture.",
    limitations:
      "Ne s'applique pas à toutes les toitures et ne remplace pas les réparations nécessaires.",
  },
];

export const productsNeedVerification = true;
