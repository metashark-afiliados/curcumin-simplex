// frontend/src/app/[locale]/about/page.tsx
/**
 * @file page.tsx (About)
 * @description Página "Acerca de Nosotros". Como RSC, es `async` para cumplir
 *              con el contrato de API del App Router de Next.js.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/about/page.tsx.md
 */
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { TextSection } from "@/components/sections/TextSection";
import { getDictionary } from "@/lib/i18n";
import { clientLogger } from "@/lib/logging";
import type { TextPageLocaleSchema } from "@/lib/schemas/pages/text-page.schema";
import type { Locale } from "@/lib/i18n.config";
import type { z } from "zod";

// --- TIPOS Y CONTRATOS ---
interface AboutPageProps {
  params: { locale: Locale };
}
type AboutPageContent = z.infer<typeof TextPageLocaleSchema>;
type ContentBlock = AboutPageContent["content"][number];

// --- COMPONENTE DE PÁGINA ---
export default async function AboutPage({
  params,
}: AboutPageProps): Promise<React.ReactElement> {
  clientLogger.info(
    `[AboutPage] Renderizando página para el locale: ${params.locale}`
  );

  const t = await getDictionary(params.locale);
  const content: AboutPageContent | undefined = t.aboutPage;

  // <<-- MEJORA DE ROBUSTEZ: Manejo explícito de contenido no encontrado. -->>
  if (!content) {
    clientLogger.warn(
      `[AboutPage] Contenido para 'aboutPage' no encontrado en el diccionario para el locale '${params.locale}'.`
    );
    return (
      <PageHeader
        title="Contenido no Disponible"
        subtitle={`La página 'Acerca de' no ha sido traducida a este idioma (${params.locale}).`}
      />
    );
  }

  return (
    <>
      <PageHeader title={content.title} subtitle={content.subtitle} />
      <TextSection prose={true} className="bg-background">
        {content.content.map((block: ContentBlock, index: number) => {
          if (block.type === "h2") {
            return <h2 key={index}>{block.text}</h2>;
          }
          return <p key={index}>{block.text}</p>;
        })}
      </TextSection>
    </>
  );
}
// frontend/src/app/[locale]/about/page.tsx