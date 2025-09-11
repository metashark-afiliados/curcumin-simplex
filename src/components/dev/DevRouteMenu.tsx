// src/components/dev/DevRouteMenu.tsx
/**
 * @file DevRouteMenu.tsx
 * @description Menú desplegable con rutas de desarrollo y herramientas.
 *              - v19.0.0: Refactorizado para importar desde la fachada pública
 *                atomizada de DropdownMenu, mejorando la mantenibilidad.
 * @version 19.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import { Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
// <<-- SOLUCIÓN: Se importa desde la API unificada del componente.
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { type RouteGroup } from "./utils/route-menu.generator";

interface DevRouteMenuProps {
  routeGroups: RouteGroup[];
}

export const DevRouteMenu = ({ routeGroups }: DevRouteMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="accent" size="sm">
          <Wrench className="mr-2 h-4 w-4" />
          Dev Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        {routeGroups.map((group) => (
          <DropdownMenuGroup key={group.groupName}>
            <DropdownMenuLabel>{group.groupName}</DropdownMenuLabel>
            {group.items.map((item) => (
              <Link href={item.path} key={item.path}>
                <DropdownMenuItem>
                  <DynamicIcon name={item.iconName} className="mr-3 h-4 w-4" />
                  <span>{item.name}</span>
                </DropdownMenuItem>
              </Link>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
// src/components/dev/DevRouteMenu.tsx
