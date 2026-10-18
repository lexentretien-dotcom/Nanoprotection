import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { Locale } from "@/i18n/config";

/**
 * Blog posts are Markdown files: content/blog/<fr|en>/<slug>.md
 * See content/blog/README.md for how to add one.
 */
const ROOT = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  author: string;
  readingMinutes: number;
  sources: { label: string; url: string }[];
  /** True until an expert has reviewed the text. Shown in the dev preview only. */
  reviewed: boolean;
};

function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const s = String(value ?? "").trim();
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : "1970-01-01";
}

function readFile(locale: Locale, slug: string) {
  const file = path.join(ROOT, locale, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const parsed = matter(fs.readFileSync(file, "utf8"));
  const data = parsed.data as Record<string, unknown>;
  if (data.draft === true) return null; // drafts are never published
  const words = parsed.content.split(/\s+/).filter(Boolean).length;
  const sources = Array.isArray(data.sources)
    ? (data.sources as { label?: string; url?: string }[])
        .filter((s) => s?.label && s?.url)
        .map((s) => ({ label: String(s.label), url: String(s.url) }))
    : [];
  const meta: PostMeta = {
    slug,
    locale,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: toIsoDate(data.date),
    author: String(data.author ?? ""),
    readingMinutes: Math.max(1, Math.round(words / 200)),
    sources,
    reviewed: data.reviewed !== false,
  };
  return { meta, content: parsed.content };
}

export function getPostSlugs(locale: Locale): string[] {
  const dir = path.join(ROOT, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPosts(locale: Locale): PostMeta[] {
  return getPostSlugs(locale)
    .map((slug) => readFile(locale, slug)?.meta)
    .filter((m): m is PostMeta => Boolean(m))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(locale: Locale, slug: string) {
  const file = readFile(locale, slug);
  if (!file) return null;
  const html = String(await remark().use(remarkGfm).use(remarkHtml).process(file.content));
  return { meta: file.meta, html };
}

/** Which languages have this slug (used for hreflang and the language switch). */
export function postLocales(slug: string): Locale[] {
  return (["fr", "en"] as const).filter((l) => readFile(l, slug) !== null);
}
