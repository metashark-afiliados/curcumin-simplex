// .docs-espejo/middleware.ts.md
/**
 * @file middleware.ts.md
 * @description Documento Espejo para el Orquestador de Middleware.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Orquestador de Pipeline de Middleware

## 1. Rol Estratégico

El aparato `src/middleware.ts` es el **controlador de tráfico aéreo** de la aplicación. Se ejecuta en el "borde" (Edge) para cada petición entrante que coincide con el `matcher` y su propósito es orquestar una secuencia de manejadores atómicos (`handlers`) de una manera predecible, resiliente y observable.

Su arquitectura se basa en un **Patrón Pipeline con Cortocircuito**, donde cada manejador tiene la oportunidad de inspeccionar la solicitud y, si es necesario, finalizar el ciclo de vida de la misma devolviendo una respuesta (ej. una redirección), impidiendo que la solicitud llegue a los manejadores posteriores o a la aplicación Next.js.

## 2. Arquitectura y Flujo de Ejecución

1.  **Guarda de Seguridad de Entorno:** La primera acción es verificar la bandera `isMiddlewareEnabled` desde la SSoT de despliegue. Si es `false`, el middleware se detiene inmediatamente, permitiendo el funcionamiento en entornos de exportación estática.
2.  **Inicio y Observabilidad:** Si está habilitado, registra el inicio del pipeline con la ruta de la solicitud, proporcionando un punto de entrada claro para la depuración.
3.  **Manejo de Errores Global:** Todo el pipeline está envuelto en un bloque `try...catch` para garantizar que cualquier excepción no controlada dentro de un manejador sea capturada, registrada y manejada de forma segura, evitando que el servidor se bloquee.
4.  **Iteración del Pipeline:**
    *   El orquestador itera secuencialmente sobre un array predefinido de manejadores (`handlers`).
    *   Invoca a cada manejador con el objeto `NextRequest`.
    *   **Lógica de Cortocircuito:** Si un manejador devuelve un objeto `NextResponse` (como una redirección del `i18nHandler`), el bucle se interrumpe y esa respuesta se devuelve inmediatamente al cliente.
5.  **Flujo por Defecto (Passthrough):** Si el bucle se completa sin que ningún manejador devuelva una respuesta, significa que la solicitud es válida para continuar. El orquestador devuelve `NextResponse.next()`, pasando el control a la capa de enrutamiento y renderizado de Next.js.

## 3. Contrato de API

*   **`middleware(request: NextRequest): Promise<NextResponse>`**: La función principal del middleware de Next.js.
*   **`config: { matcher: string[] }`**: Exportación que le dice a Next.js a qué rutas aplicar este middleware. Este `matcher` es dinámico y se vacía si el middleware está deshabilitado.

## 4. Zona de Melhorias Futuras

1.  **Manejadores Desactivados:** Actualmente, `authHandler` y `geoIpHandler` están presentes pero desactivados por una bandera interna. Se eliminarán del array de `handlers` para limpiar el código, ya que su lógica no está implementada. Se registrará su futura implementación en este documento.
2.  **Sistema de Prioridad de Handlers:** Implementar un sistema donde cada manejador tenga una propiedad de `priority`, y el orquestador los ordene antes de ejecutarlos, haciendo el orden de ejecución más explícito.
3.  **Inyección de Dependencias:** Para manejadores más complejos, se podría explorar un patrón de inyección de dependencias para proporcionarles servicios (ej. un cliente de base de datos para el `authHandler`).
// .docs-espejo/middleware.ts.md