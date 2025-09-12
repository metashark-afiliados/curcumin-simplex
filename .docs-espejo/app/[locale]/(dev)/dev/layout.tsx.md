// .docs-espejo/app/[locale]/(dev)/dev/layout.tsx.md
/**
 * @file layout.tsx.md (Grupo de Desarrollo)
 * @description Documento espejo y SSoT conceptual para el layout del Developer Command Center.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Layout del Grupo `(dev)`

## 1. Rol Estratégico

El aparato `src/app/[locale]/(dev)/dev/layout.tsx` es un **Layout de Grupo** en la arquitectura del App Router de Next.js. Su única responsabilidad es definir una **estructura de UI compartida y persistente** para todas las rutas anidadas dentro del segmento `(dev)`.

Estratégicamente, este layout asegura que cada página del Developer Command Center (DCC) —el dashboard, el canvas de componentes, el simulador— tenga una apariencia y navegación consistentes, proporcionadas por el `DevHeader`. No afecta a ninguna ruta fuera del DCC.

## 2. Arquitectura y Flujo de Ejecución

1.  **Activación:** Next.js activa este layout para cualquier petición cuya ruta coincida con el patrón `/[locale]/dev/...`.
2.  **Naturaleza Asíncrona:** Como Server Component que opera en una ruta dinámica `[locale]`, recibe su prop `params` como una `Promise`.
3.  **Procesamiento de Props:** El componente `await` la resolución de `params` para obtener el objeto `awaitedParams` con el `locale` actual.
4.  **Composición de UI:**
    *   Renderiza el componente `DevHeader`, pasándole el `locale` resuelto.
    *   Renderiza un elemento `<main>` con un padding estandarizado para actuar como el contenedor principal del contenido de la página específica.
    *   Renderiza la prop `children`, que representa el componente `page.tsx` de la ruta activa (ej. la página del dashboard o del simulador).
5.  **Salida:** Produce el HTML para la estructura base del DCC, dentro de la cual se inyectará el contenido de la página hija.

## 3. Contrato de API

*   **Entradas (Props):**
    *   `children: React.ReactNode` (inyectado por Next.js)
    *   `params: { locale: Locale }` (inyectado por Next.js como `Promise`)
*   **Salidas:**
    *   Un elemento JSX `<div>...</div>`.

## 4. Zona de Melhorias Futuras

1.  **Sidebar de Navegación:** Para un DCC más complejo, este layout podría ser el lugar ideal para añadir una barra lateral de navegación persistente, complementando al `DevHeader`.
2.  **Proveedor de Contexto para el DCC:** Si las herramientas de desarrollo necesitan compartir estado entre ellas (ej. configuraciones de simulación, tema de UI para el DCC), este layout podría envolver a `children` con un `DevContextProvider` para gestionar dicho estado.
3.  **"Breadcrumbs" Dinámicos:** El layout podría leer la ruta actual y generar "migas de pan" de navegación para mostrar la ubicación del desarrollador dentro del DCC (ej. `DCC > Component Canvas > Button`).

// .docs-espejo/app/[locale]/(dev)/dev/layout.tsx.md