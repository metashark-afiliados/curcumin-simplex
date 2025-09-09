// RUTA: src/components/sections/DoubleScrollingBanner.tsx
"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Star } from "lucide-react";

// --- Interfaces para la estructura de datos ---

interface TestimonialItem {
  imageSrc: string;
  altText: string;
  name: string;
  rating: number;
}

// CORRECCIÓN: Se exporta la interfaz para que pueda ser usada externamente.
export interface LogoItem {
  imageSrc: string;
  altText: string;
}

export interface DoubleScrollingBannerProps {
  testimonials: TestimonialItem[];
  logos: LogoItem[];
}

// --- Sub-componente para renderizar las estrellas de calificación ---

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill={index < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
};

// --- Sub-componente para una tarjeta individual de testimonio ---

const TestimonialCard = ({
  imageSrc,
  altText,
  name,
  rating,
}: TestimonialItem) => (
  <div className="mx-4 flex w-64 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md">
    <Image
      src={imageSrc}
      alt={altText}
      width={80}
      height={80}
      className="h-20 w-20 rounded-full object-cover"
    />
    <p className="mt-3 text-center font-bold text-brand-text-dark">{name}</p>
    <div className="mt-1">
      <StarRating rating={rating} />
    </div>
  </div>
);

// --- Componente principal del banner doble ---

export function DoubleScrollingBanner({
  testimonials,
  logos,
}: DoubleScrollingBannerProps) {
  return (
    <section className="w-full bg-brand-almost-white py-12 overflow-x-hidden">
      <Marquee
        direction="left"
        speed={40}
        autoFill={true}
        pauseOnHover={true}
        gradient={false}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </Marquee>
      <div className="h-8" />
      <Marquee
        direction="right"
        speed={30}
        autoFill={true}
        pauseOnHover={true}
        gradient={false}
      >
        {logos.map((logo) => (
          <div
            key={logo.altText}
            className="mx-12 flex items-center justify-center"
          >
            <Image
              src={logo.imageSrc}
              alt={logo.altText}
              width={140}
              height={48}
              className="h-12 w-auto object-contain filter grayscale transition-all duration-300 hover:grayscale-0"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
// RUTA: src/components/sections/DoubleScrollingBanner.tsx
