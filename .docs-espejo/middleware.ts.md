# /.docs-espejo/middleware.ts.md
/**
 * @file .docs-espejo/middleware.ts.md
 * @description Documento espejo para el aparato de middleware.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: El Controlador de Tráfico del Borde

## 1. Rol Estratégico

El aparato `middleware.ts` actúa como el **controlador de tráfico aéreo** de la aplicación. Se ejecuta en el "borde" (Edge), antes que cualquier otra lógica de renderizado de Next.js. Su propósito es inspeccionar cada petición entrante y tomar decisiones de enrutamiento o modificación basadas en un conjunto de reglas, sin la sobrecarga de un renderizado completo en el servidor.

Su rol principal es garantizar la **consistencia y la canonicidad de las URLs**, principalmente a través de la gestión de la internacionalización (i18n).

## 2. Arquitectura y Flujo de Ejecución

1.  **Activación Condicional:** El middleware es consciente del entorno. Lee la variable de entorno `NEXT_PUBLIC_DEPLOY_TARGET` para determinar si debe activarse. Solo se ejecuta en despliegues de Vercel (`vercel`), permaneciendo inactivo en builds estáticos (`hostinger`).
2.  **Filtrado por `matcher`:** La configuración `config.matcher` es su filtro más importante. Utiliza una expresión regular (negative lookahead) para excluir proactivamente todas las rutas que apuntan a activos estáticos (CSS, JS, imágenes, fuentes, etc.). Esto es crucial para el rendimiento y para evitar errores de 404.
3.  **Patrón Pipeline:** Si una petición pasa el filtro del `matcher`, el middleware invoca una serie de "manejadores" (`handlers`). Actualmente, solo existe el `i18nHandler`.
4.  **Ejecución del Handler:** El `i18nHandler` verifica si la ruta tiene un prefijo de `locale`. Si no lo tiene, construye una nueva URL con el `locale` por defecto y devuelve una respuesta de redirección `308`, terminando el pipeline.
5.  **Paso al Siguiente Nivel:** Si todos los handlers se ejecutan sin devolver una respuesta, la petición original se pasa al siguiente nivel de la arquitectura de Next.js (el renderizador de páginas).

## 3. Contrato de API

*   **Entrada:** `NextRequest` - Objeto que representa la petición HTTP entrante.
*   **Salida:** `NextResponse` - Puede ser una respuesta de redirección, una respuesta modificada, o una instrucción para continuar (`NextResponse.next()`).

## 4. Zona de Melhorias Futuras

1.  **Integración de `authHandler`:** Activar y desarrollar el manejador de autenticación para proteger rutas basado en la sesión del usuario.
2.  **Integración de `geoIpHandler`:** Implementar la lógica para detectar el país del usuario y enriquecer la petición con esa información para personalización de contenido o redirecciones geográficas.
3.  **Manejo de A/B Testing:** Se podría añadir un handler que lea una cookie y reescriba la URL para servir diferentes variantes de una página sin cambiar la URL visible para el usuario.