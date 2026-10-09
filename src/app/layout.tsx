import type { Metadata, Viewport } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCta } from "@/components/layout/StickyCta";
import { Consent } from "@/components/layout/Consent";
import { JsonLd } from "@/components/ui/JsonLd";
import { business } from "@/config/business";
import { organizationJsonLd } from "@/lib/seo";

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.displayName} | Préservation de toiture au Québec`,
    template: `%s | ${business.shortName}`,
  },
  description:
    "Préservation et protection de toitures en bardeaux d'asphalte au Québec. Inspection, recommandation honnête et traitements GoNano. Demandez une évaluation gratuite.",
  applicationName: business.displayName,
  robots: business.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: { locale: "fr_CA", type: "website", siteName: business.displayName },
};

export const viewport: Viewport = {
  themeColor: "#f5f5fa",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh pb-20 lg:pb-0">
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <StickyCta />
        <Consent gaId={business.gaId} gtmId={business.gtmId} />
      </body>
    </html>
  );
}
