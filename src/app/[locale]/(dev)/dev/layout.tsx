// src/app/[locale]/(dev)/dev/layout.tsx
/**
 * @file layout.tsx (Grupo de Desarrollo)
 * @description Layout para el entorno de desarrollo. Su única responsabilidad es
 *              envolver todas las páginas del DCC con un encabezado común.
 *              Versión definitiva que resuelve el error de tipo RSC TS1360
 *              al esperar explícitamente (`await`) la prop `params`.
 * @version 5.0.0
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
 * @description Aplica una estructura consistente (header + main) a todas las páginas
 *              dentro del Developer Command Center.
 * @param {DevLayoutProps} props Las props del layout, que son promesas.
 * @returns {Promise<React.ReactElement>} El elemento JSX del layout de desarrollo.
 */
export default async function DevLayout({
  children,
  params,
}: DevLayoutProps): Promise<React.ReactElement> {
  // <<-- SOLUCIÓN DEFINITIVA (TS1360): Se espera la resolución de la Promise de `params`.
  //      Esto asegura que `awaitedParams` es un objeto y no una Promise,
  //      satisfaciendo el contrato de tipos esperado por el componente hijo `DevHeader`.
  const awaitedParams = await params;

  clientLogger.info(
    `[DevLayout] Aplicando layout para el entorno de desarrollo. Locale: ${awaitedParams.locale}`
  );

  return (
    <div>
      <DevHeader locale={awaitedParams.locale} />
      <main className="p-4 md:p-8">{children}</main>
    </div>
  );
}
// src/app/[locale]/(dev)/dev/layout.tsx
