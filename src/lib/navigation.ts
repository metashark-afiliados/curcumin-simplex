// src/lib/navigation.ts
/**
 * @file navigation.ts
 * @description Manifiesto y SSoT para la definición de rutas, su tipología
 *              y la lógica de control de acceso.
 * @version 1.1.0
 */

export const RouteType = {
  Public: "public",
  Guest: "guest",
  Protected: "protected",
} as const;

export type RouteType = (typeof RouteType)[keyof typeof RouteType];

type RouteParams = Record<string, string | number>;

export interface RouteConfig {
  path: (params?: RouteParams) => string;
  type: RouteType;
}

export const routes = {
  home: { path: () => "/", type: RouteType.Public },
  store: { path: () => "/store", type: RouteType.Public },
  news: { path: () => "/news", type: RouteType.Public },
  newsArticle: {
    path: (params?: RouteParams) => `/news/${params?.slug}`,
    type: RouteType.Public,
  },
  campaign: {
    path: (params?: RouteParams) => `/campaigns/${params?.campaignId}`,
    type: RouteType.Public,
  },
  login: { path: () => "/login", type: RouteType.Guest },
  signup: { path: () => "/signup", type: RouteType.Guest },
  dashboard: { path: () => "/dashboard", type: RouteType.Protected },
} as const;

export const publicRoutes: string[] = [
  routes.home.path(),
  routes.store.path(),
  routes.news.path(),
];

export const authRoutes: string[] = [routes.login.path(), routes.signup.path()];
export const DEFAULT_LOGIN_REDIRECT: string = routes.dashboard.path();
export const apiAuthPrefix: string = "/api/auth";
// src/lib/navigation.ts
