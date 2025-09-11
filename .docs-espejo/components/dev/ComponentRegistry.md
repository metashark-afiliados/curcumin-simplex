// .docs-espejo/components/dev/ComponentRegistry.md
/**
 * @file ComponentRegistry.md
 * @description Documento Espejo para el aparato ComponentRegistry.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: ComponentRegistry

## 1. Rol Estratégico y Propósito

El `ComponentRegistry.ts` es la **Única Fuente de Verdad (SSoT) y el corazón del dominio de desarrollo** (`(dev)`). Su propósito estratégico es desacoplar la lógica de enrutamiento del entorno de desarrollo de la implementación real de los componentes.

Actúa como un "directorio telefónico" que permite a nuestro lienzo de componentes (`ComponentCanvas`) buscar y renderizar dinámicamente cualquier componente registrado basándose en un simple identificador de texto proveniente de la URL.

## 2. Arquitectura y Flujo de Ejecución

1.  **Definición Estática:** El registro es un objeto estático de TypeScript. Cada entrada asocia una clave (`string`) a un objeto que contiene el componente React (como una referencia de primera clase, `React.ComponentType`) y un objeto de `props` con datos de prueba.
2.  **Fuente de Datos:** Para las `props`, importa directamente los archivos `.i18n.json` existentes, asegurando que los componentes se prueben con una estructura de datos idéntica a la de producción.
3.  **Consulta en Servidor:** La página dinámica del lienzo (`/dev/components/[componentName]/page.tsx`) utiliza la función `getComponentByName` para consultar este registro en el servidor.
4.  **Transferencia de Datos:** Si se encuentra una coincidencia, el nombre del componente y sus `props` se pasan al componente cliente `ComponentCanvas` para el renderizado.

Esta arquitectura centraliza la configuración del entorno de desarrollo, haciendo que la adición de nuevos componentes al lienzo sea una operación simple y de bajo riesgo que se limita a modificar este único archivo.

## 3. Contrato de API

-   **Entrada Principal:** `componentRegistry` (objeto estático).
-   **Salida Principal:** `getComponentByName(name: string): ComponentRegistryEntry | undefined`.

## 4. Zona de Melhorias Futuras

1.  **Carga Dinámica de Componentes:** En lugar de importar todos los componentes estáticamente, se podría usar `React.lazy` y `next/dynamic` para cargar los componentes solo cuando se solicitan, mejorando el rendimiento del build del entorno de desarrollo.
2.  **Validación de Props con Zod:** Integrar Zod para validar que las `props` de mock data proporcionadas en el registro coincidan con el schema de props del componente real.
3.  **Generación Automática del Registro:** Crear un script de build que escanee el directorio `src/components` y genere automáticamente una versión básica del `ComponentRegistry.ts`, reduciendo el trabajo manual.
4.  **Múltiples Casos de Prueba por Componente:** Modificar la estructura para permitir que un componente tenga varias entradas con diferentes conjuntos de `props` para probar distintos estados (ej. `Button-default`, `Button-disabled`).
// .docs-espejo/components/dev/ComponentRegistry.md