import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export function Container({
  children,
  className = "",
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${narrow ? "max-w-3xl" : "max-w-7xl"} ${className}`}
    >
      {children}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Accueil", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(all)} />
      <nav aria-label="Fil d'Ariane" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((item, i) => {
            const last = i === all.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="underline-offset-4 hover:underline">
                    {item.name}
                  </Link>
                )}
                {!last && <span aria-hidden>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/** Interior page header: breadcrumb, one headline, one short paragraph. */
export function PageHeader({
  title,
  intro,
  crumbs,
  children,
}: {
  title: string;
  intro?: string;
  crumbs: { name: string; path: string }[];
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-ink/[0.06] bg-surface">
      <Container className="py-14 sm:py-20">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </header>
  );
}

export function Section({
  children,
  className = "",
  id,
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "surface" | "ink";
}) {
  const tones = {
    paper: "",
    surface: "bg-surface",
    ink: "bg-ink text-white",
  };
  return (
    <section id={id} className={`py-20 sm:py-28 ${tones[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionTitle({
  title,
  intro,
  tone = "light",
}: {
  title: string;
  intro?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="max-w-3xl">
      <h2 className={`text-3xl font-bold sm:text-4xl lg:text-5xl ${tone === "dark" ? "!text-white" : ""}`}>
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-lg ${tone === "dark" ? "text-white/70" : "text-muted"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
