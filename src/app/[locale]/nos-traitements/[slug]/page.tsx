import { notFound } from "next/navigation";
import { Check, Warning } from "@phosphor-icons/react/ssr";
import { Container, PageHeader } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink, Reassurance } from "@/components/ui/Button";
import { Closing } from "@/components/sections/Closing";
import { business } from "@/config/business";
import { getDict } from "@/i18n/dictionaries";
import { localePath, locales } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getDict(locale).content.services.items.map((s) => ({ locale, slug: s.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const s = getDict(locale).content.services.items.find((x) => x.slug === slug);
  if (!s) return {};
  return pageMetadata({
    locale,
    title: s.seoTitle,
    description: s.seoDescription,
    path: `/nos-traitements/${s.slug}`,
  });
}

function List({ items, icon }: { items: string[]; icon: "ok" | "warn" }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          {icon === "ok" ? (
            <Check size={22} weight="light" className="mt-0.5 shrink-0 text-success" aria-hidden />
          ) : (
            <Warning size={22} weight="light" className="mt-0.5 shrink-0 text-danger" aria-hidden />
          )}
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const { content, site, ui } = getDict(locale);
  const s = content.services.items.find((x) => x.slug === slug);
  if (!s) notFound();
  const lb = content.services.labels;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          description: s.summary,
          url: absoluteUrl(localePath(locale, `/nos-traitements/${s.slug}`)),
          provider: { "@id": absoluteUrl("/#organization") },
          areaServed: site.regions.map((r) => r.name),
        }}
      />
      <PageHeader
        locale={locale}
        title={s.name}
        intro={s.summary}
        crumbs={[
          { name: content.services.index.title, path: "/nos-traitements" },
          { name: s.name, path: `/nos-traitements/${s.slug}` },
        ]}
      >
        <ButtonLink href={localePath(locale, business.ctaPath)}>{ui.cta.primary}</ButtonLink>
        <Reassurance text={ui.reassurance} />
      </PageHeader>

      <Container className="grid gap-5 py-20 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-7">
          <Bezel coreClassName="p-8 sm:p-10">
            <h2 className="text-2xl font-bold">{lb.what}</h2>
            <p className="mt-4 text-muted">{s.intendedUse}</p>
            <h3 className="mt-8 text-xl font-bold">{lb.benefits}</h3>
            <List items={s.benefits} icon="ok" />
          </Bezel>
          <Bezel coreClassName="p-8 sm:p-10">
            <h2 className="text-2xl font-bold">{lb.how}</h2>
            <ol className="mt-5 space-y-4">
              {s.method.map((m, i) => (
                <li key={m} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-tint font-display text-sm font-bold text-accent-strong">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{m}</span>
                </li>
              ))}
            </ol>
          </Bezel>
        </div>

        <div className="space-y-5 lg:col-span-5">
          <Bezel coreClassName="p-8">
            <h2 className="text-xl font-bold">{lb.suitable}</h2>
            <List items={s.suitable} icon="ok" />
            <h2 className="mt-8 text-xl font-bold">{lb.notSuitable}</h2>
            <List items={s.notSuitable} icon="warn" />
          </Bezel>
          <Bezel coreClassName="p-8">
            <h2 className="text-xl font-bold">{lb.upkeep}</h2>
            <p className="mt-3 text-muted">{s.maintenance}</p>
            <p className="mt-3 text-muted">{s.warranty}</p>
          </Bezel>
          <Bezel coreClassName="p-8">
            <h2 className="text-xl font-bold">{lb.otherSolution}</h2>
            <p className="mt-3 text-muted">{s.alternative}</p>
          </Bezel>
        </div>
      </Container>
      <Closing locale={locale} />
    </>
  );
}
