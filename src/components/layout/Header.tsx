// src/components/layout/Header.tsx
/**
 * @file Header.tsx
 * @description Header profesional y multifuncional para el portal.
 *              Corregidas importaciones y tipado para resolver errores TS.
 * @version 5.1.0
 * @author RaZ podesta - MetaShark Tech (UI/UX Role)
 */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion"; // <<-- CORRECCIÓN: Se añade AnimatePresence
import { ChevronDown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { clientLogger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

type NavLink = NonNullable<Dictionary["header"]>["navLinks"][number];

const NavItem = ({ link }: { link: NavLink }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (link.subLinks && link.subLinks.length > 0) {
    return (
      <div
        className="relative group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button className="inline-flex items-center gap-1 font-medium text-foreground/80 hover:text-primary transition-colors">
          {link.label}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-48 bg-background border border-white/10 rounded-lg shadow-lg py-2"
            >
              {/* <<-- CORRECCIÓN: Tipado explícito en map --> */}
              {link.subLinks.map((subLink: NavLink) => (
                <Link
                  key={subLink.href}
                  href={subLink.href}
                  className="block px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary"
                >
                  {subLink.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      href={link.href}
      className="font-medium text-foreground/80 hover:text-primary transition-colors"
    >
      {link.label}
    </Link>
  );
};

// <<-- CORRECCIÓN: La prop ahora es un único objeto `content`
interface HeaderProps {
  content: Dictionary["header"];
}

export function Header({ content }: HeaderProps): React.ReactElement | null {
  clientLogger.info("[Observabilidad] Renderizando Header Profesional");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!content) return null;
  const { logoUrl, logoAlt, navLinks, ctaButton } = content;

  return (
    <>
      <header className="py-3 sticky top-0 z-50 backdrop-blur-lg bg-background/70 border-b border-muted/50">
        <Container>
          <div className="flex h-16 items-center justify-between gap-8">
            <Link href="/" aria-label={logoAlt} className="flex-shrink-0">
              <div
                className="relative h-10 w-40"
                role="img"
                aria-label={logoAlt}
              >
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

            <nav className="hidden md:flex items-center gap-6">
              {/* <<-- CORRECCIÓN: Tipado explícito en map --> */}
              {navLinks.map((link: NavLink) => (
                <NavItem key={link.label} link={link} />
              ))}
            </nav>

            <div className="flex items-center gap-4 ml-auto">
              <Button
                href={ctaButton.href}
                variant="accent"
                size="sm"
                className="shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-shadow"
              >
                <Rocket className="h-4 w-4 mr-2" />
                {ctaButton.label}
              </Button>
            </div>
          </div>
        </Container>
        <motion.div className="h-1 bg-primary origin-left" style={{ scaleX }} />
      </header>
    </>
  );
}
// src/components/layout/Header.tsx
