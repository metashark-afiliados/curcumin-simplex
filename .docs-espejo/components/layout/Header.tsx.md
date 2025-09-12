// .docs-espejo/components/layout/Header.tsx.md
/**
 * @file Header.tsx.md
 * @description Documento espejo y SSoT conceptual para el componente de cabecera principal del portal.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Componente PortalHeader

## 1. Rol Estratégico

El aparato `Header.tsx` es el **componente de navegación y identidad de marca principal y persistente** para todo el dominio del Portal (todas las rutas que no son de campaña). Su rol estratégico es triple:

1.  **Identidad Visual:** Muestra de forma prominente el logo de la marca (`Global Fitwell`).
2.  **Navegación Global:** Proporciona los enlaces principales para navegar entre las secciones clave del portal (Inicio, Tienda, Sobre Nosotros).
3.  **Punto de Entrada a la Conversión:** Contiene una Llamada a la Acción (CTA) principal que dirige al usuario hacia el dominio de campañas, actuando como un puente entre el contenido y la conversión.

Adicionalmente, en el entorno de desarrollo, actúa como el anfitrión para las herramientas de desarrollo (`DevToolsDropdown`).

## 2. Arquitectura y Flujo de Ejecución

1.  **Naturaleza:** Es un Componente Cliente (`"use client"`) porque su lógica condicional para renderizar el `DevToolsDropdown` se basa en `process.env.NODE_ENV`, y porque el dropdown en sí mismo contiene interactividad.
2.  **Entrada:** Recibe dos props de contenido desde el `LocaleLayout`:
    *   `content`: El objeto con los datos para el header (logo, enlaces, CTA).
    *   `devDictionary`: El objeto con los datos para el menú de desarrollo.
3.  **Lógica de Resiliencia:** La primera acción del componente es una guarda de seguridad. Si la prop `content` no se proporciona, el componente retorna `null` para evitar un error en tiempo de ejecución.
4.  **Renderizado Condicional:** Renderiza el `DevToolsDropdown` solo si se cumplen dos condiciones: `process.env.NODE_ENV === 'development'` Y la prop `devDictionary` no es nula.
5.  **Composición de UI:** Utiliza componentes atómicos como `Link`, `Image` y `Button` para construir la interfaz, asegurando la consistencia con el sistema de diseño.

## 3. Contrato de API

*   **Entradas (Props):**
    *   `content: Dictionary["header"]`
    *   `devDictionary: Dictionary["devRouteMenu"]`
*   **Salidas:**
    *   Un elemento JSX `<header>...</header>` o `null`.

## 4. Zona de Melhorias Futuras

1.  **Header Pegajoso con Efectos:** El header podría mejorarse para que cambie de apariencia (ej. reducir su altura, cambiar el color de fondo) al hacer scroll hacia abajo, proporcionando una mejor experiencia de usuario en páginas largas.
2.  **Menú Móvil (Hamburguesa):** La implementación actual oculta la navegación en móvil (`hidden md:flex`). Una mejora crucial es implementar un menú de hamburguesa para pantallas pequeñas que muestre los `navLinks` en un panel desplegable.
3.  **Estado Activo de Enlaces:** El `Header` podría usar el hook `usePathname` para detectar la ruta activa y aplicar un estilo visual diferente al `Link` correspondiente, indicando al usuario en qué página se encuentra.

// .docs-espejo/components/layout/Header.tsx.md