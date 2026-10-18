import { Container, Breadcrumbs } from "@/components/ui/Page";
import { Assessment } from "@/components/forms/Assessment";
import { CoordinatesCard, ServiceAreasCard, TestimonialsCard } from "@/components/sections/SideCards";
import { Closing } from "@/components/sections/Closing";
import { getDict } from "@/i18n/dictionaries";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).pages.assessment;
  return pageMetadata({ locale, title: p.metaTitle, description: p.metaDescription, path: "/estimation" });
}

export default async function AssessmentPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).pages.assessment;
  return (
    <>
      <Container className="py-12 sm:py-16">
        <Breadcrumbs locale={locale} items={[{ name: p.crumb, path: "/estimation" }]} />
        <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">{p.h1}</h1>
        {/* Survey and side cards start on the same line; the cards stack under the survey on mobile. */}
        <div className="mt-8 grid items-start gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Assessment />
          </div>
          <aside className="space-y-5 lg:col-span-4">
            <CoordinatesCard locale={locale} />
            <ServiceAreasCard locale={locale} />
            <TestimonialsCard locale={locale} />
          </aside>
        </div>
      </Container>
      <Closing locale={locale} cta={false} />
    </>
  );
}
