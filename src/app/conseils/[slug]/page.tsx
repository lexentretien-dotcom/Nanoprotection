import { notFound } from "next/navigation";
import { Breadcrumbs, Container } from "@/components/ui/Page";
import { JsonLd } from "@/components/ui/JsonLd";
import { PreferredSource } from "@/components/sections/PreferredSource";
import { CtaBand } from "@/components/sections/CtaBand";
import { business } from "@/config/business";
import { articles, getArticle } from "@/content/articles";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({
    title: a.title,
    description: a.description,
    path: `/conseils/${a.slug}`,
    type: "article",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: a.title,
          description: a.description,
          datePublished: a.published,
          dateModified: a.published,
          inLanguage: "fr-CA",
          mainEntityOfPage: absoluteUrl(`/conseils/${a.slug}`),
          author: { "@type": "Organization", name: business.legalName },
          publisher: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <Container narrow className="py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { name: "Conseils", path: "/conseils" },
            { name: a.title, path: `/conseils/${a.slug}` },
          ]}
        />
        <article className="mt-8">
          <h1 className="text-4xl font-extrabold sm:text-5xl">{a.title}</h1>
          <p className="mt-5 text-lg text-muted">{a.description}</p>
          <p className="mt-4 text-sm text-muted">
            Publié le{" "}
            <time dateTime={a.published}>
              {new Date(a.published).toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            , par {business.legalName}
          </p>

          <div className="mt-10 space-y-10">
            {a.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-2xl font-bold sm:text-3xl">{s.heading}</h2>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink-soft">
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {a.sources.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold">Sources</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                {a.sources.map((s) => (
                  <li key={s.url}>
                    <a className="text-accent underline underline-offset-4" href={s.url} rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="mt-12 rounded-2xl bg-paper p-5 text-[15px] text-muted ring-1 ring-ink/10">
            Ces renseignements sont de nature générale. Chaque toiture est différente: seule une
            inspection sur place permet de confirmer son état.
          </p>
          <PreferredSource />
        </article>
      </Container>
      <CtaBand />
    </>
  );
}
