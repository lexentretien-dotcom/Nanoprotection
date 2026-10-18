import { LegalPage } from "@/components/ui/Legal";
import { getDict } from "@/i18n/dictionaries";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const d = getDict(locale).legal.terms;
  return pageMetadata({ locale, title: d.metaTitle, description: d.metaDescription, path: d.path });
}

export default async function TermsPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const d = getDict(locale).legal.terms;
  return <LegalPage locale={locale} title={d.title} path={d.path} sections={d.sections} vars={{}} />;
}
