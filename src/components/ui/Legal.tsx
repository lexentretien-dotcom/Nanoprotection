import type { ReactNode } from "react";
import { Breadcrumbs, Container } from "./Page";

/**
 * Shared layout for legal pages. The text of these pages is a working draft
 * and must be reviewed by a qualified professional before publication.
 */
export function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <Container narrow className="py-12 sm:py-16">
      <Breadcrumbs items={[{ name: title, path }]} />
      <h1 className="mt-8 text-4xl font-extrabold sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-muted">Dernière mise à jour: {updated}</p>
      <div className="mt-6 rounded-2xl bg-accent-tint p-4 text-[15px] text-ink ring-1 ring-accent/20">
        Version de travail à faire valider par un professionnel du droit avant la mise en ligne.
      </div>
      <div className="mt-10 space-y-8 text-[17px] leading-relaxed text-ink-soft [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1">
        {children}
      </div>
    </Container>
  );
}
