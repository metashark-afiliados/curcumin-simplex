// .docs-espejo/components/ui/DropdownMenu/index.ts.md
/**
 * @file index.ts.md
 * @description Documento espejo y SSoT conceptual para la fachada pública del DropdownMenu.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Fachada Pública de `DropdownMenu`

## 1. Rol Estratégico

El aparato `index.ts` dentro de `src/components/ui/DropdownMenu/` es un **"Barrel File" que define la Fachada Pública** del sistema de componentes `DropdownMenu`. Su única y crucial responsabilidad es actuar como el **único punto de entrada** para cualquier otro módulo de la aplicación que necesite consumir los componentes del menú.

Este archivo es la encarnación del **Principio de Ocultación de Información**. Oculta la complejidad y la estructura de archivos interna del módulo `DropdownMenu` y expone una API limpia, consistente y estable.

## 2. Arquitectura y Flujo de Ejecución

1.  **Agregación:** El archivo importa todos los sub-componentes que componen el sistema (`Menu`, `Trigger`, `Content`, etc.).
2.  **Robustez de Importación:** Utiliza **alias de ruta absolutos** (`@/components/...`) para sus importaciones. Esto es una decisión de diseño deliberada para prevenir errores de resolución de módulos que pueden ocurrir con rutas relativas en archivos "barrel", especialmente con la configuración de `moduleResolution` del proyecto.
3.  **Abstracción y Renombramiento:** Re-exporta los componentes importados, a menudo con nombres más descriptivos y consistentes. Por ejemplo, el componente `Menu` (el proveedor) se exporta como `DropdownMenu` para clarificar su rol como el componente raíz que se debe usar.
4.  **Consumo:** Otros aparatos en la aplicación (como `DevRouteMenu`) ahora pueden importar todo lo que necesitan con una única sentencia: `import { DropdownMenu, DropdownMenuTrigger, ... } from "@/components/ui/DropdownMenu";`.

## 3. Contrato de API

*   **Entradas:** Ninguna. Es un archivo de configuración de módulo.
*   **Salidas (Exportaciones):**
    *   `DropdownMenu`
    *   `DropdownMenuTrigger`
    *   `DropdownMenuContent`
    *   `DropdownMenuItem`
    *   `DropdownMenuLabel`
    *   `DropdownMenuSeparator`
    *   `DropdownMenuGroup`

## 4. Zona de Melhorias Futuras

1.  **Exportación de Tipos:** Si los componentes tuvieran tipos de `props` complejos que los consumidores necesitaran importar, este archivo sería el lugar correcto para exportarlos también (ej. `export type { DropdownMenuItemProps } from "./Item";`).
2.  **Sub-Fachadas:** Para sistemas de componentes extremadamente grandes, se podrían crear fachadas anidadas. Por ejemplo, un `index.ts` principal podría exportar `DropdownMenu` y `DropdownMenuPrimitive`, donde `DropdownMenuPrimitive` sería otra fachada que exporta las piezas más granulares. Esto es una sobre-optimización para el caso actual.

// .docs-espejo/components/ui/DropdownMenu/index.ts.md