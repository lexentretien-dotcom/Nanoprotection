import { LegalPage } from "@/components/ui/Legal";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Politique de témoins (cookies)",
  description: "Les témoins utilisés sur ce site et comment gérer vos préférences.",
  path: "/temoins",
});

export default function TemoinsPage() {
  return (
    <LegalPage title="Politique de témoins" path="/temoins" updated="9 octobre 2026">
      <section>
        <h2>Témoins essentiels</h2>
        <p>
          Le site mémorise localement votre choix de témoins et la progression de votre évaluation de
          toiture dans votre navigateur. Ces données restent sur votre appareil.
        </p>
      </section>
      <section>
        <h2>Témoins de mesure</h2>
        <p>
          {business.gaId || business.gtmId
            ? "Avec votre accord seulement, nous utilisons Google Analytics pour comprendre comment le site est utilisé. Rien n'est chargé avant que vous ayez accepté."
            : "Aucun outil de mesure n'est actuellement actif sur ce site."}
        </p>
      </section>
      <section>
        <h2>Contenu de tiers</h2>
        <p>
          Sur certains articles, un bouton officiel de Google peut vous permettre de nous ajouter à vos
          sources préférées. Il charge un script de Google lorsqu&apos;il est affiché.
        </p>
      </section>
      <section>
        <h2>Gérer votre choix</h2>
        <p>
          Vous pouvez effacer les données du site dans votre navigateur: la bannière de choix
          réapparaîtra à votre prochaine visite.
        </p>
      </section>
    </LegalPage>
  );
}
