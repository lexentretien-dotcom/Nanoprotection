type Section = { heading: string; paragraphs?: string[]; list?: string[] };
type LegalDoc = { path: string; metaTitle: string; metaDescription: string; title: string; sections: Section[] };

export const legal = {
  draftNotice: "Version de travail à faire valider par un professionnel du droit avant la mise en ligne.",
  updatedLabel: "Dernière mise à jour: {date}",
  updated: "18 octobre 2026",
  privacy: {
    path: "/confidentialite",
    metaTitle: "Politique de confidentialité",
    metaDescription: "Comment nous recueillons, utilisons et protégeons vos renseignements personnels.",
    title: "Politique de confidentialité",
    sections: [
      {
        heading: "Qui est responsable",
        paragraphs: [
          "{legalName} est responsable des renseignements personnels recueillis par ce site. Personne responsable de la protection des renseignements personnels: à désigner. Pour toute demande (accès, rectification, retrait du consentement), écrivez à {email}.",
        ],
      },
      {
        heading: "Renseignements recueillis",
        list: [
          "Nom, courriel, téléphone, code postal et ville.",
          "Renseignements sur votre toiture que vous choisissez de fournir.",
          "Votre message et votre mode de contact préféré.",
          "Source de la visite (par exemple une campagne), pour savoir ce qui fonctionne.",
        ],
      },
      {
        heading: "Pourquoi nous les utilisons",
        paragraphs: [
          "Pour répondre à votre demande, planifier une inspection et vous remettre une soumission. Nous ne vous inscrivons pas à des communications promotionnelles sans votre consentement exprès, que vous pouvez retirer en tout temps.",
        ],
      },
      {
        heading: "Partage avec des tiers",
        paragraphs: [
          "Vos renseignements sont transmis à notre outil de gestion de la relation client (GoHighLevel) afin de traiter votre demande. Si vous acceptez les témoins de mesure, des données d'usage anonymisées peuvent être traitées par Google Analytics. Ces fournisseurs peuvent stocker des données à l'extérieur du Québec. Nous ne vendons pas vos renseignements.",
        ],
      },
      {
        heading: "Conservation et sécurité",
        paragraphs: [
          "Nous conservons vos renseignements le temps nécessaire pour traiter votre demande et respecter nos obligations légales. La durée précise est à confirmer. Les échanges avec le site sont chiffrés (HTTPS).",
        ],
      },
      {
        heading: "Vos droits",
        paragraphs: [
          "Vous pouvez demander l'accès à vos renseignements, leur correction ou leur suppression, et retirer votre consentement. Vous pouvez aussi déposer une plainte auprès de la Commission d'accès à l'information du Québec.",
        ],
      },
    ],
  } as LegalDoc,
  terms: {
    path: "/conditions-utilisation",
    metaTitle: "Conditions d'utilisation",
    metaDescription: "Conditions d'utilisation du site de Les Experts Nano Protection Toitures.",
    title: "Conditions d'utilisation",
    sections: [
      {
        heading: "Information générale",
        paragraphs: [
          "Le contenu de ce site est fourni à titre informatif. Il ne remplace pas une inspection sur place, un avis professionnel ni une soumission écrite.",
        ],
      },
      {
        heading: "Estimations et outils",
        paragraphs: [
          "L'outil d'évaluation donne une orientation seulement. Il ne pose aucun diagnostic et ne constitue pas une soumission. Seule une soumission écrite, remise après inspection, nous engage.",
        ],
      },
      {
        heading: "Garanties",
        paragraphs: [
          "Toute garantie est soumise à des conditions précises, remises par écrit avant les travaux. Le résumé de la garantie du fabricant présenté sur ce site ne remplace pas le document officiel.",
        ],
      },
      {
        heading: "Données du fabricant",
        paragraphs: [
          "Les photographies, les résultats d'essais et les données de performance attribués à GoNano proviennent du fabricant et n'ont pas été vérifiés de façon indépendante.",
        ],
      },
      {
        heading: "Marques",
        paragraphs: [
          "GoNano et les noms de produits associés appartiennent à leurs propriétaires respectifs. {legalName} est installateur autorisé de ces produits et n'en est pas le fabricant.",
        ],
      },
      {
        heading: "Droit applicable",
        paragraphs: ["Ces conditions sont régies par les lois du Québec et les lois fédérales du Canada qui s'y appliquent."],
      },
    ],
  } as LegalDoc,
  cookies: {
    path: "/temoins",
    metaTitle: "Politique de témoins (cookies)",
    metaDescription: "Les témoins utilisés sur ce site et comment gérer vos préférences.",
    title: "Politique de témoins",
    sections: [
      {
        heading: "Témoins essentiels",
        paragraphs: [
          "Le site mémorise localement votre choix de témoins, votre langue et la progression de votre évaluation de toiture dans votre navigateur. Ces données restent sur votre appareil.",
        ],
      },
      {
        heading: "Témoins de mesure",
        paragraphs: [
          "{analytics}",
        ],
      },
      {
        heading: "Contenu de tiers",
        paragraphs: [
          "Sur certains articles du blogue, un bouton officiel de Google peut vous permettre de nous ajouter à vos sources préférées. Il charge un script de Google lorsqu'il est affiché.",
        ],
      },
      {
        heading: "Gérer votre choix",
        paragraphs: [
          "Vous pouvez effacer les données du site dans votre navigateur: la bannière de choix réapparaîtra à votre prochaine visite.",
        ],
      },
    ],
    analyticsOn:
      "Avec votre accord seulement, nous utilisons Google Analytics pour comprendre comment le site est utilisé. Rien n'est chargé avant que vous ayez accepté.",
    analyticsOff: "Aucun outil de mesure n'est actuellement actif sur ce site.",
  } as LegalDoc & { analyticsOn: string; analyticsOff: string },
  notice: {
    path: "/mentions-legales",
    metaTitle: "Mentions légales",
    metaDescription: "Renseignements légaux et corporatifs de Les Experts Nano Protection Toitures.",
    title: "Mentions légales",
    sections: [
      {
        heading: "Entreprise",
        paragraphs: [
          "{legalName}. Nom légal enregistré, numéro d'entreprise du Québec (NEQ) et adresse de l'établissement: à confirmer.",
        ],
      },
      { heading: "Licence RBQ", paragraphs: ["Numéro {rbq}{rbqNote}."] },
      { heading: "Assurance", paragraphs: ["Renseignements sur l'assurance responsabilité: à confirmer."] },
      { heading: "Contact", paragraphs: ["{phone}, {email}"] },
    ],
    rbqNote: " (à confirmer avant la mise en ligne)",
  } as LegalDoc & { rbqNote: string },
};

export type Legal = typeof legal;
