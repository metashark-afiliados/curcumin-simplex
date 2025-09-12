// src/app/[locale]/(dev)/dev/layout.tsx
/**
 * @file layout.tsx (Grupo de Desarrollo)
 * @description Layout para el entorno de desarrollo.
 *              - v6.0.0: Refactorización sistémica para manejar la prop `params`
 *                asíncrona, resolviendo un error de build de Next.js.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
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

// <<-- SOLUCIÓN SISTÉMICA: La función del componente DEBE ser `async`.
export default async function DevLayout({
  children,
  params,
}: DevLayoutProps): Promise<React.ReactElement> {
  clientLogger.info(
    `[DevLayout] Aplicando layout para el entorno de desarrollo. Locale: ${params.locale}`
  );

  return (
    <div>
      <DevHeader locale={params.locale} />
      <main className="p-4 md:p-8">{children}</main>
    </div>
  );
}
// src/app/[locale]/(dev)/dev/layout.tsx
