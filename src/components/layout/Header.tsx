// src/components/layout/Header.tsx
/**
 * @file Header.tsx
 * @description Encabezado principal del portal Global Fitwell.
 * @version 4.0.0
 */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Rocket } from "lucide-react";

interface HeaderProps {
  campaignPills: { label: string; href: string }[];
  ctaButton: string;
  logoUrl: string;
  logoAlt: string;
}

export function Header({
  campaignPills,
  ctaButton,
  logoUrl,
  logoAlt,
}: HeaderProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando Header del Portal");

  return (
    <header className="py-3 sticky top-0 z-50 backdrop-blur-lg bg-background/70 border-b border-muted/50">
      <Container>
        <div className="flex h-16 items-center justify-between gap-8">
          <Link href="/" aria-label={logoAlt} className="flex-shrink-0">
            <div className="relative h-10 w-40" role="img" aria-label={logoAlt}>
              <Image
                src={logoUrl}
                alt={logoAlt}
                fill
                className="object-contain"
                priority
                sizes="160px"
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            {campaignPills.map((pill) => (
              <Button
                key={pill.href}
                href={pill.href}
                variant="secondary"
                size="sm"
                className="rounded-full"
              >
                <Rocket className="h-4 w-4 mr-2" />
                {pill.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <Button
              href="/join"
              variant="accent"
              size="sm"
              className="shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-shadow"
            >
              {ctaButton}
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
// src/components/layout/Header.tsx
