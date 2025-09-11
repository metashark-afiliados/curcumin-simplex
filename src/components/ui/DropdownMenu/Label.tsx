// src/components/ui/DropdownMenu/Label.tsx
"use client";
import * as React from "react";
import { twMerge } from "tailwind-merge";
export const Label = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      "px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
      className
    )}
  >
    {children}
  </div>
));
Label.displayName = "DropdownMenuLabel";
// src/components/ui/DropdownMenu/Label.tsx
