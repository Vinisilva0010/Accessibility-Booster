# 🔧 Accessibility Booster

> Ferramentas de IA para melhorar a acessibilidade digital usando Chrome AI APIs

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React para desenvolvimento web
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Google Generative AI** - SDK para integração com APIs de IA
- **Chrome AI APIs** - APIs para funcionalidades de IA

## 📦 Instalação e Execução Local

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Chave de API do Google Generative AI

### Passos para Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Vinisilva0010/Accessibility-Booster.git
   cd Accessibility-Booster
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env.local
   ```
   
   Edite o arquivo `.env.local` e adicione sua API key:
   ```env
   NEXT_PUBLIC_GOOGLE_AI_API_KEY=sua_api_key_aqui
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🔧 Configuração da API Key

### Obter Chave de API

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

### Configurar na Aplicação

**Opção 1: Via Interface Web (Recomendado)**
- Acesse `/settings` na aplicação
- Vá para a aba "Geral"
- Cole sua chave de API
- Clique em "Salvar Configurações"

**Opção 2: Via Arquivo de Ambiente**
- Edite o arquivo `.env.local`
- Adicione: `NEXT_PUBLIC_GOOGLE_AI_API_KEY=sua_api_key_aqui`
- Reinicie o servidor

## 📁 Estrutura do Projeto

```
accessibility-booster/
├── 📁 src/
│   ├── 📁 api/
│   │   └── chrome-ai.ts              # Cliente para APIs Chrome AI
│   ├── 📁 components/
│   │   ├── Layout.tsx                 # Layout principal com sidebar
│   │   ├── Sidebar.tsx               # Navegação lateral
│   │   ├── PromptBox.tsx             # Componente multimodal
│   │   ├── SummarizerTool.tsx        # Ferramenta de resumo
│   │   ├── TranslatorTool.tsx        # Ferramenta de tradução
│   │   ├── ProofreaderTool.tsx       # Ferramenta de correção
│   │   ├── WriterRewriterTool.tsx    # Ferramenta de escrita
│   │   ├── AccessibilitySettings.tsx # Configurações de acessibilidade
│   │   ├── OnboardingModal.tsx       # Modal de onboarding
│   │   └── SettingsPage.tsx          # Página de configurações
│   ├── 📁 hooks/
│   │   ├── useChromeAI.ts            # Hook para Chrome AI
│   │   ├── useSummarizer.ts          # Hook para resumos
│   │   ├── useTranslator.ts          # Hook para tradução
│   │   ├── useProofreader.ts         # Hook para correção
│   │   ├── useWriterRewriter.ts      # Hook para escrita
│   │   ├── usePromptApi.ts           # Hook para prompts multimodais
│   │   ├── useAccessibilitySettings.ts # Hook para configurações
│   │   └── useOnboarding.ts          # Hook para onboarding
│   ├── 📁 pages/
│   │   ├── _app.tsx                  # App wrapper
│   │   ├── index.tsx                 # Redirecionamento para /home
│   │   ├── home.tsx                  # Página inicial
│   │   ├── tools.tsx                 # Página de ferramentas
│   │   └── settings.tsx              # Página de configurações
│   └── 📁 styles/
│       └── globals.css               # Estilos globais
├── 📁 public/                        # Arquivos estáticos
├── 📁 chrome-extension-dist/         # Build da extensão Chrome
├── 📄 package.json                   # Dependências e scripts
├── 📄 next.config.js                 # Configuração Next.js
├── 📄 tailwind.config.js             # Configuração Tailwind
└── 📄 README.md                      # Este arquivo
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Executar em modo de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Executar build de produção
- `npm run lint` - Executar ESLint
- `npm run format` - Formatar código com Prettier

## 🌟 Funcionalidades

### Ferramentas de IA Disponíveis

1. **📝 Summarizer** - Resuma textos longos em pontos principais
2. **💬 PromptBox** - Interação multimodal com texto e imagens
3. **🌐 Translator** - Tradução entre diferentes idiomas
4. **✏️ Proofreader** - Correção gramatical e ortográfica
5. **✍️ Writer/Rewriter** - Geração e reescrita de conteúdo

### Recursos de Acessibilidade

- **🌙 Modo Escuro** - Tema escuro para melhor visualização
- **🔍 Alto Contraste** - Cores com maior contraste
- **📏 Tamanho de Fonte** - Ajuste do tamanho da fonte
- **⌨️ Navegação por Teclado** - Suporte completo ao teclado
- **🔊 Screen Reader** - Otimizado para leitores de tela
- **📖 Fonte para Dislexia** - Fonte especial para dislexia

### Sistema de Onboarding

- **🎯 Tour Interativo** - Guia passo-a-passo pelas funcionalidades
- **💡 Tooltips Contextuais** - Dicas e exemplos em cada ferramenta
- **📱 Responsivo** - Funciona em desktop, tablet e mobile
- **♿ Acessível** - Suporte completo para screen readers

## 🔗 Links Úteis

- [Chrome AI API Documentation](https://ai.google.dev/docs)
- [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request para sugerir melhorias.

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para melhorar a acessibilidade digital**