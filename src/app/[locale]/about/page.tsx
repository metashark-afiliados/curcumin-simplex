// src/app/[locale]/about/page.tsx
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";

/**
 * @file page.tsx (About)
 * @description Página "Acerca de Nosotros" del portal.
 * @version 1.1.0
 */
interface AboutPageProps {
  params: { locale: string };
}

export default async function AboutPage({ params }: AboutPageProps) {
  console.log(
    `[Observabilidad] Renderizando AboutPage para el locale: ${params.locale}`
  );
  const t = await getDictionary(params.locale);
  const content = t.aboutPage;

  // --- GUARDA DE SEGURIDAD ---
  // Si el contenido para esta página no se encuentra en el diccionario,
  // no renderizamos nada para evitar errores en tiempo de ejecución.
  if (!content) {
    console.warn(
      `[AboutPage] Contenido para 'aboutPage' no encontrado en el diccionario para el locale: ${params.locale}`
    );
    return null;
  }

  return (
    <>
      <PageHeader title={content.title} subtitle={content.subtitle} />
      <Container className="mt-16 max-w-4xl">
        <div className="prose prose-invert lg:prose-xl mx-auto">
          {content.content.map((block, index) => {
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
