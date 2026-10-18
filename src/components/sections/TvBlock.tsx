import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import { Check, Television } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/Page";
import { Reveal } from "@/components/ui/Reveal";
import { getDict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/**
 * Drop an official, authorized image at public/photos/dragons-den.jpg and it is
 * used automatically. Until then the panel is typographic (no borrowed TV still).
 */
const photo = existsSync(path.join(process.cwd(), "public/photos/dragons-den.jpg"))
  ? "/photos/dragons-den.jpg"
  : null;

export function TvBlock({ locale }: { locale: Locale }) {
  const tv = getDict(locale).pages.about.tv;
  return (
    <Container className="pb-20 sm:pb-28">
      <Reveal>
        <div className="rounded-[2rem] bg-ink p-1.5 ring-1 ring-ink">
          <div className="grid overflow-hidden rounded-[calc(2rem-0.375rem)] bg-gradient-to-br from-[#1b1457] via-ink to-ink lg:grid-cols-12">
            <div className="relative flex min-h-[18rem] items-end p-8 sm:p-10 lg:col-span-5">
              {photo ? (
                <Image src={photo} alt={tv.imageAlt} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              ) : (
                <div aria-hidden className="shingles absolute inset-0 opacity-70" />
              )}
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-ink">
                  <Television size={16} weight="regular" className="text-accent" aria-hidden />
                  {tv.badge}
                </span>
                <p className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {tv.showName}
                </p>
              </div>
            </div>

            <div className="p-8 sm:p-12 lg:col-span-7">
              <h2 className="text-3xl font-bold !text-white sm:text-4xl">{tv.title}</h2>
              <p className="mt-5 text-lg text-white/80">{tv.text}</p>
              <ul className="mt-6 space-y-3">
                {tv.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-white">
                    <Check size={22} weight="bold" className="mt-0.5 shrink-0 text-[#b9a6ff]" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-white/15 pt-5 text-sm text-white/65">{tv.note}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
