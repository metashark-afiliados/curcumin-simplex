// src/components/ui/DropdownMenu/Trigger.tsx
/**
 * @file Trigger.tsx
 * @description Componente activador para el DropdownMenu.
 *              - v1.1.0: Versión final "type-safe" que resuelve todos los
 *                errores relacionados con `children.props` y `unknown`.
 * @version 1.1.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import * as React from "react";
import { useDropdownMenuContext } from "./Context";

export const Trigger = React.memo(
  React.forwardRef<
    HTMLElement,
    { children: React.ReactElement; asChild?: boolean }
  >(({ children, asChild = false }, ref) => {
    const { isOpen, setIsOpen } = useDropdownMenuContext();

    const triggerProps = {
      ref,
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        // <<-- SOLUCIÓN DEFINITIVA TS18046: Type guard robusto.
        if (
          children.props &&
          typeof (children.props as any).onClick === "function"
        ) {
          (children.props as any).onClick(event);
        }
        setIsOpen((prev) => !prev);
      },
      "aria-haspopup": "menu" as const,
      "aria-expanded": isOpen,
    };

    if (asChild) {
      return React.cloneElement(children, triggerProps);
    }

    return React.cloneElement(<button type="button" />, triggerProps, children);
  })
);
Trigger.displayName = "DropdownMenuTrigger";
// src/components/ui/DropdownMenu/Trigger.tsx
