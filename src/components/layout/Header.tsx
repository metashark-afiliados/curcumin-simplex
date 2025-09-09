// RUTA: src/components/layout/Header.tsx
/**
 * @file Site Header Component
 * @description Renders the main header for a campaign, featuring a brand logo,
 * a language switcher, and a primary call-to-action button. Includes a guard
 * clause to prevent rendering an Image with an empty src attribute.
 *
 * @author Your Name
 * @version 2.2.0
 */
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface HeaderProps {
  logoUrl: string;
  ctaText: string;
  affiliateUrl: string;
}

export function Header({ logoUrl, ctaText, affiliateUrl }: HeaderProps) {
  return (
    <Container>
      <div className="flex h-20 items-center justify-between">
        {/*
         * Renderiza el logo como un enlace a la página principal.
         * Incluye una comprobación para evitar errores si `logoUrl` está vacía.
         */}
        {logoUrl ? (
          <Link href="/" aria-label="Homepage">
            <div
              className="relative h-10 w-48"
              role="img"
              aria-label="Change Your Life brand logo"
            >
              <Image
                src={logoUrl}
                alt="Change Your Life Logo"
                fill
                className="object-contain"
                sizes="200px"
                priority
              />
            </div>
          </Link>
        ) : (
          // Fallback: Si no hay logo, se renderiza un div vacío para mantener el layout.
          <div></div>
        )}

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <div className="h-8 w-px bg-white/20" aria-hidden="true"></div>{" "}
          {/* Separador visual decorativo */}
          <Button
            href={affiliateUrl}
            className="text-sm px-6 py-2 text-white"
            style={{ backgroundColor: "#1e3a8a" }} // Azul oscuro elegante
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </Container>
  );
}
