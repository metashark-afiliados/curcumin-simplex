// frontend/src/app/[locale]/(dev)/dev/components/[componentName]/page.tsx
/**
 * @file page.tsx (Dev Component Canvas Page Host)
 * @description Página anfitriona que renderiza un componente individual de forma aislada.
 *              Este es un Componente de Servidor (RSC) y su función es `async` por
 *              diseño para cumplir con el contrato de API del App Router de Next.js,
 *              que puede pasar props como `params` de forma asíncrona, resolviendo
 *              así el error de build de incompatibilidad de tipos.
 * @devonly
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/(dev)/dev/components/[componentName]/page.tsx.md
 */
import React from "react";
import { ComponentCanvas } from "@/components/dev/ComponentCanvas";
import { getComponentList } from "@/components/dev/ComponentRegistry";
import { Container } from "@/components/ui/Container";
import { type Locale, supportedLocales } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";

// --- TIPOS Y CONTRATOS ---
interface DevComponentCanvasPageProps {
  params: {
    locale: Locale;
    componentName: string;
  };
}

// --- GENERACIÓN DE RUTAS ESTÁTICAS ---

/**
 * @function generateStaticParams
 * @description Genera estáticamente todas las rutas posibles para `[componentName]`
 *              y `[locale]` en tiempo de build, optimizando para SSG.
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

// --- COMPONENTE DE PÁGINA ---

/**
 * @component DevComponentCanvasPage
 * @description Componente anfitrión que orquesta el renderizado del `ComponentCanvas`.
 * @param {DevComponentCanvasPageProps} props - Las propiedades de la página, incluyendo `params`.
 * @returns {Promise<React.ReactElement>} El elemento JSX de la página.
 */
// <<-- SOLUCIÓN SISTÉMICA: La función del componente DEBE ser `async`.
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
// frontend/src/app/[locale]/(dev)/dev/components/[componentName]/page.tsx
