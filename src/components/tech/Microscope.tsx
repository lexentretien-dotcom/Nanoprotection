import Image from "next/image";
import { Bezel } from "@/components/ui/Bezel";
import { Reveal } from "@/components/ui/Reveal";
import type { Technology } from "@/i18n/fr/content";

const photos = [
  "/technology/shingle-before.webp",
  "/technology/shingle-during.webp",
  "/technology/shingle-after.webp",
];

/** Manufacturer microscope photographs, captions set in the site's own type. */
export function Microscope({ data }: { data: Technology["how"] }) {
  return (
    <div>
      <ol className="grid gap-6 md:grid-cols-3">
        {data.steps.map((s, i) => (
          <li key={s.label}>
            <Reveal delay={i * 90} className="h-full">
              <figure className="flex h-full flex-col">
                <p className="mb-3 flex items-center gap-3 font-display text-2xl font-bold tracking-tight">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm text-white">
                    {i + 1}
                  </span>
                  {s.label}
                </p>
                <Bezel coreClassName="overflow-hidden !rounded-[calc(2rem-0.375rem)] p-2">
                  <Image
                    src={photos[i]}
                    alt={s.alt}
                    width={900}
                    height={650}
                    sizes="(min-width:768px) 30vw, 100vw"
                    className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
                  />
                </Bezel>
                <figcaption className="mt-4 text-[15px] text-muted">{s.caption}</figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-sm text-muted">{data.credit}</p>
    </div>
  );
}
