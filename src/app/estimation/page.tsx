import { Container, Breadcrumbs } from "@/components/ui/Page";
import { Assessment } from "@/components/forms/Assessment";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Évaluation de toiture gratuite",
  description:
    "Répondez à sept questions pour savoir si la préservation pourrait convenir à votre toiture, puis demandez une inspection gratuite.",
  path: "/estimation",
});

export default function EstimationPage() {
  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ name: "Évaluation de toiture", path: "/estimation" }]} />
      <div className="mt-6 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Ma toiture peut-elle être préservée?</h1>
          <p className="mt-6 text-lg text-muted">
            Sept questions et un résultat honnête. Cet outil donne une orientation, pas un
            diagnostic: seule une inspection sur place confirme l&apos;état de votre toiture.
          </p>
          <ul className="mt-8 space-y-3 text-[15px] text-muted">
            <li>Environ deux minutes.</li>
            <li>Vos réponses restent dans votre navigateur jusqu&apos;à l&apos;envoi.</li>
            <li>Aucun prix inventé: la soumission est écrite, après inspection.</li>
          </ul>
        </div>
        <div className="lg:col-span-8">
          <Assessment />
        </div>
      </div>
    </Container>
  );
}
