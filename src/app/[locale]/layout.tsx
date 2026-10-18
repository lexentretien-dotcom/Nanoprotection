import type { Metadata, Viewport } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCta } from "@/components/layout/StickyCta";
import { Consent } from "@/components/layout/Consent";
import { JsonLd } from "@/components/ui/JsonLd";
import { business } from "@/config/business";
import { getDict } from "@/i18n/dictionaries";
import { htmlLang, locales, ogLocale } from "@/i18n/config";
import { I18nProvider } from "@/i18n/provider";
import { resolveLocale } from "@/i18n/server";
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

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { site } = getDict(locale);
  return {
    metadataBase: new URL(business.siteUrl),
    title: {
      default: `${business.displayName} | ${site.defaultTitle}`,
      template: `%s | ${site.titleSuffix}`,
    },
    description: site.defaultDescription,
    applicationName: business.displayName,
    robots: business.indexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: { locale: ogLocale[locale], type: "website", siteName: business.displayName },
  };
}

export const viewport: Viewport = {
  themeColor: "#f5f5fa",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await resolveLocale(params);
  const dict = getDict(locale);

  return (
    <html lang={htmlLang[locale]} className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh pb-20 lg:pb-0">
        <I18nProvider locale={locale} ui={dict.ui}>
          <JsonLd data={organizationJsonLd(locale)} />
          <Header />
          <main id="contenu">{children}</main>
          <Footer locale={locale} />
          <StickyCta />
          <Consent gaId={business.gaId} gtmId={business.gtmId} />
        </I18nProvider>
      </body>
    </html>
  );
}
