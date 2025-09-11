# /.docs-espejo/app/[locale]/layout.tsx.md
/**
 * @file .docs-espejo/app/[locale]/layout.tsx.md
 * @description Documento espejo para el layout principal del portal.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: El Ensamblador de UI del Portal

## 1. Rol Estratégico

El aparato `LocaleLayout` es el **esqueleto maestro** de todas las páginas del portal (no de las campañas). Su responsabilidad fundamental es proporcionar la estructura HTML base (`<html>`, `<body>`) y el "cromo" de la aplicación, es decir, los elementos de UI persistentes como el `Header`, `Footer` y `ScrollingBanner`.

Actúa como el principal orquestador de la experiencia de usuario global, asegurando consistencia visual y funcional en todas las páginas que envuelve.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un **React Server Component (RSC)** asíncrono. Su flujo de ejecución es el siguiente:

1.  **Recepción de Contexto:** Recibe el `locale` de la URL a través de sus `params`.
2.  **Obtención de Datos:** Realiza dos operaciones de obtención de datos en paralelo:
    *   Invoca a `getDictionary(locale)` para cargar todo el contenido textual necesario para los componentes compartidos (Header, Footer, etc.).
    *   Invoca a `generateThemeVariablesStyle()` para generar la cadena de texto CSS con las variables del tema de diseño global.
3.  **Renderizado Estructural:** Renderiza la estructura `<html>` y `<body>`, inyectando los atributos de idioma y las variables de las fuentes.
4.  **Inyección de Estilos Críticos:** De forma **condicional**, si se generó una cadena de estilos, la inyecta directamente en el `<head>` a través de una etiqueta `<style>`. Esta operación, al ocurrir en el servidor, es crucial para prevenir el FOUC (Flash of Unstyled Content).
5.  **Ensamblaje de Componentes:** Renderiza los componentes `Header`, `Footer`, etc., pasándoles el contenido localizado que obtuvo del diccionario.
6.  **Renderizado de Contenido de Página:** Renderiza la prop `{children}`, que corresponde al componente de la página específica que se está visitando (ej. `HomePage`, `AboutPage`).

## 3. Contrato de API

### Props de Entrada

*   `children: React.ReactNode`: El componente de página a renderizar.
*   `params: { locale: Locale }`: El objeto de parámetros de la ruta que contiene el idioma actual.

### Lógica de Metadatos (`generateMetadata`)

*   Exporta una función asíncrona que genera los metadatos `title` y `description` base para todas las páginas, extrayendo el contenido del diccionario global.

## 4. Zona de Melhorias Futuras

1.  **Integración de `CookieConsentBanner`:** Este layout es el lugar idóneo para renderizar el `CookieConsentBanner`, asegurando que se muestre en todas las páginas del portal.
2.  **Inyección de Datos Estructurados (JSON-LD):** Podría generar e inyectar un script de datos estructurados base (tipo `Organization` o `WebSite`) para mejorar el SEO.
3.  **Lógica de Theming de Usuario:** Si se implementa un selector de tema (ej. claro/oscuro) para el portal, este layout leería la preferencia del usuario (desde una cookie) y llamaría a la utilidad de tema correspondiente.
4.  **Fetching de Datos Granular:** Podría optimizarse para solicitar solo los fragmentos del diccionario que necesita (`header`, `footer`), en lugar del diccionario completo, aunque el cacheo de `getDictionary` ya mitiga este impacto.