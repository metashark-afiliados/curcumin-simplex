// RUTA: src/app/(components)/ui/TestimonialCard.tsx
import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  author: string;
  location: string;
  imageSrc: string; // Ex: "/images/testimonials/peggy.jpg"
}

/**
 * Card individual para exibir um testemunho.
 * @param quote - A citação do cliente.
 * @param author - O nome do cliente.
 * @param location - A localização do cliente (ex: cidade, estado).
 * @param imageSrc - O caminho para a foto do cliente.
 */
export function TestimonialCard({
  quote,
  author,
  location,
  imageSrc,
}: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-start">
        <Image
          src={imageSrc}
          alt={`Foto de ${author}`}
          width={60}
          height={60}
          className="rounded-full mr-4 border-2 border-brand-blue" // PONTO DE MELHORIA: `border-brand-cyan` não existe no seu config. Troquei por `border-brand-blue` que é uma cor definida e vibrante.
        />
        <div>
          <p className="text-gray-800 italic">{`"${quote}"`}</p>
          <p className="mt-4 font-bold text-brand-blue">{author}</p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
    </div>
  );
}
// RUTA: src/app/(components)/ui/TestimonialCard.tsx
