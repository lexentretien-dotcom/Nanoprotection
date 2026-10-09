import { LegalPage } from "@/components/ui/Legal";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Comment nous recueillons, utilisons et protégeons vos renseignements personnels.",
  path: "/confidentialite",
});

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité" path="/confidentialite" updated="9 octobre 2026">
      <section>
        <h2>Qui est responsable</h2>
        <p>
          {business.legalName} est responsable des renseignements personnels recueillis par ce site.
          Personne responsable de la protection des renseignements personnels: <strong>à désigner</strong>.
          Pour toute demande (accès, rectification, retrait du consentement), écrivez à{" "}
          {business.email.value}.
        </p>
      </section>
      <section>
        <h2>Renseignements recueillis</h2>
        <ul>
          <li>Nom, courriel, téléphone, code postal et ville.</li>
          <li>Renseignements sur votre toiture que vous choisissez de fournir.</li>
          <li>Votre message et votre mode de contact préféré.</li>
          <li>Source de la visite (par exemple une campagne), pour savoir ce qui fonctionne.</li>
        </ul>
      </section>
      <section>
        <h2>Pourquoi nous les utilisons</h2>
        <p>
          Pour répondre à votre demande, planifier une inspection et vous remettre une soumission. Nous
          ne vous inscrivons pas à des communications promotionnelles sans votre consentement exprès,
          que vous pouvez retirer en tout temps.
        </p>
      </section>
      <section>
        <h2>Partage avec des tiers</h2>
        <p>
          Vos renseignements sont transmis à notre outil de gestion de la relation client (GoHighLevel)
          afin de traiter votre demande. Si vous acceptez les témoins de mesure, des données d&apos;usage
          anonymisées peuvent être traitées par Google Analytics. Ces fournisseurs peuvent stocker des
          données à l&apos;extérieur du Québec. Nous ne vendons pas vos renseignements.
        </p>
      </section>
      <section>
        <h2>Conservation et sécurité</h2>
        <p>
          Nous conservons vos renseignements le temps nécessaire pour traiter votre demande et nos
          obligations légales. La durée précise est à confirmer. Les échanges avec le site sont chiffrés
          (HTTPS).
        </p>
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander l&apos;accès à vos renseignements, leur correction ou leur suppression, et
          retirer votre consentement. Vous pouvez aussi déposer une plainte auprès de la Commission
          d&apos;accès à l&apos;information du Québec.
        </p>
      </section>
    </LegalPage>
  );
}
