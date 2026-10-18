import { CtaBand } from "./CtaBand";
import { TrustStrip } from "./TrustStrip";
import type { Locale } from "@/i18n/config";

/** End of page: the call-to-action band (optional) followed by the four commitments. */
export function Closing({
  locale,
  cta = true,
  title,
  text,
}: {
  locale: Locale;
  cta?: boolean;
  title?: string;
  text?: string;
}) {
  return (
    <>
      {cta && <CtaBand locale={locale} title={title} text={text} />}
      <TrustStrip locale={locale} />
    </>
  );
}
