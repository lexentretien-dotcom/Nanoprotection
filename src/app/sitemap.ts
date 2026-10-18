import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getDict } from "@/i18n/dictionaries";
import { getPosts, postLocales } from "@/lib/blog";
import { htmlLang, localePath, locales } from "@/i18n/config";

const staticPaths = [
  "/",
  "/nos-traitements",
  "/technologie-gonano",
  "/nos-produits",
  "/estimation",
  "/realisations",
  "/a-propos",
  "/zones-desservies",
  "/blogue",
  "/faq",
  "/contact",
  "/confidentialite",
  "/conditions-utilisation",
  "/temoins",
  "/mentions-legales",
];

function entry(path: string, available: readonly (typeof locales)[number][], lastModified: Date, priority: number) {
  const languages: Record<string, string> = {};
  for (const l of available) languages[htmlLang[l]] = absoluteUrl(localePath(l, path));
  return available.map((locale) => ({
    url: absoluteUrl(localePath(locale, path)),
    lastModified,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const out: MetadataRoute.Sitemap = [];

  for (const p of staticPaths) out.push(...entry(p, locales, now, p === "/" ? 1 : 0.7));

  // Services exist in both languages with the same slugs.
  for (const s of getDict("fr").content.services.items) {
    out.push(...entry(`/nos-traitements/${s.slug}`, locales, now, 0.8));
  }

  // Individual product pages.
  for (const p of getDict("fr").content.products.items) {
    out.push(...entry(`/nos-produits/${p.slug}`, locales, now, 0.8));
  }

  // Blog posts: list each language that has the post.
  const slugs = new Set(locales.flatMap((l) => getPosts(l).map((p) => p.slug)));
  for (const slug of slugs) {
    const available = postLocales(slug);
    const date = new Date(getPosts(available[0]).find((p) => p.slug === slug)?.date ?? now);
    out.push(...entry(`/blogue/${slug}`, available, date, 0.6));
  }
  return out;
}
