"use client";

import { useState } from "react";
import { BeforeAfter } from "./BeforeAfter";
import { fmt } from "@/i18n/format";
import { useI18n } from "@/i18n/provider";

/** Already localized by the server page. */
export type GalleryProject = {
  slug: string;
  type: "rajeunissement" | "protection-preventive";
  completedOn: string;
  title: string;
  location: string;
  product: string;
  roofCondition: string;
  description: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

export function ProjectGallery({ projects }: { projects: GalleryProject[] }) {
  const { locale, ui } = useI18n();
  const g = ui.gallery;
  const [filter, setFilter] = useState("all");
  const shown = projects.filter((p) => filter === "all" || p.type === filter);
  const filters: [string, string][] = [
    ["all", g.all],
    ["rajeunissement", g.rajeunissement],
    ["protection-preventive", g["protection-preventive"]],
  ];

  return (
    <div>
      <div role="group" aria-label={g.filterLabel} className="flex flex-wrap gap-2">
        {filters.map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
            className={`min-h-11 rounded-full px-4 text-[15px] font-semibold ring-1 transition-colors duration-300 active:scale-[0.97] active:duration-75 ${
              filter === key ? "bg-ink text-white ring-ink" : "bg-surface text-ink ring-ink/20 hover:ring-ink/45"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <ul className="mt-10 grid gap-10 lg:grid-cols-2">
        {shown.map((p) => (
          <li key={p.slug}>
            <article>
              <BeforeAfter before={p.before.src} after={p.after.src} beforeAlt={p.before.alt} afterAlt={p.after.alt} />
              <h3 className="mt-5 text-2xl font-bold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {fmt(g.completed, {
                  location: p.location,
                  date: new Date(p.completedOn).toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
                })}
              </p>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[15px]">
                <dt className="font-semibold">{g.product}</dt>
                <dd className="text-muted">{p.product}</dd>
                <dt className="font-semibold">{g.condition}</dt>
                <dd className="text-muted">{p.roofCondition}</dd>
              </dl>
              <p className="mt-4 text-muted">{p.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
