export type TrackEvent =
  | "quote_form_start"
  | "quote_submit"
  | "phone_click"
  | "email_click"
  | "assessment_complete"
  | "estimator_interaction"
  | "widget_coverage_check"
  | "widget_service_selected"
  | "preferred_source_click";

type DataLayerWindow = Window & { dataLayer?: unknown[] };

export const CONSENT_KEY = "nano-consent-v1";

export function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

/** Pushes an event only if the visitor accepted analytics. */
export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

export function readAttribution() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = p.get(k);
    if (v) {
      out[k] = v;
      try {
        sessionStorage.setItem(k, v);
      } catch {}
    } else {
      try {
        const s = sessionStorage.getItem(k);
        if (s) out[k] = s;
      } catch {}
    }
  }
  out.landing_page = window.location.pathname;
  out.referrer = document.referrer || "";
  return out;
}
