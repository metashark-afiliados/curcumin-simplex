// frontend/src/app/[locale]/page.tsx
/**
 * @file page.tsx (Homepage)
 * @description Página de inicio del portal "Global Fitwell". Actúa como un
 *              orquestador de contenido, ensamblando dinámicamente las secciones
 *              definidas en el diccionario de i18n. Es `async` para cumplir
 *              con el contrato del App Router.
 * @version 8.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/page.tsx.md
 */
import React from "react";
import { HeroNews } from "@/components/sections/HeroNews";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { SocialProofLogos } from "@/components/sections/SocialProofLogos";
import { getDictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n.config";
import { clientLogger } from "@/lib/logging";

// --- TIPOS Y CONTRATOS ---
interface HomePageProps {
  params: {
    locale: Locale;
  };
}

// --- COMPONENTE DE PÁGINA ---
export default async function HomePage({
  params,
}: HomePageProps): Promise<React.ReactElement> {
  clientLogger.info(
    `[HomePage] Renderizando Homepage para el locale: ${params.locale}`
  );

  // La obtención de datos se envuelve en un try/catch para manejar posibles
  // errores en la carga de archivos JSON, aunque el layout principal ya tiene un fallback.
  try {
    const t = await getDictionary(params.locale);

    // Renderizado declarativo y condicional.
    // Si una sección no tiene contenido definido en el diccionario, simplemente no se renderiza.
    return (
      <>
        {t.heroNews && <HeroNews content={t.heroNews} />}
        {t.socialProof && <SocialProofLogos content={t.socialProof} />}
        {t.productShowcase && <ProductShowcase content={t.productShowcase} />}
        {t.newsGrid && <NewsGrid content={t.newsGrid} />}
      </>
    );
  } catch (error) {
    clientLogger.error(
      `[HomePage] Fallo crítico al renderizar la homepage para '${params.locale}'.`,
      { error }
    );
    // En caso de un error irrecuperable (ej. JSON malformado), se muestra un mensaje de error.
    return (
      <div className="text-center py-20 text-destructive">
        <h1>Error 500</h1>
        <p>No se pudo cargar el contenido de la página de inicio.</p>
      </div>
    );
  }
}
// frontend/src/app/[locale]/page.tsx
