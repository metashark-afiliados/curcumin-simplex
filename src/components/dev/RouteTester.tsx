// RUTA: src/components/dev/RouteTester.tsx
/**
 * @file Menú de Navegación de Rutas de Desarrollo.
 * @description Componente que renderiza un menú desplegable con todas las rutas clave
 * del proyecto para facilitar la navegación durante el desarrollo.
 * @devonly
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 */
"use client";

import React, { Fragment } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronRight, ExternalLink, Palette } from "lucide-react";

interface RouteMenuProps {
  onNavigate: () => void;
}

export function RouteMenu({ onNavigate }: RouteMenuProps) {
  const router = useRouter();
  const pathname = usePathname();

  const CAMPAIGN_NAMES = ["mitolyn"];
  const routes = [
    {
      group: "DEV TOOLS",
      items: [
        {
          name: "Campaign Design Suite",
          path: "/developers/branding",
          icon: <Palette className="h-4 w-4 text-indigo-500" />,
        },
      ],
    },
    {
      group: "CAMPAIGN PAGES",
      items: CAMPAIGN_NAMES.flatMap((name) => [
        {
          name: `Bridge Page (${name})`,
          path: `/campaigns/${name}`,
          icon: <ChevronRight className="h-4 w-4 text-gray-400" />,
        },
        {
          name: `Review Page (${name})`,
          path: `/campaigns/${name}/review`,
          icon: <ChevronRight className="h-4 w-4 text-gray-400" />,
        },
      ]),
    },
    {
      group: "LEGAL PAGES",
      items: [
        { name: "Termos", path: "/termos", icon: null },
        { name: "Privacidade", path: "/privacidade", icon: null },
        { name: "Cookies", path: "/cookies", icon: null },
      ],
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    onNavigate();
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-80 origin-top-right rounded-md bg-white py-2 shadow-2xl ring-1 ring-black ring-opacity-5">
      <div className="max-h-[70vh] overflow-y-auto">
        {routes.map((group) => (
          <Fragment key={group.group}>
            <div className="px-4 pt-3 pb-1 text-xs font-semibold uppercase text-gray-500">
              {group.group}
            </div>
            {group.items.map((route) => (
              <button
                key={route.path}
                onClick={() => handleNavigation(route.path!)}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                  pathname === route.path
                    ? "bg-blue-500/10 font-semibold text-blue-600"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                <span className="flex items-center gap-2">
                  {route.icon || (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                  {route.name}
                </span>
                <ExternalLink className="h-4 w-4 text-gray-400 opacity-50" />
              </button>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

// --- MEJORAS FUTURAS ---
// 1. **Generación Dinámica de Campañas**: Recibir `labCampaigns` como prop para generar la lista dinámicamente.
// 2. **Buscador de Rutas**: Añadir un input de búsqueda para filtrar las rutas.

// RUTA: src/components/dev/RouteTester.tsx
