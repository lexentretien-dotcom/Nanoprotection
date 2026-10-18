import type { Site } from "../fr/site";

export const site: Site = {
  hoursText: "Monday to Sunday, 8 a.m. to 8 p.m.",
  breadcrumbs: { home: "Home", label: "Breadcrumb" },
  defaultTitle: "Roof preservation in Quebec",
  defaultDescription:
    "Preservation and protection of asphalt shingle roofs in Quebec. Inspection, honest recommendations and GoNano treatments. Request your free assessment.",
  titleSuffix: "Nano Protection",
  ogImageAlt: "Les Experts Nano Protection Toitures",
  orgDescription:
    "Preservation and protection treatments for asphalt shingle roofs in Quebec, using GoNano products.",

  regionsTitle: "Service areas",
  regionsIntro: "We serve several regions of Quebec:",
  regions: [
    { slug: "rive-sud-montreal", name: "Montreal South Shore", detail: "" },
    { slug: "saguenay-lac-saint-jean", name: "Saguenay-Lac-Saint-Jean", detail: "" },
    { slug: "sherbrooke", name: "Greater Sherbrooke area", detail: "" },
  ],

  coordinates: {
    title: "Contact details",
    phone: "Phone",
    email: "Email",
    hours: "Opening hours",
  },

  testimonials: {
    title: "What our clients say",
    stagingEmpty:
      "Section preview. No verified testimonial yet: add real customer comments, with their written permission, in src/content/projects.ts. This card does not appear in production until there are some.",
    ratingLabel: "{n} out of 5 stars",
  },

  trust: {
    items: [
      {
        icon: "certified",
        title: "Authorized GoNano installer",
        text: "Authorized reseller and installer of GoNano products.",
      },
      {
        icon: "honest",
        title: "No-pressure assessment",
        text: "We examine your roof. If it does not qualify for the treatment, we tell you plainly.",
      },
      {
        icon: "reply",
        title: "Reply within 24 hours",
        text: "Guaranteed reply within 24 hours to your assessment request, free and with no obligation.",
      },
      {
        icon: "oneDay",
        title: "Applied in one day",
        text: "Usually completed in a single day for a typical home, without tearing off your roof.",
      },
    ],
    note: "Depending on roof size, required preparation and weather.",
  },

  ctaBand: {
    title: "Know where your roof stands, with no obligation.",
    text: "A technician examines your roof and tells you plainly whether it can be preserved, repaired or must be replaced.",
  },

  footer: {
    blurb:
      "Preservation and protection of asphalt shingle roofs, with GoNano treatments. An honest opinion first.",
    treatments: "Treatments",
    productsLink: "GoNano products",
    technologyLink: "Technology",
    resources: "Resources",
    resourceLinks: [
      { href: "/blogue", label: "Blog" },
      { href: "/faq", label: "FAQ" },
      { href: "/realisations", label: "Projects" },
      { href: "/zones-desservies", label: "Service areas" },
      { href: "/a-propos", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
    regions: "Regions",
    certifications: "Licence and certifications",
    certs: {
      gonano: "GoNano certified",
      contractor: "Certified contractor",
      rbq: "RBQ licence",
    },
    certAlt: {
      gonano: "GoNano logo",
      contractor: "GoNano authorized reseller and installer",
      rbq: "Régie du bâtiment du Québec",
    },
    officialWarranty: "Official warranty (PDF, in French)",
    toConfirm: "to be confirmed",
    rights: "© {year} Les Experts Nano Protection Toitures. All rights reserved.",
    legal: [
      { href: "/confidentialite", label: "Privacy" },
      { href: "/conditions-utilisation", label: "Terms of use" },
      { href: "/temoins", label: "Cookies" },
      { href: "/mentions-legales", label: "Legal notice" },
    ],
    disclaimer:
      "GoNano is a trademark of its owner. We are an authorized installer of these products and are not the manufacturer. Information on this site is general in nature and does not replace an on-site inspection.",
  },


  sticky: { callAria: "Call {phone}" },
};
