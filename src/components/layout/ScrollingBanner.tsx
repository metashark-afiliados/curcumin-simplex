// RUTA: src/app/(components)/layout/ScrollingBanner.tsx
"use client";

import Marquee from "react-fast-marquee";
import { AlertTriangle } from "lucide-react";

interface ScrollingBannerProps {
  message: string;
  // Hacemos el estilo opcional para que pueda usar los valores por defecto o los personalizados
  style?: React.CSSProperties;
}

export function ScrollingBanner({ message, style }: ScrollingBannerProps) {
  // Clases base que no cambian
  const baseClasses = "py-2 text-sm font-bold text-white";

  // Estilos por defecto si no se pasan estilos personalizados
  const defaultStyle = {
    background: "linear-gradient(to right, #F97316, #EF4444, #F97316)", // Naranja/Rojo de la paleta anterior
  };

  return (
    <div className={baseClasses} style={style || defaultStyle}>
      <Marquee speed={50} autoFill={true}>
        <div className="flex items-center mx-12">
          <AlertTriangle className="h-4 w-4 mr-3 flex-shrink-0" />
          <span className="uppercase tracking-wider">{message}</span>
        </div>
      </Marquee>
    </div>
  );
}
// RUTA: src/app/(components)/layout/ScrollingBanner.tsx
