// src/components/dev/DevRouteMenu.tsx
/**
 * @file DevRouteMenu.tsx
 * @description Menú de Navegación de Rutas de Desarrollo.
 *              Refactorizado para consumir la SSoT de utilidades de i18n,
 *              eliminando la lógica duplicada de detección de locale.
 * @devonly
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { Fragment, useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Globe, ChevronDown, ExternalLink } from "lucide-react";
import { clientLogger } from "@/lib/logging";
import { getCurrentLocaleFromPathname } from "@/lib/i18n.utils"; // <<-- MEJORA: Importa desde SSoT
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { twMerge } from "tailwind-merge";
import {
  generateDevRoutes,
  type RouteGroup,
  type RouteItem,
} from "./utils/route-menu.generator";

interface DevRouteMenuProps {
  dictionary: NonNullable<Dictionary["devRouteMenu"]>;
  className?: string;
}

export function DevRouteMenu({
  dictionary,
  className,
}: DevRouteMenuProps): React.ReactElement {
  clientLogger.info("[DevRouteMenu] Renderizando componente de presentación");
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // <<-- MEJORA: Lógica de detección de locale ahora es una llamada a la SSoT.
  const currentLocale = getCurrentLocaleFromPathname(pathname);
  const devRoutes = generateDevRoutes(dictionary, currentLocale);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (path: string) => {
    clientLogger.info(`[DevRouteMenu] Navegando a: ${path}`);
    router.push(path);
    setIsOpen(false);
  };

  const MenuSection = ({ group }: { group: RouteGroup }) => (
    <>
      <div className="px-4 pt-3 pb-1 text-xs font-semibold uppercase text-muted-foreground">
        {group.groupName}
      </div>
      {group.items.map((routeItem: RouteItem) => (
        <button
          key={routeItem.path}
          onClick={() => handleNavigation(routeItem.path)}
          className={twMerge(
            "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors",
            pathname === routeItem.path
              ? "bg-primary/10 font-semibold text-primary"
              : "text-foreground hover:bg-muted"
          )}
          role="menuitem"
        >
          <span className="flex items-center gap-2">
            {routeItem.icon}
            {routeItem.name}
          </span>
          <ExternalLink className="h-4 w-4 text-muted-foreground opacity-50" />
        </button>
      ))}
    </>
  );

  return (
    <div ref={menuRef} className={twMerge("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe size={18} />
        <span className="text-sm font-medium">
          {currentLocale.toUpperCase()}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-background py-2 shadow-2xl ring-1 ring-white/10 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="max-h-[70vh] overflow-y-auto">
            {devRoutes.map((group) => (
              <MenuSection key={group.groupName} group={group} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
// src/components/dev/DevRouteMenu.tsx