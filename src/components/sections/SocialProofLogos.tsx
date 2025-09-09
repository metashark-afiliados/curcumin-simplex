// src/components/sections/SocialProofLogos.tsx
/**
 * @file SocialProofLogos.tsx
 * @description Componente de presentación para la sección de Prueba Social.
 * @description_es Muestra una marquesina con desplazamiento infinito de logotipos
 *               para reforzar la credibilidad y confianza en el producto
 *               (ej. "Como visto en...", "Certificado por...").
 * @version 3.0.0
 * @dependencies react, react-fast-marquee, next/image, @/components/ui/Container
 *
 * @prop {string} title - Título contextual para la sección.
 * @prop {Array<{src: string, alt: string}>} logos - Array de objetos que definen cada logo.
 */
"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Container } from "@/components/ui/Container";

interface Logo {
  src: string;
  alt: string;
}

interface SocialProofLogosProps {
  title: string;
  logos: Logo[];
}

/**
 * @component SocialProofLogos
 * @description Renderiza una tira de logos en bucle para reforzar la credibilidad.
 *              Debe ser un componente cliente debido a la animación de la marquesina.
 * @param {SocialProofLogosProps} props Las propiedades del componente.
 * @returns {React.ReactElement | null} El elemento JSX o null si no hay logos.
 */
export function SocialProofLogos({
  title,
  logos,
}: SocialProofLogosProps): React.ReactElement | null {
  console.log("[Observabilidad] Renderizando SocialProofLogos");

  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <section
      className="py-12 bg-background"
      aria-labelledby="social-proof-title"
    >
      <Container>
        <h2
          id="social-proof-title"
          className="text-center font-semibold text-foreground/70 uppercase tracking-wider mb-8"
        >
          {title}
        </h2>
        <Marquee
          gradient={true}
          gradientColor="hsl(var(--background))"
          gradientWidth={100}
          speed={40}
          autoFill={true}
          pauseOnHover={true}
        >
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="mx-12 flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={40}
                className="h-10 w-auto object-contain grayscale opacity-75 transition-opacity hover:opacity-100"
              />
            </div>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
// src/components/sections/SocialProofLogos.tsx
