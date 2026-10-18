import Image from "next/image";
import Link from "next/link";
import { FilePdf } from "@phosphor-icons/react/ssr";
import { Brand } from "./Brand";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { business } from "@/config/business";
import { fmt, getDict } from "@/i18n/dictionaries";
import { localePath, type Locale } from "@/i18n/config";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const { site, ui, content } = dict;
  const f = site.footer;
  const staging = !business.indexable;
  const showRbqNumber = staging || !business.rbq.verify;

  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Brand locale={locale} nav={ui.nav} inverted />
            <p className="mt-6 max-w-sm text-[15px] text-white/75">{f.blurb}</p>
            <address className="mt-6 space-y-1 text-[15px] not-italic">
              <TrackedLink
                href={`tel:${business.phone.href}`}
                event="phone_click"
                className="block py-1 font-semibold text-white underline-offset-4 hover:underline"
              >
                {business.phone.display}
              </TrackedLink>
              <TrackedLink
                href={`mailto:${business.email.value}`}
                event="email_click"
                className="block break-all py-1 text-white/85 underline-offset-4 hover:underline"
              >
                {business.email.value}
              </TrackedLink>
              <p className="text-white/70">{site.hoursText}</p>
            </address>
          </div>

          <FooterCol
            title={f.treatments}
            links={[
              ...content.services.items.map((s) => ({
                href: localePath(locale, `/nos-traitements/${s.slug}`),
                label: s.name,
              })),
              { href: localePath(locale, "/nos-produits"), label: f.productsLink },
              { href: localePath(locale, "/technologie-gonano"), label: f.technologyLink },
            ]}
            className="lg:col-span-3"
          />
          <FooterCol
            title={f.resources}
            links={f.resourceLinks.map((l) => ({ href: localePath(locale, l.href), label: l.label }))}
            className="lg:col-span-2"
          />
          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
              {f.regions}
            </h2>
            <ul className="mt-4 space-y-2 text-[15px] text-white/85">
              {site.regions.map((r) => (
                <li key={r.slug}>{r.name}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Licence and certifications */}
        <div className="mt-14 border-t border-white/10 pt-10">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
            {f.certifications}
          </h2>
          <ul className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-6">
            <Cert caption={f.certs.gonano}>
              <Image
                src={business.assets.goNanoLogoDark}
                alt={f.certAlt.gonano}
                width={196}
                height={56}
                className="h-14 w-auto"
              />
            </Cert>
            <Cert caption={f.certs.contractor}>
              <Image
                src={business.assets.resellerBanner}
                alt={f.certAlt.contractor}
                width={224}
                height={56}
                className="h-14 w-auto"
              />
            </Cert>
            <Cert
              caption={
                showRbqNumber
                  ? `${f.certs.rbq} ${business.rbq.number}${business.rbq.verify ? ` (${f.toConfirm})` : ""}`
                  : f.certs.rbq
              }
            >
              <Image
                src={business.assets.rbqLogo}
                alt={f.certAlt.rbq}
                width={140}
                height={56}
                className="h-14 w-auto"
              />
            </Cert>
          </ul>
          <a
            href={business.assets.warrantyPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-[15px] font-semibold text-white underline-offset-4 hover:underline"
          >
            <FilePdf size={22} weight="light" aria-hidden />
            {f.officialWarranty}
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>{fmt(f.rights, { year: new Date().getFullYear() })}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {f.legal.map((l) => (
              <li key={l.href}>
                <Link
                  href={localePath(locale, l.href)}
                  className="inline-flex min-h-8 items-center hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-white/60">{f.disclaimer}</p>
      </div>
    </footer>
  );
}

/** Each badge sits on a white tile so logos with dark artwork stay legible on the dark footer. */
function Cert({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <li className="flex flex-col gap-2">
      <span className="flex items-center rounded-2xl bg-white p-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.6)]">
        {children}
      </span>
      <span className="max-w-[16rem] text-xs font-medium uppercase tracking-[0.08em] text-white/75">
        {caption}
      </span>
    </li>
  );
}

function FooterCol({
  title,
  links,
  className,
}: {
  title: string;
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <nav aria-label={title} className={className}>
      <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
        {title}
      </h2>
      <ul className="mt-4 space-y-1 text-[15px]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex min-h-9 items-center text-white/85 hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
