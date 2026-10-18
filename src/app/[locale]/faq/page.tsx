import { Container, PageHeader } from "@/components/ui/Page";
import { FaqSearch } from "@/components/sections/FaqSearch";
import { Closing } from "@/components/sections/Closing";
import { getDict } from "@/i18n/dictionaries";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const f = getDict(locale).content.faq;
  return pageMetadata({ locale, title: f.metaTitle, description: f.metaDescription, path: "/faq" });
}

export default async function FaqPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const f = getDict(locale).content.faq;
  return (
    <>
      <PageHeader locale={locale} title={f.title} intro={f.intro} crumbs={[{ name: "FAQ", path: "/faq" }]} />
      <Container className="py-16 sm:py-20">
        <FaqSearch categories={f.categories} />
      </Container>
      <Closing locale={locale} />
    </>
  );
}
