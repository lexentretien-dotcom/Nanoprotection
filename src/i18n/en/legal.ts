import type { Legal } from "../fr/legal";

export const legal: Legal = {
  draftNotice: "Working draft to be validated by a legal professional before going live.",
  updatedLabel: "Last updated: {date}",
  updated: "October 18, 2026",
  privacy: {
    path: "/confidentialite",
    metaTitle: "Privacy policy",
    metaDescription: "How we collect, use and protect your personal information.",
    title: "Privacy policy",
    sections: [
      {
        heading: "Who is responsible",
        paragraphs: [
          "{legalName} is responsible for the personal information collected by this site. Person responsible for the protection of personal information: to be designated. For any request (access, correction, withdrawal of consent), write to {email}.",
        ],
      },
      {
        heading: "Information collected",
        list: [
          "Name, email, phone number, postal code and city.",
          "Information about your roof that you choose to provide.",
          "Your message and your preferred contact method.",
          "Visit source (for example a campaign), to know what works.",
        ],
      },
      {
        heading: "Why we use it",
        paragraphs: [
          "To answer your request, schedule an inspection and give you a quote. We do not sign you up for promotional messages without your express consent, which you can withdraw at any time.",
        ],
      },
      {
        heading: "Sharing with third parties",
        paragraphs: [
          "Your information is sent to our customer relationship management tool (GoHighLevel) so we can process your request. If you accept measurement cookies, anonymized usage data may be processed by Google Analytics. These providers may store data outside Quebec. We do not sell your information.",
        ],
      },
      {
        heading: "Retention and security",
        paragraphs: [
          "We keep your information for as long as needed to process your request and meet our legal obligations. The exact period is to be confirmed. Exchanges with the site are encrypted (HTTPS).",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You may ask for access to your information, its correction or its deletion, and withdraw your consent. You may also file a complaint with the Commission d'accès à l'information du Québec.",
        ],
      },
    ],
  },
  terms: {
    path: "/conditions-utilisation",
    metaTitle: "Terms of use",
    metaDescription: "Terms of use of the Les Experts Nano Protection Toitures website.",
    title: "Terms of use",
    sections: [
      {
        heading: "General information",
        paragraphs: [
          "The content of this site is provided for information only. It does not replace an on-site inspection, professional advice or a written quote.",
        ],
      },
      {
        heading: "Estimates and tools",
        paragraphs: [
          "The assessment tool gives guidance only. It makes no diagnosis and is not a quote. Only a written quote, provided after an inspection, binds us.",
        ],
      },
      {
        heading: "Warranties",
        paragraphs: [
          "Any warranty is subject to specific terms, provided in writing before the work. The summary of the manufacturer's warranty shown on this site does not replace the official document.",
        ],
      },
      {
        heading: "Manufacturer data",
        paragraphs: [
          "Photographs, test results and performance data attributed to GoNano come from the manufacturer and have not been independently verified.",
        ],
      },
      {
        heading: "Trademarks",
        paragraphs: [
          "GoNano and the related product names belong to their respective owners. {legalName} is an authorized installer of these products and is not the manufacturer.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: ["These terms are governed by the laws of Quebec and the federal laws of Canada applicable therein."],
      },
    ],
  },
  cookies: {
    path: "/temoins",
    metaTitle: "Cookie policy",
    metaDescription: "The cookies used on this site and how to manage your preferences.",
    title: "Cookie policy",
    sections: [
      {
        heading: "Essential storage",
        paragraphs: [
          "The site stores your cookie choice, your language and the progress of your roof assessment locally in your browser. This data stays on your device.",
        ],
      },
      {
        heading: "Measurement cookies",
        paragraphs: ["{analytics}"],
      },
      {
        heading: "Third-party content",
        paragraphs: [
          "On some blog articles, an official Google button may let you add us to your preferred sources. It loads a Google script when it is displayed.",
        ],
      },
      {
        heading: "Managing your choice",
        paragraphs: [
          "You can clear the site's data in your browser: the choice banner will reappear on your next visit.",
        ],
      },
    ],
    analyticsOn:
      "Only with your consent, we use Google Analytics to understand how the site is used. Nothing is loaded before you accept.",
    analyticsOff: "No measurement tool is currently active on this site.",
  },
  notice: {
    path: "/mentions-legales",
    metaTitle: "Legal notice",
    metaDescription: "Legal and corporate information for Les Experts Nano Protection Toitures.",
    title: "Legal notice",
    sections: [
      {
        heading: "Company",
        paragraphs: [
          "{legalName}. Registered legal name, Quebec enterprise number (NEQ) and address of the establishment: to be confirmed.",
        ],
      },
      { heading: "RBQ licence", paragraphs: ["Number {rbq}{rbqNote}."] },
      { heading: "Insurance", paragraphs: ["Liability insurance information: to be confirmed."] },
      { heading: "Contact", paragraphs: ["{phone}, {email}"] },
    ],
    rbqNote: " (to be confirmed before going live)",
  },
};
