import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/Page";
import { HomeBody } from "@/components/sections/HomeBody";
import { QuoteWidget } from "@/components/widget/QuoteWidget";
import { getDict } from "@/i18n/dictionaries";
import { resolveLocale } from "@/i18n/server";

/**
 * Hidden variation of the home page for testing: same content, with the quote
 * request turned into an interactive widget inside the hero.
 *
 *  - Not linked anywhere, not in the sitemap, noindex (meta tag and header).
 *  - French only, as requested.
 */
type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: { absolute: "Obtenez votre bilan de toiture gratuit | Les Experts Nano Protection Toitures" },
  robots: { index: false, follow: false, nocache: true },
};

export function generateStaticParams() {
  return [{ locale: "fr" }];
}
export const dynamicParams = false;

export default async function LandingVariantPage({ params }: Props) {
  const locale = await resolveLocale(params);
  if (locale !== "fr") notFound();
  const { pages, ui } = getDict(locale);
  const h = pages.home;

  return (
    <>
      <section className="relative overflow-hidden">
        <Container className="grid min-h-[min(46rem,calc(100dvh-72px))] items-center gap-10 py-12 lg:grid-cols-12 lg:gap-14 lg:py-16">
          <div className="lg:col-span-6">
            <h1 className="text-[2.4rem] font-extrabold sm:text-6xl lg:text-[3.9rem]">{h.h1}</h1>
            <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">{h.sub}</p>
            <ul className="mt-7 space-y-2.5 text-[15px] font-medium text-ink-soft">
              {["Inspection gratuite, sans engagement", "Un avis honnête: préserver, réparer ou remplacer", ui.reassurance].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check size={20} weight="bold" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <QuoteWidget />
          </div>
        </Container>
      </section>

      <HomeBody locale={locale} />
    </>
  );
}
