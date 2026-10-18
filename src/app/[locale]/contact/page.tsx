import { Container, PageHeader } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { LeadForm } from "@/components/forms/LeadForm";
import { CoordinatesCard, ServiceAreasCard, TestimonialsCard } from "@/components/sections/SideCards";
import { Closing } from "@/components/sections/Closing";
import { getDict } from "@/i18n/dictionaries";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).pages.contact;
  return pageMetadata({ locale, title: p.metaTitle, description: p.metaDescription, path: "/contact" });
}

export default async function ContactPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).pages.contact;
  return (
    <>
      <PageHeader locale={locale} title={p.title} intro={p.intro} crumbs={[{ name: p.crumb, path: "/contact" }]} />
      <Container className="grid gap-8 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-7">
          <Bezel coreClassName="p-6 sm:p-10">
            <LeadForm />
          </Bezel>
        </div>
        <aside className="space-y-5 lg:col-span-5" aria-label={p.asideLabel}>
          <CoordinatesCard locale={locale} />
          <ServiceAreasCard locale={locale} />
          <TestimonialsCard locale={locale} />
        </aside>
      </Container>
      <Closing locale={locale} cta={false} />
    </>
  );
}
