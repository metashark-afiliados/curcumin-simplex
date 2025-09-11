// src/app/[locale]/(dev)/dev/layout.tsx
/**
 * @file layout.tsx (Grupo de Desarrollo)
 * @description Layout para el entorno de desarrollo.
 *              Valida la corrección del error de tipo de Next.js
 *              (TS1360) al esperar explícitamente los parámetros (`await params`).
 * @version 4.1.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/(dev)/dev/layout.tsx.md
 */
import DevHeader from "@/components/dev/DevHeader";
import React from "react";
import { type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";

interface DevLayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

export default async function DevLayout({ children, params }: DevLayoutProps) {
  // <<-- CORRECCIÓN VALIDADA: 'params' es esperado correctamente.
  const awaitedParams = await params;
  clientLogger.info(
    `[DevLayout] Aplicando layout para locale: ${awaitedParams.locale}`
  );

  return (
    <div>
      <DevHeader locale={awaitedParams.locale} />
      <main className="p-4 md:p-8">{children}</main>
    </div>
  );
}
// src/app/[locale]/(dev)/dev/layout.tsx
