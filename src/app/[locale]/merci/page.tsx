import { CheckCircle } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/Page";
import { ButtonLink } from "@/components/ui/Button";
import { business } from "@/config/business";
import { getDict } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).pages.thanks;
  return pageMetadata({ locale, title: p.metaTitle, description: p.metaDescription, path: "/merci", noindex: true });
}

export default async function ThanksPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getDict(locale).pages.thanks;
  return (
    <Container narrow className="py-24 text-center">
      <CheckCircle size={56} weight="light" className="mx-auto text-success" aria-hidden />
      <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">{p.title}</h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
        {p.textBefore}
        <a className="font-semibold text-accent underline underline-offset-4" href={`mailto:${business.email.value}`}>
          {business.email.value}
        </a>
        {p.textAfter}
      </p>
      <div className="mt-10 flex justify-center">
        <ButtonLink href={localePath(locale, "/blogue")} variant="secondary">
          {p.cta}
        </ButtonLink>
      </div>
    </Container>
  );
}
