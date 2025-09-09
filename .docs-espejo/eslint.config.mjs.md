# Manifiesto Conceptual: eslint.config.mjs

## 1. Rol Estratégico y Propósito

El `eslint.config.mjs` es el **Guardián de la Calidad y Consistencia del Código**. Su propósito estratégico es definir y aplicar de forma automática un conjunto de reglas que aseguran que todo el código base de `curcumin-simplex` se adhiera a un estándar de estilo unificado y a las mejores prácticas de desarrollo.

Actúa como una red de seguridad automatizada que previene la introducción de "code smells", errores comunes y código de difícil lectura, ejecutándose a través del script `pnpm run lint`.

## 2. Arquitectura y Flujo de Ejecución

Este aparato utiliza el moderno formato de configuración "Flat Config" de ESLint.

1.  **`FlatCompat`**: Esta es una capa de compatibilidad crucial. Se utiliza porque `eslint-config-next` (la configuración oficial de Next.js) aún no exporta sus reglas en el nuevo formato "Flat Config". `FlatCompat` nos permite "traducir" y extender esa configuración legacy dentro de nuestra nueva estructura.
2.  **`...compat.extends(...)`**: El corazón de la configuración. Aquí se heredan todas las reglas curadas por el equipo de Vercel, optimizadas para proyectos Next.js. Esto incluye reglas para el uso correcto de Hooks, optimización de imágenes, accesibilidad y rendimiento (`core-web-vitals`).
3.  **`ignores`**: Define una lista de exclusión. Instruye a ESLint para que no pierda tiempo analizando directorios de dependencias, artefactos de build o archivos de declaración de tipos generados automáticamente, optimizando así la velocidad del proceso de linting.

## 3. Zona de Melhorias Futuras

1.  **Integración de Prettier**: Añadir `eslint-config-prettier` al final del array `extends` para desactivar cualquier regla de estilo de ESLint que pueda entrar en conflicto con Prettier, haciendo de Prettier la única fuente de verdad para el formato del código.
2.  **Plugin de Ordenación de Imports**: Incorporar un plugin como `eslint-plugin-simple-import-sort` para forzar un ordenamiento consistente y automático de las declaraciones `import`, mejorando la legibilidad.
3.  **Eliminación de `FlatCompat`**: En el futuro, cuando `eslint-config-next` ofrezca soporte nativo para "Flat Config", se podrá eliminar el uso de `FlatCompat`, simplificando aún más este archivo.
4.  **Reglas Específicas del Proyecto**: A medida que el proyecto madure, se pueden añadir reglas personalizadas para hacer cumplir convenciones específicas del equipo o del dominio del negocio.