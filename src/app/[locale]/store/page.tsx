// src/app/[locale]/store/page.tsx
/**
 * @file page.tsx (Store)
 * @description Página orquestadora de la tienda.
 *              Refactorizada para esperar correctamente las props de RSC y
 *              mejorar el manejo de contenido no disponible.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/store/page.tsx.md
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { LightRays } from "@/components/razBits/LightRays/LightRays";
import { clientLogger } from "@/lib/logging";
import { type Locale } from "@/lib/i18n.config";
import { ProductFilters } from "@/components/sections/ProductFilters";
import { ProductGrid } from "@/components/sections/ProductGrid";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface StorePageProps {
  params: { locale: Locale };
}

export default async function StorePage({
  params,
}: StorePageProps): Promise<React.ReactElement> {
  // <<-- CORRECCIÓN APLICADA: Se espera la resolución de los parámetros.
  const awaitedParams = await params;

  clientLogger.info(
    `[StorePage] Renderizando para el locale: ${awaitedParams.locale}`
  );

  const t: Dictionary = await getDictionary(awaitedParams.locale);
  const content = t.storePage;
  const lightRaysConfig = t.lightRays;

  // <<-- MEJORA DE ROBUSTEZ: Manejo explícito de contenido no encontrado.
  if (!content) {
    clientLogger.warn(
      `[StorePage] Contenido 'storePage' no encontrado para locale '${awaitedParams.locale}'. Renderizando fallback.`
    );
    return (
      <PageHeader
        title="Contenido no disponible"
        subtitle={`La tienda no está disponible en el idioma '${awaitedParams.locale}'.`}
      />
    );
  }

  return (
    <div className="relative">
      {lightRaysConfig && (
        <LightRays
          config={lightRaysConfig}
          className="absolute inset-0 z-[-1] opacity-20"
        />
      )}

      <PageHeader title={content.title} subtitle={content.subtitle} />
      <Container className="mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <ProductFilters filters={content.filters} />
          <ProductGrid
            products={content.products}
            locale={awaitedParams.locale}
          />
        </div>
      </Container>
    </div>
  );
}
// src/app/[locale]/store/page.tsx
