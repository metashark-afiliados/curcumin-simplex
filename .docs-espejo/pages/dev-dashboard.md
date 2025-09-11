// /.docs-espejo/pages/dev-dashboard.md
/**
 * @file /.docs-espejo/pages/dev-dashboard.md
 * @description Documento Espejo y SSoT conceptual para el aparato DevDashboardPage.tsx.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.1
 * @date 2025-09-10
 */
# Manifiesto Conceptual: DevDashboardPage

## 1. Rol Estratégico y Propósito

La `DevDashboardPage` (ubicada en `src/app/[locale]/(dev)/dev/page.tsx`) es la página de inicio para el entorno de desarrollo (`/[locale]/dev`). Su propósito principal es servir como un **índice visual e interactivo de todos los componentes de UI registrados** en el sistema (`ComponentRegistry`). Permite a los desarrolladores navegar a un "lienzo" aislado para cada componente (`/[locale]/dev/components/[componentName]`), facilitando la depuración, el desarrollo iterativo y la verificación de estilos y funcionalidad de forma independiente, fuera del contexto de la aplicación principal.

## 2. Arquitectura y Flujo de Ejecución

El `DevDashboardPage` es un Server Component de Next.js que opera de forma asíncrona.

1.  **Manejo de `params`**: `await`a el objeto `params` (`await params`) para asegurar un acceso robusto a los parámetros de ruta como `locale`, conforme a las directrices de Next.js 15+.
2.  **Obtención de Contenido**: Al ser un Server Component, invoca a `getDictionary` para cargar su contenido internacionalizado de `src/messages/pages/dev-dashboard.i18n.json`. El `locale` para esta llamada se obtiene de `awaitedParams.locale`.
3.  **Lista de Componentes**: Obtiene la lista de componentes disponibles para el lienzo a través de la función `getComponentList()` de `src/components/dev/ComponentRegistry.ts`. Esto desacopla la página de la estructura interna del registro.
4.  **Generación de Enlaces**: Itera sobre la lista de componentes, creando un `next/link` para cada uno. La URL de cada enlace se construye utilizando la SSoT de rutas `routes.devComponent.path` de `src/lib/navigation.ts`, asegurando que el `locale` (de `awaitedParams.locale`) y el `componentName` se manejen correctamente.
5.  **Presentación de UI**: Muestra un título, un subtítulo y una cuadrícula de "tarjetas" interactivas, donde cada tarjeta representa un componente registrado y permite navegar a su vista aislada.
6.  **Observabilidad**: Utiliza `clientLogger.info` y `clientLogger.warn` para registrar el proceso de renderizado y la posible falta de contenido internacionalizado.

## 3. Contrato de API (Props)

```typescript
interface DevDashboardPageProps {
  /**
   * @param params Objeto que contiene los parámetros de ruta dinámicos.
   *               Incluye el `locale` actual.
   *               Debe ser `await`ado antes de acceder a sus propiedades.
   */
  params: {
    locale: Locale;
  };
}
4. Zona de Mejoras Futuras
Filtro/Buscador de Componentes: Añadir un campo de búsqueda o filtros para permitir a los desarrolladores encontrar rápidamente componentes específicos, especialmente cuando el número de componentes crece.
Visualización de Props de Mock: Integrar una interfaz donde se puedan ver o incluso editar dinámicamente las props de mock de cada componente directamente desde el dashboard.
Metadatos de Componentes: Extender el ComponentRegistryEntry para incluir metadatos como la categoría (ej. data-display, layout), una breve descripción o el autor, y mostrar esta información en las tarjetas del dashboard.
Ordenación de Componentes: Permitir ordenar la lista de componentes por nombre, categoría o fecha de última modificación.
Enlaces a Documentación Espejo: Añadir un icono o enlace directo desde cada tarjeta de componente a su Documento Espejo correspondiente en /.docs-espejo/.
// /.docs-espejo/pages/dev-dashboard.md