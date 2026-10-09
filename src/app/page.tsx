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
import { CtaBand } from "@/components/sections/CtaBand";
import { business } from "@/config/business";
import { products } from "@/content/products";
import { publishedServices } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Préservation de toiture au Québec | Les Experts Nano Protection Toitures",
  description:
    "Protégez votre toiture en bardeaux d'asphalte. Inspection, recommandation honnête et traitements GoNano. Demandez votre évaluation gratuite.",
  path: "/",
});

/** Drop a real photo at public/photos/hero-home.jpg and it is used automatically. */
const heroPhoto = existsSync(path.join(process.cwd(), "public/photos/hero-home.jpg"))
  ? "/photos/hero-home.jpg"
  : null;

const preserve = [
  "Les bardeaux sont usés en surface mais encore sains",
  "Il n'y a pas de fuite active",
  "Le pontage et les solins sont en bon état",
  "Vous comptez garder la maison plusieurs années",
];
const replace = [
  "Les bardeaux sont fendus en profondeur ou décollés en grand nombre",
  "L'eau s'infiltre dans la maison",
  "Le pontage est endommagé",
  "La toiture est en fin de vie",
];

export default function HomePage() {
  const regions = business.regions.filter((r) => r.enabled);
  const feature = publishedServices.find((s) => s.slug === "rajeunissement-toiture");
  const others = publishedServices.filter((s) => s !== feature);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Container className="grid min-h-[min(46rem,calc(100dvh-72px))] items-center gap-12 py-14 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-7">
            <h1 className="text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
              Protégez votre toiture. Préservez votre investissement.
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted sm:text-xl">
              Une solution de préservation de toiture adaptée à votre maison, avec les traitements
              GoNano.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={business.cta.href}>{business.cta.label}</ButtonLink>
              <ButtonLink href="#processus" variant="secondary" arrow={false}>
                Comment ça fonctionne
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[2rem] bg-ink/[0.05] p-1.5 ring-1 ring-ink/[0.08]">
              <div className="shingles relative flex aspect-[4/5] items-end overflow-hidden rounded-[calc(2rem-0.375rem)] p-4 sm:aspect-[5/6] sm:p-6">
                {heroPhoto && (
                  <Image
                    src={heroPhoto}
                    alt="Maison québécoise avec une toiture en bardeaux d'asphalte"
                    fill
                    priority
                    sizes="(min-width:1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                )}
                <div className="relative w-full rounded-[1.5rem] bg-surface/95 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md">
                  <p className="font-display text-xl font-bold leading-tight">
                    Ma toiture peut-elle être préservée?
                  </p>
                  <p className="mt-2 text-[15px] text-muted">
                    Sept questions, aucun prix inventé, et un résultat honnête.
                  </p>
                  <Link
                    href="/estimation"
                    className="mt-4 inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    Commencer l&apos;évaluation
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
          <SectionTitle
            title="Préserver ce qui est encore bon."
            intro="Nous traitons les toitures en bardeaux d'asphalte dont la structure est saine. Quand ce n'est pas le cas, nous vous le disons."
          />
        </Reveal>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {feature && (
            <Reveal className="lg:col-span-2 lg:row-span-2">
              <Link
                href={`/nos-traitements/${feature.slug}`}
                className="shingles group flex h-full min-h-[22rem] flex-col justify-end rounded-[2rem] p-8 ring-1 ring-ink sm:p-12"
              >
                <h3 className="max-w-md text-3xl font-bold !text-white sm:text-4xl">{feature.name}</h3>
                <p className="mt-4 max-w-lg text-lg text-white/75">{feature.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-white">
                  En savoir plus
                  <ArrowRight size={18} weight="light" className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </Reveal>
          )}
          {others.map((s, i) => (
            <Reveal key={s.slug} delay={(i + 1) * 90}>
              <Link
                href={`/nos-traitements/${s.slug}`}
                className="group flex h-full flex-col justify-between rounded-[2rem] bg-accent-tint p-8 ring-1 ring-accent/15 transition-colors duration-500 hover:bg-[#e6deff]"
              >
                <div>
                  <h3 className="text-2xl font-bold">{s.name}</h3>
                  <p className="mt-3 text-[15px] text-ink-soft">{s.summary}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-accent-strong">
                  Détails
                  <ArrowRight size={16} weight="light" className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section id="processus">
        <Reveal>
          <SectionTitle
            title="Quatre étapes, aucune surprise."
            intro="De l'inspection au suivi, chaque étape est expliquée avant d'être faite."
          />
        </Reveal>
        <div className="mt-14">
          <ProcessSteps />
        </div>
      </Section>

      {/* Technology and products */}
      <Section tone="ink">
        <Reveal>
          <SectionTitle
            tone="dark"
            title="Une technologie, trois produits, un seul bon choix pour votre toit."
            intro="Chaque produit GoNano vise une situation différente. Nous recommandons celui qui convient après l'inspection, jamais les trois par défaut."
          />
        </Reveal>
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {products.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 90} className="h-full">
                <div className="flex h-full flex-col rounded-[1.75rem] bg-white/[0.06] p-7 ring-1 ring-white/12">
                  <p className="text-sm font-semibold text-[#b9a6ff]">{p.roofAge}</p>
                  <h3 className="mt-2 text-2xl font-bold !text-white">{p.name}</h3>
                  <p className="mt-3 text-[15px] text-white/70">{p.summary}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/nos-produits" variant="secondary" className="!bg-white !text-ink">
            Comparer les produits
          </ButtonLink>
          <ButtonLink
            href="/technologie-gonano"
            variant="ghost"
            className="!text-white hover:!bg-white/10"
          >
            Découvrir les traitements
          </ButtonLink>
        </div>
      </Section>

      {/* Preserve or replace */}
      <Section>
        <Reveal>
          <SectionTitle
            title="Préserver ou remplacer? Parfois, la réponse est remplacer."
            intro="Nous vous le dirons honnêtement. Voici comment nous raisonnons."
          />
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <Reveal>
            <Bezel coreClassName="p-8 sm:p-10">
              <h3 className="text-2xl font-bold">La préservation peut convenir si</h3>
              <ul className="mt-6 space-y-4">
                {preserve.map((t) => (
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
              <h3 className="text-2xl font-bold">Le remplacement reste nécessaire si</h3>
              <ul className="mt-6 space-y-4">
                {replace.map((t) => (
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

      {/* Case studies framework + service areas */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl">Nos réalisations</h2>
            <p className="mt-5 max-w-md text-lg text-muted">
              Nous publions seulement de vrais projets, avec des photos datées. La galerie avant et
              après sera mise en ligne au fur et à mesure.
            </p>
            <div className="mt-8">
              <ButtonLink href="/realisations" variant="secondary" arrow={false}>
                Voir les réalisations
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="text-3xl font-bold sm:text-4xl">Zones desservies</h2>
            <ul className="mt-6 space-y-3">
              {regions.map((r) => (
                <li key={r.slug} className="rounded-2xl bg-paper p-5 ring-1 ring-ink/[0.07]">
                  <p className="font-display text-lg font-bold">{r.name}</p>
                  <p className="text-[15px] text-muted">{r.detail}</p>
                </li>
              ))}
            </ul>
            <Link href="/zones-desservies" className="mt-5 inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline">
              Vérifier mon secteur
              <ArrowRight size={16} weight="light" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
