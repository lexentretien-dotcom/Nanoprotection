/**
 * Single source of truth for business information that does not depend on
 * the language. Text shown to visitors lives in src/i18n.
 *
 * Fields marked `verify: true` have not been confirmed for the new brand.
 * See docs/PENDING-INFO.md.
 */
const DEFAULT_SITE_URL = "https://expertsnanoprotection.ca";

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
  displayName: "Les Experts Nano Protection Toitures",
  shortName: "Nano Protection",

  siteUrl: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),

  phone: { display: "+1 (450) 328-9398", href: "+14503289398" },
  email: { value: "Service@ExpertsNanoProtection.ca" },

  /** Open every day, 8:00 to 20:00. Used for structured data; the text shown is in the dictionaries. */
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "08:00",
    closes: "20:00",
  },

  /** Service-area business: no public street address is published. */
  address: null as null | {
    street: string;
    city: string;
    region: string;
    postalCode: string;
  },

  rbq: { number: "1254-8794-00", verify: true },

  /** Slugs only; names and details are in the dictionaries. Remove a region that is not served. */
  regions: ["rive-sud-montreal", "saguenay-lac-saint-jean", "sherbrooke"] as const,

  assets: {
    warrantyPdf: "/docs/garantie-officielle-gonano.pdf",
    goNanoLogoDark: "/brand/gonano-logo-dark.png",
    goNanoLogoLight: "/brand/gonano-logo-light.png",
    resellerBanner: "/brand/Reseller banner GoNano_Image.png",
    rbqLogo: "/brand/rbq.webp",
  },

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

  ctaPath: "/estimation",
} as const;

export type RegionSlug = (typeof business.regions)[number];
