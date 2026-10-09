"use client";

import { useState } from "react";
import { BeforeAfter } from "./BeforeAfter";
import type { Project } from "@/content/projects";

const labels: Record<string, string> = {
  all: "Tous",
  rajeunissement: "Rajeunissement",
  "protection-preventive": "Protection préventive",
};

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("all");
  const shown = projects.filter((p) => filter === "all" || p.type === filter);

  return (
    <div>
      <div role="group" aria-label="Filtrer les projets" className="flex flex-wrap gap-2">
        {Object.entries(labels).map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
            className={`rounded-full px-4 py-2 text-[15px] font-semibold ring-1 transition-colors duration-300 ${
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
              <div className="focus-within:ring-4 focus-within:ring-accent/40 rounded-[1.5rem]">
                <BeforeAfter before={p.before.src} after={p.after.src} beforeAlt={p.before.alt} afterAlt={p.after.alt} />
              </div>
              <h3 className="mt-5 text-2xl font-bold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {p.location}, terminé le{" "}
                <time dateTime={p.completedOn}>
                  {new Date(p.completedOn).toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" })}
                </time>
              </p>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[15px]">
                <dt className="font-semibold">Produit</dt>
                <dd className="text-muted">{p.product}</dd>
                <dt className="font-semibold">État initial</dt>
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
