import { CheckCircle } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/Page";
import { ButtonLink } from "@/components/ui/Button";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Demande reçue",
  description: "Merci. Votre demande a bien été reçue.",
  path: "/merci",
  noindex: true,
});

export default function MerciPage() {
  return (
    <Container narrow className="py-24 text-center">
      <CheckCircle size={56} weight="light" className="mx-auto text-success" aria-hidden />
      <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">Demande reçue. Merci.</h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
        Nous avons bien enregistré votre demande et nous vous contacterons selon votre préférence.
        Pour accélérer l&apos;évaluation, vous pouvez nous envoyer quelques photos de votre toiture
        par courriel à{" "}
        <a className="font-semibold text-accent underline underline-offset-4" href={`mailto:${business.email.value}`}>
          {business.email.value}
        </a>
        .
      </p>
      <div className="mt-10 flex justify-center">
        <ButtonLink href="/conseils" variant="secondary">
          Lire nos conseils en attendant
        </ButtonLink>
      </div>
    </Container>
  );
}
