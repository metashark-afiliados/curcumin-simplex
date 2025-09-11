// src/app/[locale]/(dev)/dev/layout.tsx
/**
 * @file layout.tsx (Grupo de Desarrollo)
 * @description Layout para el entorno de desarrollo.
 *              Versión definitiva que resuelve el error de tipo RSC TS1360
 *              al esperar explícitamente (`await`) la prop `params`.
 * @version 5.0.0
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
  // <<-- SOLUCIÓN DEFINITIVA (TS1360): Se espera la resolución de la Promise de `params`.
  //      Esto asegura que `awaitedParams` es un objeto y no una Promise,
  //      satisfaciendo el contrato de tipos esperado por los componentes hijos.
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
