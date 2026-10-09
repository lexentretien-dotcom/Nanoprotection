/**
 * Single source of truth for business information.
 *
 * Every field marked `verify: true` was taken from the previous website
 * (expertsnanoplus.com) and has NOT been confirmed for the new brand.
 * Confirm each one before the site goes live. See docs/PENDING-INFO.md.
 */
const DEFAULT_SITE_URL = "https://expertsnanoplus.com";

/** An empty or malformed env value (common on hosting dashboards) must never break the build. */
function resolveSiteUrl(raw: string | undefined) {
  const value = raw?.trim();
  if (!value) return DEFAULT_SITE_URL;
  try {
    return new URL(value.startsWith("http") ? value : `https://${value}`).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const business = {
  legalName: "Les Experts Nano Protection Toitures",
  /** Name shown in the interface. */
  displayName: "Les Experts Nano Protection Toitures",
  shortName: "Nano Protection",
  tagline: "Préservation de toiture au Québec",

  siteUrl: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),

  phone: { display: "438 900-4886", href: "+14389004886", verify: true },
  email: { value: "service@expertsnanoplus.com", verify: true },
  hours: "Du lundi au samedi, de 8 h à 18 h",
  hoursVerify: true,

  /** Service-area business: no public street address is published. */
  address: null as null | {
    street: string;
    city: string;
    region: string;
    postalCode: string;
  },

  rbq: { number: "1254-8794-00", verify: true },
  insured: { claim: null as null | string, verify: true },
  goNanoRelationship: {
    label: "Applicateur GoNano",
    verify: true,
  },

  /** Regions to confirm. Only regions actually served should stay enabled. */
  regions: [
    { slug: "quebec", name: "Québec et environs", detail: "Québec, Lévis, Beauport, Charlesbourg, Sainte-Foy", enabled: true },
    { slug: "saguenay", name: "Saguenay-Lac-Saint-Jean", detail: "Saguenay et environs", enabled: true },
    { slug: "montreal", name: "Grand Montréal", detail: "Montréal, Rive-Sud, Rive-Nord", enabled: true },
  ],

  /** Integrations, all optional and configured through environment variables. */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  /** Show the Google Preferred Sources button only once eligibility is confirmed. */
  preferredSources: process.env.NEXT_PUBLIC_PREFERRED_SOURCES === "true",
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",

  /**
   * Preliminary estimator. Left disabled until validated rates exist.
   * When enabled, a range is shown for the entered roof area and is always
   * labelled as indicative, not a quote.
   */
  pricing: {
    enabled: false,
    perSqFtMin: 0,
    perSqFtMax: 0,
  },

  /** Primary call to action, reused everywhere (one label per intent). */
  cta: {
    label: "Obtenir mon évaluation gratuite",
    href: "/estimation",
  },
} as const;

export type Business = typeof business;
