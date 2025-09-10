// .docs-espejo/components/ui/OrderForm.tsx.md
/\*\*

- @file .docs-espejo/components/ui/OrderForm.tsx.md
- @description Documento Espejo e SSoT conceitual para o aparato OrderForm.
- @version 2.0.0
- @author RaZ podesta - MetaShark Tech
  \*/

# Manifiesto Conceptual: Aparato `OrderForm`

## 1. Rol Estratégico e Propósito

O `OrderForm.tsx` é o **Motor de Conversão** da nossa Pre-Lander. Sua missão é dupla e altamente especializada:

1.  **Para o Usuário:** Oferecer uma experiência de preenchimento de dados de elite, com validação instantânea no lado do cliente, feedback claro e um design que inspira confiança.
2.  **Para o Sistema do Produtor:** Agir como um "cliente fantasma" perfeito. Ele envia os dados no formato exato que o endpoint `order.php` espera, garantindo que a lógica de negócio do produtor funcione sem atritos e que nossa comissão seja atribuída corretamente.

Ele representa a ponte final entre a nossa estratégia de conteúdo de alta confiança e a infraestrutura de vendas do parceiro.

## 2. Arquitetura e Fluxo de Execução

- **Tipo de Componente:** Orquestrador de UI de Cliente (`"use client"`).
- **Lógica Interna:**
  1.  **Inicialização:** Ao ser montado, invoca o hook `useProducerLogic`, que inicia o processo de tracking em segundo plano (injeção de pixels, obtenção de GUID).
  2.  **Validação:** Utiliza `react-hook-form` e `zod` para validar as entradas do usuário em tempo real, fornecendo feedback imediato através do componente `FormInput`.
  3.  **Submissão:** O evento `onSubmit` é interceptado pelo `react-hook-form`. Se a validação do Zod for bem-sucedida, a função `onSubmit` do nosso componente é chamada.
  4.  **Delegação:** A única ação da nossa função `onSubmit` é acionar o método `.submit()` nativo do elemento `<form>`. Isso delega o trabalho de submissão ao navegador, que então realiza um `POST` HTTP padrão para a `action` especificada no formulário.

- **Fluxo de Dados:**
  - **Entrada:** Dados do usuário (nome, telefone).
  - **Processo:** Validação local -> Submissão nativa.
  - **Saída:** Uma requisição `POST` para o endpoint do produtor, contendo os dados do usuário e os dados de tracking injetados pelo `webvork.js` nos campos renderizados pelo `HiddenFormFields`.

## 3. Aparatos Associados

- **Pai (Orquestrador):** `src/components/sections/Hero.tsx` - O `Hero` renderiza o `OrderForm`, posicionando-o estrategicamente.
- **Filhos (Apresentação):** `FormInput`, `PriceDisplay`, `Button`, `HiddenFormFields`.
- **Hooks Soberanos:** `useProducerLogic` - Fornece a lógica de tracking e atribuição.
- **Configuração Soberana:** `src/config/producer.config.ts` - Fornece a URL do endpoint (`ACTION_URL`) para a `action` do formulário.

## 4. Zona de Melhorias Futuras

1.  **Submissão via AJAX:** A maior melhoria seria substituir a submissão nativa por uma chamada `fetch` (AJAX). Isso evitaria o recarregamento da página, proporcionando uma UX muito mais suave. Permitiria exibir mensagens de sucesso ou erro em nossa própria página (usando `react-hot-toast`), em vez de depender da página de "obrigado" do produtor.
2.  **Validação de Telefone por País:** A validação atual do telefone é genérica. Poderíamos integrar uma biblioteca como `libphonenumber-js` para validar o formato do número de telefone com base no país selecionado no formulário, reduzindo drasticamente os erros de entrada.
3.  **Gestão de Estado de Submissão Avançada:** Em vez de um simples booleano `isSubmitting`, poderíamos usar uma máquina de estados (`idle`, `submitting`, `success`, `error`) para controlar a UI do formulário de forma mais granular (ex: mostrar um ícone de sucesso no botão após o envio).
4.  **Preenchimento Automático de País por GeoIP:** Utilizar os dados de um serviço de GeoIP (como o que já temos no `GeoIPLocator.tsx`) para pré-selecionar o país correto no campo `<select>`, reduzindo um passo para o usuário.
    // .docs-espejo/components/ui/OrderForm.tsx.md
