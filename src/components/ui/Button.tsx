// src/components/ui/Button.tsx
/**
 * @file Button.tsx
 * @description Un componente de botón atómico y polimórfico con un sistema
 *              completo de variantes estilísticas y de tamaño.
 * @version 3.4.0
 * @dependencies react, next/link, clsx, tailwind-merge
 */
import React from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Definición de Variantes y Tamaños ---
const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  success: "bg-success text-success-foreground hover:bg-success/90",
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

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

// --- Definiciones de Tipos (Props) ---
type BaseButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

// Hereda todos los atributos de un <button> estándar.
type ButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

// Hereda todos los atributos de un <a> estándar.
type ButtonAsLink = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * @component Button
 * @description Renderiza un botón o un enlace con un conjunto completo de variantes
 *              estilísticas y de tamaño para máxima reutilización y consistencia.
 * @param {ButtonProps} props Las propiedades del componente.
 * @returns {React.ReactElement} El elemento JSX que representa el botón o enlace.
 */
export function Button(props: ButtonProps): React.ReactElement {
  const { variant = "default", size = "default", className, children } = props;
  console.log(
    `[Observabilidad] Renderizando Button (Variant: ${variant}, Size: ${size})`
  );

  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const finalClassName = twMerge(
    clsx(baseStyles, variants[variant], sizes[size], className)
  );

  if ("href" in props && props.href) {
    // Es un enlace
    const { className, variant, size, children, ...rest } = props;
    return (
      <Link className={finalClassName} {...rest}>
        {children}
      </Link>
    );
  } else {
    // Es un botón
    const { className, variant, size, children, ...rest } =
      props as ButtonAsButton;
    // La prop `type` ahora se pasa a través de `...rest`,
    // preservando su tipo correcto (`"button" | "submit" | ...`).
    return (
      <button className={finalClassName} {...rest}>
        {children}
      </button>
    );
  }
}
// src/components/ui/Button.tsx
