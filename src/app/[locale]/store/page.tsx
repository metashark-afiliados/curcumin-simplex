// src/app/[locale]/store/page.tsx
/**
 * @file page.tsx (Store)
 * @description Página orquestadora de la tienda.
 *              - v5.0.0: Refactorización sistémica para manejar la prop `params`
 *                asíncrona, resolviendo un error de build de Next.js.
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
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

// <<-- SOLUCIÓN SISTÉMICA: La función del componente DEBE ser `async`.
export default async function StorePage({
  params,
}: StorePageProps): Promise<React.ReactElement> {
  clientLogger.info(
    `[StorePage] Renderizando para el locale: ${params.locale}`
  );

  const t: Dictionary = await getDictionary(params.locale);
  const content = t.storePage;
  const lightRaysConfig = t.lightRays;

  if (!content) {
    return (
      <PageHeader
        title="Contenido no disponible"
        subtitle={`La tienda no está disponible en el idioma '${params.locale}'.`}
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
          <ProductGrid products={content.products} locale={params.locale} />
        </div>
      </Container>
    </div>
  );
}
// src/app/[locale]/store/page.tsx
