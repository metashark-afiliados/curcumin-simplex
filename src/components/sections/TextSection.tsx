// RUTA: src/components/sections/TextSection.tsx
/**
 * @file Sección de Texto Genérica
 * @description Un componente contenedor genérico para secciones cuyo contenido principal
 * es texto (ej. párrafos, títulos). Su principal función es estandarizar el
 * espaciado vertical (padding) y el ancho máximo del contenido a través del
 * componente `Container`.
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 */
import React from "react";
import { Container } from "@/components/ui/Container";

interface TextSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function TextSection({ children, className = "" }: TextSectionProps) {
  // Combina las clases base con quaisquer clases personalizadas fornecidas.
  const sectionClasses = ["py-16", className].filter(Boolean).join(" ");

  return (
    <section className={sectionClasses}>
      <Container>{children}</Container>
    </section>
  );
}

// --- MEJORAS FUTURAS ---
// 1. **Variantes de espaciado**: Se podría añadir una prop `spacing: 'default' | 'compact' | 'loose'`
//    para controlar fácilmente el `padding` vertical (py-16, py-8, py-24) sin tener que
//    pasar clases personalizadas, haciendo el componente más semántico.
// 2. **Estilos de "Prose" automáticos**: Añadir una prop booleana `prose` que, si es `true`,
//    aplique automáticamente las clases de `@tailwindcss/typography` (`prose lg:prose-xl`)
//    al `Container`, ideal para renderizar contenido Markdown o de un CMS.

// RUTA: src/components/sections/TextSection.tsx
