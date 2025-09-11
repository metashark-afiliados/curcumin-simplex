// src/components/dev/DevToolsDropdown.tsx
/**
 * @file DevToolsDropdown.tsx
 * @description Orquestador de datos para el DevRouteMenu.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import { usePathname } from "next/navigation";
import { getCurrentLocaleFromPathname } from "@/lib/i18n.utils";
import { type Dictionary } from "@/lib/schemas/i18n.schema";
import { generateDevRoutes } from "./utils/route-menu.generator";
import { DevRouteMenu } from "./DevRouteMenu";

interface DevToolsDropdownProps {
  devDictionary: NonNullable<Dictionary["devRouteMenu"]>;
}

const DevToolsDropdown = ({ devDictionary }: DevToolsDropdownProps) => {
  const pathname = usePathname();
  const currentLocale = getCurrentLocaleFromPathname(pathname);

  // 1. Obtiene el diccionario.
  // 2. Obtiene el locale actual.
  // 3. Invoca al generador para crear la estructura de datos inteligente.
  const routeGroups = generateDevRoutes(devDictionary, currentLocale);

  // 4. Pasa la estructura de datos al componente de presentación.
  return <DevRouteMenu routeGroups={routeGroups} />;
};

export default DevToolsDropdown;
// src/components/dev/DevToolsDropdown.tsx