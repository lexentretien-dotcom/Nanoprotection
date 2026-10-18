import { LegalPage } from "@/components/ui/Legal";
import { getDict } from "@/i18n/dictionaries";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const d = getDict(locale).legal.privacy;
  return pageMetadata({ locale, title: d.metaTitle, description: d.metaDescription, path: d.path });
}

export default async function PrivacyPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const d = getDict(locale).legal.privacy;
  return <LegalPage locale={locale} title={d.title} path={d.path} sections={d.sections} vars={{}} />;
}
