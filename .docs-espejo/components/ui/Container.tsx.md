// .docs-espejo/components/ui/Container.tsx.md
/**
 * @file .docs-espejo/components/ui/Container.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato Container.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */

# Manifiesto Conceptual: Aparato `Container`

## 1. Rol Estratégico y Propósito

El aparato `Container` es la **piedra angular de la consistencia geométrica** en la arquitectura de `curcumin-simplex`. Su propósito estratégico es imponer un sistema de maquetación predecible y coherente, garantizando que el contenido principal de todas las secciones se alinee perfectamente dentro de un ancho máximo legible y con un espaciado lateral responsivo.

Actúa como un "corral" visual que previene el desbordamiento de contenido en pantallas grandes y asegura un margen de respiración adecuado en dispositivos móviles, cumpliendo así con los principios de la **Directiva 006: Arquitectura Mobile-First**.

## 2. Arquitectura y Flujo de Ejecución

`Container` es un **componente de presentación puro y atómico**. Su arquitectura es minimalista por diseño:

1.  **Entrada:** Recibe `children` (cualquier nodo de React) y un `className` opcional.
2.  **Lógica de Fusión de Estilos:**
    -   Utiliza `clsx` para combinar condicionalmente las clases base con el `className` proporcionado.
    -   Pasa el resultado a `tailwind-merge` para resolver de forma inteligente cualquier conflicto de clases de Tailwind (ej. si se pasa `max-w-5xl` en `className`, este sobreescribirá al `max-w-7xl` por defecto).
3.  **Salida:** Renderiza un `div` con las clases fusionadas, envolviendo a los `children`.

Este flujo asegura que el componente sea a la vez consistente por defecto y flexible cuando se necesita una personalización específica.

## 3. Contrato de API

| Prop | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | Sí | Los elementos React que se renderizarán dentro del contenedor. |
| `className`| `string` | No | Una cadena de clases de Tailwind para extender o modificar los estilos base del contenedor. |

## 4. Zona de Melhorias Futuras

1.  **Polimorfismo de Elementos:** Implementar una prop `as` (ej. `as="section"`) para permitir renderizar el contenedor como diferentes etiquetas HTML (`div`, `section`, `article`), mejorando la semántica del documento sin necesidad de envoltorios adicionales.
2.  **Variantes de Ancho Semánticas:** Añadir una prop `width` (ej. `width="default" | "prose" | "full"`) para ofrecer anchos preconfigurados y semánticos, reduciendo la necesidad de sobreescribir con clases de utilidad.
3.  **Control de Padding Fino:** Introducir props específicas como `paddingX` o `paddingY` con una escala predefinida (`"compact" | "default" | "loose"`) para un control más declarativo del espaciado interno.

// .docs-espejo/components/ui/Container.tsx.md