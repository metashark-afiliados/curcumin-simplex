// RUTA: src/components/sections/Hero.tsx
/**
 * @file Hero Section
 * @description The main heading section of the page, designed to create an immediate
 * emotional connection with the user. It features an animated, serif headline.
 *
 * @author Your Name
 * @version 2.1.0
 */
import { Container } from "@/components/ui/Container";

interface HeroProps {
  title: string;
  subtitle: string;
}

export function Hero({ title, subtitle }: HeroProps) {
  const titleWords = title.split(" ");

  return (
    <section className="bg-brand-bg-white pt-8 pb-16 text-center overflow-hidden">
      <Container className="max-w-4xl">
        <h1
          // AJUSTE MANUAL: Se redujo el tamaño de la fuente de 'text-4xl md:text-5xl lg:text-6xl'
          // a 'text-3xl md:text-4xl lg:text-5xl' para un aspecto menos dominante.
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight font-serif"
          style={{
            color: "#1e3a8a",
            textShadow:
              "0px 2px 4px rgba(22, 49, 102, 0.2), 0px 4px 10px rgba(22, 49, 102, 0.1)",
          }}
          aria-label={title}
        >
          {titleWords.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden py-1">
              <span
                className="inline-block animate-word-cascade"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                {word} 
              </span>
            </span>
          ))}
        </h1>
        <p
          className="mt-6 text-xl md:text-2xl text-brand-text-light max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "800ms" }}
        >
          {subtitle}
        </p>
      </Container>
    </section>
  );
}
