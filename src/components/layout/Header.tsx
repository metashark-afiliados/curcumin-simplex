// src/components/layout/Header.tsx
/**
 * @file Header.tsx
 * @description Componente de cabecera principal.
 *              - v15.1.0: Resuelve el error TS2741 pasando la prop
 *                `devDictionary` requerida al componente `DevToolsDropdown`.
 * @version 15.1.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import DevToolsDropdown from "../dev/DevToolsDropdown";
import Image from "next/image";

interface HeaderProps {
  content: Dictionary["header"];
  devDictionary: Dictionary["devRouteMenu"]; // <<-- Prop necesaria
}

const Header = ({ content, devDictionary }: HeaderProps) => {
  console.log("[Observabilidad] Renderizando Header con props de contenido.");

  if (!content) {
    return null;
  }

  const { logoUrl, logoAlt, navLinks, ctaButton } = content;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between bg-background/80 px-4 backdrop-blur-sm md:px-6 border-b border-white/10">
      <Link href="/" className="mr-6 flex items-center">
        <Image
          src={logoUrl}
          alt={logoAlt}
          width={150}
          height={28}
          className="h-7 w-auto"
          priority
        />
        <span className="sr-only">{logoAlt}</span>
      </Link>

      <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
        {navLinks.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {route.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4 ml-auto">
        <Button href={ctaButton.href} variant="accent" size="sm">
          {ctaButton.label}
        </Button>

        {/* <<-- CORRECCIÓN: Se pasa la prop requerida `devDictionary` --> */}
        {process.env.NODE_ENV === "development" && devDictionary && (
          <DevToolsDropdown devDictionary={devDictionary} />
        )}
      </div>
    </header>
  );
};

export default Header;
// src/components/layout/Header.tsx
