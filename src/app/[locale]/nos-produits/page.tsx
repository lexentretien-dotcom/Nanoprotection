import { Container, PageHeader, Section, SectionTitle } from "@/components/ui/Page";
import { ProductCompare } from "@/components/sections/ProductCompare";
import { WarrantySummary } from "@/components/tech/WarrantySummary";
import { Closing } from "@/components/sections/Closing";
import { Reveal } from "@/components/ui/Reveal";
import { getDict } from "@/i18n/dictionaries";
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
          labels={{
            pick: p.pickLabel,
            caption: p.tableCaption,
            region: p.tableRegion,
            criterion: p.criterion,
            note: p.note,
          }}
        />
      </Container>
      <Section tone="surface" id="garantie">
        <Reveal>
          <SectionTitle title={p.warranty.title} intro={p.warranty.intro} />
        </Reveal>
        <div className="mt-12">
          <WarrantySummary data={p.warranty} />
        </div>
      </Section>
      <Closing locale={locale} />
    </>
  );
}
