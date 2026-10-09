"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";
import { CONSENT_KEY } from "@/lib/analytics";

type Choice = "granted" | "denied" | null;

const EVENT = "nano-consent-change";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

/** "pending" on the server and during hydration, then the stored choice. */
function getSnapshot(): string {
  try {
    return localStorage.getItem(CONSENT_KEY) ?? "none";
  } catch {
    return "none";
  }
}
const getServerSnapshot = () => "pending";

/**
 * Consent banner and tracker loader.
 * Nothing non-essential loads until the visitor accepts. Refusing is as easy
 * as accepting. If no tracking ID is configured, no banner is shown at all.
 */
export function Consent({ gaId, gtmId }: { gaId: string; gtmId: string }) {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = stored !== "pending";
  const choice: Choice = stored === "granted" || stored === "denied" ? stored : null;
  const hasTrackers = Boolean(gaId || gtmId);

  function decide(value: "granted" | "denied") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  }

  if (!hasTrackers || !ready) return null;

  return (
    <>
      {choice === "granted" && gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}
      {choice === "granted" && !gtmId && gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {choice === null && (
        <div
          role="dialog"
          aria-label="Préférences de témoins"
          className="fixed bottom-24 left-3 right-3 z-50 max-w-md rounded-[1.5rem] bg-surface p-5 shadow-[var(--shadow-soft)] ring-1 ring-ink/10 sm:left-6 lg:bottom-6"
        >
          <p className="text-[15px] text-ink">
            Nous aimerions mesurer l&apos;utilisation du site pour l&apos;améliorer. Aucun témoin de
            mesure n&apos;est activé sans votre accord.{" "}
            <Link href="/temoins" className="font-medium text-accent underline underline-offset-4">
              En savoir plus
            </Link>
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => decide("denied")}
              className="flex-1 rounded-full bg-surface px-4 py-2.5 text-[15px] font-semibold text-ink ring-1 ring-ink/20 hover:ring-ink/40"
            >
              Refuser
            </button>
            <button
              type="button"
              onClick={() => decide("granted")}
              className="flex-1 rounded-full bg-ink px-4 py-2.5 text-[15px] font-semibold text-white hover:bg-ink-soft"
            >
              Accepter
            </button>
          </div>
        </div>
      )}
    </>
  );
}
