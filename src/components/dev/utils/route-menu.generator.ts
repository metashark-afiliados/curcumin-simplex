// src/components/dev/utils/route-menu.generator.tsx
/**
 * @file route-menu.generator.tsx
 * @description Aparato helper para generar la estructura de datos del menú de desarrollo.
 *              Refactorizado para utilizar un sistema de mapeo de iconos dinámico,
 *              desacoplando la lógica de datos de la presentación de la UI.
 *              Se ha renombrado a .tsx para corregir el error de sintaxis JSX.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { type LucideIconName } from "@/config/lucide-icon-names";
import { producerConfig } from "@/config/producer.config";
import { routes } from "@/lib/navigation";
import { type Locale } from "@/lib/i18n.config";
import { type Dictionary } from "@/lib/schemas/i18n.schema";

/**
 * @interface RouteItem
 * @description Define el nuevo contrato de datos para un ítem del menú.
 *              Ahora utiliza `iconName` en lugar de un elemento React.
 */
export interface RouteItem {
  name: string;
  path: string;
  iconName: LucideIconName; // <<-- MEJORA ARQUITECTÓNICA
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
 * @param {NonNullable<Dictionary["devRouteMenu"]>} dictionary - El diccionario de i18n.
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
          iconName: "FlaskConical",
        },
        {
          name: dictionary.campaignSimulator,
          path: routes.devCampaignSimulator.path({ locale }),
          iconName: "Rocket",
        },
        {
          name: dictionary.branding,
          path: routes.devBranding.path({ locale }),
          iconName: "LayoutDashboard",
        },
      ],
    },
    {
      groupName: dictionary.campaignPagesGroup,
      items: [
        {
          name: dictionary.campaignPage,
          path: routes.campaign.path({ locale, campaignId: CAMPAIGN_ID }),
          iconName: "Rocket",
        },
      ],
    },
    {
      groupName: dictionary.portalPagesGroup,
      items: [
        {
          name: dictionary.home,
          path: routes.home.path({ locale }),
          iconName: "Home",
        },
        {
          name: dictionary.store,
          path: routes.store.path({ locale }),
          iconName: "Store",
        },
        {
          name: dictionary.news,
          path: routes.news.path({ locale }),
          iconName: "Newspaper",
        },
        {
          name: dictionary.about,
          path: routes.about.path({ locale }),
          iconName: "Info",
        },
      ],
    },
    {
      groupName: dictionary.legalPagesGroup,
      items: [
        {
          name: dictionary.terms,
          path: routes.terms.path({ locale }),
          iconName: "BookCopy",
        },
        {
          name: dictionary.privacy,
          path: routes.privacy.path({ locale }),
          iconName: "Shield",
        },
        {
          name: dictionary.cookies,
          path: routes.cookies.path({ locale }),
          iconName: "Cookie",
        },
      ],
    },
  ];
}
// src/components/dev/utils/route-menu.generator.tsx
