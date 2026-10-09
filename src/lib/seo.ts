import type { Metadata } from "next";
import { business } from "@/config/business";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

export function absoluteUrl(path: string) {
  return new URL(path, business.siteUrl).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  type = "website",
  noindex = false,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots:
      noindex || !business.indexable
        ? { index: false, follow: false }
        : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: business.displayName,
      locale: "fr_CA",
      type,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function organizationJsonLd() {
  const areas = business.regions
    .filter((r) => r.enabled)
    .map((r) => ({ "@type": "AdministrativeArea", name: r.name }));

  return {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": absoluteUrl("/#organization"),
    name: business.legalName,
    url: business.siteUrl,
    telephone: `+1${business.phone.href.replace("+1", "")}`,
    email: business.email.value,
    logo: absoluteUrl("/brand/logo-icon.png"),
    image: absoluteUrl("/opengraph-image"),
    description:
      "Traitements de préservation et de protection de toitures en bardeaux d'asphalte au Québec, avec les produits GoNano.",
    areaServed: areas,
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
