// RUTA: src/app/(components)/sections/SocialProofLogos.tsx
"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

// Componente modificado para recibir los logos como prop.
interface SocialProofLogosProps {
  logos: { src: string; alt: string }[];
}

export function SocialProofLogos({ logos }: SocialProofLogosProps) {
  // Si no hay logos, no renderizar nada.
  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <div className="py-8 overflow-hidden">
      <Marquee
        gradient={true}
        gradientColor="#F9FAFB"
        gradientWidth={100}
        speed={40}
      >
        {logos.map((logo) => (
          <div
            key={logo.alt}
            className="mx-12 flex items-center justify-center"
          >
            <Image
              className="h-10 object-contain"
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={40}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
// RUTA: src/app/(components)/sections/SocialProofLogos.tsx
