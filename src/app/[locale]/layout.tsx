// src/app/[locale]/layout.tsx
/**
 * @file layout.tsx (Principal con Locale)
 * @description Layout para rutas internacionalizadas.
 *              - v12.0.0: Refactorización sistémica para manejar la prop `params`
 *                asíncrona, resolviendo un error de build de Next.js.
 * @version 12.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollingBanner } from "@/components/layout/ScrollingBanner";
import { getDictionary } from "@/lib/i18n";
import { supportedLocales, type Locale } from "@/lib/i18n.config";
import { generateThemeVariablesStyle } from "@/lib/utils/theme.utils";
import { clientLogger } from "@/lib/logging";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const t = await getDictionary(params.locale);
  return {
    title: { default: t.metadata.title, template: `%s | ${t.metadata.title}` },
    description: t.metadata.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>): Promise<React.ReactElement> {
  // <<-- SOLUCIÓN SISTÉMICA: `await` en `params`.
  clientLogger.info(
    `[LocaleLayout] Renderizando para locale: ${params.locale} e inyectando tema global.`
  );

  const themeStyleString = generateThemeVariablesStyle();
  const t = await getDictionary(params.locale);

  return (
    <>
      {themeStyleString && (
        <style dangerouslySetInnerHTML={{ __html: themeStyleString }} />
      )}
      <ScrollingBanner message={t.scrollingBanner.message} />
      <Header content={t.header} devDictionary={t.devRouteMenu} />
      <main>{children}</main>
      <Footer
        copyright={t.footer.copyright}
        links={t.footer.links}
        disclaimer={t.footer.disclaimer}
      />
    </>
  );
}
// src/app/[locale]/layout.tsx
