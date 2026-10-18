import { LegalPage } from "@/components/ui/Legal";
import { business } from "@/config/business";
import { getDict } from "@/i18n/dictionaries";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const d = getDict(locale).legal.cookies;
  return pageMetadata({ locale, title: d.metaTitle, description: d.metaDescription, path: d.path });
}

export default async function CookiesPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const d = getDict(locale).legal.cookies;
  const analytics = business.gaId || business.gtmId ? d.analyticsOn : d.analyticsOff;
  return <LegalPage locale={locale} title={d.title} path={d.path} sections={d.sections} vars={{ analytics }} />;
}
