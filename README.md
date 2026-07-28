# FinancePJ - Internet Banking Dashboard

Um painel financeiro corporativo (Internet Banking) robusto, performático e tipado, projetado especificamente para atender às demandas de gestão de fluxo de caixa de contas jurídicas (PJ).

## 🚀 Tecnologias & Arquitetura

O projeto foi estruturado seguindo os padrões mais modernos do ecossistema front-end para garantir escalabilidade, tipagem estrita e manutenabilidade:

- **React 18** (com TypeScript para contratos de dados e prevenção de bugs em tempo de compilação)
- **Vite** (para um ambiente de desenvolvimento ultra-rápido com Hot Reload)
- **Tailwind CSS v4** (utilizando a nova arquitetura baseada em plugins do Vite e injeção via `@theme` direto no CSS global)
- **Lucide React** (iconografia vetorial e minimalista)
- **API Intl Nativa** (gerenciamento e internacionalização de formatação de moedas `BRL`)

## 📐 Design System & UI Kit

A interface foi implementada com base nas especificações estritas de design para produtos corporativos financeiros, unindo sobriedade com tendências modernas de UI:

- **Tipografia:**
  - `Hanken Grotesk` para destaques numéricos e títulos (valores monetários em destaque).
  - `Inter` para leitura textual, menus e corpo da aplicação.
  - `JetBrains Mono` com alinhamento à direita na tabela de transações, otimizando o escaneamento vertical de dados numéricos.
- **Geometria (Shapes):**
  - Componentes interativos (botões, inputs) com arredondamento de `4px` (`rounded`).
  - Containers principais (cards de resumo) com arredondamento de `8px` (`rounded-lg`).
  - Badges de status com raio de `1rem` (pílula) para diferenciação cognitiva imediata.

## 📁 Estrutura do Projeto

A arquitetura de pastas foi pensada para o crescimento sustentável da aplicação, separando responsabilidades de forma clara:

```text
src/
├── components/   # UI Kit reutilizável (Button, Input, Table...)
├── layouts/      # Estruturas de página (Sidebar, Header, MainLayout)
├── pages/        # Telas da aplicação (Dashboard, Statement)
├── services/     # Camada de dados e simulações (MockData)
├── types/        # Contratos de tipagem globais do TypeScript
└── utils/        # Funções utilitárias puras (Formatadores)

## 🛠️ Como Executar o Projeto

1. Instale as dependências:
   ```bash
   npm install
2. Inicie o servidor de desenvolvimento local:
   ```bash
   npm run dev
3. Abra o navegador no endereço indicado (geralmente http://localhost:5173).


