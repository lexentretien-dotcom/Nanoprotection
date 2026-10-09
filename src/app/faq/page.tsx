import { Container, PageHeader } from "@/components/ui/Page";
import { FaqSearch } from "@/components/sections/FaqSearch";
import { CtaBand } from "@/components/sections/CtaBand";
import { faqCategories } from "@/content/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Questions fréquentes sur les traitements de toiture",
  description:
    "Produits, technologie, tarification, garantie, installation, sécurité et admissibilité: les réponses claires aux questions les plus courantes.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Questions fréquentes."
        intro="Des réponses directes, avec leurs limites."
        crumbs={[{ name: "FAQ", path: "/faq" }]}
      />
      <Container className="py-16 sm:py-20">
        <FaqSearch categories={faqCategories} />
      </Container>
      <CtaBand />
    </>
  );
}
