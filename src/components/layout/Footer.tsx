import Image from "next/image";
import Link from "next/link";
import { FacebookLogo, FilePdf, GoogleLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/ssr";
import { Brand } from "./Brand";
import { buttonClasses } from "@/components/ui/Button";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { business } from "@/config/business";
import { fmt, getDict } from "@/i18n/dictionaries";
import { localePath, type Locale } from "@/i18n/config";

const socialIcons = {
  facebook: FacebookLogo,
  google: GoogleLogo,
  instagram: InstagramLogo,
  linkedin: LinkedinLogo,
} as const;

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const { site, ui, content } = dict;
  const f = site.footer;
  const staging = !business.indexable;
  const showRbqNumber = staging || !business.rbq.verify;

  // Production shows only the profiles that have a URL; the preview shows dimmed placeholders.
  const socials = (Object.keys(socialIcons) as (keyof typeof socialIcons)[])
    .map((key) => ({ key, url: business.socials[key] }))
    .filter((s) => s.url || staging);

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

            {socials.length > 0 && (
              <div className="mt-6">
                <p className="sr-only">{f.followUs}</p>
                <ul className="flex gap-2">
                  {socials.map(({ key, url }) => {
                    const Icon = socialIcons[key];
                    const label = f.socials[key];
                    return (
                      <li key={key}>
                        {url ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer me"
                            aria-label={label}
                            className="flex h-11 w-11 items-center justify-center rounded-full text-white/80 ring-1 ring-white/20 transition-[color,box-shadow,transform] duration-300 hover:text-white hover:ring-white/60 active:scale-95 active:duration-75"
                          >
                            <Icon size={20} weight="regular" aria-hidden />
                          </a>
                        ) : (
                          <span
                            title={`${label}: ${f.socialPlaceholder}`}
                            aria-label={`${label}: ${f.socialPlaceholder}`}
                            role="img"
                            className="flex h-11 w-11 items-center justify-center rounded-full text-white/30 ring-1 ring-dashed ring-white/15"
                          >
                            <Icon size={20} weight="regular" aria-hidden />
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
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

        {/* Licence and certifications: clear logos on the dark footer, warranty button on the right */}
        <div className="mt-14 border-t border-white/10 pt-10">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
            {f.certifications}
          </h2>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <ul className="flex flex-wrap items-end gap-x-10 gap-y-6">
              <Cert caption={f.certs.gonano}>
                <Image
                  src={business.assets.goNanoLogoLight}
                  alt={f.certAlt.gonano}
                  width={168}
                  height={48}
                  className="h-12 w-auto"
                />
              </Cert>
              <Cert caption={f.certs.contractor}>
                <span
                  role="img"
                  aria-label={f.certAlt.contractor}
                  className="flex h-12 items-center rounded-xl border border-white/30 px-4 font-display text-[11px] font-extrabold uppercase leading-[1.15] tracking-[0.1em] text-white"
                >
                  <span>
                    {f.reseller[0]}
                    <br />
                    {f.reseller[1]}
                  </span>
                </span>
              </Cert>
              <Cert
                caption={
                  showRbqNumber
                    ? `${f.certs.rbq} ${business.rbq.number}${business.rbq.verify ? ` (${f.toConfirm})` : ""}`
                    : f.certs.rbq
                }
              >
                <Image
                  src={business.assets.rbqLogoLight}
                  alt={f.certAlt.rbq}
                  width={122}
                  height={48}
                  className="h-12 w-auto"
                />
              </Cert>
            </ul>
            <a
              href={business.assets.warrantyPdf[locale]}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("primary", "self-start lg:self-end")}
            >
              <FilePdf size={20} weight="light" aria-hidden />
              {f.officialWarranty}
            </a>
          </div>
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
      </div>
    </footer>
  );
}

/** Logos sit directly on the footer (no white tile), with a small caption underneath. */
function Cert({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <li className="flex flex-col gap-3">
      <span className="flex h-12 items-center">{children}</span>
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
