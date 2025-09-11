// .docs-espejo/components/dev/DevHeader.md
/**
 * @file DevHeader.md
 * @description Documento espejo para el componente DevHeader.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: DevHeader

## 1. Rol Estratégico

El `DevHeader` es un componente de **identidad visual y navegación para el Dominio de Desarrollo**. Su única responsabilidad es proporcionar un encabezado consistente y reconocible para todas las páginas que residen bajo la ruta `/dev`.

A diferencia del `DevHomepageHeader`, que es específico para la página de inicio, el `DevHeader` es genérico y sirve a toda la suite de herramientas del Developer Command Center (DCC), como el `ComponentCanvas` y el `CampaignSimulator`. Su función principal es ofrecer un punto de anclaje visual y un enlace para regresar al dashboard del DCC.

## 2. Arquitectura y Flujo de Ejecución

Es un **Server Component** asíncrono, lo que le permite obtener datos del servidor antes de renderizar.

1.  **Recepción de Props:** Recibe el `locale` actual desde el layout de desarrollo (`/dev/layout.tsx`).
2.  **Carga de Contenido:** Invoca `getDictionary(locale)` para obtener el diccionario de i18n.
3.  **Extracción de Datos:** Accede a la clave `devHeader` del diccionario para obtener su título. Incluye una lógica de fallback para usar un título por defecto si el contenido no se encuentra, garantizando la resiliencia del componente.
4.  **Renderizado:** Renderiza la estructura del header, utilizando el componente `Container` para mantener la consistencia del layout. El enlace del logo consume la ruta desde la SSoT de navegación (`routes.devDashboard`) para asegurar la integridad de los enlaces.

## 3. Contrato de API (`Props`)

-   `locale: Locale`: El `locale` actual de la URL, necesario para cargar el diccionario de contenido correcto.

## 4. Zona de Melhorias Futuras

1.  **Breadcrumbs Dinámicos:** Implementar un sistema de "migas de pan" que muestre la ruta actual dentro del DCC (ej. `DCC / Component Canvas / Hero`). Esto mejoraría la navegación en suites de desarrollo más complejas.
2.  **Indicador de Locale:** Añadir un pequeño `badge` o selector de idioma directamente en el header para cambiar el `locale` del entorno de desarrollo sobre la marcha.
3.  **Controles de Tema:** Incorporar un interruptor para alternar entre diferentes temas (ej. tema `vitality`, `scientific`) directamente desde el header, afectando la vista previa del componente en el Canvas.
// .docs-espejo/components/dev/DevHeader.md