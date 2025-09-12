// frontend/src/app/layout.tsx
/**
 * @file layout.tsx (Raíz)
 * @description Layout raíz de la aplicación. Orquesta la estructura HTML base,
 *              la inyección de tema global, los metadatos y los proveedores de cliente.
 * @version 7.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/layout.tsx.md
 */
import React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeInjector } from "@/components/layout/ThemeInjector";
import AppProviders from "@/components/layout/AppProviders";
import { getDictionary } from "@/lib/i18n";
import { type Locale, supportedLocales } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";
import "@/app/globals.css";

// --- CONFIGURACIÓN DE FUENTES GLOBALES ---
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

// --- TIPOS Y CONTRATOS ---
interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

// --- GENERACIÓN DE METADATOS (SEO) ---
export async function generateMetadata({
  params,
}: RootLayoutProps): Promise<Metadata> {
  const t = await getDictionary(params.locale);
  return {
    title: t.metadata.title,
    description: t.metadata.description,
  };
}

// --- GENERACIÓN DE RUTAS ESTÁTICAS ---
export async function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

// --- LAYOUT RAÍZ (RSC) ---
export default async function RootLayout({
  children,
  params,
}: RootLayoutProps): Promise<React.ReactElement> {
  clientLogger.info(
    `[RootLayout] Renderizando layout raíz para locale: ${params.locale}`
  );
  const t = await getDictionary(params.locale);

  return (
    <html
      lang={params.locale}
      className={`${inter.variable} ${poppins.variable}`}
    >
      <head>
        <ThemeInjector />
      </head>
      <body>
        <AppProviders
          locale={params.locale}
          cookieConsentContent={t.cookieConsentBanner}
        >
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
// frontend/src/app/layout.tsx
