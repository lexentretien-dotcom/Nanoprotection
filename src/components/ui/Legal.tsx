import { Breadcrumbs, Container } from "./Page";
import { business } from "@/config/business";
import { fmt, getDict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Section = { heading: string; paragraphs?: string[]; list?: string[] };

/**
 * Shared layout for legal pages. The text of these pages is a working draft
 * and must be reviewed by a qualified professional before publication.
 */
export function LegalPage({
  locale,
  title,
  path,
  sections,
  vars,
}: {
  locale: Locale;
  title: string;
  path: string;
  sections: Section[];
  vars: Record<string, string>;
}) {
  const legal = getDict(locale).legal;
  const all = { legalName: business.legalName, email: business.email.value, phone: business.phone.display, ...vars };
  return (
    <Container narrow className="py-12 sm:py-16">
      <Breadcrumbs locale={locale} items={[{ name: title, path }]} />
      <h1 className="mt-8 text-4xl font-extrabold sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-muted">{fmt(legal.updatedLabel, { date: legal.updated })}</p>
      <div className="mt-6 rounded-2xl bg-accent-tint p-4 text-[15px] text-ink ring-1 ring-accent/20">
        {legal.draftNotice}
      </div>
      <div className="mt-10 space-y-8 text-[17px] leading-relaxed text-ink-soft">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="mb-3 text-2xl font-bold text-ink">{s.heading}</h2>
            {s.paragraphs?.map((p) => (
              <p key={p} className="mb-3">
                {fmt(p, all)}
              </p>
            ))}
            {s.list && (
              <ul className="list-disc space-y-1 pl-5">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </Container>
  );
}
