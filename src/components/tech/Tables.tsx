import { ArrowUp } from "@phosphor-icons/react/ssr";
import { fmt } from "@/i18n/format";
import type { Technology } from "@/i18n/fr/content";

function Level({ n, text }: { n: number; text: string }) {
  return (
    <span role="img" aria-label={fmt(text, { n })} className="inline-flex gap-1">
      {[1, 2, 3].map((i) => (
        <i
          key={i}
          aria-hidden
          className={`block h-2.5 w-6 rounded-full ${i <= n ? "bg-accent" : "bg-ink/12"}`}
        />
      ))}
    </span>
  );
}

const wrap = "overflow-x-auto rounded-[1.5rem] bg-surface ring-1 ring-ink/10";

/** Manufacturer performance ratings, rebuilt as a real table (readable, searchable, accessible). */
export function PerformanceTable({ data }: { data: Technology["performance"] }) {
  return (
    <div className={wrap} tabIndex={0} role="region" aria-label={data.caption}>
      <table className="w-full min-w-[44rem] border-collapse text-left text-[15px]">
        <caption className="sr-only">{data.caption}</caption>
        <thead>
          <tr>
            <th scope="col" className="w-60 p-4 text-sm font-semibold text-muted">
              {data.criterion}
            </th>
            {data.products.map((p, i) => (
              <th
                key={p}
                scope="col"
                className={`p-4 font-display text-base font-bold leading-tight ${
                  i === data.products.length - 1 ? "text-muted" : "text-ink"
                }`}
              >
                {p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.header.map((h) => (
            <tr key={h.label} className="border-t border-ink/10 bg-paper align-top">
              <th scope="row" className="p-4 text-sm font-semibold text-ink">
                {h.label}
              </th>
              {h.values.map((v, i) => (
                <td key={i} className="p-4 font-medium text-ink-soft">
                  {v}
                </td>
              ))}
            </tr>
          ))}
          {data.rows.map((r) => (
            <tr key={r.label} className="border-t border-ink/10 align-middle">
              <th scope="row" className="p-4 text-sm font-semibold text-ink">
                {r.label}
              </th>
              {r.levels.map((n, i) => (
                <td key={i} className="p-4">
                  <Level n={n} text={data.levelText} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TestsTable({ data }: { data: Technology["tests"] }) {
  return (
    <div className={wrap} tabIndex={0} role="region" aria-label={data.caption}>
      <table className="w-full min-w-[44rem] border-collapse text-left text-[15px]">
        <caption className="sr-only">{data.caption}</caption>
        <thead>
          <tr className="text-sm text-muted">
            <th scope="col" className="p-4 font-semibold">{data.head.category}</th>
            <th scope="col" className="p-4 font-semibold">{data.head.standard}</th>
            <th scope="col" className="p-4 font-semibold">{data.head.typical}</th>
            <th scope="col" className="p-4 font-semibold text-accent-strong">{data.head.treated}</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((r) => (
            <tr key={r.category} className="border-t border-ink/10 align-top">
              <th scope="row" className="p-4 font-semibold text-ink">{r.category}</th>
              <td className="p-4 text-muted">{r.standard === "proven" ? data.provenLabel : r.standard}</td>
              <td className="p-4 text-ink-soft">{r.typical}</td>
              <td className={`p-4 font-semibold ${r.exceeds ? "bg-accent-tint/70 text-accent-strong" : "text-ink-soft"}`}>
                <span className="inline-flex items-center gap-1.5">
                  {r.exceeds && <ArrowUp size={16} weight="bold" aria-hidden />}
                  {r.treated}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
