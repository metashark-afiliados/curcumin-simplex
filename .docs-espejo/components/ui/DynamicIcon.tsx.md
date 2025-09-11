// .docs-espejo/components/ui/DynamicIcon.tsx.md
/**
 * @file .docs-espejo/components/ui/DynamicIcon.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato DynamicIcon.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
# Manifiesto Conceptual: Aparato `DynamicIcon`

## 1. Rol Estratégico y Propósito

El `DynamicIcon` es un componente de UI atómico y de infraestructura. Su propósito estratégico es **desacoplar la capa de datos de la capa de presentación de iconos**. Permite que los archivos de configuración y los diccionarios de i18n especifiquen iconos mediante un `string` (su nombre), eliminando la necesidad de importar estáticamente componentes de icono en la lógica de negocio o en los componentes de ensamblaje.

Implementa **lazy-loading** (`next/dynamic`), lo que garantiza que solo el código de los iconos realmente renderizados en el cliente se cargue, optimizando el rendimiento inicial de la página.

## 2. Arquitectura y Flujo de Ejecución

1.  **Entrada:** Recibe una prop `name` de tipo `LucideIconName`.
2.  **Validación:** Comprueba si `name` existe en el objeto `icons` exportado por `lucide-react`.
3.  **Carga Dinámica:** Utiliza `next/dynamic` para importar de forma perezosa solo el componente de icono correspondiente al `name` proporcionado.
4.  **Estado de Carga:** Muestra un componente `<Loader2 />` mientras el icono se está cargando.
5.  **Estado de Fallo:** Si el icono no se encuentra o la carga falla, muestra un icono `<HelpCircle />` como fallback.
6.  **Renderizado:** Una vez cargado, renderiza el componente de icono solicitado, pasándole todas las demás `props` (`className`, `size`, etc.).

## 3. Contrato de API

*   **Entradas (`props`):**
    *   `name: LucideIconName`: (Requerido) El nombre del icono en PascalCase.
    *   `...LucideProps`: Cualquier otra prop válida para un icono de Lucide (`className`, `size`, `color`, `strokeWidth`, etc.).
*   **Salidas:** Un elemento `React.ReactElement` que representa el icono solicitado, el loader o el fallback.

## 4. Zona de Melhorias Futuras

1.  **Soporte Multi-Librería:** Extender el componente para aceptar una prop `library: 'lucide' | 'tabler'` y cargar dinámicamente desde la librería especificada.
2.  **Cacheo de Componentes Cargados:** Implementar un caché en memoria para evitar la recarga de iconos que ya han sido solicitados en la sesión del usuario.
3.  **Variantes de Estilo (CVA):** Integrar `class-variance-authority` para ofrecer variantes de estilo predefinidas (ej. `variant: 'primary' | 'destructive'`).
4.  **Optimización de SSR:** Investigar estrategias para renderizar los iconos en el servidor (SSR) sin sacrificar los beneficios del code-splitting.
5.  **Pruebas de Regresión Visual:** Integrar con una herramienta como Storybook y Chromatic para realizar pruebas de regresión visual en todos los iconos.
6.  **Generador de Sprites SVG:** Crear un script de build que genere un sprite SVG con los iconos más utilizados para mejorar aún más el rendimiento.
7.  **Documentación Interactiva:** Crear una página en el Dev Command Center que utilice este componente para mostrar todos los iconos disponibles desde `lucide-icon-names.ts`.
8.  **Gestión de Errores Mejorada:** Enviar errores de carga de iconos a Sentry para un monitoreo proactivo.
9.  **Accesibilidad Mejorada:** Añadir automáticamente un `title` al SVG renderizado para mejorar la accesibilidad, utilizando el `name` del icono como base.
10. **Internacionalización de Tooltips:** Integrar con `next-intl` para mostrar un `Tooltip` con el nombre del icono traducido al pasar el cursor.
// .docs-espejo/components/ui/DynamicIcon.tsx.md