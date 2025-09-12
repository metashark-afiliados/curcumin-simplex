# .docs-espejo/components/ui/DropdownMenu.md
/**
 * @file .docs-espejo/components/ui/DropdownMenu.md
 * @description Documento Espejo y SSoT conceptual para el sistema DropdownMenu.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

## 1. Rol Estratégico

El sistema `DropdownMenu` es un **aparato de UI compuesto** de alta reutilización, diseñado para crear menús desplegables accesibles y personalizables en toda la aplicación. Su rol es proporcionar una API declarativa y predecible para una interacción de UI compleja, siguiendo las mejores prácticas de la industria.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura se basa en el patrón de **Componentes Compuestos con Contexto de React**, que garantiza la máxima flexibilidad, desacoplamiento y seguridad de tipos.

1.  **`Context.ts` (SSoT del Estado):** Un archivo de contexto de React (`DropdownMenuContext`) actúa como la única fuente de verdad para el estado del menú (principalmente, si está abierto o cerrado). Un hook personalizado `useDropdownMenuContext` proporciona acceso controlado a este estado.
2.  **`DropdownMenu` (`Menu.tsx`):** Es el componente raíz y **Proveedor de Contexto**. Utiliza `React.useState` para gestionar el estado `isOpen` y lo provee a todos sus descendientes.
3.  **`DropdownMenuTrigger` (`Trigger.tsx`):** Es el **activador**. Consume el contexto para alternar el estado `isOpen` al ser clickeado. Implementa el patrón `asChild` para delegar su renderizado a un componente hijo (ej. un `Button` personalizado), componiendo de forma segura los manejadores de eventos.
4.  **`DropdownMenuContent` (`Content.tsx`):** Es el **panel de contenido**. Consume el contexto para renderizarse condicionalmente solo cuando `isOpen` es `true`. Implementa lógica adicional para cerrarse al presionar la tecla `Escape` o al hacer clic fuera del panel, mejorando la usabilidad y accesibilidad.
5.  **Componentes Hoja (`Item`, `Label`, `Separator`, `Group`):** Son componentes de presentación puros que construyen la UI interna del menú. `Item` también consume el contexto para poder cerrar el menú al ser clickeado.
6.  **`index.ts` (Fachada):** Un "barrel file" que exporta todos los componentes bajo un único punto de entrada, definiendo la API pública y simplificando su importación en otras partes de la aplicación.

## 3. Contrato de API (Componentes Exportados)

-   `<DropdownMenu>`: Contenedor raíz.
-   `<DropdownMenuTrigger asChild>`: Elemento que abre/cierra el menú.
-   `<DropdownMenuContent>`: Contenedor para los items.
-   `<DropdownMenuGroup>`: Agrupador semántico.
-   `<DropdownMenuLabel>`: Título para un grupo.
-   `<DropdownMenuItem>`: Opción clickeable del menú.
-   `<DropdownMenuSeparator>`: Línea divisoria.

## 4. Zona de Melhorias Futuras

*   **Navegación por Teclado Completa:** Implementar la navegación entre `DropdownMenuItem` usando las teclas de flecha y la gestión del foco (`focus trap`) dentro del `DropdownMenuContent` para cumplir con los estándares WAI-ARIA.
*   **Submenús Anidados:** Extender la arquitectura de contexto para soportar la apertura de submenús al pasar el ratón o hacer clic en un `DropdownMenuItem`.
*   **Portales de Renderizado:** Utilizar `React.createPortal` para renderizar el `DropdownMenuContent` en el `body` del documento, evitando problemas de `z-index` y `overflow` en contenedores complejos.
*   **Componente Controlado:** Permitir que el estado `isOpen` sea controlado desde fuera, pasando las props `open` y `onOpenChange` al componente `DropdownMenu` raíz.