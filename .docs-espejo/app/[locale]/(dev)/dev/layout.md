# /.docs-espejo/app/[locale]/(dev)/dev/layout.tsx.md
/**
 * @file .docs-espejo/app/[locale]/(dev)/dev/layout.tsx.md
 * @description Documento espejo para el layout del Developer Command Center.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: El Marco del Taller de Desarrollo

## 1. Rol Estratégico

El aparato `DevLayout` es el **marco estructural** para todas las herramientas del Developer Command Center (DCC). Su responsabilidad es proporcionar una experiencia de usuario consistente y reconocible para el desarrollador, envolviendo todas las páginas bajo `/dev` con un `DevHeader` común y un área de contenido principal estandarizada.

Actúa como un layout de grupo, asegurando que, sin importar qué herramienta se esté utilizando (Canvas, Simulador, etc.), el contexto de "entorno de desarrollo" sea siempre claro y la navegación principal dentro del DCC esté siempre disponible.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un **React Server Component (RSC)** asíncrono.

1.  **Recepción de Contexto:** Recibe el `locale` de la URL como una promesa en sus `params`.
2.  **Resolución de Parámetros:** Utiliza `await` para resolver la promesa `params` y obtener acceso seguro al `locale` actual.
3.  **Ensamblaje de la UI:**
    *   Renderiza el componente `DevHeader`, pasándole el `locale` resuelto. El `DevHeader` se encarga de cargar su propio contenido y de proporcionar el enlace de vuelta al dashboard del DCC.
    *   Renderiza una etiqueta `<main>` con un padding estandarizado, que actuará como el contenedor para el contenido específico de la página de la herramienta.
    *   Renderiza la prop `{children}`, que corresponde al componente de la página de la herramienta que se está visitando (ej. `DevDashboardPage`, `ComponentCanvas`).

## 3. Contrato de API

### Props de Entrada

*   `children: React.ReactNode`: El componente de la página de la herramienta a renderizar.
*   `params: { locale: Locale }`: El objeto de parámetros de la ruta.

## 4. Zona de Melhorias Futuras

1.  **Barra Lateral de Navegación:** Para un DCC más complejo, este layout podría implementar una barra lateral fija con enlaces a todas las herramientas, en lugar de depender únicamente del header.
2.  **Contexto de Desarrollo Global:** Podría crear y proveer un Contexto de React (`DevContext`) para compartir estado o funciones entre las diferentes herramientas del DCC (ej. el `locale` seleccionado, el `variantId` actual en el simulador).
3.  **Protección de Entorno:** Podría incluir lógica para verificar si `process.env.NODE_ENV` es `'development'`. Si no lo es, podría renderizar un componente de "Acceso Denegado" o redirigir, asegurando que las herramientas de desarrollo nunca sean accesibles accidentalmente en producción.