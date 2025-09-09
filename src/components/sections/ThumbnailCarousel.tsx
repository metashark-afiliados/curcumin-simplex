// RUTA: src/components/sections/ThumbnailCarousel.tsx
/**
 * @file Thumbnail Carousel Component
 * @description Displays a series of thumbnail images with a smooth cross-fade
 * transition effect, cycling automatically. Includes interactive hover effects
 * and maintains a 16:9 aspect ratio. Inactive images are partially transparent.
 *
 * @author Your Name
 * @version 1.2.0
 */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export interface Thumbnail {
  src: string;
  alt: string;
}

interface ThumbnailCarouselProps {
  thumbnails: Thumbnail[];
  affiliateUrl: string;
  interval?: number;
}

export function ThumbnailCarousel({
  thumbnails,
  affiliateUrl,
  interval = 3000,
}: ThumbnailCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!thumbnails || thumbnails.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnails.length);
    }, interval);
    return () => clearInterval(timer);
  }, [thumbnails, interval]);

  if (!thumbnails || thumbnails.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="relative aspect-video w-full group rounded-lg overflow-hidden border-4 border-white shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1">
        {thumbnails.map((thumbnail, index) => (
          <Image
            key={thumbnail.src}
            src={thumbnail.src}
            alt={thumbnail.alt}
            fill
            // MEJORA: Las imágenes inactivas ahora tienen opacidad 20% en lugar de 0%
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-20"
            }`}
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 650px"
          />
        ))}
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/20">
          <Button
            href={affiliateUrl}
            className="p-0 bg-transparent shadow-none hover:scale-110 transition-transform duration-300"
            aria-label="Watch the video presentation"
          >
            <div className="bg-black/50 rounded-full p-6 backdrop-blur-sm">
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
              </svg>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
