import { Sun, Thermometer, Drop, Stack, Check, X } from "@phosphor-icons/react/ssr";
import { Container, PageHeader, Section, SectionTitle } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Closing } from "@/components/sections/Closing";
import { Microscope } from "@/components/tech/Microscope";
import { Particles } from "@/components/tech/Particles";
import { PerformanceTable, TestsTable } from "@/components/tech/Tables";
import { getDict } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const agingIcons = { sun: Sun, thermo: Thermometer, drop: Drop, stack: Stack } as const;

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getDict(locale).content.technology;
  return pageMetadata({
    locale,
    title: t.metaTitle,
    description: t.metaDescription,
    path: "/technologie-gonano",
  });
}

export default async function TechnologyPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getDict(locale).content.technology;

  return (
    <>
      <PageHeader
        locale={locale}
        title={t.title}
        intro={t.intro}
        crumbs={[{ name: getDict(locale).ui.nav.items[1].label, path: "/technologie-gonano" }]}
      />

      {/* 1. What happens inside the shingle */}
      <Section>
        <Reveal>
          <SectionTitle title={t.how.title} intro={t.how.intro} />
        </Reveal>
        <div className="mt-14">
          <Microscope data={t.how} />
        </div>
      </Section>

      {/* 2. Particle size */}
      <Section tone="surface">
        <Reveal>
          <SectionTitle title={t.particles.title} intro={t.particles.intro} />
        </Reveal>
        <div className="mt-14">
          <Particles data={t.particles} />
        </div>
      </Section>

      {/* 3. Why a shingle ages */}
      <Section>
        <Reveal>
          <SectionTitle title={t.aging.title} intro={t.aging.intro} />
        </Reveal>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.aging.items.map((a, i) => {
            const Icon = agingIcons[a.icon as keyof typeof agingIcons];
            return (
              <li key={a.title}>
                <Reveal delay={i * 70} className="h-full">
                  <Bezel className="h-full" coreClassName="p-7">
                    <Icon size={32} weight="light" className="text-accent" aria-hidden />
                    <h3 className="mt-5 text-xl font-bold">{a.title}</h3>
                    <p className="mt-2 text-[15px] text-muted">{a.text}</p>
                  </Bezel>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* 4. Performance comparison */}
      <Section tone="surface">
        <Reveal>
          <SectionTitle title={t.performance.title} intro={t.performance.intro} />
        </Reveal>
        <div className="mt-12">
          <PerformanceTable data={t.performance} />
          <p className="mt-4 text-sm text-muted">{t.performance.note}</p>
        </div>
      </Section>

      {/* 5. Test criteria */}
      <Section>
        <Reveal>
          <SectionTitle title={t.tests.title} intro={t.tests.intro} />
        </Reveal>
        <div className="mt-12">
          <TestsTable data={t.tests} />
          <p className="mt-4 text-sm text-muted">{t.tests.note}</p>
        </div>
      </Section>

      {/* 6. Limits and documentation */}
      <Container className="pb-8">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <Bezel className="h-full" coreClassName="p-8 sm:p-10">
              <h2 className="text-2xl font-bold">{t.limits.title}</h2>
              <p className="mt-4 text-muted">
                <strong className="text-ink">{t.limits.preservation}</strong> {t.limits.preservationText}
              </p>
              <p className="mt-3 text-muted">
                <strong className="text-ink">{t.limits.repair}</strong> {t.limits.repairText}
              </p>
              <h3 className="mt-8 text-xl font-bold">{t.limits.notTitle}</h3>
              <ul className="mt-4 space-y-3">
                {t.limits.notList.map((n) => (
                  <li key={n} className="flex gap-3 text-muted">
                    <X size={20} weight="light" className="mt-0.5 shrink-0 text-danger" aria-hidden />
                    {n}
                  </li>
                ))}
              </ul>
            </Bezel>
          </Reveal>
          <Reveal delay={90}>
            <Bezel className="h-full" coreClassName="p-8 sm:p-10">
              <h2 className="text-2xl font-bold">{t.limits.docsTitle}</h2>
              <p className="mt-4 flex gap-3 text-muted">
                <Check size={20} weight="light" className="mt-1 shrink-0 text-success" aria-hidden />
                {t.limits.docsText}
              </p>
              <p className="mt-4 text-sm text-muted">{t.source}</p>
              <div className="mt-8">
                <ButtonLink href={localePath(locale, "/nos-produits")} variant="secondary">
                  {t.limits.warrantyLink}
                </ButtonLink>
              </div>
            </Bezel>
          </Reveal>
        </div>
      </Container>
      <Closing locale={locale} />
    </>
  );
}
