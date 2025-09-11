// src/app/[locale]/layout.tsx
/**
 * @file layout.tsx (Principal con Locale)
 * @description Layout principal para todas las rutas internacionalizadas.
 *              Corregido para pasar las props al Header según su nuevo contrato.
 * @version 7.1.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/layout.tsx.md
 */
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollingBanner } from "@/components/layout/ScrollingBanner";
import { getDictionary } from "@/lib/i18n";
import { supportedLocales, type Locale } from "@/lib/i18n.config";
import { generateThemeVariablesStyle } from "@/lib/utils/theme.utils";
import "@/app/globals.css";
import { clientLogger } from "@/lib/logging";

// --- Configuración de Fuentes ---
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

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
  const awaitedParams = await params;
  const t = await getDictionary(awaitedParams.locale);
  return {
    title: { default: t.metadata.title, template: `%s | ${t.metadata.title}` },
    description: t.metadata.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>): Promise<React.ReactElement> {
  const awaitedParams = await params;

  clientLogger.info(
    `[LocaleLayout] Renderizando para locale: ${awaitedParams.locale} e inyectando tema global.`
  );

  const themeStyleString = generateThemeVariablesStyle();
  const t = await getDictionary(awaitedParams.locale);

  return (
    <html
      lang={awaitedParams.locale}
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body>
        {themeStyleString && (
          <style dangerouslySetInnerHTML={{ __html: themeStyleString }} />
        )}
        <ScrollingBanner message={t.scrollingBanner.message} />
        {/* <<-- CORRECCIÓN: Se pasa el objeto `content` completo. --> */}
        <Header content={t.header} />
        <main>{children}</main>
        <Footer
          copyright={t.footer.copyright}
          links={t.footer.links}
          disclaimer={t.footer.disclaimer}
        />
      </body>
    </html>
  );
}
// src/app/[locale]/layout.tsx
