// src/components/ui/Container.tsx

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  // Solución: Usamos un array y filtramos los valores vacíos antes de unirlos.
  // Esto garantiza que no haya espacios extra al principio o al final.
  const classes = [
    "w-full",
    "max-w-7xl",
    "mx-auto",
    "px-4",
    "sm:px-6",
    "lg:px-8",
    className,
  ]
    .filter(Boolean) // Filtra strings vacíos, null o undefined
    .join(" ");

  return <div className={classes}>{children}</div>;
}
