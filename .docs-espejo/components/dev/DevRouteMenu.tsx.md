// .docs-espejo/components/dev/DevRouteMenu.tsx.md
/**
 * @file DevRouteMenu.tsx.md
 * @description Documento espejo para el menú de navegación de desarrollo.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: DevRouteMenu

## 1. Rol Estratégico

El `DevRouteMenu` es un componente de **Experiencia de Desarrollador (DX)**. Su propósito es proporcionar una interfaz de navegación rápida y centralizada para que el equipo de desarrollo pueda saltar entre las diferentes páginas, campañas y herramientas del proyecto sin necesidad de manipular la URL manualmente. Es un componente que solo debe ser visible en el entorno de desarrollo.

## 2. Arquitectura y Flujo de Ejecución

Tras la refactorización, el `DevRouteMenu` sigue un patrón de **Presentación Pura**.

1.  **Recepción de Props:** El componente recibe un objeto `dictionary` con todo el texto que necesita.
2.  **Generación de Datos:** Inmediatamente invoca al helper `generateDevRoutes(dictionary, locale)`. Este helper es el responsable de consultar la SSoT de rutas (`navigation.ts`) y el diccionario para construir una estructura de datos (`RouteGroup[]`) que representa el menú.
3.  **Gestión de Estado Local:** El componente gestiona su propio estado de UI (si el menú está abierto o cerrado) usando `useState`. También utiliza `useEffect` y `useRef` para implementar la lógica de "cerrar al hacer clic fuera".
4.  **Renderizado:** El componente mapea la estructura de datos generada por el helper y la renderiza como una lista de botones navegables. No contiene ninguna lógica de negocio o de definición de rutas.
5.  **Navegación:** Al hacer clic en un ítem, utiliza el `useRouter` de Next.js para ejecutar la navegación del lado del cliente.

Esta arquitectura desacopla completamente la data (`qué` rutas mostrar) de la presentación (`cómo` mostrar el menú).

## 3. Contrato de API (`Props`)

-   `dictionary: NonNullable<Dictionary["devRouteMenu"]>`: El sub-diccionario que contiene todas las cadenas de texto para el menú. Es no-nulo, indicando que es un requisito para renderizar.
-   `className?: string`: Clases CSS opcionales para permitir la personalización del estilo desde el componente padre.

## 4. Zona de Melhorias Futuras

1.  **Buscador de Rutas:** Integrar un campo de búsqueda en la parte superior del menú desplegable para filtrar rápidamente las rutas disponibles, especialmente útil a medida que el proyecto crezca.
2.  **Historial de Navegación Reciente:** Almacenar en `localStorage` las últimas 3-5 rutas visitadas a través del menú y mostrarlas en una sección "Recientes" para un acceso aún más rápido.
3.  **Indicadores de Estado:** Añadir indicadores visuales para rutas que puedan tener errores de build o que estén marcadas como "en desarrollo".
4.  **Integración con Permisos:** En un futuro sistema con roles, el `route-menu.generator` podría aceptar un `userRole` y filtrar las rutas que el desarrollador actual tiene permiso para ver.
// .docs-espejo/components/dev/DevRouteMenu.tsx.md