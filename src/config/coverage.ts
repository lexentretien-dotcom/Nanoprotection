/**
 * Service-area coverage used by the postal-code check in the quote widget.
 *
 * HOW IT WORKS
 * The first three characters of a Canadian postal code (the "forward sortation
 * area", FSA, e.g. "J4K") are looked up in the lists below.
 *
 *  - FSA found in a list AND `verified` is true  -> "Bonne nouvelle! Nous desservons votre secteur."
 *  - anything else (list empty, `verified` false, or FSA not listed)
 *                                                -> coverage is "à confirmer": the visitor gives
 *                                                   their municipality and our team confirms.
 *  - first letter not G, H or J (outside Québec) -> clearly stated: we serve Québec only.
 *
 * The lists ship EMPTY on purpose. Where your territory begins and ends (for
 * example how far the "Rive-Sud" extends) is a business decision, and nothing
 * is claimed as covered until you fill a list and set `verified` to true.
 * See docs/COVERAGE.md for how to do it.
 */
export type CoverageRegion = {
  /** Matches a slug in business.regions */
  slug: string;
  /** FSAs, e.g. ["J4K", "J4L"]. Uppercase, 3 characters. */
  fsa: string[];
};

export const coverage: { verified: boolean; provinceWide: boolean; regions: CoverageRegion[] } = {
  verified: true,
  /** The owner confirmed that all of Québec is served: any G, H or J postal code is covered. */
  provinceWide: true,
  regions: [
    { slug: "rive-sud-montreal", fsa: [] },
    { slug: "saguenay-lac-saint-jean", fsa: [] },
    { slug: "sherbrooke", fsa: [] },
  ],
};

export type CoverageResult =
  | { status: "invalid" }
  | { status: "outside-quebec"; fsa: string }
  | { status: "covered"; fsa: string; region: string }
  | { status: "pending"; fsa: string };

/** Accepts "J4K 2T4", "j4k2t4", "J4K-2T4". Returns the normalised form or null. */
export function normalisePostalCode(raw: string): string | null {
  const v = raw.toUpperCase().replace(/[\s-]/g, "");
  if (!/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\d[ABCEGHJ-NPRSTV-Z]\d$/.test(v)) return null;
  return `${v.slice(0, 3)} ${v.slice(3)}`;
}

export function checkCoverage(raw: string): CoverageResult {
  const normalised = normalisePostalCode(raw);
  if (!normalised) return { status: "invalid" };
  const fsa = normalised.slice(0, 3);
  if (!["G", "H", "J"].includes(fsa[0])) return { status: "outside-quebec", fsa };
  if (coverage.verified && coverage.provinceWide) return { status: "covered", fsa, region: "quebec" };
  if (coverage.verified) {
    const hit = coverage.regions.find((r) => r.fsa.includes(fsa));
    if (hit) return { status: "covered", fsa, region: hit.slug };
  }
  return { status: "pending", fsa };
}
