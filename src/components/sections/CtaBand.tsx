import { ButtonLink, Reassurance } from "@/components/ui/Button";
import { Container } from "@/components/ui/Page";
import { business } from "@/config/business";
import { getDict } from "@/i18n/dictionaries";
import { localePath, type Locale } from "@/i18n/config";

export function CtaBand({
  locale,
  title,
  text,
}: {
  locale: Locale;
  title?: string;
  text?: string;
}) {
  const { site, ui } = getDict(locale);
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="rounded-[2rem] bg-ink p-1.5 ring-1 ring-ink">
          <div className="shingles relative overflow-hidden rounded-[calc(2rem-0.375rem)] px-6 py-14 sm:px-14 sm:py-20">
            <div className="relative max-w-2xl">
              <h2 className="text-3xl font-bold !text-white sm:text-5xl">{title ?? site.ctaBand.title}</h2>
              <p className="mt-5 text-lg text-white/80">{text ?? site.ctaBand.text}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={localePath(locale, business.ctaPath)}>{ui.cta.primary}</ButtonLink>
                <ButtonLink
                  href={localePath(locale, "/contact")}
                  variant="secondary"
                  className="!bg-white/10 !text-white !ring-white/25 hover:!ring-white/60"
                >
                  {ui.cta.expert}
                </ButtonLink>
              </div>
              <Reassurance text={ui.reassurance} tone="dark" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
