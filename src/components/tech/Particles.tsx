import { Bezel } from "@/components/ui/Bezel";
import { Reveal } from "@/components/ui/Reveal";
import type { Technology } from "@/i18n/fr/content";

/**
 * Relative particle sizes (conceptual, following the manufacturer's diagram).
 * GoNano uses the accent color; everything else is neutral so the difference
 * reads at a glance.
 */
const scale = [
  { key: "gonano", size: 14, brand: true },
  { key: "penetrants", size: 44, brand: false },
  { key: "mixed", size: 66, brand: false },
  { key: "silicone", size: 118, brand: false },
  { key: "acrylic", size: 152, brand: false },
] as const;

export function Particles({ data }: { data: Technology["particles"] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <Reveal className="lg:col-span-7">
        <Bezel className="h-full" coreClassName="p-8 sm:p-10">
          <h3 className="text-xl font-bold">{data.scaleTitle}</h3>
          <ul className="mt-10 flex flex-wrap items-end justify-center gap-x-3 gap-y-8 lg:flex-nowrap lg:justify-between">
            {scale.map((p) => (
              <li key={p.key} className="flex w-[6.25rem] flex-col items-center gap-3 text-center">
                <span
                  aria-hidden
                  className="block rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    background: p.brand
                      ? "var(--accent)"
                      : "radial-gradient(circle at 35% 30%, #ffffff 0%, #d9dcee 38%, #8f95b6 100%)",
                    boxShadow: p.brand
                      ? "0 0 0 4px rgb(90 44 245 / 0.18)"
                      : "0 14px 18px -12px rgb(11 18 48 / 0.45)",
                  }}
                />
                <span
                  className={`max-w-[8rem] text-[13px] font-semibold leading-tight ${
                    p.brand ? "text-accent-strong" : "text-muted"
                  }`}
                >
                  {data.scaleLabels[p.key]}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">{data.note}</p>
        </Bezel>
      </Reveal>

      <Reveal delay={90} className="lg:col-span-5">
        <Bezel className="h-full" coreClassName="p-8 sm:p-10">
          <h3 className="text-xl font-bold">{data.diagramTitle}</h3>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {/* Traditional sealant: a layer on top of the asphalt */}
            <div>
              <div aria-hidden className="relative h-32 overflow-hidden rounded-2xl bg-ink/[0.04]">
                <div className="absolute inset-x-3 bottom-3 h-16 rounded-lg bg-ink" />
                <div className="absolute inset-x-3 bottom-[4.75rem] h-5 rounded-t-lg bg-[#a9aec8]" />
              </div>
              <p className="mt-3 text-[15px] font-semibold">{data.traditional.title}</p>
              <p className="mt-1 text-sm text-muted">{data.traditional.text}</p>
            </div>
            {/* GoNano: inside the pores */}
            <div>
              <div aria-hidden className="relative h-32 overflow-hidden rounded-2xl bg-ink/[0.04]">
                <div
                  className="absolute inset-x-3 bottom-3 h-16 rounded-lg bg-ink"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, var(--accent) 0 3px, transparent 4px), radial-gradient(circle, var(--accent) 0 2px, transparent 3px)",
                    backgroundSize: "18px 18px, 11px 13px",
                    backgroundPosition: "4px 6px, 9px 3px",
                  }}
                />
              </div>
              <p className="mt-3 text-[15px] font-semibold text-accent-strong">{data.gonano.title}</p>
              <p className="mt-1 text-sm text-muted">{data.gonano.text}</p>
            </div>
          </div>
        </Bezel>
      </Reveal>
    </div>
  );
}
