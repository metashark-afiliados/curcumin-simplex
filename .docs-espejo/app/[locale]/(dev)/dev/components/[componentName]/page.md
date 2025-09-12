# /.docs-espejo/app/[locale]/(dev)/dev/components/[componentName]/page.tsx.md
/**
 * @file page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página anfitriona del canvas de componentes.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Anfitrión del Canvas de Componentes

## 1. Rol Estratégico

Este aparato (`page.tsx`) actúa como el **anfitrión de renderizado** para la herramienta de desarrollo "Component Canvas". Su única responsabilidad es interpretar los parámetros de la URL (`locale` y `componentName`) y delegar la lógica de carga y renderizado al orquestador `ComponentCanvas`.

Es una pieza clave de la Experiencia de Desarrollador (DX), permitiendo el desarrollo y la auditoría de cualquier componente de la UI de forma completamente aislada del resto de la aplicación.

## 2. Arquitectura y Flujo de Ejecución

1.  **Generación Estática (Build-Time):** La función `generateStaticParams` se ejecuta durante el build. Consulta el `ComponentRegistry` para obtener la lista de todos los componentes registrados y la combina con todos los `supportedLocales` para generar un mapa completo de todas las posibles rutas estáticas (ej. `/es-ES/dev/components/Hero`, `/it-IT/dev/components/Header`, etc.). Esto asegura que cada página del canvas sea pre-renderizada como SSG para un rendimiento máximo en el entorno de desarrollo.

2.  **Renderizado (Request-Time):**
    *   Como Componente de Servidor `async`, recibe los `params` de la URL.
    *   Invoca al componente orquestador `ComponentCanvas`, pasándole `componentName` y `locale` como props.
    *   `ComponentCanvas` se encarga de la lógica más compleja: cargar dinámicamente el módulo del componente, obtener su contenido i18n de prueba, y renderizarlo dentro de un entorno controlado con metadatos.

## 3. Contrato de API (Props)

*   `params`: `{ locale: Locale; componentName: string; }` - Las coordenadas exactas que definen qué componente renderizar y en qué idioma.

## 4. Zona de Melhorias Futuras (Registro de Valor)

1.  **Props Dinámicas por URL:** Permitir pasar props de configuración al componente a través de `searchParams` en la URL (ej. `?variant=secondary&size=lg`) para testear visualmente todas sus variantes de forma interactiva.
2.  **Error Boundary Dedicado:** Implementar un `error.tsx` en este directorio para capturar errores de renderizado de un componente específico y mostrar una UI de error más informativa para el desarrollador, en lugar de romper toda la página.
3.  **Integración con Storybook:** Añadir un enlace en el canvas que lleve a la documentación de Storybook (si se implementa) para ese componente específico, uniendo la visualización en vivo con la documentación formal.