import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Page";
import { business } from "@/config/business";

export function CtaBand({
  title = "Savoir où en est votre toiture, sans engagement.",
  text = "Un technicien examine votre toiture et vous dit franchement si elle peut être préservée, réparée ou doit être remplacée.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="rounded-[2rem] bg-ink p-1.5 ring-1 ring-ink">
          <div className="shingles relative overflow-hidden rounded-[calc(2rem-0.375rem)] px-6 py-14 sm:px-14 sm:py-20">
            <div className="relative max-w-2xl">
              <h2 className="text-3xl font-bold !text-white sm:text-5xl">{title}</h2>
              <p className="mt-5 text-lg text-white/75">{text}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={business.cta.href}>{business.cta.label}</ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  className="!bg-white/10 !text-white !ring-white/25 hover:!ring-white/60"
                >
                  Parler à un expert
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
