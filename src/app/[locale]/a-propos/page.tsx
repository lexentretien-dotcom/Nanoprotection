import { Container, PageHeader, Section, SectionTitle } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { Reveal } from "@/components/ui/Reveal";
import { Closing } from "@/components/sections/Closing";
import { TvBlock } from "@/components/sections/TvBlock";
import { business } from "@/config/business";
import { getDict } from "@/i18n/dictionaries";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).pages.about;
  return pageMetadata({ locale, title: p.metaTitle, description: p.metaDescription, path: "/a-propos" });
}

export default async function AboutPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const { pages, site } = getDict(locale);
  const p = pages.about;
  const staging = !business.indexable;
  const toConfirm = site.footer.toConfirm;

  return (
    <>
      <PageHeader locale={locale} title={p.title} intro={p.intro} crumbs={[{ name: p.metaTitle, path: "/a-propos" }]} />

      <Section>
        <Reveal>
          <SectionTitle title={p.howTitle} />
        </Reveal>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {p.principles.map((x, i) => (
            <li key={x.title}>
              <Reveal delay={i * 80} className="h-full">
                <Bezel className="h-full" coreClassName="p-8">
                  <h3 className="text-2xl font-bold">{x.title}</h3>
                  <p className="mt-3 text-muted">{x.text}</p>
                </Bezel>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <TvBlock locale={locale} />

      <Container className="pb-20 sm:pb-28">
        <Bezel coreClassName="p-8 sm:p-12">
          <h2 className="text-3xl font-bold">{p.infoTitle}</h2>
          <dl className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-muted">{p.legalName}</dt>
              <dd className="mt-1">{business.legalName}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">{p.relation}</dt>
              <dd className="mt-1">{p.relationValue}</dd>
            </div>
            {(staging || !business.rbq.verify) && (
              <div>
                <dt className="text-sm font-semibold text-muted">{p.rbq}</dt>
                <dd className="mt-1">
                  {business.rbq.number}
                  {business.rbq.verify && (
                    <span className="ml-2 rounded-full bg-accent-tint px-2 py-0.5 text-xs font-semibold text-accent-strong">
                      {toConfirm}
                    </span>
                  )}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-semibold text-muted">{p.regions}</dt>
              <dd className="mt-1">{site.regions.map((r) => r.name).join(", ")}</dd>
            </div>
          </dl>
        </Bezel>
      </Container>
      <Closing locale={locale} />
    </>
  );
}
