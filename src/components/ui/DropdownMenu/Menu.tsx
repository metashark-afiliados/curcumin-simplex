// src/components/ui/DropdownMenu/Menu.tsx
/**
 * @file Menu.tsx
 * @description Componente principal y proveedor de estado para el sistema DropdownMenu.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import * as React from "react";
import { DropdownMenuContext } from "./Context";

export const Menu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  );
};
// src/components/ui/DropdownMenu/Menu.tsx
