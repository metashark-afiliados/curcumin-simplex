// src/components/ui/DropdownMenu/Group.tsx
"use client";
import * as React from "react";
export const Group = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => (
  <div ref={ref} role="group">
    {children}
  </div>
));
Group.displayName = "DropdownMenuGroup";
// src/components/ui/DropdownMenu/Group.tsx

