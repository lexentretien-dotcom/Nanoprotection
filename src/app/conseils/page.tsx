import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Container, PageHeader } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { CtaBand } from "@/components/sections/CtaBand";
import { articles } from "@/content/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Conseils et ressources sur la toiture",
  description:
    "Guides clairs sur la durée de vie des bardeaux d'asphalte, l'effet de l'hiver québécois et le choix entre préserver et remplacer.",
  path: "/conseils",
});

export default function ConseilsPage() {
  return (
    <>
      <PageHeader
        title="Conseils et ressources."
        intro="Des réponses concrètes pour comprendre votre toiture avant de décider."
        crumbs={[{ name: "Conseils", path: "/conseils" }]}
      />
      <Container className="py-20">
        <ul className="grid gap-5 md:grid-cols-2">
          {articles.map((a) => (
            <li key={a.slug}>
              <Bezel className="h-full" coreClassName="flex h-full flex-col p-8">
                <h2 className="text-2xl font-bold">
                  <Link href={`/conseils/${a.slug}`} className="hover:text-accent">
                    {a.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-muted">{a.description}</p>
                <Link
                  href={`/conseils/${a.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
                >
                  Lire l&apos;article
                  <ArrowRight size={16} weight="light" aria-hidden />
                </Link>
              </Bezel>
            </li>
          ))}
        </ul>
      </Container>
      <CtaBand />
    </>
  );
}
