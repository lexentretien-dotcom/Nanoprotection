import { CalendarCheck, ClockClockwise, Handshake, SealCheck } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/Page";
import { Reveal } from "@/components/ui/Reveal";
import { getDict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const icons = {
  certified: SealCheck,
  honest: Handshake,
  reply: ClockClockwise,
  oneDay: CalendarCheck,
} as const;

/**
 * Four commitments, only things the business actually promises. No invented
 * statistics or savings figures.
 */
export function TrustStrip({ locale }: { locale: Locale }) {
  const { trust } = getDict(locale).site;
  return (
    <section className="pb-4 pt-16 sm:pt-20">
      <Container>
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {trust.items.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <li key={item.title}>
                <Reveal delay={i * 70}>
                  <Icon size={40} weight="light" className="text-accent" aria-hidden />
                  <p className="mt-4 font-display text-lg font-bold leading-snug tracking-tight">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[15px] text-muted">{item.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
