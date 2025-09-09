// src/components/layout/Header.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * @file Header.tsx
 * @description Componente de presentación para el encabezado principal del sitio.
 * @version 2.2.0
 * @date 2025-09-09
 * @dependencies react, next/image, next/link, @/components/ui/Button, @/components/ui/Container
 *
 * @prop {string} ctaText - Texto para el botón de llamada a la acción.
 * @prop {string} affiliateUrl - URL de afiliado para el CTA.
 * @prop {string} logoUrl - URL de la imagen del logo.
 * @prop {string} logoAlt - Texto alternativo para el logo.
 * @prop {string} homeAriaLabel - Etiqueta ARIA para el enlace del logo.
 */

interface HeaderProps {
  ctaText: string;
  affiliateUrl: string;
  logoUrl: string;
  logoAlt: string;
  homeAriaLabel: string;
}

/**
 * @component Header
 * @description Renderiza el encabezado principal de la página. Es un componente de presentación
 * puro que recibe todo su contenido a través de props.
 * @param {HeaderProps} props Las propiedades con el contenido textual y las URLs.
 * @returns {React.ReactElement} El elemento JSX que representa el encabezado.
 */
export function Header({
  ctaText,
  affiliateUrl,
  logoUrl,
  logoAlt,
  homeAriaLabel,
}: HeaderProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando Header");

  return (
    <header className="py-4">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label={homeAriaLabel}>
            <div className="relative h-12 w-48" role="img" aria-label={logoAlt}>
              <Image
                src={logoUrl}
                alt={logoAlt}
                fill
                className="object-contain"
                sizes="192px"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Button
              href={affiliateUrl}
              className="text-sm px-6 py-2.5 text-white bg-blue-700 hover:bg-blue-800"
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}

// src/components/layout/Header.tsx
