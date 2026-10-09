import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { articles } from "@/content/articles";
import { publishedServices } from "@/content/services";

const staticPaths = [
  "/",
  "/nos-traitements",
  "/technologie-gonano",
  "/nos-produits",
  "/estimation",
  "/realisations",
  "/a-propos",
  "/zones-desservies",
  "/conseils",
  "/faq",
  "/contact",
  "/confidentialite",
  "/conditions-utilisation",
  "/temoins",
  "/mentions-legales",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticPaths.map((p) => ({
      url: absoluteUrl(p),
      lastModified: now,
      priority: p === "/" ? 1 : 0.7,
    })),
    ...publishedServices.map((s) => ({
      url: absoluteUrl(`/nos-traitements/${s.slug}`),
      lastModified: now,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: absoluteUrl(`/conseils/${a.slug}`),
      lastModified: new Date(a.published),
      priority: 0.6,
    })),
  ];
}
