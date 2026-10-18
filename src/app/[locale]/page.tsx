import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import { ArrowRight, Check, X } from "@phosphor-icons/react/ssr";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionTitle } from "@/components/ui/Page";
import { Reveal } from "@/components/ui/Reveal";
import { Bezel } from "@/components/ui/Bezel";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Closing } from "@/components/sections/Closing";
import { business } from "@/config/business";
import { getDict } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).pages.home;
  return pageMetadata({
    locale,
    title: p.metaTitle,
    description: p.metaDescription,
    path: "/",
    absoluteTitle: true,
  });
}

/** Drop a real photo at public/photos/hero-home.jpg and it is used automatically. */
const heroPhoto = existsSync(path.join(process.cwd(), "public/photos/hero-home.jpg"))
  ? "/photos/hero-home.jpg"
  : null;

export default async function HomePage({ params }: Props) {
  const locale = await resolveLocale(params);
  const { pages, content, site, ui } = getDict(locale);
  const h = pages.home;
  const services = content.services.items;
  const feature = services.find((s) => s.slug === h.services.featuredSlug);
  const others = services.filter((s) => s !== feature);
  const L = (p: string) => localePath(locale, p);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Container className="grid min-h-[min(46rem,calc(100dvh-72px))] items-center gap-12 py-14 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-7">
            <h1 className="text-[2.6rem] font-extrabold sm:text-6xl lg:text-[4.25rem]">{h.h1}</h1>
            <p className="mt-7 max-w-xl text-lg text-muted sm:text-xl">{h.sub}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={L(business.ctaPath)}>{ui.cta.primary}</ButtonLink>
              <ButtonLink href="#processus" variant="secondary" arrow={false}>
                {h.how}
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[2rem] bg-ink/[0.05] p-1.5 ring-1 ring-ink/[0.08]">
              <div className="shingles relative flex aspect-[4/5] items-end overflow-hidden rounded-[calc(2rem-0.375rem)] p-4 sm:aspect-[5/6] sm:p-6">
                {heroPhoto && (
                  <Image
                    src={heroPhoto}
                    alt={h.photoAlt}
                    fill
                    priority
                    sizes="(min-width:1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                )}
                <div className="material relative w-full rounded-[1.5rem] bg-surface/95 p-6 shadow-[var(--shadow-soft)]">
                  <p className="font-display text-xl font-bold leading-tight">{h.card.title}</p>
                  <p className="mt-2 text-[15px] text-muted">{h.card.text}</p>
                  <Link
                    href={L(business.ctaPath)}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    {h.card.link}
                    <ArrowRight size={16} weight="light" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What we do: asymmetric tiles */}
      <Section tone="surface">
        <Reveal>
          <SectionTitle title={h.services.title} intro={h.services.intro} />
        </Reveal>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {feature && (
            <Reveal className="lg:col-span-2 lg:row-span-2">
              <Link
                href={L(`/nos-traitements/${feature.slug}`)}
                className="shingles group flex h-full min-h-[22rem] flex-col justify-end rounded-[2rem] p-8 ring-1 ring-ink sm:p-12"
              >
                <h3 className="max-w-md text-3xl font-bold !text-white sm:text-4xl">{feature.name}</h3>
                <p className="mt-4 max-w-lg text-lg text-white/80">{feature.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-white">
                  {h.services.more}
                  <ArrowRight
                    size={18}
                    weight="light"
                    className="transition-transform duration-500 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          )}
          {others.map((s, i) => (
            <Reveal key={s.slug} delay={(i + 1) * 90}>
              <Link
                href={L(`/nos-traitements/${s.slug}`)}
                className="group flex h-full flex-col justify-between rounded-[2rem] bg-accent-tint p-8 ring-1 ring-accent/15 transition-colors duration-500 hover:bg-[#e6deff]"
              >
                <div>
                  <h3 className="text-2xl font-bold">{s.name}</h3>
                  <p className="mt-3 text-[15px] text-ink-soft">{s.summary}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-accent-strong">
                  {h.services.details}
                  <ArrowRight
                    size={16}
                    weight="light"
                    className="transition-transform duration-500 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section id="processus">
        <Reveal>
          <SectionTitle title={h.process.title} intro={h.process.intro} />
        </Reveal>
        <div className="mt-14">
          <ProcessSteps steps={h.process.steps} label={h.process.label} stepOf={h.process.stepOf} />
        </div>
      </Section>

      {/* Technology and products */}
      <Section tone="ink">
        <Reveal>
          <SectionTitle tone="dark" title={h.tech.title} intro={h.tech.intro} />
        </Reveal>
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {content.products.items.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 90} className="h-full">
                <div className="flex h-full flex-col rounded-[1.75rem] bg-white/[0.06] p-7 ring-1 ring-white/12">
                  <p className="text-sm font-semibold text-[#c9bcff]">{p.roofAge}</p>
                  <h3 className="mt-2 text-2xl font-bold !text-white">{p.name}</h3>
                  <p className="mt-3 text-[15px] text-white/75">{p.summary}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={L("/nos-produits")} variant="secondary" className="!bg-white !text-ink">
            {h.tech.compare}
          </ButtonLink>
          <ButtonLink href={L("/technologie-gonano")} variant="ghost" className="!text-white hover:!bg-white/10">
            {h.tech.discover}
          </ButtonLink>
        </div>
      </Section>

      {/* Preserve or replace */}
      <Section>
        <Reveal>
          <SectionTitle title={h.decide.title} intro={h.decide.intro} />
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <Reveal>
            <Bezel coreClassName="p-8 sm:p-10">
              <h3 className="text-2xl font-bold">{h.decide.preserveTitle}</h3>
              <ul className="mt-6 space-y-4">
                {h.decide.preserve.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check size={22} weight="light" className="mt-0.5 shrink-0 text-success" aria-hidden />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Bezel>
          </Reveal>
          <Reveal delay={90}>
            <Bezel coreClassName="p-8 sm:p-10">
              <h3 className="text-2xl font-bold">{h.decide.replaceTitle}</h3>
              <ul className="mt-6 space-y-4">
                {h.decide.replace.map((t) => (
                  <li key={t} className="flex gap-3">
                    <X size={22} weight="light" className="mt-0.5 shrink-0 text-danger" aria-hidden />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Bezel>
          </Reveal>
        </div>
      </Section>

      {/* Projects and service areas */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl">{h.showcase.projectsTitle}</h2>
            <p className="mt-5 max-w-md text-lg text-muted">{h.showcase.projectsText}</p>
            <div className="mt-8">
              <ButtonLink href={L("/realisations")} variant="secondary" arrow={false}>
                {h.showcase.projectsCta}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="text-3xl font-bold sm:text-4xl">{h.showcase.areasTitle}</h2>
            <ul className="mt-6 space-y-3">
              {site.regions.map((r) => (
                <li key={r.slug} className="rounded-2xl bg-paper p-5 ring-1 ring-ink/[0.07]">
                  <p className="font-display text-lg font-bold">{r.name}</p>
                </li>
              ))}
            </ul>
            <Link
              href={L("/zones-desservies")}
              className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
            >
              {h.showcase.areasCta}
              <ArrowRight size={16} weight="light" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </Section>

      <Closing locale={locale} />
    </>
  );
}
