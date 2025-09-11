// src/components/ui/DropdownMenu/Item.tsx
"use client";
import * as React from "react";
import { twMerge } from "tailwind-merge";
export const Item = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      "flex items-center px-4 py-2 text-sm text-foreground/80 hover:bg-muted/50 hover:text-foreground cursor-pointer transition-colors",
      className
    )}
    role="menuitem"
  >
    {children}
  </div>
));
Item.displayName = "DropdownMenuItem";
// src/components/ui/DropdownMenu/Item.tsx
