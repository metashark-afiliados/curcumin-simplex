// .docs-espejo/components/ui/DropdownMenu/Context.ts.md
/**
 * @file Context.ts.md
 * @description Documento espejo y SSoT conceptual para el contexto del DropdownMenu.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Contexto del DropdownMenu

## 1. Rol Estratégico

El aparato `Context.ts` es el **corazón del estado compartido** para el sistema de componentes `DropdownMenu`. Su única responsabilidad es definir y exportar el mecanismo (`React.Context`) que permite a los componentes hijos (como `Trigger` y `Content`) comunicarse y compartir estado sin necesidad de "prop drilling" (pasar props a través de múltiples niveles).

El estado que gestiona es simple pero crucial: si el menú está actualmente `isOpen` (abierto) o no.

## 2. Arquitectura y Flujo de Ejecución

1.  **Definición de Contrato (`DropdownMenuContextType`):** Se define una interfaz que establece la forma de los datos que el contexto proporcionará: un booleano `isOpen` y una función `setIsOpen` para modificarlo.
2.  **Creación del Contexto (`DropdownMenuContext`):** Se crea una instancia del contexto de React con un valor inicial de `null`.
3.  **Creación del Hook de Consumidor (`useDropdownMenuContext`):**
    *   Este hook encapsula la llamada a `React.useContext`.
    *   **Guarda de Seguridad:** Incluye una verificación crucial. Si el contexto es `null` (lo que significa que el hook se está usando fuera de un componente `Menu` que actúa como proveedor), lanza un error explícito. Esto fuerza una arquitectura de componentes correcta y previene bugs difíciles de depurar.
    *   Si el contexto existe, lo devuelve.

## 3. Contrato de API

*   **Exportaciones:**
    *   `DropdownMenuContext`: El objeto de contexto de React.
    *   `useDropdownMenuContext`: El hook para consumir el contexto.

## 4. Zona de Melhorias Futuras

1.  **Gestión de Estado Más Compleja:** Si el menú necesitara un estado más complejo (ej. manejar submenús, selección de items), el `useState` en el componente `Menu` podría ser reemplazado por un `useReducer` para una lógica de estado más predecible, sin necesidad de cambiar este archivo de contexto.
2.  **Optimización de Renders:** Para menús extremadamente complejos, se podría utilizar `React.memo` en los componentes consumidores y ajustar el proveedor para evitar re-renderizados innecesarios, aunque para la implementación actual es una sobre-optimización.

// .docs-espejo/components/ui/DropdownMenu/Context.ts.md