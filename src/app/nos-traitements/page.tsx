import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Container, PageHeader } from "@/components/ui/Page";
import { Bezel } from "@/components/ui/Bezel";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { publishedServices } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Nos traitements de toiture",
  description:
    "Inspection, rajeunissement et protection préventive de toitures en bardeaux d'asphalte. Découvrez ce qui convient à votre toiture, et ce qui n'y convient pas.",
  path: "/nos-traitements",
});

export default function TraitementsPage() {
  return (
    <>
      <PageHeader
        title="Nos traitements"
        intro="Chaque service est présenté avec ses avantages, ses limites et les cas où une autre solution est préférable."
        crumbs={[{ name: "Nos traitements", path: "/nos-traitements" }]}
      />
      <Container className="py-20">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {publishedServices.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={i * 80} className="h-full">
                <Bezel className="h-full" coreClassName="flex h-full flex-col p-8">
                  <h2 className="text-2xl font-bold">{s.name}</h2>
                  <p className="mt-3 flex-1 text-muted">{s.summary}</p>
                  <Link
                    href={`/nos-traitements/${s.slug}`}
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    Lire les détails
                    <ArrowRight size={16} weight="light" aria-hidden />
                  </Link>
                </Bezel>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
      <CtaBand />
    </>
  );
}
