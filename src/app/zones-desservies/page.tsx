import { Container, PageHeader } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Zones desservies",
  description:
    "Régions du Québec où nous effectuons des inspections et des traitements de toiture. Vérifiez si votre secteur est desservi.",
  path: "/zones-desservies",
});

export default function ZonesPage() {
  const regions = business.regions.filter((r) => r.enabled);
  return (
    <>
      <PageHeader
        title="Zones desservies."
        intro="Nous nous déplaçons dans les secteurs ci-dessous. Si le vôtre n'y est pas, demandez-nous: nous répondrons honnêtement."
        crumbs={[{ name: "Zones desservies", path: "/zones-desservies" }]}
      />
      <Container className="py-20">
        <ul className="grid gap-5 md:grid-cols-3">
          {regions.map((r, i) => (
            <li key={r.slug}>
              <Reveal delay={i * 80} className="h-full">
                <Bezel className="h-full" coreClassName="p-8">
                  <h2 className="text-2xl font-bold">{r.name}</h2>
                  <p className="mt-3 text-muted">{r.detail}</p>
                </Bezel>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-muted">
          Nous ne publions une page locale que lorsqu&apos;elle apporte de l&apos;information propre à
          la région. Les territoires listés ici sont à confirmer par l&apos;entreprise avant la mise
          en ligne.
        </p>
      </Container>
      <CtaBand />
    </>
  );
}
