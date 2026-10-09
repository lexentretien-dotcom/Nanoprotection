import { Camera, CalendarCheck, MapPin, ShieldCheck } from "@phosphor-icons/react/ssr";
import { Container, PageHeader } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { projects, testimonials } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Nos réalisations: avant et après",
  description:
    "Projets de préservation de toiture avec photos datées avant et après. Seuls de vrais projets sont publiés.",
  path: "/realisations",
});

const standards = [
  { icon: Camera, title: "Photos originales", text: "Prises sur le chantier, jamais empruntées ni générées." },
  { icon: CalendarCheck, title: "Datées", text: "La date des photos correspond à celle des travaux." },
  { icon: MapPin, title: "Localisées", text: "Le secteur est indiqué, sans adresse précise." },
  { icon: ShieldCheck, title: "Avec permission", text: "Chaque projet est publié avec l'accord du propriétaire." },
];

export default function RealisationsPage() {
  const verified = testimonials.filter((t) => t.consentOnFile);
  return (
    <>
      <PageHeader
        title="Nos réalisations."
        intro="Nous publions seulement de vrais projets, comparés avant et après."
        crumbs={[{ name: "Nos réalisations", path: "/realisations" }]}
      />
      <Container className="py-20">
        {projects.length > 0 ? (
          <ProjectGallery projects={projects} />
        ) : (
          <div>
            <Bezel coreClassName="p-8 sm:p-14">
              <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">
                La galerie arrive avec nos premiers projets documentés.
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-muted">
                Plutôt que d&apos;afficher des exemples inventés, nous attendons de vrais chantiers,
                photographiés avant et après. Chaque fiche présentera:
              </p>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {standards.map((s) => (
                  <li key={s.title}>
                    <s.icon size={30} weight="light" className="text-accent" aria-hidden />
                    <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                    <p className="mt-1 text-[15px] text-muted">{s.text}</p>
                  </li>
                ))}
              </ul>
            </Bezel>
          </div>
        )}

        {verified.length > 0 && (
          <section className="mt-20" aria-labelledby="temoignages">
            <h2 id="temoignages" className="text-3xl font-bold">
              Ce que disent nos clients
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {verified.map((t) => (
                <li key={t.name + t.date}>
                  <Bezel coreClassName="p-7">
                    <blockquote className="text-lg">&laquo;&nbsp;{t.text}&nbsp;&raquo;</blockquote>
                    <p className="mt-4 text-sm text-muted">
                      {t.name}, {t.location}
                    </p>
                  </Bezel>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
      <CtaBand />
    </>
  );
}
