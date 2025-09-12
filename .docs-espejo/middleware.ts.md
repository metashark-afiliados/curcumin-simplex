<!-- .docs-espejo/middleware.ts.md -->
/**
 * @file .docs-espejo/middleware.ts.md
 * @description Documento Espejo y SSoT conceptual para el orquestador de middleware.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Orquestador de Middleware (`middleware.ts`)

## 1. Rol Estratégico

El aparato `middleware.ts` es el **"Control de Tráfico del Borde"** para la aplicación. Se ejecuta en la infraestructura Edge de Vercel para cada petición entrante que coincide con su `matcher`. Su propósito es orquestar una serie de manejadores atómicos que inspeccionan, validan y/o modifican la petición antes de que llegue a la capa de renderizado de Next.js.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura se basa en un **Patrón Pipeline Robusto**.

1.  **Activación:** El middleware se activa para todas las rutas que no son de assets estáticos, gracias a la configuración del `matcher`.
2.  **Pipeline:** El orquestador itera sobre una lista predefinida de manejadores (actualmente solo `i18nHandler`).
3.  **Primer Manejador Gana:** El primer manejador que retorna una respuesta (como una `NextResponse.redirect`) detiene la ejecución del pipeline, y su respuesta es enviada al cliente.
4.  **Continuación:** Si un manejador no retorna nada (`void`), el control pasa al siguiente manejador en la lista.
5.  **Flujo por Defecto:** Si todos los manejadores completan su ejecución sin retornar una respuesta, se invoca `NextResponse.next()`, permitiendo que la petición continúe hacia la capa de renderizado de la aplicación.
6.  **Manejo de Errores:** Un bloque `try...catch` global envuelve el pipeline, asegurando que cualquier error inesperado en un manejador sea capturado y logueado, previniendo una caída del sitio.

## 3. Contrato de API

*   **Entrada:** `NextRequest` (proporcionado por el runtime de Next.js).
*   **Salida:** `Promise<NextResponse>`.

## 4. Zona de Melhorias Futuras

*   **Manejador de Autenticación:** Integrar un `authHandler` para proteger rutas del `(dev)` group o un futuro dashboard de cliente.
*   **Manejador de GeoIP:** Añadir un `geoIpHandler` que enriquezca la petición con un header `x-country`, permitiendo la personalización de contenido del lado del servidor.
*   **Manejador de A/B Testing:** Implementar un manejador que asigne a los usuarios a diferentes variantes de una campaña reescribiendo la URL o estableciendo una cookie.
*   **Configuración Dinámica del Pipeline:** Cargar la lista de manejadores desde un archivo de configuración para permitir una activación/desactivación más flexible sin modificar el código del orquestador.
<!-- .docs-espejo/middleware.ts.md -->