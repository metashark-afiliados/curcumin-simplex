<!-- .docs-espejo/app/[locale]/(portal)/layout.tsx.md -->
/**
 * @file .docs-espejo/app/[locale]/(portal)/layout.tsx.md
 * @description Documento Espejo y SSoT conceptual para el Layout del Portal.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: `PortalLayout`

## 1. Rol Estratégico

El `PortalLayout` es el **"Marco Estructural"** para todas las páginas públicas del dominio del portal (homepage, tienda, sobre nosotros, etc.). Su responsabilidad única es garantizar una apariencia y navegación consistentes al renderizar el `Header` y el `Footer` globales, envolviendo el contenido específico de cada página.

El uso de un Route Group `(portal)` es una decisión arquitectónica clave que permite aplicar esta estructura compartida sin alterar las URLs de las páginas contenidas.

## 2. Arquitectura y Flujo de Ejecución

1.  **Activación:** Next.js identifica que una ruta (ej. `/store`) pertenece al grupo `(portal)` y renderiza este layout como su padre.
2.  **Obtención de Datos (Servidor):** Siendo un Componente de Servidor (RSC), `PortalLayout` invoca `getDictionary` de forma asíncrona para obtener el contenido textual necesario para el `Header` y el `Footer` en el `locale` solicitado.
3.  **Composición y Renderizado:** El layout renderiza la estructura de la página, colocando el `Header` en la parte superior, el `Footer` en la inferior, y el contenido de la página específica (pasado a través de la prop `children`) en el medio.
4.  **Resiliencia:** Incluye una guarda de seguridad que lanza un error durante el build si no se encuentra el contenido esencial para el header o el footer, previniendo despliegues con componentes rotos.

## 3. Contrato de API

*   **Entradas (`props`):**
    *   `children`: El `page.tsx` de la ruta activa que será renderizado dentro del layout.
    *   `params.locale`: El `locale` actual, proporcionado por el App Router.

## 4. Zona de Melhorias Futuras

*   **Banner Global:** Integrar la lógica para mostrar banners de anuncios o notificaciones globales que deban aparecer en todas las páginas del portal.
*   **Breadcrumbs Dinámicos:** Añadir un componente de "migas de pan" que podría obtener su estado de la ruta actual para mejorar la navegación.
*   **Layout Condicional:** Introducir lógica para renderizar variantes del header o footer basadas en la ruta o en el estado del usuario (ej. un header simplificado para páginas de checkout).
<!-- .docs-espejo/app/[locale]/(portal)/layout.tsx.md -->