import { FilePdf } from "@phosphor-icons/react/ssr";
import { Bezel } from "@/components/ui/Bezel";
import { business } from "@/config/business";
import type { Products } from "@/i18n/fr/content";

function Block({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return (
    <div>
      <h3 className="text-xl font-bold">{title}</h3>
      <List className={`mt-4 space-y-2 pl-5 text-[15px] text-muted marker:text-accent ${ordered ? "list-decimal" : "list-disc"}`}>
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </List>
    </div>
  );
}

/** Condensed, non-contractual summary of the manufacturer's limited warranty. */
export function WarrantySummary({ data }: { data: Products["warranty"] }) {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Bezel coreClassName="space-y-8 p-8 sm:p-10">
          <Block title={data.coversTitle} items={data.covers} />
          <Block title={data.remedyTitle} items={data.remedy} ordered />
        </Bezel>
        <Bezel coreClassName="space-y-8 p-8 sm:p-10">
          <Block title={data.conditionsTitle} items={data.conditions} />
          <Block title={data.exclusionsTitle} items={data.exclusions} />
        </Bezel>
      </div>
      <p className="mt-5 text-[15px] text-ink-soft">{data.consumer}</p>

      <h3 className="mt-14 text-2xl font-bold">{data.tableTitle}</h3>
      <div
        className="mt-5 overflow-x-auto rounded-[1.5rem] bg-surface ring-1 ring-ink/10"
        tabIndex={0}
        role="region"
        aria-label={data.tableCaption}
      >
        <table className="w-full min-w-[40rem] border-collapse text-left text-[15px]">
          <caption className="sr-only">{data.tableCaption}</caption>
          <thead>
            <tr className="text-sm text-muted">
              <th scope="col" className="p-4 font-semibold">{data.tableHead.product}</th>
              <th scope="col" className="p-4 font-semibold">{data.tableHead.state}</th>
              <th scope="col" className="p-4 font-semibold">{data.tableHead.layers}</th>
              <th scope="col" className="p-4 font-semibold">{data.tableHead.period}</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r, i) => (
              <tr key={i} className="border-t border-ink/10 align-top">
                <th scope="row" className="p-4 font-semibold text-ink">{r.product}</th>
                <td className="p-4 text-muted">{r.state}</td>
                <td className="p-4 text-muted">{r.layers}{data.layersUnit}</td>
                <td className="p-4 font-semibold text-accent-strong">{r.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted">{data.source}</p>
      <a
        href={business.assets.warrantyPdf}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-surface px-5 text-[15px] font-semibold text-ink ring-1 ring-ink/15 transition-[transform] hover:ring-ink/40 active:scale-[0.97] active:duration-75"
      >
        <FilePdf size={20} weight="light" aria-hidden />
        {data.pdf}
      </a>
    </div>
  );
}
