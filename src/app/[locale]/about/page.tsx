// src/app/[locale]/about/page.tsx
/**
 * @file page.tsx (About)
 * @description Página "Acerca de Nosotros" del portal.
 *              - v5.0.0: Refactorización sistémica para manejar la prop `params`
 *                asíncrona, resolviendo un error de build de Next.js.
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
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

type AboutPageContent = z.infer<typeof TextPageLocaleSchema>;
type ContentBlock = AboutPageContent["content"][number];

export default async function AboutPage({
  params,
}: AboutPageProps): Promise<React.ReactElement> {
  // <<-- SOLUCIÓN SISTÉMICA: La función es `async`, `params` se resuelve implícitamente.
  clientLogger.info(
    `[AboutPage] Renderizando para el locale: ${params.locale}`
  );

  const t = await getDictionary(params.locale);
  const content: AboutPageContent | undefined = t.aboutPage;

  if (!content) {
    return (
      <PageHeader
        title="Contenido no disponible"
        subtitle={`La página 'Acerca de' no está disponible en este idioma (${params.locale}).`}
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
