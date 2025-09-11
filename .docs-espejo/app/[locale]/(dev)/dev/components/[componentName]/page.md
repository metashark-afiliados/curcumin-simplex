# /.docs-espejo/app/[locale]/(dev)/dev/components/[componentName]/page.md
/**
 * @file page.md
 * @description Documento espejo para la página de renderizado de componente aislado.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Página de Lienzo de Componente

## 1. Rol Estratégico

Este aparato es una **página de ruta dinámica** dentro del Developer Command Center (DCC). Su única responsabilidad estratégica es actuar como el "escenario" donde un componente de UI individual puede ser renderizado y examinado en total aislamiento del resto de la aplicación.

Esto es fundamental para:
-   **Desarrollo Focalizado:** Permite al desarrollador concentrarse en la lógica y el estilo de un solo componente.
-   **Depuración Eficiente:** Aísla el comportamiento del componente de posibles efectos secundarios de sus padres o del layout global.
-   **Revisión de Calidad:** Facilita la verificación de que un componente cumple con la Directiva 003 (Manifiesto de Calidad de Componentes) de forma individual.

## 2. Arquitectura y Flujo de Ejecución

1.  **Generación Estática (`generateStaticParams`):** En tiempo de `build`, la función `generateStaticParams` consulta el `ComponentRegistry.ts` (la SSoT de los componentes de desarrollo) y genera una ruta estática para cada componente registrado y para cada `locale` soportado (ej. `/it-IT/dev/components/Hero`, `/es-ES/dev/components/Header`).
2.  **Recepción de Parámetros:** Al navegar a una de estas rutas, el Server Component recibe los `params` (`locale` y `componentName`) desde la URL.
3.  **Resolución de `params`:** El componente utiliza `await` para resolver la promesa del objeto `params`, asegurando que los valores estén disponibles para su uso.
4.  **Carga de Contexto:** Invoca a `getDictionary` para precargar el contexto de internacionalización necesario.
5.  **Delegación de Renderizado:** El aparato delega toda la lógica de carga, manejo de datos de mock y renderizado final al componente `ComponentCanvas`, pasándole el `componentName` y el `locale` resueltos.

## 3. Contrato de API (Props)

El componente recibe un único objeto `props` con la siguiente estructura:

-   `params`: `{ locale: Locale; componentName: string; }`
    -   `locale`: El código de idioma (`it-IT`, `es-ES`, etc.), extraído del primer segmento de la URL.
    -   `componentName`: El nombre clave del componente (ej. `Hero`, `Footer`), extraído del último segmento de la URL.

## 4. Zona de Melhorias Futuras

1.  **Selector de Tema Dinámico:** Añadir un selector en la UI para permitir cambiar el tema de campaña (`scientific`, `vitality`, etc.) que se aplica al componente, permitiendo probar su adaptabilidad visual en tiempo real.
2.  **Panel de Código Fuente:** Integrar un panel que muestre el código fuente del componente que se está visualizando para facilitar la referencia.
3.  **Visualizador de Contrato (Schema):** Mostrar el contenido del archivo `.schema.ts` asociado al componente para que los desarrolladores puedan ver el contrato de datos que el componente espera.
4.  **Enlace a Documentación Espejo:** Añadir un enlace directo al `README.md` o al documento espejo del componente para un acceso rápido a su documentación conceptual.
# /.docs-espejo/app/[locale]/(dev)/dev/components/[componentName]/page.md