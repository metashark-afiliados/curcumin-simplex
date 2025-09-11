// src/app/[locale]/(dev)/dev/layout.tsx
/**
 * @file layout.tsx (Grupo de Desarrollo)
 * @description Layout para el entorno de desarrollo.
 *              CORRECCIÓN: Se reintroduce 'await' para cumplir el contrato de LayoutProps.
 * @version 3.1.0
 * @author RaZ podesta - MetaShark Tech
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
