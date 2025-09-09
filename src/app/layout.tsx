// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollingBanner } from "@/components/layout/ScrollingBanner";
import { getDictionary } from "@/lib/i18n";
// ELIMINADO: import { generateCssVariables } from "@/lib/config/theme.config";
import "./globals.css";

/**
 * @file layout.tsx
 * @description Layout raíz de la aplicación Curcumin Simplex.
 * @version 2.0.0
 * @date 2025-09-09
 */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    title: {
      default: t.metadata.title,
      template: `%s | ${t.metadata.title}`,
    },
    description: t.metadata.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactElement> {
  const t = await getDictionary();
  const siteLocale = process.env.NEXT_PUBLIC_SITE_LOCALE || "es-ES";
  // ELIMINADO: const cssVariables = generateCssVariables();
  console.log(
    `[Observabilidad] Renderizando RootLayout para el locale: ${siteLocale}`
  );

  return (
    <html lang={siteLocale} className={inter.variable}>
      <head>
        {/* ELIMINADO: <style dangerouslySetInnerHTML={{ __html: cssVariables }} /> */}
      </head>
      <body className="font-sans antialiased">
        <ScrollingBanner message={t.scrollingBanner.message} />
        <Header
          ctaText={t.header.ctaButton}
          affiliateUrl={t.header.affiliateUrl}
          logoUrl={t.header.logoUrl}
          logoAlt={t.header.logoAlt}
          homeAriaLabel={t.header.homeAriaLabel}
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
// src/app/layout.tsx
