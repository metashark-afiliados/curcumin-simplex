// src/components/ui/DynamicIcon.tsx
/**
 * @file DynamicIcon.tsx
 * @description Componente de UI atómico y de alto rendimiento para renderizado
 *              isomorfo de iconos. Refactorizado para importar correctamente la
 *              utilidad 'cn' desde el manifiesto de módulo de utilidades.
 * @version 1.3.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import dynamic from "next/dynamic";
import React, { memo } from "react";
import { icons, Loader2, HelpCircle, type LucideProps } from "lucide-react";
import { type LucideIconName } from "@/config/lucide-icon-names";
import { clientLogger } from "@/lib/logging";
import { cn } from "@/lib/utils"; // <<-- RUTA CORREGIDA Y AHORA VÁLIDA

const pascalToCamelCase = (str: string): keyof typeof icons => {
  return (str.charAt(0).toLowerCase() + str.slice(1)) as keyof typeof icons;
};

interface DynamicIconProps extends LucideProps {
  name: LucideIconName;
}

const fallbackIcon = (className?: string): React.ReactElement => (
  <HelpCircle
    className={cn("h-4 w-4 text-destructive", className)}
    aria-label="Icono no disponible"
  />
);

export const DynamicIcon = memo(
  ({ name, className, ...props }: DynamicIconProps): React.ReactElement => {
    const iconNameInCamelCase = pascalToCamelCase(name);

    const LucideIcon = dynamic(
      async () => {
        try {
          const iconComponent = icons[iconNameInCamelCase];
          if (!iconComponent) {
            throw new Error(
              `Icono '${name}' (camelCase: '${iconNameInCamelCase}') no encontrado en 'lucide-react'.`
            );
          }
          return iconComponent;
        } catch (error) {
          clientLogger.error(
            `[DynamicIcon] Error al cargar el icono '${name}'.`,
            { error }
          );
          const FallbackComponent = () => fallbackIcon(className);
          FallbackComponent.displayName = "IconFallback";
          return FallbackComponent;
        }
      },
      {
        loading: () => (
          <Loader2 className={cn("h-4 w-4 animate-spin", className)} />
        ),
        ssr: true,
      }
    ) as React.ComponentType<LucideProps>;

    return <LucideIcon className={className} {...props} />;
  }
);

DynamicIcon.displayName = "DynamicIcon";
// src/components/ui/DynamicIcon.tsx
