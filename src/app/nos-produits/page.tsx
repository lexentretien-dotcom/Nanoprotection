import { Container, PageHeader } from "@/components/ui/Page";
import { ProductCompare } from "@/components/sections/ProductCompare";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Produits GoNano: NuRoof Fortify, Revive et Bio-Boost",
  description:
    "Comparez les produits GoNano NuRoof Fortify, Revive et Bio-Boost: âge de toiture visé, usage, application, garantie et limites.",
  path: "/nos-produits",
});

export default function ProduitsPage() {
  return (
    <>
      <PageHeader
        title="Les produits GoNano."
        intro="Trois produits, trois situations. Ils ne sont pas interchangeables et ne s'appliquent pas tous ensemble."
        crumbs={[{ name: "Nos produits", path: "/nos-produits" }]}
      />
      <Container className="py-20">
        <ProductCompare />
      </Container>
      <CtaBand />
    </>
  );
}
