import { Container, PageHeader, Section, SectionTitle } from "@/components/ui/Page";
import { ProductCompare } from "@/components/sections/ProductCompare";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { WarrantySummary } from "@/components/tech/WarrantySummary";
import { Closing } from "@/components/sections/Closing";
import { Reveal } from "@/components/ui/Reveal";
import { business } from "@/config/business";
import { getDict } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).content.products;
  return pageMetadata({ locale, title: p.metaTitle, description: p.metaDescription, path: "/nos-produits" });
}

export default async function ProductsPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).content.products;
  const images = business.assets.productImages;
  const links = Object.fromEntries(
    p.items.map((x) => [x.slug, localePath(locale, `/nos-produits/${x.slug}`)]),
  );
  return (
    <>
      <PageHeader
        locale={locale}
        title={p.title}
        intro={p.intro}
        crumbs={[{ name: getDict(locale).ui.nav.items[2].label, path: "/nos-produits" }]}
      />
      <Container className="py-20">
        <ProductCompare
          products={p.items}
          rows={p.rows}
          images={images}
          links={links}
          labels={{
            pick: p.pickLabel,
            caption: p.tableCaption,
            region: p.tableRegion,
            criterion: p.criterion,
            note: p.note,
            view: p.viewProduct,
            imageAlt: p.cardImageAlt,
          }}
        />
      </Container>

      {/* GoNano figures, right under the comparison */}
      <StatsStrip locale={locale} link />

      <Section tone="surface" id="garantie" className="mt-20">
        <Reveal>
          <SectionTitle title={p.warranty.title} intro={p.warranty.intro} />
        </Reveal>
        <div className="mt-12">
          <WarrantySummary data={p.warranty} locale={locale} />
        </div>
      </Section>
      <Closing locale={locale} />
    </>
  );
}
