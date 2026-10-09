import { Container, PageHeader, Section, SectionTitle } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "À propos",
  description:
    "Qui nous sommes, comment nous décidons si une toiture doit être préservée, réparée ou remplacée, et pourquoi nous le disons franchement.",
  path: "/a-propos",
});

const principles = [
  {
    title: "Un avis avant une vente",
    text: "Nous examinons d'abord. La recommandation vient ensuite, par écrit, et elle peut être de ne rien traiter.",
  },
  {
    title: "Les limites sont dites",
    text: "La préservation ne convient pas à toutes les toitures. Nous expliquons pourquoi, et ce qui serait préférable.",
  },
  {
    title: "Des promesses qu'on peut tenir",
    text: "Pas de durée garantie sans connaître votre toiture, pas d'économies chiffrées sans les conditions qui vont avec.",
  },
];

export default function AboutPage() {
  const staging = !business.indexable;
  return (
    <>
      <PageHeader
        title="Une approche d'abord honnête."
        intro="Nous aidons les propriétaires du Québec à décider quoi faire de leur toiture, avant de leur proposer quoi que ce soit."
        crumbs={[{ name: "À propos", path: "/a-propos" }]}
      />

      <Section>
        <Reveal>
          <SectionTitle title="Comment nous travaillons." />
        </Reveal>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 80} className="h-full">
                <Bezel className="h-full" coreClassName="p-8">
                  <h3 className="text-2xl font-bold">{p.title}</h3>
                  <p className="mt-3 text-muted">{p.text}</p>
                </Bezel>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Container className="pb-20 sm:pb-28">
        <Bezel coreClassName="p-8 sm:p-12">
          <h2 className="text-3xl font-bold">Renseignements sur l&apos;entreprise</h2>
          <dl className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-muted">Raison sociale</dt>
              <dd className="mt-1">{business.legalName}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Relation avec GoNano</dt>
              <dd className="mt-1">
                Applicateur de produits GoNano
                {staging && business.goNanoRelationship.verify && (
                  <span className="ml-2 rounded-full bg-accent-tint px-2 py-0.5 text-xs font-semibold text-accent-strong">à confirmer</span>
                )}
              </dd>
            </div>
            {(staging || !business.rbq.verify) && (
              <div>
                <dt className="text-sm font-semibold text-muted">Licence RBQ</dt>
                <dd className="mt-1">
                  {business.rbq.number}
                  {business.rbq.verify && (
                    <span className="ml-2 rounded-full bg-accent-tint px-2 py-0.5 text-xs font-semibold text-accent-strong">à confirmer</span>
                  )}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-semibold text-muted">Régions desservies</dt>
              <dd className="mt-1">{business.regions.filter((r) => r.enabled).map((r) => r.name).join(", ")}</dd>
            </div>
          </dl>
        </Bezel>
      </Container>
      <CtaBand />
    </>
  );
}
