// frontend/.docs-espejo/components/sections/TextSection.tsx.md
/**
 * @file TextSection.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato TextSection.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Aparato TextSection

## 1. Rol Estratégico

El aparato `TextSection` es un **componente de layout fundamental** en la arquitectura de `curcumin-simplex`. Su rol estratégico es actuar como un contenedor semántico (`<section>`) estandarizado para cualquier bloque de contenido cuyo propósito principal sea textual.

Su objetivo es abstraer y centralizar la lógica de espaciado vertical y ancho de contenido, garantizando consistencia visual en todo el portal y las campañas, y promoviendo el principio DRY.

## 2. Arquitectura y Flujo de Ejecución

`TextSection` es un componente de presentación puro que opera bajo una lógica de composición y configuración por `props`.

1.  **Entrada (Props):** Recibe `children`, `className`, y dos props de configuración opcionales: `spacing` y `prose`.
2.  **Lógica de Espaciado:** La prop `spacing` (`'default'`, `'compact'`, `'loose'`) se mapea internamente a un conjunto predefinido de clases de `padding` vertical de Tailwind CSS.
3.  **Lógica de Tipografía:** Si la prop booleana `prose` es `true`, se activan las clases de tipografía de `@tailwindcss/typography` para mejorar la legibilidad del contenido anidado.
4.  **Composición de Clases:** Utiliza la utilidad `cn` para fusionar de forma segura las clases base, las clases derivadas de las props (`spacing`), y cualquier `className` externo.
5.  **Renderizado:** Renderiza un elemento `<section>` que envuelve a un componente `Container`. Las clases de `prose` se aplican directamente al `Container` para afectar solo al contenido que envuelve, mientras que las de espaciado se aplican a la `<section>` para controlar el layout de la página.
6.  **Salida:** Los `children` son renderizados dentro del `Container` estilizado.

## 3. Contrato de API (`Props`)

| Prop      | Tipo                                  | Requerido | Por Defecto | Descripción                                                                           |
| :-------- | :------------------------------------ | :-------- | :---------- | :------------------------------------------------------------------------------------ |
| `children`  | `React.ReactNode`                     | Sí        | N/A         | El contenido a ser renderizado dentro de la sección.                                  |
| `className` | `string`                              | No        | `''`        | Clases de Tailwind adicionales para personalizar el elemento `<section>`.             |
| `spacing`   | `'default' \| 'compact' \| 'loose'` | No        | `'default'` | Define el espaciado vertical (padding) de la sección para diferentes densidades de layout. |
| `prose`     | `boolean`                             | No        | `false`     | Si es `true`, aplica estilos de tipografía optimizados para lectura de formato largo.    |

## 4. Zona de Melhorias Futuras

*   **Prop de Polimorfismo `as`:** Introducir una prop `as` para permitir renderizar el componente como otros elementos semánticos (`div`, `article`, etc.) sin perder la lógica de estilo.
*   **Variantes de Ancho de Contenedor:** Añadir una prop `maxWidth` (`'default'`, `'wide'`, `'narrow'`) que controle la clase `max-w-*` del `Container` interno, permitiendo más flexibilidad en el layout.
*   **Integración con CVA:** Refactorizar las variantes (`spacing`) utilizando `class-variance-authority` (CVA) para una gestión de variantes más robusta y estandarizada, alineándose con las mejores prácticas de la industria para componentes complejos.
// frontend/.docs-espejo/components/sections/TextSection.tsx.md