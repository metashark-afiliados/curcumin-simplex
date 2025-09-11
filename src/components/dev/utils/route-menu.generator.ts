// src/components/dev/utils/route-menu.generator.ts
/**
 * @file route-menu.generator.ts
 * @description Aparato helper para generar la estructura de datos del menú de desarrollo.
 *              CORRECCIÓN CRÍTICA: Se ha corregido la sintaxis de instanciación de los
 *              iconos a JSX (<Icono />), resolviendo múltiples errores de TypeScript
 *              (TS2749, TS1005, TS2304, TS2353) y alineando el código con las
 *              prácticas de React y el manifiesto de Lucide.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import {
  FlaskConical,
  LayoutDashboard,
  Rocket,
  BookCopy,
  Shield,
  Cookie,
  Home,
  Store,
  Newspaper,
  Info,
} from "lucide-react";
import { routes } from "@/lib/navigation";
import { producerConfig } from "@/config/producer.config";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";

/**
 * @interface RouteItem
 * @description Define la estructura de un único enlace en el menú.
 */
export interface RouteItem {
  name: string;
  path: string;
  icon: React.ReactElement;
}

/**
 * @interface RouteGroup
 * @description Define la estructura de un grupo de enlaces en el menú.
 */
export interface RouteGroup {
  groupName: string;
  items: RouteItem[];
}

/**
 * @function generateDevRoutes
 * @description Construye la estructura de datos completa para el DevRouteMenu.
 * @param {NonNullable<Dictionary["devRouteMenu"]>} dictionary - El diccionario de i18n para el componente.
 * @param {Locale} locale - El locale actual para construir las URLs.
 * @returns {RouteGroup[]} El array de grupos de rutas para renderizar.
 */
export function generateDevRoutes(
  dictionary: NonNullable<Dictionary["devRouteMenu"]>,
  locale: Locale
): RouteGroup[] {
  const CAMPAIGN_ID = producerConfig.LANDING_ID;

  return [
    {
      groupName: dictionary.devToolsGroup,
      items: [
        {
          name: dictionary.componentCanvas,
          path: routes.devComponentCanvas.path({ locale }),
          // <<-- CORRECCIÓN: Sintaxis JSX correcta
          icon: <FlaskConical className="h-4 w-4 text-emerald-500" />,
        },
        {
          name: dictionary.campaignSimulator,
          path: routes.devCampaignSimulator.path({ locale }),
          // <<-- CORRECCIÓN: Sintaxis JSX correcta
          icon: <Rocket className="h-4 w-4 text-sky-500" />,
        },
        {
          name: dictionary.branding,
          path: routes.devBranding.path({ locale }),
          // <<-- CORRECCIÓN: Sintaxis JSX correcta
          icon: <LayoutDashboard className="h-4 w-4 text-indigo-500" />,
        },
      ],
    },
    {
      groupName: dictionary.campaignPagesGroup,
      items: [
        {
          name: dictionary.campaignPage,
          path: routes.campaign.path({ locale, campaignId: CAMPAIGN_ID }),
          // <<-- CORRECCIÓN: Sintaxis JSX correcta
          icon: <Rocket className="h-4 w-4 text-rose-500" />,
        },
      ],
    },
    {
      groupName: dictionary.portalPagesGroup,
      items: [
        {
          name: dictionary.home,
          path: routes.home.path({ locale }),
          // <<-- CORRECCIÓN: Sintaxis JSX correcta
          icon: <Home className="h-4 w-4 text-gray-400" />,
        },
        {
          name: dictionary.store,
          path: routes.store.path({ locale }),
          // <<-- CORRECCIÓN: Sintaxis JSX correcta
          icon: <Store className="h-4 w-4 text-gray-400" />,
        },
        {
          name: dictionary.news,
          path: routes.news.path({ locale }),
          // <<-- CORRECCIÓN: Sintaxis JSX correcta
          icon: <Newspaper className="h-4 w-4 text-gray-400" />,
        },
        {
          name: dictionary.about,
          path: routes.about.path({ locale }),
          // <<-- CORRECCIÓN: Sintaxis JSX correcta
          icon: <Info className="h-4 w-4 text-gray-400" />,
        },
      ],
    },
    {
      groupName: dictionary.legalPagesGroup,
      items: [
        {
          name: dictionary.terms,
          path: routes.terms.path({ locale }),
          // <<-- CORRECCIÓN: Sintaxis JSX correcta
          icon: <BookCopy className="h-4 w-4 text-gray-400" />,
        },
        {
          name: dictionary.privacy,
          path: routes.privacy.path({ locale }),
          // <<-- CORRECCIÓN: Sintaxis JSX correcta
          icon: <Shield className="h-4 w-4 text-gray-400" />,
        },
        {
          name: dictionary.cookies,
          path: routes.cookies.path({ locale }),
          // <<-- CORRECCIÓN: Sintaxis JSX correcta
          icon: <Cookie className="h-4 w-4 text-gray-400" />,
        },
      ],
    },
  ];
}
// src/components/dev/utils/route-menu.generator.ts