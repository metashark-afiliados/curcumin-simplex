# /.docs-espejo/app/[locale]/store/page.tsx.md
/**
 * @file page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página de la Tienda.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Orquestador de la Tienda

## 1. Rol Estratégico

Este aparato (`store/page.tsx`) es el **orquestador del dominio de e-commerce** del portal. Su propósito principal es presentar el catálogo de productos de una manera organizada y funcional. Actúa como un canal de "conversión suave", diseñado para usuarios que llegan desde el contenido orgánico del portal.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura de este componente es un ejemplo claro del **Principio de Composición y Responsabilidad Única**.

1.  **Obtención de Datos (Servidor):** Como Componente de Servidor `async`, invoca `getDictionary` para obtener todo el contenido textual y de configuración necesario para la página, incluyendo el contenido de los filtros, la lista de productos y la configuración del efecto visual `LightRays`.
2.  **Manejo de Errores:** Implementa guardas de seguridad robustas para manejar tanto fallos en la carga del diccionario como la ausencia de la clave de contenido `storePage`, mostrando estados de error claros.
3.  **Composición de Componentes Atómicos (Renderizado):** No renderiza directamente la UI compleja. En su lugar, delega responsabilidades a componentes especializados:
    *   `LightRays`: Recibe su configuración y se encarga del efecto de fondo WebGL.
    *   `PageHeader`: Recibe el título y subtítulo y se encarga de renderizar el encabezado de la página.
    *   `ProductFilters`: Recibe únicamente los datos de los filtros y se encarga de renderizar la barra lateral.
    *   `ProductGrid`: Recibe únicamente la lista de productos y se encarga de renderizar la cuadrícula.
    
Este patrón de delegación hace que el código sea extremadamente limpio, mantenible y fácil de testear.

## 3. Contrato de API (Props)

*   `params`: `{ locale: Locale; }` - Define el idioma del contenido a renderizar.

## 4. Zona de Melhorias Futuras (Registro de Valor)

1.  **Filtros Interactivos:** Implementar lógica para que los filtros (actualmente visuales) modifiquen el estado de la `ProductGrid` a través de `searchParams`, permitiendo al usuario filtrar productos en tiempo real.
2.  **Paginación:** Para catálogos extensos, añadir paginación a la `ProductGrid`.
3.  **Datos Dinámicos:** Conectar la `ProductGrid` a una fuente de datos real (ej. el backend de Strapi) en lugar de un archivo JSON estático.
4.  **Vista de Detalle de Producto:** Hacer que cada tarjeta en `ProductGrid` enlace a una nueva ruta dinámica (`/store/[productId]`) que muestre una vista detallada del producto.