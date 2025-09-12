// .docs-espejo/components/dev/DevRouteMenu.tsx.md
/**
 * @file DevRouteMenu.tsx.md
 * @description Documento espejo y SSoT conceptual para el componente de presentación del menú de desarrollo.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Componente de Presentación DevRouteMenu

## 1. Rol Estratégico

El aparato `DevRouteMenu.tsx` es un **componente de presentación puro ("Dumb Component")**. Su única responsabilidad es recibir una estructura de datos (`RouteGroup[]`) y renderizar un menú desplegable interactivo. No contiene ninguna lógica de negocio, de obtención de datos, ni de manipulación de estado que no sea puramente visual (gestionada por el `DropdownMenu` subyacente).

Este componente es la encarnación visual del Principio de Responsabilidad Única. Su existencia permite que la lógica de negocio (en `DevToolsDropdown.tsx` y `route-menu.generator.ts`) pueda cambiar sin afectar la apariencia del menú, y viceversa.

## 2. Arquitectura y Flujo de Ejecución

1.  **Entrada:** Recibe una prop `routeGroups` que es un array de objetos que describe completamente los grupos y los items del menú, incluyendo etiquetas, URLs e iconos.
2.  **Composición de UI:** Utiliza los componentes del sistema `DropdownMenu` (`DropdownMenuTrigger`, `DropdownMenuContent`, etc.) como bloques de construcción.
3.  **Renderizado:** Itera sobre la estructura de `routeGroups`:
    *   Para cada `group`, renderiza un `<DropdownMenuGroup>` y un `<DropdownMenuLabel>`.
    *   Para cada `item` dentro de un grupo, renderiza un `<DropdownMenuItem>` envuelto en un `Link` de Next.js, utilizando `DynamicIcon` para el icono.
4.  **Salida:** Produce un menú desplegable completamente funcional e interactivo en el DOM.

## 3. Contrato de API

*   **Entradas (Props):**
    *   `routeGroups: RouteGroup[]`
*   **Salidas:**
    *   Un elemento JSX: `<DropdownMenu>...</DropdownMenu>`

## 4. Zona de Melhorias Futuras

1.  **Submenús Anidados:** El sistema `DropdownMenu` podría extenderse para soportar submenús. Si esto se implementara, la estructura `RouteGroup` podría modificarse para incluir un array de `subItems`, y este componente se adaptaría para renderizarlos.
2.  **Items Deshabilitados:** La estructura `RouteItem` podría incluir una propiedad booleana `disabled`. Este componente podría entonces leer esa propiedad y añadir los atributos/estilos correspondientes al `<DropdownMenuItem>` para mostrarlo como no interactivo.
3.  **Accesibilidad Mejorada:** Se podrían añadir `aria-label` más descriptivos a los items del menú si fuera necesario, obteniéndolos de una propiedad adicional en la estructura de datos `RouteItem`.

// .docs-espejo/components/dev/DevRouteMenu.tsx.md