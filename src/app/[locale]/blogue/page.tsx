import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Container, PageHeader } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { Closing } from "@/components/sections/Closing";
import { getDict } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";
import { localePath } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { getPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).pages.blog;
  return pageMetadata({ locale, title: p.metaTitle, description: p.metaDescription, path: "/blogue" });
}

export default async function BlogIndexPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).pages.blog;
  const posts = getPosts(locale);
  const dateLocale = locale === "fr" ? "fr-CA" : "en-CA";

  return (
    <>
      <PageHeader locale={locale} title={p.title} intro={p.intro} crumbs={[{ name: p.crumb, path: "/blogue" }]} />
      <Container className="py-20">
        {posts.length === 0 ? (
          <p className="text-lg text-muted">{p.empty}</p>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2">
            {posts.map((a) => (
              <li key={a.slug}>
                <Bezel className="h-full" coreClassName="flex h-full flex-col p-8">
                  <p className="text-sm text-muted">
                    <time dateTime={a.date}>
                      {new Date(a.date).toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" })}
                    </time>
                    {" · "}
                    {fmt(p.minutes, { n: a.readingMinutes })}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold">
                    <Link href={localePath(locale, `/blogue/${a.slug}`)} className="hover:text-accent">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-muted">{a.description}</p>
                  <Link
                    href={localePath(locale, `/blogue/${a.slug}`)}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    {p.read}
                    <ArrowRight size={16} weight="light" aria-hidden />
                  </Link>
                </Bezel>
              </li>
            ))}
          </ul>
        )}
      </Container>
      <Closing locale={locale} />
    </>
  );
}
