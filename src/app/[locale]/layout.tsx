// src/app/[locale]/layout.tsx
/**
 * @file layout.tsx (Principal con Locale)
 * @description Layout principal para todas las rutas internacionalizadas.
 *              Refactorizado para actuar como el inyector de la SSoT de diseño
 *              global, consumiendo los tokens desde `branding.config.ts` y
 *              haciéndolos disponibles como variables CSS para toda la aplicación.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
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

  // <<-- MEJORA: Lógica de inyección de tema -->>
  // 1. Genera la cadena de texto CSS a partir de la SSoT de diseño.
  const themeVariablesStyle = generateThemeVariablesStyle();

  // 2. Carga el diccionario de contenido.
  const t = await getDictionary(awaitedParams.locale);

  return (
    <html
      lang={awaitedParams.locale}
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body>
        {/*
          3. Inyecta las variables de diseño en una etiqueta <style>.
             Esto hace que los tokens de diseño estén disponibles globalmente
             para que `globals.css` y todos los componentes los consuman.
             Se utiliza `dangerouslySetInnerHTML` como es la práctica estándar
             de React para inyectar HTML/CSS dinámico de forma segura.
        */}
        <style dangerouslySetInnerHTML={{ __html: themeVariablesStyle }} />

        <ScrollingBanner message={t.scrollingBanner.message} />
        <Header
          campaignPills={t.header.campaignPills}
          ctaButton={t.header.ctaButton}
          logoUrl={t.header.logoUrl}
          logoAlt={t.header.logoAlt}
        />
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
