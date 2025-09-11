// src/components/ui/DropdownMenu/Separator.tsx
"use client";
import * as React from "react";
export const Separator = React.forwardRef<HTMLDivElement, {}>((_, ref) => (
  <div ref={ref} className="my-1 h-px bg-white/10" role="separator" />
));
Separator.displayName = "DropdownMenuSeparator";
// src/components/ui/DropdownMenu/Separator.tsx
