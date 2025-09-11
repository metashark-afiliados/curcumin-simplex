// src/app/[locale]/about/page.tsx
/**
 * @file page.tsx (About)
 * @description Página "Acerca de Nosotros" del portal. Refactorizada para cumplir
 *              con el contrato de RSC, mejorar la robustez del manejo de contenido
 *              y aplicar tipado estricto derivado de Zod.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/about/page.tsx.md
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { clientLogger } from "@/lib/logging";
import { TextPageLocaleSchema } from "@/lib/schemas/pages/text-page.schema";
import { z } from "zod";
import { type Locale } from "@/lib/i18n.config";

interface AboutPageProps {
  params: { locale: Locale };
}

// --- Tipos derivados del schema para mayor seguridad y claridad ---
type AboutPageContent = z.infer<typeof TextPageLocaleSchema>;
type ContentBlock = AboutPageContent["content"][number];

export default async function AboutPage({
  params,
}: AboutPageProps): Promise<React.ReactElement> {
  // <<-- CORRECCIÓN VALIDADA
  const awaitedParams = await params;
  clientLogger.info(
    `[AboutPage] Renderizando para el locale: ${awaitedParams.locale}`
  );

  const t = await getDictionary(awaitedParams.locale);
  const content: AboutPageContent | undefined = t.aboutPage;

  // <<-- MEJORA DE ROBUSTEZ
  if (!content) {
    clientLogger.warn(
      `[AboutPage] Contenido para 'aboutPage' no encontrado para locale: ${awaitedParams.locale}.`
    );
    return (
      <PageHeader
        title="Contenido no disponible"
        subtitle={`La página 'Acerca de' no está disponible en este idioma (${awaitedParams.locale}).`}
      />
    );
  }

  return (
    <>
      <PageHeader title={content.title} subtitle={content.subtitle} />
      <Container className="mt-16 max-w-4xl">
        <article className="prose prose-invert lg:prose-xl mx-auto">
          {content.content.map((block: ContentBlock, index: number) => {
            if (block.type === "h2") {
              return <h2 key={index}>{block.text}</h2>;
            }
            return <p key={index}>{block.text}</p>;
          })}
        </article>
      </Container>
    </>
  );
}
// src/app/[locale]/about/page.tsx
