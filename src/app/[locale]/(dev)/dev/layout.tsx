// frontend/src/app/[locale]/(dev)/dev/layout.tsx
/**
 * @file layout.tsx (Grupo de Desarrollo)
 * @description Layout para el entorno de desarrollo (`/dev`). Su rol es proveer
 *              una "shell" o marco consistente (el `DevHeader`) para todas las
 *              herramientas de desarrollo. Es un RSC `async` para cumplir con el
 *              contrato de API del App Router.
 * @version 7.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/(dev)/dev/layout.tsx.md
 */
import React from "react";
import DevHeader from "@/components/dev/DevHeader";
import { type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";

interface DevLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

/**
 * @component DevLayout
 * @description Aplica un marco visual y funcional a todas las páginas de herramientas
 *              de desarrollo.
 * @param {DevLayoutProps} props Las props del layout, incluyendo `children` y `params`.
 * @returns {Promise<React.ReactElement>} El elemento JSX del layout de desarrollo.
 */
export default async function DevLayout({
  children,
  params,
}: DevLayoutProps): Promise<React.ReactElement> {
  clientLogger.info(
    `[DevLayout] Aplicando layout para entorno de desarrollo. Locale: ${params.locale}`
  );

  return (
    <div>
      <DevHeader locale={params.locale} />
      <main className="p-4 md:p-8">{children}</main>
    </div>
  );
}
// frontend/src/app/[locale]/(dev)/dev/layout.tsx
