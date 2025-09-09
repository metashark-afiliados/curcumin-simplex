// RUTA: src/app/(components)/ui/Button.tsx
import React from "react";
import Link from "next/link";

export interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  style?: React.CSSProperties; // <-- AÑADIMOS LA PROP STYLE
}

export function Button({
  children,
  href,
  variant,
  className = "",
  style, // <-- AÑADIMOS STYLE
}: ButtonProps) {
  const baseStyles =
    "inline-block px-8 py-3 text-lg text-center font-bold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2";

  const variantStyles = {
    primary:
      "bg-brand-success text-white hover:bg-brand-success-dark focus-visible:ring-brand-success",
    secondary:
      "bg-brand-primary text-white hover:bg-brand-primary-dark focus-visible:ring-brand-primary",
    outline:
      "border-2 border-gray-300 text-brand-text-light bg-transparent hover:bg-gray-100 hover:text-brand-text-dark focus-visible:ring-gray-400",
  };

  const classes = [baseStyles, variant ? variantStyles[variant] : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={classes} style={style}>
      {children}
    </Link>
  );
}
// RUTA: src/app/(components)/ui/Button.tsx
