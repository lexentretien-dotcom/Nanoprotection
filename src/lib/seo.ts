import type { Metadata } from "next";
import { business } from "@/config/business";
import { getDict } from "@/i18n/dictionaries";
import { htmlLang, localePath, locales, ogLocale, type Locale } from "@/i18n/config";

type PageSeo = {
  locale: Locale;
  title: string;
  description: string;
  /** Unprefixed path, e.g. "/faq". */
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  /** Use the title as is, without the site suffix. */
  absoluteTitle?: boolean;
  /** Locales in which this page exists. Defaults to all. */
  available?: readonly Locale[];
};

export function absoluteUrl(path: string) {
  return new URL(path, business.siteUrl).toString();
}

export function pageMetadata({
  locale,
  title,
  description,
  path,
  image = "/opengraph-image",
  type = "website",
  noindex = false,
  absoluteTitle = false,
  available = locales,
}: PageSeo): Metadata {
  const url = absoluteUrl(localePath(locale, path));
  const languages: Record<string, string> = {};
  for (const l of available) languages[htmlLang[l]] = absoluteUrl(localePath(l, path));
  if (available.includes("fr")) languages["x-default"] = absoluteUrl(localePath("fr", path));

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages },
    robots:
      noindex || !business.indexable
        ? { index: false, follow: false }
        : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: business.displayName,
      locale: ogLocale[locale],
      alternateLocale: available.filter((l) => l !== locale).map((l) => ogLocale[l]),
      type,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function breadcrumbJsonLd(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(localePath(locale, item.path)),
    })),
  };
}

export function organizationJsonLd(locale: Locale) {
  const site = getDict(locale).site;
  const areas = site.regions.map((r) => ({ "@type": "AdministrativeArea", name: r.name }));

  return {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": absoluteUrl("/#organization"),
    name: business.legalName,
    url: business.siteUrl,
    telephone: business.phone.href,
    email: business.email.value,
    logo: absoluteUrl("/brand/logo-icon.png"),
    image: absoluteUrl("/opengraph-image"),
    description: site.orgDescription,
    knowsLanguage: ["fr-CA", "en-CA"],
    areaServed: areas,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: business.openingHours.days,
        opens: business.openingHours.opens,
        closes: business.openingHours.closes,
      },
    ],
    ...(business.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: business.address.street,
            addressLocality: business.address.city,
            addressRegion: business.address.region,
            postalCode: business.address.postalCode,
            addressCountry: "CA",
          },
        }
      : {}),
  };
}
