# /.docs-espejo/next.config.md
/**
 * @file next.config.md
 * @description Documento espejo para la configuración de Next.js.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Configuración de Next.js

## 1. Rol Estratégico

El aparato `next.config.ts` es el **manifiesto de configuración del framework Next.js**. Su rol estratégico es dictar el comportamiento fundamental del proceso de `build` y `dev`, definiendo la arquitectura de salida del proyecto.

Para `curcumin-simplex`, su propósito central es forzar una estrategia de **Generación de Sitio Estático (SSG) pura**, asegurando el máximo rendimiento, seguridad y compatibilidad con cualquier servidor de archivos estáticos.

## 2. Arquitectura y Lógica de Configuración

La configuración se basa en la simplicidad y en la adhesión estricta a los requisitos del modo `export`.

1.  **`output: 'export'`:** Esta es la directiva más importante. Le instruye a Next.js que, durante el `build`, genere una carpeta (`/out`) con archivos HTML, CSS y JS completamente estáticos. Esto desacopla el proyecto de la necesidad de un servidor Node.js en producción.
2.  **`images: { unoptimized: true }`:** Esta es una consecuencia directa de usar `output: 'export'`. Desactiva el optimizador de imágenes en tiempo de ejecución de Next.js (que requiere un servidor). La responsabilidad de la optimización de imágenes se traslada al desarrollador antes del `build`, como se define en el `ASSET_MANAGEMENT_MANIFESTO.md`.
3.  **`trailingSlash: false`:** Es una configuración de preferencia para SEO y consistencia de URL, asegurando que las rutas no terminen con una barra (`/`).

Toda la lógica no esencial o irrelevante para un build estático (como `headers`, `redirects`, `webpack` complejo) ha sido eliminada deliberadamente para mantener la configuración limpia, enfocada y alineada con la estrategia de despliegue.

## 3. Contrato de API

Este aparato no expone una API para ser consumida por otro código. En su lugar, es consumido directamente por el CLI de Next.js (`next dev`, `next build`).

## 4. Zona de Melhorias Futuras

1.  **Integración de `next-sitemap`:** Para proyectos con muchas rutas dinámicas, se podría integrar el paquete `next-sitemap` en el script de `postbuild` para generar un `sitemap.xml` de forma más automática y robusta que el generador interno.
2.  **Cargador de Imágenes Personalizado:** Si se decidiera usar un servicio de optimización de imágenes de terceros (como Cloudinary o Imgix), se podría configurar un `loader` personalizado en la sección `images` para apuntar a dicho servicio.
3.  **Análisis de Bundle con `@next/bundle-analyzer`:** Se podría añadir una configuración condicional para ejecutar el analizador de bundles, ayudando a identificar paquetes pesados que puedan estar afectando negativamente el rendimiento.
# /.docs-espejo/next.config.md```

---

**Próximo aparato a refactorizar:** `tailwind.config.ts`