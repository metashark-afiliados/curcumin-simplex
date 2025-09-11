// .docs-espejo/tailwind.config.ts.md
/**
 * @file .docs-espejo/tailwind.config.ts.md
 * @description Documento Espejo y SSoT conceptual para la configuración de Tailwind CSS.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: tailwind.config.ts

## 1. Rol Estratégico

En la arquitectura de Tailwind CSS v4, el rol del archivo `tailwind.config.ts` es significativamente más enfocado que en versiones anteriores. Actúa como la **SSoT para la Detección de Contenido y la Extensibilidad**.

Sus responsabilidades estratégicas son:
*   **Definir el Alcance de Escaneo (`content`):** Su función más crítica es instruir al motor de Tailwind sobre qué archivos debe escanear para detectar el uso de clases de utilidad. Una configuración precisa aquí es vital para la correcta generación del CSS y para la optimización del tamaño del bundle final (Tree Shaking).
*   **Registrar Plugins:** Sirve como el punto de entrada para registrar cualquier plugin de terceros o personalizado que extienda la funcionalidad base de Tailwind (ej. `@tailwindcss/typography`, `tailwindcss-animate`).

A diferencia de v3, la configuración del tema (`theme`) es ahora responsabilidad de `src/app/globals.css` a través de la directiva `@theme`, adhiriéndose a una filosofía "CSS-first".

## 2. Arquitectura y Flujo de Ejecución

Este es un archivo de configuración estático consumido por el plugin `@tailwindcss/postcss` durante el proceso de build.

1.  **Invocación:** El plugin de PostCSS es activado por el proceso de build de Next.js.
2.  **Lectura de Configuración:** El plugin lee `tailwind.config.ts` para obtener los patrones `glob` definidos en la propiedad `content`.
3.  **Escaneo de Archivos:** El motor de Tailwind utiliza estos patrones para escanear todos los archivos `.tsx`, `.ts`, etc., y construye un inventario de todas las clases de utilidad utilizadas en el proyecto.
4.  **Generación de CSS:** El motor genera el CSS correspondiente a las clases encontradas y lo inyecta en el pipeline de build.

## 3. Contrato de API

La "API" es la estructura del objeto `Config` exportado, definida por el paquete `tailwindcss`.

*   `content: string[]`: Array de patrones `glob`.
*   `plugins: any[]`: Array para los plugins.
*   `theme: object`: (Uso avanzado en v4) Permite extender o sobrescribir el tema, aunque la práctica recomendada es usar `@theme` en CSS.

## 4. Zona de Melhorias Futuras

*   **Integración de `prettier-plugin-tailwindcss`:** Añadir el plugin oficial de Prettier para ordenar automáticamente las clases de Tailwind en el código, mejorando la legibilidad y consistencia.
*   **Plugin `@tailwindcss/typography`:** Integrar este plugin para estilizar de forma sencilla bloques de contenido generados por CMS o Markdown (ej. en las páginas legales).
*   **Plugin `tailwindcss-animate`:** Añadir este plugin para un conjunto de animaciones predefinidas y personalizables, simplificando la implementación de microinteracciones.
*   **Tema Centralizado (JavaScript):** Para proyectos con lógica de theming muy compleja, se podría volver a centralizar la configuración del `theme` en este archivo y usar un plugin para generar las variables CSS correspondientes, revirtiendo al patrón de v3 si fuera necesario.
*   **Configuración de `separator`:** Modificar el separador de variantes (por defecto `:`) si entrara en conflicto con alguna sintaxis de un preprocesador de CSS (no es el caso actual).
*   **Habilitar `important`:** Configurar la opción `important` para generar utilidades con `!important`, útil al sobrescribir estilos de librerías de terceros.
*   **Prefijos de Clases:** Añadir un `prefix` a todas las clases de Tailwind (ej. `tw-`) para evitar colisiones en proyectos que integran múltiples frameworks de CSS.
*   **Estrategia de `dark-mode`:** Cambiar la estrategia de modo oscuro de `class` a `media` si se prefiere depender de la configuración del sistema operativo del usuario.
*   **Extensión de Variantes:** Utilizar la configuración de `theme.extend.variants` para habilitar variantes adicionales (ej. `disabled`) para utilidades que no las tienen por defecto.
*   **Función de Configuración:** Exportar una función en lugar de un objeto para generar la configuración de forma dinámica si fuera necesario (ej. basándose en variables de entorno).

// .docs-espejo/tailwind.config.ts.md