// src/app/[locale]/about/page.tsx
/**
 * @file page.tsx (About)
 * @description Página "Acerca de Nosotros" del portal.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/about/page.md
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

type AboutPageContent = z.infer<typeof TextPageLocaleSchema> | undefined;
type ContentBlock = z.infer<typeof TextPageLocaleSchema>["content"][number];

export default async function AboutPage({
  params,
}: AboutPageProps): Promise<React.ReactElement | null> {
  // <<-- CORRECCIÓN: Se reintroduce 'await' para cumplir el contrato de PageProps de Next.js
  const awaitedParams = await params;

  clientLogger.info(
    `[AboutPage] Renderizando para el locale: ${awaitedParams.locale}`
  );
  const t = await getDictionary(awaitedParams.locale);
  const content: AboutPageContent = t.aboutPage;

  if (!content) {
    clientLogger.warn(
      `[AboutPage] Contenido para 'aboutPage' no encontrado en el diccionario para el locale: ${awaitedParams.locale}`
    );
    return null;
  }

  return (
    <>
      <PageHeader title={content.title} subtitle={content.subtitle} />
      <Container className="mt-16 max-w-4xl">
        <div className="prose prose-invert lg:prose-xl mx-auto">
          {content.content.map((block: ContentBlock, index: number) => {
            if (block.type === "h2") {
              return <h2 key={index}>{block.text}</h2>;
            }
            return <p key={index}>{block.text}</p>;
          })}
        </div>
      </Container>
    </>
  );
}
// src/app/[locale]/about/page.tsx
