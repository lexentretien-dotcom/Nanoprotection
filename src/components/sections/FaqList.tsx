import { Plus } from "@phosphor-icons/react/ssr";
import type { FaqItem } from "@/content/faq";

/**
 * Native <details> accordion: keyboard and screen-reader accessible,
 * works without JavaScript, and every answer stays in the HTML for crawlers.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-ink/10 rounded-[1.5rem] bg-surface ring-1 ring-ink/[0.07]">
      {items.map((item) => (
        <details key={item.q} className="group px-5 sm:px-7">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left font-display text-lg font-semibold tracking-tight">
            {item.q}
            <Plus
              size={20}
              weight="light"
              aria-hidden
              className="faq-chevron shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            />
          </summary>
          <p className="pb-6 pr-10 text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
