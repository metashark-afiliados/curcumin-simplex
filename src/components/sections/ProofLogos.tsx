// RUTA: src/components/sections/ProofLogos.tsx
import { Container } from "@/components/ui/Container";
import Image from "next/image";

interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ProofLogosProps {
  title: string;
  logos: Logo[];
}

export function ProofLogos({ title, logos }: ProofLogosProps) {
  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <div className="py-12 bg-brand-bg-light">
      <Container>
        <p className="text-center font-semibold text-brand-text-light uppercase tracking-wider">
          {title}
        </p>
        <div className="mt-8 flex justify-center items-center gap-12 md:gap-16 grayscale opacity-75">
          {logos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="object-contain"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
// RUTA: src/components/sections/ProofLogos.tsx
