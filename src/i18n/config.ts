export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const htmlLang: Record<Locale, string> = { fr: "fr-CA", en: "en-CA" };
export const ogLocale: Record<Locale, string> = { fr: "fr_CA", en: "en_CA" };

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "fr" || value === "en";
}

/**
 * French (default) has no URL prefix. English lives under /en.
 * localePath("en", "/faq") -> "/en/faq", localePath("fr", "/faq") -> "/faq".
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? "/en" : `/en${clean}`;
}

/**
 * Splits a pathname into its locale and the unprefixed path.
 * French pages are served from /fr internally (the proxy rewrites them), and
 * the router reports that internal path, so "/fr" is stripped here too.
 */
export function parsePathname(pathname: string): { locale: Locale; path: string } {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return { locale: "en", path: pathname.slice(3) || "/" };
  }
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    return { locale: "fr", path: pathname.slice(3) || "/" };
  }
  return { locale: "fr", path: pathname || "/" };
}

/** Same page, other language. Used by the language switch. */
export function switchPath(pathname: string, to: Locale): string {
  const { path } = parsePathname(pathname);
  return localePath(to, path);
}
