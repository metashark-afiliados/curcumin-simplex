# /.docs-espejo/tailwind.config.md
/**
 * @file tailwind.config.md
 * @description Documento espejo para la configuración de Tailwind CSS.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Configuración de Tailwind CSS

## 1. Rol Estratégico

Este aparato, `tailwind.config.ts`, sirve como el punto de entrada de configuración para el motor de Tailwind CSS. En la arquitectura moderna de **Tailwind CSS v4**, su rol estratégico se ha simplificado radicalmente para enfocarse en una única responsabilidad crítica: **la detección de contenido**.

Su propósito es definir de manera explícita qué archivos y directorios del proyecto deben ser escaneados por el motor de Tailwind para detectar el uso de clases de utilidad.

## 2. Arquitectura y Lógica de Configuración

1.  **Propiedad `content`:** Esta es la única propiedad fundamental en uso. Es un array de patrones de ruta (globs) que le dice a Tailwind: "Busca en todos los archivos que coincidan con estos patrones, lee su contenido y genera el CSS solo para las clases que encuentres". Este mecanismo es la base del *tree-shaking* de Tailwind, que garantiza que el CSS final de producción sea lo más pequeño posible.
2.  **Delegación del Tema:** A diferencia de Tailwind v3, toda la configuración del sistema de diseño (colores, fuentes, espaciado, breakpoints, etc.) **no reside aquí**. Ha sido delegada al archivo `src/app/globals.css`, donde se define utilizando la directiva `@theme`. Esto alinea la configuración del diseño con el propio CSS, una filosofía "CSS-first".
3.  **Propiedad `plugins`:** Un array vacío que está preparado para la adición de cualquier plugin de terceros que pueda ser necesario en el futuro.

La lógica de este archivo es declarativa: provee una lista de rutas al motor de Tailwind, que se encarga del resto del procesamiento durante el `build`.

## 3. Contrato de API

Este aparato es consumido por el proceso de build de Tailwind CSS, específicamente por el plugin `@tailwindcss/postcss`. No expone una API para ser utilizada por el código de la aplicación.

## 4. Zona de Melhorias Futuras

1.  **Patrones de Contenido Más Granulares:** A medida que el proyecto crezca, se podrían añadir patrones más específicos a la lista de `content` para incluir nuevos tipos de archivos (ej. `.mdx` si se añade un blog con MDX) o para escanear dependencias en `node_modules` que también usen Tailwind.
2.  **Integración de `prettier-plugin-tailwindcss`:** Aunque no se configura aquí, la instalación de este plugin en `devDependencies` es una mejora de valor crucial para ordenar automáticamente las clases de Tailwind, lo cual ya está hecho.
3.  **Plugin de Tema Personalizado:** Si la lógica de theming en `globals.css` se volviera extremadamente compleja (por ejemplo, con múltiples temas intercambiables), se podría considerar la creación de un plugin de Tailwind personalizado para encapsular esa lógica, el cual sería registrado en el array `plugins`.
# /.docs-espejo/tailwind.config.md