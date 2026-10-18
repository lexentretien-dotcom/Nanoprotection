import { notFound, redirect } from "next/navigation";
import { Breadcrumbs, Container } from "@/components/ui/Page";
import { JsonLd } from "@/components/ui/JsonLd";
import { PreferredSource } from "@/components/sections/PreferredSource";
import { Closing } from "@/components/sections/Closing";
import { business } from "@/config/business";
import { getDict } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";
import { localePath, locales } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { getPost, getPostSlugs, postLocales } from "@/lib/blog";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => getPostSlugs(locale).map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const post = await getPost(locale, slug);
  if (!post) return {};
  return pageMetadata({
    locale,
    title: post.meta.title,
    description: post.meta.description,
    path: `/blogue/${slug}`,
    type: "article",
    available: postLocales(slug),
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const post = await getPost(locale, slug);

  if (!post) {
    // Exists in the other language: send the language switch to the blog list instead of a 404.
    if (postLocales(slug).length > 0) redirect(localePath(locale, "/blogue"));
    notFound();
  }

  const { pages } = getDict(locale);
  const p = pages.blog;
  const { meta, html } = post;
  const dateLocale = locale === "fr" ? "fr-CA" : "en-CA";
  const dateLabel = new Date(meta.date).toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: meta.title,
          description: meta.description,
          datePublished: meta.date,
          dateModified: meta.date,
          inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
          mainEntityOfPage: absoluteUrl(localePath(locale, `/blogue/${slug}`)),
          author: meta.author
            ? { "@type": "Person", name: meta.author }
            : { "@type": "Organization", name: business.legalName },
          publisher: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <Container narrow className="py-12 sm:py-16">
        <Breadcrumbs
          locale={locale}
          items={[
            { name: p.crumb, path: "/blogue" },
            { name: meta.title, path: `/blogue/${slug}` },
          ]}
        />
        <article className="mt-8">
          <h1 className="text-4xl font-extrabold sm:text-5xl">{meta.title}</h1>
          <p className="mt-5 text-lg text-muted">{meta.description}</p>
          <p className="mt-4 text-sm text-muted">
            {fmt(p.publishedOn, { date: dateLabel })}
            {meta.author ? `, ${fmt(p.by, { author: meta.author })}` : ""}
            {" · "}
            {fmt(p.minutes, { n: meta.readingMinutes })}
          </p>

          <div className="prose-article mt-10" dangerouslySetInnerHTML={{ __html: html }} />

          {meta.sources.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold">{p.sources}</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                {meta.sources.map((s) => (
                  <li key={s.url}>
                    <a className="text-accent underline underline-offset-4" href={s.url} rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="mt-12 rounded-2xl bg-paper p-5 text-[15px] text-muted ring-1 ring-ink/10">{p.general}</p>
          <PreferredSource label={p.preferredLabel} text={p.preferred} lang={locale} />
        </article>
      </Container>
      <Closing locale={locale} />
    </>
  );
}
