// RUTA: src/components/sections/FaqAccordion.tsx
/**
 * @file Sección de Preguntas Frecuentes (FAQ)
 * @description Renderiza un título y una lista de preguntas y respuestas en un formato
 * de acordeón interactivo. Consume los componentes `AccordionItem` y `Container`.
 * El contenido (título y FAQs) se pasa como props.
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 */
import { AccordionItem } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";

interface Faq {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  title: string;
  faqs: Faq[];
}

export function FaqAccordion({ title, faqs }: FaqAccordionProps) {
  return (
    <section className="py-16 bg-brand-bg-light">
      <Container className="max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-brand-text-dark mb-12">
          {title}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} title={faq.question}>
              {faq.answer}
            </AccordionItem>
          ))}
        </div>
      </Container>
    </section>
  );
}

// --- MEJORAS FUTURAS ---
// 1. **Schema de FAQPage para SEO**: Este componente es el candidato perfecto para
//    generar automáticamente los datos estructurados (JSON-LD) para una `FAQPage`.
//    Se podría crear un componente wrapper que tome las `faqs` y genere el script
//    de schema.org en el `<head>` de la página, mejorando drásticamente el SEO.
// 2. **Acordeón con un solo ítem abierto**: Se podría añadir una prop opcional para
//    controlar si múltiples ítems del acordeón pueden estar abiertos simultáneamente
//    o si al abrir uno se cierran los demás. Esto requeriría gestionar el estado
//    del ítem abierto en este componente padre.

// RUTA: src/components/sections/FaqAccordion.tsx
