<!-- .docs-espejo/app/[locale]/(portal)/page.tsx.md -->
/**
 * @file .docs-espejo/app/[locale]/(portal)/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página de inicio (`HomePage`).
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: `HomePage`

## 1. Rol Estratégico

La `HomePage` es el **"Hub de Contenido Dinámico"** y el principal punto de entrada al ecosistema de Global Fitwell. Su propósito no es la conversión directa, sino enganchar al usuario, demostrar la vitalidad de la marca y guiarlo hacia las diferentes áreas del portal (noticias, tienda, etc.).

## 2. Arquitectura y Flujo de Ejecución

1.  **Herencia de Layout:** Como `page.tsx` dentro del grupo `(portal)`, hereda automáticamente el `PortalLayout`, asegurando que siempre se renderice con el `Header` y `Footer` globales.
2.  **Obtención de Datos (Servidor):** Al ser un Componente de Servidor (RSC), invoca a `getDictionary` para cargar de forma asíncrona todo el contenido necesario para las secciones que la componen (`heroNews`, `newsGrid`, etc.).
3.  **Ensamblaje de Componentes:** Actúa como un **"orquestador de presentación"**. No contiene lógica de UI compleja, sino que ensambla una secuencia de componentes de sección (`<HeroNews>`, `<SocialProofLogos>`, etc.), pasándoles los fragmentos de contenido correspondientes.
4.  **Resiliencia:** Implementa una guarda de seguridad que lanza un error de build si alguna de las piezas de contenido necesarias no se encuentra en el diccionario, previniendo un despliegue con una página de inicio rota o incompleta.

## 3. Contrato de API

*   **Entradas (`props`):**
    *   `params.locale`: El `locale` actual, proporcionado por el App Router.

## 4. Zona de Melhorias Futuras

*   **Contenido Dinámico de CMS:** Reemplazar la obtención de datos desde `getDictionary` con una llamada a un Headless CMS (como Strapi) para obtener dinámicamente los artículos destacados y productos.
*   **Personalización:** Obtener datos de la sesión del usuario para personalizar el contenido del `HeroNews` (ej. "Bienvenido de nuevo, [Nombre]").
*   **Secciones Configurables:** En lugar de un ensamblaje estático de secciones, leer una configuración (posiblemente desde el CMS) que defina qué secciones y en qué orden deben mostrarse, permitiendo al equipo de marketing rediseñar la homepage sin tocar el código.
<!-- .docs-espejo/app/[locale]/(portal)/page.tsx.md -->```

Hemos reconstruido la página de inicio y fortalecido el portal con un manejo de errores 404. Ahora el proyecto tiene una estructura de portal funcional y robusta, esencial para un build exitoso.

**Ruta relativa del siguiente aparato a refactorizar (crear):** `frontend/src/app/[locale]/(campaigns)/layout.tsx`