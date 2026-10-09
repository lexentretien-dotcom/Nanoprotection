import { LegalPage } from "@/components/ui/Legal";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Conditions d'utilisation",
  description: "Conditions d'utilisation du site de Les Experts Nano Protection Toitures.",
  path: "/conditions-utilisation",
});

export default function ConditionsPage() {
  return (
    <LegalPage title="Conditions d'utilisation" path="/conditions-utilisation" updated="9 octobre 2026">
      <section>
        <h2>Information générale</h2>
        <p>
          Le contenu de ce site est fourni à titre informatif. Il ne remplace pas une inspection sur
          place, un avis professionnel ni une soumission écrite.
        </p>
      </section>
      <section>
        <h2>Estimations et outils</h2>
        <p>
          L&apos;outil d&apos;évaluation donne une orientation seulement. Il ne pose aucun diagnostic et ne
          constitue pas une soumission. Seule une soumission écrite, remise après inspection, nous
          engage.
        </p>
      </section>
      <section>
        <h2>Garanties</h2>
        <p>
          Toute garantie est soumise à des conditions précises, remises par écrit avant les travaux.
          Rien sur ce site ne constitue une garantie.
        </p>
      </section>
      <section>
        <h2>Marques</h2>
        <p>
          GoNano et les noms de produits associés appartiennent à leurs propriétaires respectifs.
          {" "}{business.legalName} est applicateur de ces produits et n&apos;en est pas le fabricant.
        </p>
      </section>
      <section>
        <h2>Droit applicable</h2>
        <p>Ces conditions sont régies par les lois du Québec et les lois fédérales du Canada qui s&apos;y appliquent.</p>
      </section>
    </LegalPage>
  );
}
