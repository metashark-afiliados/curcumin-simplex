// src/components/sections/TestimonialGrid.tsx
/**
 * @file Cuadrícula de Testimonios
 * @description Muestra una cuadrícula de testimonios de clientes, cada uno renderizado
 * a través del componente `TestimonialCard`. Es una sección clave para la prueba social.
 */
import { Container } from "@/components/ui/Container";
import { TestimonialCard } from "@/components/feedback/TestimonialCard";

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  imageSrc: string;
}

interface TestimonialGridProps {
  title: string;
  testimonials: Testimonial[];
}

export function TestimonialGrid({ title, testimonials }: TestimonialGridProps) {
  return (
    <section className="py-16 bg-brand-bg-light">
      <Container>
        <h2 className="text-3xl font-bold text-center text-brand-text-dark mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} {...testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
}
// src/components/sections/TestimonialGrid.tsx
