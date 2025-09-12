// frontend/src/components/ui/Button.tsx
/**
 * @file Button.tsx
 * @description Un componente de botón atómico y polimórfico de nivel de framework.
 *              Implementa el patrón `asChild` para una composición flexible,
 *              permitiendo que los estilos y comportamientos del botón se apliquen
 *              a sus hijos directos.
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/ui/Button.tsx.md
 */
import React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Definición de Variantes y Tamaños ---
const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  success: "bg-green-500 text-white hover:bg-green-600", // Ejemplo, no en theme
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

// --- Tipos y Contratos ---
type BaseButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
};

type ButtonAsButton = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: never;
  };

type ButtonAsLink = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

// --- Componente Principal ---
export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "default",
      size = "default",
      className,
      asChild = false,
      ...props
    },
    ref
  ) => {
    console.log(
      `[Observabilidad] Renderizando Button (Variant: ${variant}, Size: ${size})`
    );

    const baseStyles =
      "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const finalClassName = twMerge(
      clsx(baseStyles, variants[variant], sizes[size], className)
    );

    if ("href" in props && props.href !== undefined) {
      const Comp = asChild ? Slot : Link;
      return (
        <Comp
          className={finalClassName}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }

    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={finalClassName}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  }
);
Button.displayName = "Button";
// frontend/src/components/ui/Button.tsx
