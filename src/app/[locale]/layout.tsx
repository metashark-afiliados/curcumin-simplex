// frontend/src/app/[locale]/layout.tsx
/**
 * @file layout.tsx (Principal con Locale)
 * @description Layout para rutas internacionalizadas. Actúa como el esqueleto
 *              principal del portal, ensamblando los componentes comunes.
 *              Como RSC, es `async` para cumplir el contrato del App Router.
 * @version 13.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollingBanner } from "@/components/layout/ScrollingBanner";
import { ThemeInjector } from "@/components/layout/ThemeInjector"; // <-- Nueva importación
import { getDictionary } from "@/lib/i18n";
import { supportedLocales, type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

// --- TIPOS Y CONTRATOS ---
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

// --- GENERACIÓN DE RUTAS ESTÁTICAS ---
export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

// --- METADATOS DINÁMICOS ---
export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  try {
    const t = await getDictionary(params.locale);
    return {
      title: {
        default: t.metadata.title,
        template: `%s | ${t.metadata.title}`,
      },
      description: t.metadata.description,
    };
  } catch {
    return {
      title: "Global Fitwell",
      description: "Error al cargar metadatos.",
    };
  }
}

// --- LAYOUT PRINCIPAL ---
export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>): Promise<React.ReactElement> {
  clientLogger.info(
    `[LocaleLayout] Renderizando esqueleto del portal para locale: ${params.locale}.`
  );

  let t: Dictionary;
  try {
    t = await getDictionary(params.locale);
  } catch (error) {
    clientLogger.error(
      `[LocaleLayout] Fallo crítico al cargar diccionario para '${params.locale}'. Renderizando fallback.`,
      { error }
    );
    // Renderiza un estado de error mínimo pero funcional si el diccionario falla.
    return (
      <>
        <ThemeInjector />
        <main>{children}</main>
      </>
    );
  }

  return (
    <>
      <ThemeInjector />
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
// frontend/src/app/[locale]/layout.tsx
