// src/app/[locale]/(dev)/dev/components/[componentName]/page.tsx
/**
 * @file page.tsx (Dev Component Canvas Page Host)
 * @description Página anfitriona que renderiza un componente individual de forma aislada.
 *              - v4.0.0: Refactorización sistémica. Convertido a un Server Component `async`
 *                para manejar correctamente las props (`params`) asíncronas de Next.js
 *                y resolver el error de build de incompatibilidad de tipos.
 * @devonly
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/(dev)/dev/components/[componentName]/page.tsx.md
 */
import React from "react";
import { clientLogger } from "@/lib/logging";
import { ComponentCanvas } from "@/components/dev/ComponentCanvas";
import { Container } from "@/components/ui/Container";
import { type Locale, supportedLocales } from "@/lib/i18n.config";
import { getComponentList } from "@/components/dev/ComponentRegistry";

interface DevComponentCanvasPageProps {
  params: {
    locale: Locale;
    componentName: string;
  };
}

/**
 * @function generateStaticParams
 * @description Genera estáticamente todas las rutas posibles para `[componentName]`
 *              y `[locale]`, optimizando el build para SSG.
 * @returns {Promise<{ componentName: string; locale: Locale }[]>} Un array de objetos con los parámetros.
 */
export async function generateStaticParams() {
  const components = getComponentList();
  const params = components.flatMap((componentEntry) =>
    supportedLocales.map((locale) => ({
      componentName: componentEntry.key,
      locale: locale,
    }))
  );
  clientLogger.info(
    `[DevComponentCanvasPage] Generando ${params.length} rutas estáticas para el canvas de componentes.`
  );
  return params;
}

/**
 * @component DevComponentCanvasPage
 * @description Componente anfitrión que renderiza el `ComponentCanvas`.
 * @param {DevComponentCanvasPageProps} props - Las propiedades de la página.
 * @returns {Promise<React.ReactElement>} El elemento JSX de la página.
 */
export default async function DevComponentCanvasPage({
  params,
}: DevComponentCanvasPageProps): Promise<React.ReactElement> {
  clientLogger.info(
    `[DevComponentCanvasPage] Renderizando página host para componente: ${params.componentName}, locale: ${params.locale}`
  );

  return (
    <Container className="py-8">
      <ComponentCanvas
        componentName={params.componentName}
        locale={params.locale}
      />
    </Container>
  );
}
// src/app/[locale]/(dev)/dev/components/[componentName]/page.tsx
