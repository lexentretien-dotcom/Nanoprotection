import { Container, PageHeader } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { Reveal } from "@/components/ui/Reveal";
import { Closing } from "@/components/sections/Closing";
import { getDict } from "@/i18n/dictionaries";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).pages.areas;
  return pageMetadata({ locale, title: p.metaTitle, description: p.metaDescription, path: "/zones-desservies" });
}

export default async function AreasPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const { pages, site } = getDict(locale);
  const p = pages.areas;
  return (
    <>
      <PageHeader locale={locale} title={p.title} intro={p.intro} crumbs={[{ name: p.metaTitle, path: "/zones-desservies" }]} />
      <Container className="py-20">
        <ul className="grid gap-5 md:grid-cols-3">
          {site.regions.map((r, i) => (
            <li key={r.slug}>
              <Reveal delay={i * 80} className="h-full">
                <Bezel className="h-full" coreClassName="p-8">
                  <h2 className="text-2xl font-bold">{r.name}</h2>
                  {r.detail && <p className="mt-3 text-muted">{r.detail}</p>}
                </Bezel>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-muted">{p.note}</p>
      </Container>
      <Closing locale={locale} />
    </>
  );
}
