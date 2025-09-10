// .docs-espejo/components/forms/HiddenFormFields.tsx.md
/\*\*

- @file .docs-espejo/components/forms/HiddenFormFields.tsx.md
- @description Documento Espejo e SSoT conceitual para o aparato HiddenFormFields.
- @version 1.0.0
- @author RaZ podesta - MetaShark Tech
  \*/

# Manifiesto Conceptual: Aparato `HiddenFormFields`

## 1. Rol Estratégico e Propósito

O aparato `HiddenFormFields.tsx` funciona como o **"Payload de Carga"** do nosso sistema de conversão. Sua única e exclusiva responsabilidade é renderizar a estrutura HTML dos campos de formulário ocultos, que são a espinha dorsal da integração com o sistema de tracking do produtor.

Este componente é a personificação do princípio de **desacoplamento**: ele separa completamente a complexa e volátil lógica de tracking da lógica de apresentação do nosso `OrderForm.tsx`, permitindo que cada um evolua de forma independente.

## 2. Arquitetura e Fluxo de Execução

- **Tipo de Componente:** Componente de Apresentação Puro (`Dumb Component`).
- **Lógica Interna:** Nenhuma. Ele não possui estado, não executa efeitos colaterais e não busca dados. Apenas recebe `props` (atualmente nenhuma) e retorna JSX.
- **Fluxo de Execução:**
  1.  É renderizado dentro do componente `OrderForm.tsx`.
  2.  O JSX que ele produz é injetado no DOM.
  3.  O script `webvork.js`, que é executado no lado do cliente, escaneia o DOM, encontra estes campos pelo seu atributo `name`, e preenche seus `value` com os dados de tracking relevantes (UTMs, GUID, etc.).

## 3. Aparatos Associados

- **Pai (Orquestrador):** `src/components/ui/OrderForm.tsx` - O `OrderForm` importa e renderiza este componente dentro de sua tag `<form>`.
- **Executor Externo:** `public/vendor/webvork.js` - O script do produtor que atua sobre a saída deste componente.
- **Configuração Soberana:** `src/config/producer.config.ts` - No futuro, este componente será refatorado para receber os IDs (`landing_id`, `offer_id`) deste arquivo de configuração via `props`.

## 4. Zona de Melhorias Futuras

1.  **Injeção Dinâmica de Configuração:** Atualmente, os valores de `landing_id` e `offer_id` estão hardcoded (embora a estratégia futura seja gerenciá-los via `producer.config.ts`). Uma melhoria futura será refatorar este componente para que ele receba um objeto de configuração via `props` e renderize os valores dinamicamente, tornando-o 100% reutilizável para qualquer produto.
2.  **Geração de Campos a partir de um Schema:** Em vez de listar os campos manualmente, o componente poderia ler um `schema` (um array de strings) e gerar os inputs dinamicamente, tornando a adição de novos campos de tracking uma simples questão de atualizar o schema.
3.  **Validação de `webvork.js`:** Adicionar um `useEffect` de diagnóstico que, em modo de desenvolvimento, verifique se o script `webvork.js` foi carregado corretamente na `window` e emita um aviso no console se não o encontrar.
    // .docs-espejo/components/forms/HiddenFormFields.tsx.md
