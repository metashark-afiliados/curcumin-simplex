// frontend/src/app/[locale]/(portal)/layout.tsx
/**
 * @file layout.tsx (Portal Group)
 * @description Layout para el grupo de rutas del portal. Provee la estructura
 *              común (Header/Footer) para todas las páginas públicas del sitio.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/(portal)/layout.tsx.md
 */
import React from "react";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";

interface PortalLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

/**
 * @component PortalLayout
 * @description Aplica el marco visual y funcional a todas las páginas del portal.
 * @param {PortalLayoutProps} props Las props del layout.
 * @returns {Promise<React.ReactElement>} El elemento JSX del layout del portal.
 */
export default async function PortalLayout({
  children,
  params,
}: PortalLayoutProps): Promise<React.ReactElement> {
  clientLogger.info(
    `[PortalLayout] Aplicando layout para el portal. Locale: ${params.locale}`
  );

  const t = await getDictionary(params.locale);

  // Aseguramos que el contenido para header y footer exista.
  // En un caso real, podríamos tener un fallback más elegante.
  if (!t.header || !t.footer) {
    throw new Error(
      `Contenido esencial (header/footer) no encontrado para el locale ${params.locale}`
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header content={t.header} devDictionary={t.devRouteMenu} />
      <main className="flex-grow pt-16">{children}</main>
      <Footer
        copyright={t.footer.copyright}
        links={t.footer.links}
        disclaimer={t.footer.disclaimer}
      />
    </div>
  );
}
// frontend/src/app/[locale]/(portal)/layout.tsx
