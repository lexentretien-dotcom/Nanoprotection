import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Container, PageHeader } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { Reveal } from "@/components/ui/Reveal";
import { Closing } from "@/components/sections/Closing";
import { getDict } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const s = getDict(locale).content.services.index;
  return pageMetadata({ locale, title: s.metaTitle, description: s.metaDescription, path: "/nos-traitements" });
}

export default async function TreatmentsPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const { content } = getDict(locale);
  const s = content.services;
  return (
    <>
      <PageHeader
        locale={locale}
        title={s.index.title}
        intro={s.index.intro}
        crumbs={[{ name: s.index.title, path: "/nos-traitements" }]}
      />
      <Container className="py-20">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {s.items.map((item, i) => (
            <li key={item.slug}>
              <Reveal delay={i * 80} className="h-full">
                <Bezel className="h-full" coreClassName="flex h-full flex-col p-8">
                  <h2 className="text-2xl font-bold">{item.name}</h2>
                  <p className="mt-3 flex-1 text-muted">{item.summary}</p>
                  <Link
                    href={localePath(locale, `/nos-traitements/${item.slug}`)}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    {s.index.readMore}
                    <ArrowRight size={16} weight="light" aria-hidden />
                  </Link>
                </Bezel>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
      <Closing locale={locale} />
    </>
  );
}
