import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/Page";
import { Reveal } from "@/components/ui/Reveal";
import { getDict } from "@/i18n/dictionaries";
import { localePath, type Locale } from "@/i18n/config";

/**
 * Three headline figures supplied by GoNano. No rating, no invented numbers.
 * The source line says whose data it is.
 */
export function StatsStrip({
  locale,
  className = "",
  link = false,
}: {
  locale: Locale;
  className?: string;
  /** Show a link to the warranty details (used on the Realisations page). */
  link?: boolean;
}) {
  const { stats } = getDict(locale).site;
  return (
    <Container className={className}>
      <div className="rounded-[2rem] bg-ink/[0.04] p-1.5 ring-1 ring-ink/[0.07]">
        <div className="rounded-[calc(2rem-0.375rem)] bg-surface px-6 py-10 sm:px-12 sm:py-12">
          <dl className="grid gap-10 sm:grid-cols-3 sm:items-end sm:gap-6">
            {stats.items.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                {/* Label first in the markup (screen readers), number shown above it. */}
                <div className="flex flex-col-reverse sm:border-l sm:border-ink/10 sm:pl-8 sm:first:border-0 sm:first:pl-0">
                  <dt className="mt-2 text-[15px] text-muted">{s.label}</dt>
                  <dd className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                    {s.prefix && (
                      <span className="block text-xs font-bold uppercase tracking-[0.14em] text-muted">
                        {s.prefix}
                      </span>
                    )}
                    <span className="text-accent-strong">{s.value}</span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
          <p className="mt-8 max-w-3xl text-sm text-muted">{stats.source}</p>
          {link && (
            <Link
              href={`${localePath(locale, "/nos-produits")}#garantie`}
              className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
            >
              {stats.warrantyLink}
              <ArrowRight size={16} weight="light" aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </Container>
  );
}
