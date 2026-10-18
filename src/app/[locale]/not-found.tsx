"use client";

import { Container } from "@/components/ui/Page";
import { ButtonLink } from "@/components/ui/Button";
import { useI18n } from "@/i18n/provider";
import { localePath } from "@/i18n/config";

/** Rendered inside the locale layout, so the header, footer and language stay correct. */
export default function NotFound() {
  const { locale, ui } = useI18n();
  const n = ui.notFound;
  return (
    <Container narrow className="py-28 text-center">
      <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-accent">{n.code}</p>
      <h1 className="mt-4 text-4xl font-extrabold sm:text-6xl">{n.title}</h1>
      <p className="mx-auto mt-6 max-w-lg text-lg text-muted">{n.text}</p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href={localePath(locale, "/")}>{n.home}</ButtonLink>
        <ButtonLink href={localePath(locale, "/contact")} variant="secondary" arrow={false}>
          {n.contact}
        </ButtonLink>
      </div>
    </Container>
  );
}
