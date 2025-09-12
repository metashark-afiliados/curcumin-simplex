// frontend/src/app/[locale]/store/page.tsx
/**
 * @file page.tsx (Store)
 * @description Página orquestadora de la tienda. Ensambla los componentes de filtro
 *              y cuadrícula de productos. Como RSC, es `async` para cumplir con el
 *              contrato de API del App Router de Next.js.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/store/page.tsx.md
 */
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductFilters } from "@/components/sections/ProductFilters";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { LightRays } from "@/components/razBits/LightRays/LightRays";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

// --- TIPOS Y CONTRATOS ---
interface StorePageProps {
  params: { locale: Locale };
}

// --- COMPONENTE DE PÁGINA ---
export default async function StorePage({
  params,
}: StorePageProps): Promise<React.ReactElement> {
  clientLogger.info(
    `[StorePage] Renderizando página para el locale: ${params.locale}`
  );

  let t: Dictionary;
  try {
    t = await getDictionary(params.locale);
  } catch (error) {
    clientLogger.error("[StorePage] Fallo crítico al cargar el diccionario.", {
      error,
    });
    return (
      <PageHeader
        title="Error de Contenido"
        subtitle="No se pudo cargar el contenido de la tienda. Por favor, inténtelo de nuevo más tarde."
      />
    );
  }

  const content = t.storePage;
  const lightRaysConfig = t.lightRays;

  if (!content) {
    clientLogger.warn(
      `[StorePage] Contenido 'storePage' no encontrado para el locale '${params.locale}'.`
    );
    return (
      <PageHeader
        title="Tienda no Disponible"
        subtitle={`El contenido de la tienda no está disponible en este idioma (${params.locale}).`}
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
// frontend/src/app/[locale]/store/page.tsx
