# /.docs-espejo/app/layout.tsx.md
/**
 * @file layout.tsx.md
 * @description Documento Espejo y SSoT conceptual para el layout raíz de la aplicación.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: El Contenedor HTML Raíz

## 1. Rol Estratégico

Este aparato (`layout.tsx`) es el **punto de origen de la renderización de la aplicación**. Su única y fundamental responsabilidad es definir la estructura base del documento HTML (`<html>` y `<body>`) que envolverá a toda la interfaz de usuario.

Actúa como el inyector de recursos verdaderamente globales, como las familias de fuentes, y establece el idioma del documento para la accesibilidad y el SEO.

## 2. Arquitectura y Flujo de Ejecución

1.  **Carga de Fuentes:** Utiliza `next/font` para cargar las familias de fuentes `Inter` y `Poppins`. Al asignarlas a variables CSS (`--font-sans`, `--font-serif`), las pone a disposición de todo el sistema de Tailwind CSS de forma optimizada.
2.  **Renderizado Raíz:** Como el layout más alto en la jerarquía del App Router, recibe los `params` (incluyendo `locale`) y los `children` (que serán el `[locale]/layout.tsx`).
3.  **Configuración del `<html>`:**
    *   Inyecta el atributo `lang` con el `locale` actual, una práctica esencial para la accesibilidad y el SEO.
    *   Aplica las clases de las variables de fuente al elemento `<html>`, haciendo que estén disponibles globalmente.
4.  **Renderizado de `<body>`:** Renderiza la prop `children` dentro de la etiqueta `<body>`, continuando así el árbol de renderizado de React.

## 3. Contrato de API (Props)

*   `children`: `React.ReactNode` - El siguiente nivel de layout en la jerarquía (en este caso, `[locale]/layout.tsx`).
*   `params`: `{ locale: Locale; }` - El `locale` actual, proporcionado por el enrutador.

## 4. Zona de Melhorias Futuras (Registro de Valor)

1.  **Proveedor de Tema (Theming):** Si la aplicación necesitara un proveedor de tema del lado del cliente (ej. para cambiar entre modo claro/oscuro de forma interactiva), este sería el lugar ideal para inyectar dicho `Provider`.
2.  **Gestión de Scripts Globales:** Podría ser el lugar para inyectar scripts de terceros que deban cargarse en absolutamente todas las páginas, utilizando el componente `<Script>` de Next.js (ej. un script de monitoreo de rendimiento).
3.  **Clases de `<body>` Dinámicas:** Se podría añadir lógica para aplicar clases dinámicas al `<body>` basadas en la ruta actual, permitiendo estilos globales específicos por sección.