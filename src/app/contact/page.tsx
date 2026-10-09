import { Envelope, Phone, MapPin, Clock } from "@phosphor-icons/react/ssr";
import { Container, PageHeader } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { LeadForm } from "@/components/forms/LeadForm";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact et demande de soumission",
  description:
    "Demandez votre évaluation gratuite de toiture. Réponse par téléphone ou par courriel, selon votre préférence.",
  path: "/contact",
});

export default function ContactPage() {
  const regions = business.regions.filter((r) => r.enabled);
  return (
    <>
      <PageHeader
        title="Parler à un expert."
        intro="Décrivez votre toiture en quelques lignes. Nous vous revenons avec les prochaines étapes."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />
      <Container className="grid gap-8 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-7">
          <Bezel coreClassName="p-6 sm:p-10">
            <LeadForm />
          </Bezel>
        </div>
        <aside className="space-y-5 lg:col-span-5" aria-label="Coordonnées">
          <Bezel coreClassName="space-y-6 p-8">
            <div className="flex gap-4">
              <Phone size={26} weight="light" className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <div>
                <h2 className="text-lg font-bold">Téléphone</h2>
                <TrackedLink
                  href={`tel:${business.phone.href}`}
                  event="phone_click"
                  className="text-xl font-semibold underline-offset-4 hover:underline"
                >
                  {business.phone.display}
                </TrackedLink>
              </div>
            </div>
            <div className="flex gap-4">
              <Envelope size={26} weight="light" className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <div>
                <h2 className="text-lg font-bold">Courriel</h2>
                <TrackedLink
                  href={`mailto:${business.email.value}`}
                  event="email_click"
                  className="break-all underline-offset-4 hover:underline"
                >
                  {business.email.value}
                </TrackedLink>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock size={26} weight="light" className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <div>
                <h2 className="text-lg font-bold">Heures</h2>
                <p className="text-muted">{business.hours}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin size={26} weight="light" className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <div>
                <h2 className="text-lg font-bold">Régions desservies</h2>
                <p className="text-muted">{regions.map((r) => r.name).join(", ")}</p>
              </div>
            </div>
          </Bezel>
        </aside>
      </Container>
    </>
  );
}
