// src/components/dev/utils/route-menu.generator.ts
/**
 * @file route-menu.generator.ts
 * @description Aparato de lógica pura para generar la estructura de datos del menú de desarrollo.
 *              - v6.0.0: Implementada lógica defensiva con encadenamiento opcional (`?.`) para
 *                prevenir errores de compilación y ejecución si una clave de ruta no existe
 *                en el manifiesto `navigation.ts`, resolviendo el error TS2339.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { type LucideIconName } from "@/config/lucide-icon-names";
import { producerConfig } from "@/config/producer.config";
import { routes } from "@/lib/navigation";
import { type Locale } from "@/lib/i18n.config";
import { type Dictionary } from "@/lib/schemas/i18n.schema";

export interface RouteItem {
  name: string;
  path: string;
  iconName: LucideIconName;
}

export interface RouteGroup {
  groupName: string;
  items: RouteItem[];
}

export function generateDevRoutes(
  dictionary: NonNullable<Dictionary["devRouteMenu"]>,
  locale: Locale
): RouteGroup[] {
  const CAMPAIGN_ID = producerConfig.LANDING_ID;

  // Helper para acceder de forma segura a las rutas
  const getSafePath = (
    route: ((params: any) => string) | undefined,
    params: any
  ): string => {
    return route ? route(params) : "#";
  };

  return [
    {
      groupName: dictionary.devToolsGroup,
      items: [
        {
          name: dictionary.componentCanvas,
          path: getSafePath((routes as any).dev?.path, { locale }),
          iconName: "FlaskConical",
        },
        {
          name: dictionary.campaignSimulator,
          path: getSafePath((routes as any).devSimulator?.path, { locale }),
          iconName: "Rocket",
        },
        {
          name: dictionary.branding,
          path: getSafePath(routes.devBranding?.path, { locale }),
          iconName: "LayoutDashboard",
        },
      ],
    },
    {
      groupName: dictionary.campaignPagesGroup,
      items: [
        {
          name: dictionary.campaignPage,
          path: getSafePath((routes as any).campaignsByCampaignId?.path, {
            locale,
            campaignId: CAMPAIGN_ID,
          }),
          iconName: "Rocket",
        },
      ],
    },
    {
      groupName: dictionary.portalPagesGroup,
      items: [
        {
          name: dictionary.home,
          path: getSafePath(routes.home?.path, { locale }),
          iconName: "Home",
        },
        {
          name: dictionary.store,
          path: getSafePath(routes.store?.path, { locale }),
          iconName: "Store",
        },
        {
          name: dictionary.news,
          path: getSafePath(routes.news?.path, { locale }),
          iconName: "Newspaper",
        },
        {
          name: dictionary.about,
          path: getSafePath(routes.about?.path, { locale }),
          iconName: "Info",
        },
      ],
    },
    {
      groupName: dictionary.legalPagesGroup,
      items: [
        {
          name: dictionary.terms,
          path: getSafePath(routes.terms?.path, { locale }),
          iconName: "BookCopy",
        },
        {
          name: dictionary.privacy,
          path: getSafePath(routes.privacy?.path, { locale }),
          iconName: "Shield",
        },
        {
          name: dictionary.cookies,
          path: getSafePath(routes.cookies?.path, { locale }),
          iconName: "Cookie",
        },
      ],
    },
  ];
}
// src/components/dev/utils/route-menu.generator.ts
