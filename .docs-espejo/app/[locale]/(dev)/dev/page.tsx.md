# /.docs-espejo/app/[locale]/(dev)/dev/page.tsx.md
/**
 * @file page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página del Dashboard del DCC.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Dashboard del Developer Command Center (DCC)

## 1. Rol Estratégico

Este aparato (`page.tsx`) es el **punto de entrada y el portal principal** al ecosistema de herramientas de desarrollo. Su propósito es presentar al desarrollador un menú claro y conciso de las herramientas disponibles (Canvas de Componentes, Simulador de Campañas, etc.), actuando como un "launchpad" para mejorar la DX.

## 2. Arquitectura y Flujo de Ejecución

1.  **Obtención de Datos (Servidor):** Como Componente de Servidor `async`, su primera acción es invocar `getDictionary` para obtener el contenido textual de la interfaz (títulos, descripciones de herramientas) para el `locale` actual. Implementa un manejo de errores robusto para guiar al desarrollador si el diccionario no se carga correctamente.
2.  **Definición de Configuración de UI:** Una constante (`devToolsConfig`) define la estructura de las tarjetas de herramientas. Esta configuración mapea una clave de contenido a una ruta (obtenida de la SSoT `routes`) y un icono. Este desacoplamiento facilita añadir o quitar herramientas en el futuro.
3.  **Renderizado (Servidor):** El componente itera sobre la configuración y renderiza una cuadrícula de componentes `Link` estilizados como tarjetas. Cada tarjeta apunta a la herramienta correspondiente, pasando el `locale` actual para mantener la consistencia de la navegación.

## 3. Contrato de API (Props)

*   `params`: `{ locale: Locale; }` - Define el idioma en el que se renderizará la interfaz del dashboard.

## 4. Zona de Melhorias Futuras (Registro de Valor)

1.  **Descubrimiento Dinámico de Herramientas:** En lugar de una constante harcodeada, el `devToolsConfig` podría ser generado dinámicamente escaneando los subdirectorios de `/dev` que contengan un archivo `manifest.json`.
2.  **Indicadores de Estado:** Cada tarjeta podría mostrar un pequeño indicador de estado (ej. un punto verde o rojo) que refleje la salud de esa parte del sistema (ej. si todas las pruebas de componentes pasan, si el build de campañas es exitoso).
3.  **Acciones Rápidas:** Añadir botones de "acción rápida" en cada tarjeta, como "Limpiar caché de la herramienta" o "Regenerar manifiesto de rutas".