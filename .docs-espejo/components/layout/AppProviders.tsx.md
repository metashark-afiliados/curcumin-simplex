<!-- .docs-espejo/components/layout/AppProviders.tsx.md -->
/**
 * @file .docs-espejo/components/layout/AppProviders.tsx.md
 * @description Documento Espejo y SSoT conceptual para el componente `AppProviders`.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: `AppProviders`

## 1. Rol Estratégico

`AppProviders` es el **"Contenedor de Lógica de Cliente"** de la aplicación. Su única responsabilidad es encapsular todos los hooks, componentes y lógica que requieren ejecutarse en el navegador.

Este aparato es la solución arquitectónica al desafío de usar hooks de React en un entorno de App Router, permitiendo que el `RootLayout` permanezca como un Componente de Servidor puro y performante.

## 2. Arquitectura y Flujo de Ejecución

1.  **Directiva de Cliente:** El archivo comienza con `"use client";`, instruyendo a Next.js para que lo trate como un componente de cliente.
2.  **Invocación de Hooks:** Dentro del componente, se llama a los hooks globales:
    *   `useProducerLogic()`: Este hook orquestador activa toda la cascada de scripts de tracking (UTM, Yandex, GA, etc.) de manera diferida, esperando la interacción del usuario.
3.  **Renderizado de UI de Cliente:** Renderiza componentes que dependen de estado y eventos del navegador, como el `CookieConsentBanner`.
4.  **Renderizado de Hijos:** Finalmente, renderiza los `{children}` que recibe, que son los componentes de página renderizados en el servidor.

## 3. Contrato de API

*   **Entradas (`props`):**
    *   `children`: Los componentes de página (RSC) a renderizar.
    *   `locale`: El `locale` actual, necesario para construir URLs correctas (ej. enlace a la política de cookies).
    *   `cookieConsentContent`: El objeto de contenido i18n para el banner de cookies.

## 4. Zona de Melhorias Futuras

*   **Proveedor de Notificaciones:** Integrar un sistema de notificaciones "toast" a nivel de aplicación.
*   **Proveedor de Estado Global:** Si la aplicación crece en complejidad, este sería el lugar para inicializar un proveedor de estado global como Zustand o Jotai.
*   **Gestión de Sesión de Usuario:** Integrar un proveedor de sesión (ej. de NextAuth.js) para hacer que la información del usuario esté disponible en toda la aplicación.
<!-- .docs-espejo/components/layout/AppProviders.tsx.md -->