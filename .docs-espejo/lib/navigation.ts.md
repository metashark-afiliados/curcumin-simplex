// .docs-espejo/lib/navigation.ts.md
/**
 * @file navigation.ts.md
 * @description Documento espejo para el manifiesto de rutas.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: `navigation.ts` - El Mapa Canónico de Rutas

## 1. Rol Estratégico

El aparato `navigation.ts` es el **Mapa Canónico y la Única Fuente de Verdad (SSoT)** para todas las rutas navegables dentro del ecosistema de Global Fitwell. Su propósito fundamental es erradicar el uso de "cadenas mágicas" (hardcoded strings) para las URLs, centralizando su definición en un único lugar.

Esto proporciona beneficios críticos:
-   **Mantenibilidad:** Si una estructura de URL cambia, solo necesita ser actualizada en este archivo.
-   **Seguridad de Tipos:** El uso de TypeScript y funciones para generar las rutas previene errores de tipeo y asegura que todos los parámetros necesarios (como `locale` o `campaignId`) sean proporcionados.
-   **Claridad Arquitectónica:** Proporciona una vista de pájaro de toda la estructura de navegación del proyecto.

## 2. Arquitectura y Estructura de Datos

El manifiesto se construye sobre un objeto principal `routes`, que se exporta como una constante (`as const`) para garantizar su inmutabilidad. Cada clave de este objeto representa una ruta nombrada.

Cada entrada de ruta debe conformarse al contrato `RouteConfig`:

```typescript
interface RouteConfig {
  path: (params?: RouteParams) => string;
  type: RouteType;
}
path(params): Una función que recibe un objeto de parámetros y devuelve la cadena de la URL final, correctamente formateada y localizada.
type: Una clasificación de la ruta (Public, Protected, etc.) utilizando el enum RouteType. Este metadato es crucial para la lógica de control de acceso que se implementará en el middleware.
3. Contrato de API y Patrones de Consumo
El consumo de este aparato es directo y debe ser el único método para generar URLs internas.
Navegación en Componentes (ej. Button, Link):
code
Tsx
import { routes } from "@/lib/navigation";

<Button href={routes.about.path({ locale: currentLocale })}>
  Sobre Nosotros
</Button>
Generación de Rutas Dinámicas (ej. DevRouteMenu):
code
TypeScript
import { routes } from "@/lib/navigation";

const menuItems = [{
  name: "Tienda",
  path: routes.store.path({ locale }),
  icon: "Store"
}];
Generación de Sitemap (sitemap.ts):
code
TypeScript
import { routes } from "@/lib/navigation";

const staticUrls = supportedLocales.map(locale => ({
  url: `${BASE_URL}${routes.home.path({ locale })}`
}));
4. Zona de Melhorias Futuras
Metadatos de Breadcrumbs: Enriquecer el objeto RouteConfig con una propiedad breadcrumb: (params) => string[] para generar dinámicamente las migas de pan para cada página.
Control de Acceso Basado en Roles (RBAC): Añadir una propiedad roles: UserRole[] a cada ruta para una lógica de autorización más granular en el middleware.
Generación de Rutas a partir de un Manifiesto Externo: Para proyectos más grandes, el objeto routes podría ser generado dinámicamente a partir de un archivo JSON o YAML, desacoplando aún más la configuración de la implementación.
// .docs-espejo/lib/navigation.ts.md