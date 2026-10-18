import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Page";
import { HomeBody } from "@/components/sections/HomeBody";
import { business } from "@/config/business";
import { getDict } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).pages.home;
  return pageMetadata({
    locale,
    title: p.metaTitle,
    description: p.metaDescription,
    path: "/",
    absoluteTitle: true,
  });
}

/** Drop a real photo at public/photos/hero-home.jpg and it is used automatically. */
const heroPhoto = existsSync(path.join(process.cwd(), "public/photos/hero-home.jpg"))
  ? "/photos/hero-home.jpg"
  : null;

export default async function HomePage({ params }: Props) {
  const locale = await resolveLocale(params);
  const { pages, ui } = getDict(locale);
  const h = pages.home;
  const L = (p: string) => localePath(locale, p);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Container className="grid min-h-[min(46rem,calc(100dvh-72px))] items-center gap-12 py-14 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-7">
            <h1 className="text-[2.6rem] font-extrabold sm:text-6xl lg:text-[4.25rem]">{h.h1}</h1>
            <p className="mt-7 max-w-xl text-lg text-muted sm:text-xl">{h.sub}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={L(business.ctaPath)}>{ui.cta.primary}</ButtonLink>
              <ButtonLink href="#processus" variant="secondary" arrow={false}>
                {h.how}
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[2rem] bg-ink/[0.05] p-1.5 ring-1 ring-ink/[0.08]">
              <div className="shingles relative flex aspect-[4/5] items-end overflow-hidden rounded-[calc(2rem-0.375rem)] p-4 sm:aspect-[5/6] sm:p-6">
                {heroPhoto && (
                  <Image
                    src={heroPhoto}
                    alt={h.photoAlt}
                    fill
                    priority
                    sizes="(min-width:1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                )}
                <div className="material relative w-full rounded-[1.5rem] bg-surface/95 p-6 shadow-[var(--shadow-soft)]">
                  <p className="font-display text-xl font-bold leading-tight">{h.card.title}</p>
                  <p className="mt-2 text-[15px] text-muted">{h.card.text}</p>
                  <Link
                    href={L(business.ctaPath)}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    {h.card.link}
                    <ArrowRight size={16} weight="light" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <HomeBody locale={locale} />
    </>
  );
}
