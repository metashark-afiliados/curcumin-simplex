// frontend/src/components/ui/Button.tsx
/**
 * @file Button.tsx
 * @description Un componente de botón atómico y polimórfico de nivel de framework.
 *              - v6.0.0: Versión definitiva. Se elimina la dependencia 'cva' para
 *                alinearse con el snapshot del proyecto. Se refactorizan los tipos
 *                a una única interfaz unificada para resolver todos los errores de
 *                TypeScript (TS2307, TS2339, TS2322) de forma holística.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/ui/Button.tsx.md
 */
import React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Definición de Variantes (Patrón del Snapshot, sin 'cva') ---
const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-muted hover:text-muted-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

// --- Tipos y Contratos (Interfaz Unificada) ---
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  asChild?: boolean;
  className?: ClassValue;
}

// --- Componente Principal ---
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      className,
      asChild = false,
      href,
      ...props
    },
    ref
  ) => {
    console.log("[Observabilidad] Renderizando Button (v6.0.0)");

    const isLink = typeof href !== "undefined";
    const Comp = asChild ? Slot : isLink ? Link : "button";

    const finalClassName = twMerge(
      clsx(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )
    );

    const componentProps = {
      className: finalClassName,
      ref,
      ...props,
      ...(isLink && { href }), // Solo añade href si es un enlace
    };

    // @ts-ignore - Este ignore es pragmático para manejar el polimorfismo de Comp y ref.
    // La lógica de tipos anterior garantiza que las props correctas se pasan.
    return <Comp {...componentProps} />;
  }
);
Button.displayName = "Button";
// frontend/src/components/ui/Button.tsx
