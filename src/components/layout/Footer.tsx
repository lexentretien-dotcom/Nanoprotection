import Link from "next/link";
import { Brand } from "./Brand";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { business } from "@/config/business";
import { publishedServices } from "@/content/services";

export function Footer() {
  const staging = !business.indexable;
  const showRbq = staging || !business.rbq.verify;
  const regions = business.regions.filter((r) => r.enabled);

  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Brand inverted />
            <p className="mt-6 max-w-sm text-[15px] text-white/70">
              Préservation et protection de toitures en bardeaux d&apos;asphalte, avec les
              traitements GoNano. Un avis honnête, d&apos;abord.
            </p>
            <div className="mt-6 space-y-1 text-[15px]">
              <TrackedLink
                href={`tel:${business.phone.href}`}
                event="phone_click"
                className="block font-semibold text-white underline-offset-4 hover:underline"
              >
                {business.phone.display}
              </TrackedLink>
              <TrackedLink
                href={`mailto:${business.email.value}`}
                event="email_click"
                className="block text-white/80 underline-offset-4 hover:underline"
              >
                {business.email.value}
              </TrackedLink>
              <p className="text-white/60">{business.hours}</p>
            </div>
          </div>

          <FooterCol
            title="Traitements"
            links={[
              ...publishedServices.map((s) => ({
                href: `/nos-traitements/${s.slug}`,
                label: s.name,
              })),
              { href: "/nos-produits", label: "Produits GoNano" },
              { href: "/technologie-gonano", label: "Technologie" },
            ]}
            className="lg:col-span-3"
          />
          <FooterCol
            title="Ressources"
            links={[
              { href: "/conseils", label: "Conseils" },
              { href: "/faq", label: "Questions fréquentes" },
              { href: "/realisations", label: "Réalisations" },
              { href: "/zones-desservies", label: "Zones desservies" },
              { href: "/a-propos", label: "À propos" },
              { href: "/contact", label: "Contact" },
            ]}
            className="lg:col-span-2"
          />
          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/60">
              Régions
            </h2>
            <ul className="mt-4 space-y-2 text-[15px] text-white/80">
              {regions.map((r) => (
                <li key={r.slug}>{r.name}</li>
              ))}
            </ul>
            {showRbq && (
              <p className="mt-6 text-sm text-white/60">
                Licence RBQ {business.rbq.number}
                {business.rbq.verify && (
                  <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs text-white">
                    à confirmer
                  </span>
                )}
              </p>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {business.legalName}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/confidentialite" className="hover:text-white">
                Confidentialité
              </Link>
            </li>
            <li>
              <Link href="/conditions-utilisation" className="hover:text-white">
                Conditions d&apos;utilisation
              </Link>
            </li>
            <li>
              <Link href="/temoins" className="hover:text-white">
                Témoins
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales" className="hover:text-white">
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-white/45">
          GoNano est une marque de son propriétaire. Nous sommes applicateurs de ces produits et
          n&apos;en sommes pas le fabricant. Les renseignements sur ce site sont de nature
          générale et ne remplacent pas une inspection sur place.
        </p>
      </div>
    </footer>
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
      <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/60">
        {title}
      </h2>
      <ul className="mt-4 space-y-2 text-[15px]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-white/80 hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
