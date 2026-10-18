import { LegalPage } from "@/components/ui/Legal";
import { business } from "@/config/business";
import { getDict } from "@/i18n/dictionaries";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const d = getDict(locale).legal.notice;
  return pageMetadata({ locale, title: d.metaTitle, description: d.metaDescription, path: d.path });
}

export default async function LegalNoticePage({ params }: Props) {
  const locale = await resolveLocale(params);
  const d = getDict(locale).legal.notice;
  const showRbq = !business.indexable || !business.rbq.verify;
  const sections = d.sections.filter((s) => showRbq || !s.paragraphs?.some((p) => p.includes("{rbq}")));
  return (
    <LegalPage
      locale={locale}
      title={d.title}
      path={d.path}
      sections={sections}
      vars={{ rbq: business.rbq.number, rbqNote: business.rbq.verify ? d.rbqNote : "" }}
    />
  );
}
