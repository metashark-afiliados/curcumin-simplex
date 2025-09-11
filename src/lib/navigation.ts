// src/lib/navigation.ts
/**
 * @file navigation.ts
 * @description Manifiesto y SSoT para la definición de rutas.
 *              ACTUALIZACIÓN: Añadidas las rutas para las páginas legales
 *              (terms, privacy, cookies) para ser consumidas por el DevRouteMenu.
 * @version 1.7.0
 * @author RaZ podesta - MetaShark Tech
 */
import { defaultLocale, type Locale } from "@/lib/i18n.config";

export const RouteType = {
  Public: "public",
  Guest: "guest",
  Protected: "protected",
  DevOnly: "dev-only",
} as const;

export type RouteType = (typeof RouteType)[keyof typeof RouteType];

type RouteParams = {
  locale?: Locale;
  [key: string]: string | number | undefined;
};

export interface RouteConfig {
  path: (params?: RouteParams) => string;
  type: RouteType;
}

export const routes = {
  // --- Rutas Públicas ---
  home: {
    path: (params?: { locale?: Locale }) =>
      `/${params?.locale || defaultLocale}`,
    type: RouteType.Public,
  },
  about: {
    path: (params?: { locale?: Locale }) =>
      `/${params?.locale || defaultLocale}/about`,
    type: RouteType.Public,
  },
  store: {
    path: (params?: { locale?: Locale }) =>
      `/${params?.locale || defaultLocale}/store`,
    type: RouteType.Public,
  },
  news: {
    path: (params?: { locale?: Locale }) =>
      `/${params?.locale || defaultLocale}/news`,
    type: RouteType.Public,
  },
  newsArticle: {
    path: (params: { locale: Locale; slug: string }) =>
      `/${params.locale}/news/${params.slug}`,
    type: RouteType.Public,
  },
  campaign: {
    path: (params: { locale: Locale; campaignId: string }) =>
      `/${params.locale}/campaigns/${params.campaignId}`,
    type: RouteType.Public,
  },
  terms: {
    path: (params?: { locale?: Locale }) =>
      `/${params?.locale || defaultLocale}/terms`,
    type: RouteType.Public,
  },
  privacy: {
    path: (params?: { locale?: Locale }) =>
      `/${params?.locale || defaultLocale}/privacy`,
    type: RouteType.Public,
  },
  cookies: {
    path: (params?: { locale?: Locale }) =>
      `/${params?.locale || defaultLocale}/cookies`,
    type: RouteType.Public,
  },

  // --- Rutas de Desarrollo ---
  devDashboard: {
    path: (params?: { locale?: Locale }) =>
      `/${params?.locale || defaultLocale}/dev`,
    type: RouteType.DevOnly,
  },
  devComponentCanvas: {
    path: (params?: { locale?: Locale }) =>
      `/${params?.locale || defaultLocale}/dev/components`,
    type: RouteType.DevOnly,
  },
  devComponentDetail: {
    path: (params: { locale: Locale; componentName: string }) =>
      `/${params.locale}/dev/components/${params.componentName}`,
    type: RouteType.DevOnly,
  },
  devCampaignSimulator: {
    path: (params?: { locale?: Locale }) =>
      `/${params?.locale || defaultLocale}/dev/simulator`,
    type: RouteType.DevOnly,
  },
  devBranding: {
    path: (params?: { locale?: Locale }) =>
      `/${params?.locale || defaultLocale}/dev/branding`,
    type: RouteType.DevOnly,
  },
} as const;

// Constantes para el middleware (si se reactiva en el futuro)
export const publicRoutes: string[] = [
  routes.home.path(),
  routes.about.path(),
  routes.store.path(),
  routes.news.path(),
];

export const authRoutes: string[] = []; // No hay rutas de autenticación aún

export const DEFAULT_LOGIN_REDIRECT: string = routes.home.path();
export const apiAuthPrefix: string = "/api/auth";
// src/lib/navigation.ts
