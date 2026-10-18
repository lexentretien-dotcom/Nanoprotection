import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, FilePdf, Leaf, ShieldCheck, Warning } from "@phosphor-icons/react/ssr";
import { Breadcrumbs, Container } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink, Reassurance, buttonClasses } from "@/components/ui/Button";
import { Closing } from "@/components/sections/Closing";
import { business, type ProductSlug } from "@/config/business";
import { getDict } from "@/i18n/dictionaries";
import { localePath, locales } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getDict(locale).content.products.items.map((p) => ({ locale, slug: p.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const d = getDict(locale).content.products.details.find((x) => x.slug === slug);
  if (!d) return {};
  return pageMetadata({
    locale,
    title: d.metaTitle,
    description: d.metaDescription,
    path: `/nos-produits/${slug}`,
    image: business.assets.productImages[slug as ProductSlug],
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const { ui, content } = getDict(locale);
  const pr = content.products;
  const item = pr.items.find((x) => x.slug === slug);
  const d = pr.details.find((x) => x.slug === slug);
  if (!item || !d) notFound();

  const image = business.assets.productImages[slug as ProductSlug];
  const sheet = business.assets.productSheets[slug as ProductSlug][locale];
  const warrantyRows = pr.warranty.rows.filter((r) => d.warrantyProducts.includes(r.product));
  const others = pr.items.filter((x) => x.slug !== slug);
  const L = (p: string) => localePath(locale, p);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `GoNano ${item.name}`,
          description: d.intro,
          image: absoluteUrl(image),
          brand: { "@type": "Brand", name: "GoNano" },
          url: absoluteUrl(L(`/nos-produits/${slug}`)),
          category: "Asphalt shingle roof treatment",
        }}
      />

      {/* Header and product visual */}
      <header className="bg-surface">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs
            locale={locale}
            items={[
              { name: ui.nav.items[2].label, path: "/nos-produits" },
              { name: item.name, path: `/nos-produits/${slug}` },
            ]}
          />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="font-display text-sm font-bold text-accent">{item.roofAge}</p>
              <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl lg:text-6xl">{item.name}</h1>
              <p className="mt-4 font-display text-xl font-semibold text-ink-soft sm:text-2xl">{d.tagline}</p>
              <p className="mt-6 max-w-2xl text-lg text-muted">{d.intro}</p>
              <p className="mt-4 inline-block rounded-full bg-accent-tint px-4 py-1.5 text-sm font-semibold text-accent-strong">
                {item.lifeAdded}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={L(business.ctaPath)}>{ui.cta.primary}</ButtonLink>
                <a
                  href={sheet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses("secondary")}
                >
                  <FilePdf size={20} weight="light" aria-hidden />
                  {pr.detail.sheetCta}
                </a>
              </div>
              <Reassurance text={ui.reassurance} />
            </div>
            <div className="lg:order-first lg:col-span-6">
              <Image
                src={image}
                alt={d.imageAlt}
                width={900}
                height={900}
                priority
                sizes="(min-width:1024px) 46vw, 92vw"
                className="mx-auto h-auto max-h-[34rem] w-full max-w-lg object-contain drop-shadow-[0_28px_40px_rgb(11,18,48,0.22)] lg:max-h-[40rem] lg:max-w-none"
              />
            </div>
          </div>
        </Container>
      </header>

      {/* Features */}
      <Container className="py-20 sm:py-24">
        <Reveal>
          <h2 className="text-3xl font-bold sm:text-4xl">{pr.detail.featuresTitle}</h2>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.features.map((f, i) => (
            <li key={f.title}>
              <Reveal delay={(i % 4) * 70} className="h-full">
                <Bezel className="h-full" coreClassName="p-6">
                  <Check size={24} weight="bold" className="text-accent" aria-hidden />
                  <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-[15px] text-muted">{f.text}</p>
                </Bezel>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          {pr.detail.sourceNote}
          {slug === "nuroof-fortify" && ` ${pr.detail.sheetNameNote}`}
        </p>
      </Container>

      {/* Technical data and application */}
      <section className="bg-surface py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 className="text-3xl font-bold sm:text-4xl">{pr.detail.specsTitle}</h2>
            <dl className="mt-8 divide-y divide-ink/10 rounded-[1.5rem] ring-1 ring-ink/10">
              {d.specs.map((s) => (
                <div key={s.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="text-sm font-semibold text-muted">{s.label}</dt>
                  <dd className="text-[15px] font-medium text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={90} className="lg:col-span-6">
            <h2 className="text-3xl font-bold sm:text-4xl">{pr.detail.applicationTitle}</h2>
            <ol className="mt-8 space-y-4">
              {d.steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-tint font-display text-sm font-bold text-accent-strong">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-muted">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-2xl bg-paper p-4 text-[15px] text-muted ring-1 ring-ink/10">
              {d.applicationNote}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Environment and existing warranties */}
      <Container className="py-20 sm:py-24">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[2rem] bg-accent-tint p-8 ring-1 ring-accent/15 sm:p-10">
              <Leaf size={32} weight="light" className="text-accent-strong" aria-hidden />
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{d.environment.title}</h2>
              <p className="mt-4 text-ink-soft">{d.environment.text}</p>
              <ul className="mt-5 space-y-2">
                {d.environment.points.map((p) => (
                  <li key={p} className="flex gap-3 text-ink-soft">
                    <Check size={20} weight="bold" className="mt-0.5 shrink-0 text-accent-strong" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <Bezel className="h-full" coreClassName="p-8 sm:p-10">
              <ShieldCheck size={32} weight="light" className="text-accent" aria-hidden />
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{pr.detail.backstopTitle}</h2>
              <p className="mt-4 text-muted">{pr.detail.backstop}</p>
            </Bezel>
          </Reveal>
        </div>
      </Container>

      {/* Warranty periods for this product */}
      <section className="bg-surface py-20 sm:py-24">
        <Container>
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl">{pr.detail.warrantyTitle}</h2>
            <p className="mt-4 max-w-2xl text-muted">{pr.detail.warrantyIntro}</p>
          </Reveal>
          <div
            className="mt-8 overflow-x-auto rounded-[1.5rem] ring-1 ring-ink/10"
            tabIndex={0}
            role="region"
            aria-label={pr.warranty.tableCaption}
          >
            <table className="w-full min-w-[36rem] border-collapse text-left text-[15px]">
              <caption className="sr-only">{pr.warranty.tableCaption}</caption>
              <thead>
                <tr className="text-sm text-muted">
                  <th scope="col" className="p-4 font-semibold">{pr.warranty.tableHead.product}</th>
                  <th scope="col" className="p-4 font-semibold">{pr.warranty.tableHead.state}</th>
                  <th scope="col" className="p-4 font-semibold">{pr.warranty.tableHead.layers}</th>
                  <th scope="col" className="p-4 font-semibold">{pr.warranty.tableHead.period}</th>
                </tr>
              </thead>
              <tbody>
                {warrantyRows.map((r, i) => (
                  <tr key={i} className="border-t border-ink/10 align-top">
                    <th scope="row" className="p-4 font-semibold text-ink">{r.product}</th>
                    <td className="p-4 text-muted">{r.state}</td>
                    <td className="p-4 text-muted">{r.layers}{pr.warranty.layersUnit}</td>
                    <td className="p-4 font-semibold text-accent-strong">{r.period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">{pr.warranty.source}</p>
          <a
            href={business.assets.warrantyPdf[locale]}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
          >
            <FilePdf size={20} weight="light" aria-hidden />
            {pr.detail.warrantyMore}
          </a>

          <div className="mt-12 flex gap-3 rounded-2xl bg-paper p-5 ring-1 ring-ink/10">
            <Warning size={22} weight="light" className="mt-0.5 shrink-0 text-ink" aria-hidden />
            <div>
              <h3 className="font-bold">{pr.detail.limitsTitle}</h3>
              <p className="mt-1 text-[15px] text-muted">{item.limitations}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Other products */}
      <Container className="py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold sm:text-4xl">{pr.detail.compareCta}</h2>
          <Link
            href={L("/nos-produits")}
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
          >
            {pr.detail.back}
            <ArrowRight size={16} weight="light" aria-hidden />
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={L(`/nos-produits/${o.slug}`)}
                className="group flex items-center gap-5 rounded-[1.5rem] bg-surface p-5 ring-1 ring-ink/10 transition-[box-shadow,transform] duration-500 hover:ring-ink/30 active:scale-[0.99] active:duration-75"
              >
                <Image
                  src={business.assets.productImages[o.slug as ProductSlug]}
                  alt=""
                  width={500}
                  height={375}
                  className="h-24 w-auto shrink-0 object-contain"
                />
                <span>
                  <span className="block text-sm font-semibold text-accent">{o.roofAge}</span>
                  <span className="block font-display text-xl font-bold tracking-tight">{o.name}</span>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong">
                    {pr.viewProduct}
                    <ArrowRight
                      size={14}
                      weight="light"
                      className="transition-transform duration-500 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <Closing locale={locale} title={pr.detail.ctaTitle} text={pr.detail.ctaText} />
    </>
  );
}
