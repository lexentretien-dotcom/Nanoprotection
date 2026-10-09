import { LegalPage } from "@/components/ui/Legal";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description: "Renseignements légaux et corporatifs de Les Experts Nano Protection Toitures.",
  path: "/mentions-legales",
});

export default function MentionsPage() {
  const staging = !business.indexable;
  return (
    <LegalPage title="Mentions légales" path="/mentions-legales" updated="9 octobre 2026">
      <section>
        <h2>Entreprise</h2>
        <p>
          {business.legalName}. Nom légal enregistré, numéro d&apos;entreprise du Québec (NEQ) et adresse
          de l&apos;établissement: <strong>à confirmer</strong>.
        </p>
      </section>
      {(staging || !business.rbq.verify) && (
        <section>
          <h2>Licence RBQ</h2>
          <p>
            Numéro {business.rbq.number}
            {business.rbq.verify && " (à confirmer avant la mise en ligne)"}.
          </p>
        </section>
      )}
      <section>
        <h2>Assurance</h2>
        <p>Renseignements sur l&apos;assurance responsabilité: <strong>à confirmer</strong>.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          {business.phone.display}, {business.email.value}
        </p>
      </section>
    </LegalPage>
  );
}
