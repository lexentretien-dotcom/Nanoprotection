import { Container } from "@/components/ui/Page";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "Page introuvable", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <Container narrow className="py-28 text-center">
      <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-accent">Erreur 404</p>
      <h1 className="mt-4 text-4xl font-extrabold sm:text-6xl">Cette page n&apos;existe pas.</h1>
      <p className="mx-auto mt-6 max-w-lg text-lg text-muted">
        Le lien est peut-être périmé. Retournez à l&apos;accueil ou demandez votre évaluation.
      </p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
        <ButtonLink href="/contact" variant="secondary" arrow={false}>
          Nous joindre
        </ButtonLink>
      </div>
    </Container>
  );
}
