// /.docs-espejo/components/dev/utils/component-props.md
/**
 * @file /.docs-espejo/components/dev/utils/component-props.md
 * @description Documento Espejo y SSoT conceptual para la utilidad `getFallbackProps`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @date 2025-09-10
 */
# Manifiesto Conceptual: getFallbackProps (Utilidad de Desarrollo)

## 1. Rol Estratégico y Propósito

`getFallbackProps` es una **utilidad de desarrollo (`@devonly`)** encapsulada en `src/components/dev/utils/component-props.ts`. Su propósito estratégico es proporcionar un conjunto de **props de mock estructuradas y válidas** para cualquier componente que se esté visualizando en el `Dev Component Canvas`. Actúa como una capa de resiliencia, asegurando que un componente siempre reciba las props esperadas (incluso si no se encuentran en el diccionario de i18n o en los datos de mock), previniendo `TypeError` en tiempo de ejecución y permitiendo una visualización básica del componente.

## 2. Arquitectura y Flujo de Ejecución

`getFallbackProps` es una función pura, sin estado, que no importa componentes React directamente.

1.  **Entrada**: Recibe el `name` (string) del componente para el cual generar las props de fallback.
2.  **Lógica Condicional**: Utiliza una estructura `switch` para devolver un objeto de props específico para cada componente conocido (ej. `Hero`, `BenefitsSection`, `Dock`). Cada objeto de props de fallback está diseñado para ser completamente compatible con la interfaz de props (`interface ComponentProps`) del componente correspondiente.
3.  **Manejo de Íconos en Mocks**: Para componentes como `Dock` que requieren `React.ReactNode` para sus íconos en los mocks, utiliza `React.createElement` y importa `lucide-react` directamente, asegurando que los íconos se rendericen correctamente.
4.  **Salida**: Devuelve un objeto `Record<string, any>` que representa las props de fallback del componente. Si el componente no tiene un fallback específico, devuelve un objeto vacío.
5.  **Observabilidad**: Incluye `clientLogger.trace` para registrar la generación de fallbacks, facilitando la depuración.

## 3. Contrato de API (Función)

```typescript
/**
 * @function getFallbackProps
 * @description Genera props de fallback completas y tipadas para componentes específicos
 *              del Dev Canvas, asegurando que la estructura esperada por el componente
 *              esté presente para evitar TypeError.
 * @param {string} name - Nombre del componente para el cual generar las props de fallback.
 * @returns {Record<string, any>} Objeto de props de fallback estructuradas.
 */
export function getFallbackProps(name: string): Record<string, any>;
4. Zona de Mejoras Futuras
Definición de Fallbacks en el Registro: Mover la definición de los objetos de props de fallback a ComponentRegistry.ts o a un archivo de configuración de desarrollo dedicado, para que getFallbackProps simplemente los recupere por nombre.
Generación Automática de Fallbacks: Explorar herramientas que puedan generar automáticamente props de mock válidas a partir de esquemas Zod o interfaces TypeScript, reduciendo la necesidad de mantener fallbacks manuales.
Internacionalización de Fallbacks: Si los fallbacks contienen texto visible, permitir que este texto sea internacionalizado a través del sistema de i18n del proyecto.
// /.docs-espejo/components/dev/utils/component-props.md