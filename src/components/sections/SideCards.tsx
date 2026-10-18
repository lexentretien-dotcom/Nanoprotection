import { Check, Clock, Envelope, Phone, Star } from "@phosphor-icons/react/ssr";
import { Bezel } from "@/components/ui/Bezel";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { business } from "@/config/business";
import { testimonials } from "@/content/projects";
import { fmt, getDict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b-2 border-accent pb-3 font-display text-xs font-bold uppercase tracking-[0.14em] text-ink">
      {children}
    </h2>
  );
}

/** Phone, email and opening hours. */
export function CoordinatesCard({ locale }: { locale: Locale }) {
  const c = getDict(locale).site.coordinates;
  const hours = getDict(locale).site.hoursText;
  return (
    <Bezel as="section" coreClassName="p-6">
      <CardTitle>{c.title}</CardTitle>
      <ul className="mt-6 space-y-4">
        <li className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent-strong">
            <Phone size={20} weight="light" aria-hidden />
          </span>
          <div>
            <p className="text-xs text-muted">{c.phone}</p>
            <TrackedLink
              href={`tel:${business.phone.href}`}
              event="phone_click"
              className="inline-flex min-h-6 text-[15px] font-semibold text-accent-strong underline-offset-4 hover:underline"
            >
              {business.phone.display}
            </TrackedLink>
          </div>
        </li>
        <li className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent-strong">
            <Envelope size={20} weight="light" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-xs text-muted">{c.email}</p>
            <TrackedLink
              href={`mailto:${business.email.value}`}
              event="email_click"
              className="inline-block min-h-6 text-[15px] font-semibold text-accent-strong underline-offset-4 hover:underline"
            >
              {business.email.value.split("@")[0]}@<wbr />
              {business.email.value.split("@")[1]}
            </TrackedLink>
          </div>
        </li>
        <li className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent-strong">
            <Clock size={20} weight="light" aria-hidden />
          </span>
          <div>
            <p className="text-xs text-muted">{c.hours}</p>
            <p className="text-[15px] font-semibold text-accent-strong">{hours}</p>
          </div>
        </li>
      </ul>
    </Bezel>
  );
}

export function ServiceAreasCard({ locale }: { locale: Locale }) {
  const { regionsTitle, regionsIntro, regions } = getDict(locale).site;
  return (
    <Bezel as="section" coreClassName="p-6">
      <CardTitle>{regionsTitle}</CardTitle>
      <p className="mt-5 text-[15px] text-muted">{regionsIntro}</p>
      <ul className="mt-3 space-y-2">
        {regions.map((r) => (
          <li key={r.slug} className="flex items-center gap-3 text-[15px] font-medium text-ink">
            <Check size={18} weight="bold" className="shrink-0 text-accent" aria-hidden />
            {r.name}
          </li>
        ))}
      </ul>
    </Bezel>
  );
}

/**
 * Real customer comments only. In production the card is hidden until there
 * is at least one verified comment; on the preview site it shows how it will look.
 */
export function TestimonialsCard({ locale }: { locale: Locale }) {
  const t = getDict(locale).site.testimonials;
  const verified = testimonials.filter((x) => x.consentOnFile);

  if (verified.length === 0) {
    if (business.indexable) return null;
    return (
      <Bezel as="section" coreClassName="p-6">
        <CardTitle>{t.title}</CardTitle>
        <p className="mt-5 rounded-2xl border border-dashed border-ink/25 p-4 text-sm text-muted">
          {t.stagingEmpty}
        </p>
      </Bezel>
    );
  }

  return (
    <Bezel as="section" coreClassName="p-6">
      <CardTitle>{t.title}</CardTitle>
      <ul className="mt-6 space-y-3">
        {verified.slice(0, 3).map((x) => (
          <li key={x.name + x.date} className="rounded-2xl border-l-[3px] border-accent bg-paper p-4">
            {x.rating && (
              <p className="flex gap-0.5 text-amber-500" role="img" aria-label={fmt(t.ratingLabel, { n: x.rating })}>
                {Array.from({ length: x.rating }).map((_, i) => (
                  <Star key={i} size={14} weight="fill" aria-hidden />
                ))}
              </p>
            )}
            <blockquote className="mt-2 text-[15px] text-ink-soft">&laquo;&nbsp;{x.text}&nbsp;&raquo;</blockquote>
            <p className="mt-2 text-sm font-semibold text-ink">
              {x.name}, {x.location}
            </p>
          </li>
        ))}
      </ul>
    </Bezel>
  );
}
