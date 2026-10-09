import { Sun, Thermometer, Drop, Stack } from "@phosphor-icons/react/ssr";
import { Container, PageHeader, Section, SectionTitle } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "La technologie GoNano expliquée simplement",
  description:
    "Comment vieillit un bardeau d'asphalte, ce que visent les traitements GoNano et leurs limites. Une explication claire, sans exagération.",
  path: "/technologie-gonano",
});

const aging = [
  {
    icon: Sun,
    title: "Le soleil",
    text: "Les rayons ultraviolets dégradent peu à peu l'asphalte et les granules qui le protègent.",
  },
  {
    icon: Thermometer,
    title: "Le chaud et le froid",
    text: "Le bardeau se dilate et se contracte chaque jour et chaque saison, ce qui le fatigue.",
  },
  {
    icon: Drop,
    title: "L'eau et le gel",
    text: "L'eau entre dans les petites fissures, gèle et les agrandit. Le climat québécois est exigeant.",
  },
  {
    icon: Stack,
    title: "La perte de granules",
    text: "Quand les granules s'en vont, l'asphalte est exposé directement aux éléments.",
  },
];

export default function TechnologiePage() {
  return (
    <>
      <PageHeader
        title="La technologie GoNano, sans jargon."
        intro="Ce que visent ces traitements, ce qu'on sait, ce qu'on ne sait pas et ce qu'ils ne font pas."
        crumbs={[{ name: "Technologie GoNano", path: "/technologie-gonano" }]}
      />

      <Section>
        <Reveal>
          <SectionTitle
            title="Pourquoi un bardeau vieillit."
            intro="Quatre mécanismes agissent en même temps sur une toiture en bardeaux d'asphalte."
          />
        </Reveal>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aging.map((a, i) => (
            <li key={a.title}>
              <Reveal delay={i * 70} className="h-full">
                <Bezel className="h-full" coreClassName="p-7">
                  <a.icon size={32} weight="light" className="text-accent" aria-hidden />
                  <h3 className="mt-5 text-xl font-bold">{a.title}</h3>
                  <p className="mt-2 text-[15px] text-muted">{a.text}</p>
                </Bezel>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl">Qu&apos;est-ce qu&apos;un traitement à base de nanotechnologie?</h2>
            <div className="mt-6 space-y-4 text-lg text-muted">
              <p>
                Ce sont des formules appliquées en surface qui contiennent des particules de très
                petite taille, à l&apos;échelle du nanomètre. Le fabricant décrit leur rôle: aider à
                protéger le bardeau contre l&apos;eau et les rayons du soleil.
              </p>
              <p>
                Nous sommes applicateurs de ces produits, pas leur fabricant. Pour les données
                techniques précises, la documentation officielle de GoNano fait foi.
              </p>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="text-3xl font-bold sm:text-4xl">Préservation ou réparation?</h2>
            <div className="mt-6 space-y-4 text-lg text-muted">
              <p>
                <strong className="text-ink">La préservation</strong> agit sur des bardeaux encore
                sains pour ralentir l&apos;usure.
              </p>
              <p>
                <strong className="text-ink">La réparation</strong> corrige un défaut: un bardeau
                manquant, un solin brisé, une fuite. Un traitement de surface ne remplace jamais une
                réparation nécessaire.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Container className="py-20 sm:py-28">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <Bezel className="h-full" coreClassName="p-8 sm:p-10">
              <h2 className="text-2xl font-bold">Ce que le traitement ne fait pas</h2>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-muted marker:text-accent">
                <li>Il ne répare pas les fuites ni les solins endommagés.</li>
                <li>Il ne corrige pas un pontage abîmé.</li>
                <li>Il ne rend pas une toiture en fin de vie comme neuve.</li>
                <li>Il ne dispense pas d&apos;inspecter sa toiture périodiquement.</li>
              </ul>
            </Bezel>
          </Reveal>
          <Reveal delay={90}>
            <Bezel className="h-full" coreClassName="p-8 sm:p-10">
              <h2 className="text-2xl font-bold">Preuves et documentation</h2>
              <p className="mt-4 text-muted">
                Les résultats de tests cités par le fabricant sont des données du fabricant, pas des
                études indépendantes. Nous les présentons comme telles.
              </p>
              <p className="mt-4 text-muted">
                Les fiches techniques et les fiches de données de sécurité des produits utilisés sont
                remises sur demande avant tout travail.
              </p>
            </Bezel>
          </Reveal>
        </div>
      </Container>
      <CtaBand />
    </>
  );
}
