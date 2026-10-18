import { Camera, CalendarCheck, MapPin, ShieldCheck } from "@phosphor-icons/react/ssr";
import { Container, PageHeader } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { ProjectGallery, type GalleryProject } from "@/components/sections/ProjectGallery";
import { Closing } from "@/components/sections/Closing";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { projects, testimonials } from "@/content/projects";
import { getDict } from "@/i18n/dictionaries";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const icons = [Camera, CalendarCheck, MapPin, ShieldCheck];

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).pages.projects;
  return pageMetadata({ locale, title: p.metaTitle, description: p.metaDescription, path: "/realisations" });
}

export default async function ProjectsPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const { pages, site } = getDict(locale);
  const p = pages.projects;
  const verified = testimonials.filter((t) => t.consentOnFile);

  const gallery: GalleryProject[] = projects.map((x) => ({
    slug: x.slug,
    type: x.type,
    completedOn: x.completedOn,
    title: x.title[locale],
    location: x.location[locale],
    product: x.product,
    roofCondition: x.roofCondition[locale],
    description: x.description[locale],
    before: { src: x.before.src, alt: x.before.alt[locale] },
    after: { src: x.after.src, alt: x.after.alt[locale] },
  }));

  return (
    <>
      <PageHeader
        locale={locale}
        title={p.title}
        intro={p.intro}
        crumbs={[{ name: getDict(locale).ui.nav.items[3].label, path: "/realisations" }]}
      />
      {/* GoNano figures at the very top, as requested (no rating) */}
      <StatsStrip locale={locale} showSource={false} className="pt-12" />

      <Container className="py-20">
        {gallery.length > 0 ? (
          <ProjectGallery projects={gallery} />
        ) : (
          <Bezel coreClassName="p-8 sm:p-14">
            <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">{p.emptyTitle}</h2>
            <p className="mt-5 max-w-2xl text-lg text-muted">{p.emptyText}</p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {p.standards.map((s, i) => {
                const Icon = icons[i];
                return (
                  <li key={s.title}>
                    <Icon size={30} weight="light" className="text-accent" aria-hidden />
                    <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                    <p className="mt-1 text-[15px] text-muted">{s.text}</p>
                  </li>
                );
              })}
            </ul>
          </Bezel>
        )}

        {verified.length > 0 && (
          <section className="mt-20" aria-labelledby="temoignages">
            <h2 id="temoignages" className="text-3xl font-bold">
              {site.testimonials.title}
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
      <Closing locale={locale} />
    </>
  );
}
