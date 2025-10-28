# Accessibility Booster 🚀

> **Ferramentas de IA para melhorar a acessibilidade digital**

O Accessibility Booster é uma aplicação web moderna que integra ferramentas de inteligência artificial do Google Generative AI para melhorar a acessibilidade digital. Com uma interface limpa e acessível, oferece recursos como resumo de textos, análise multimodal de imagens, tradução e correção automática.

![Accessibility Booster](https://img.shields.io/badge/Accessibility-Booster-blue?style=for-the-badge&logo=accessibility)
![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📋 Índice

- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Ferramentas Disponíveis](#-ferramentas-disponíveis)
- [API Reference](#-api-reference)
- [Acessibilidade](#-acessibilidade)
- [Scripts](#-scripts)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## ✨ Características

### 🤖 Ferramentas de IA

- **Summarizer**: Resuma textos longos em pontos principais concisos
- **PromptBox**: Interação multimodal com texto e imagens
- **Translator**: Tradução entre múltiplos idiomas
- **Proofreader**: Correção automática de erros gramaticais
- **Writer**: Geração de conteúdo criativo e profissional
- **Rewriter**: Reescrita de textos com diferentes estilos

### ♿ Recursos de Acessibilidade

- **Design inclusivo** com alto contraste e navegação por teclado
- **Suporte completo a leitores de tela**
- **Personalização** de tamanho de fonte e esquemas de cores
- **Múltiplos idiomas** (Português, Inglês, Espanhol, Francês, Alemão)
- **Configurações persistentes** salvas localmente

### 🎨 Interface Moderna

- **Layout responsivo** com sidebar colapsível
- **Navegação intuitiva** entre ferramentas
- **Estados visuais** claros (loading, erro, sucesso)
- **Tema claro/escuro** configurável
- **Preview em tempo real** das configurações

## 🛠️ Tecnologias

### Frontend

- **[Next.js 14.2.0](https://nextjs.org/)** - Framework React com SSR/SSG
- **[React 18.3.0](https://reactjs.org/)** - Biblioteca de interface de usuário
- **[TypeScript 5.4.5](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 3.4.3](https://tailwindcss.com/)** - Framework CSS utilitário

### IA e APIs

- **[Google Generative AI](https://ai.google.dev/)** - SDK oficial para Gemini
- **Chrome AI APIs** - Integração com APIs multimodais

### Desenvolvimento

- **[ESLint](https://eslint.org/)** - Linting de código
- **[Prettier](https://prettier.io/)** - Formatação de código
- **[PostCSS](https://postcss.org/)** - Processamento CSS

## 🚀 Instalação

### Pré-requisitos

- **Node.js** 18.0 ou superior
- **npm** 9.0 ou superior
- **Chave de API** do Google Generative AI

### Passos de Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/accessibility-booster.git
   cd accessibility-booster
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env.local
   ```

   Edite `.env.local` e adicione sua chave de API:

   ```env
   NEXT_PUBLIC_GOOGLE_AI_API_KEY=sua_chave_aqui
   ```

4. **Execute o projeto**

   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## ⚙️ Configuração

### Configuração da API Key

1. **Via Interface Web** (Recomendado)
   - Acesse `/settings` na aplicação
   - Vá para a aba "Geral"
   - Cole sua chave de API do Google Generative AI
   - Clique em "Salvar Configurações"

2. **Via Arquivo de Ambiente**
   ```env
   NEXT_PUBLIC_GOOGLE_AI_API_KEY=AIzaSyC...
   ```

### Obter Chave de API

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

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
│   │   ├── SummarizerExample.tsx     # Exemplo do Summarizer
│   │   └── SettingsPage.tsx          # Página de configurações
│   ├── 📁 hooks/
│   │   ├── useChromeAI.ts            # Hook para Chrome AI
│   │   ├── useSummarizer.ts          # Hook para resumos
│   │   └── useMultimodalPrompt.ts    # Hook para prompts multimodais
│   ├── 📁 pages/
│   │   ├── _app.tsx                  # App wrapper
│   │   ├── index.tsx                 # Redirecionamento para /home
│   │   ├── home.tsx                  # Página inicial
│   │   ├── tools.tsx                 # Página de ferramentas
│   │   ├── settings.tsx              # Página de configurações
│   │   └── prompt-box-demo.tsx       # Demo do PromptBox
│   └── 📁 styles/
│       └── globals.css               # Estilos globais
├── 📁 public/                        # Arquivos estáticos
├── 📁 chrome-extension-dist/         # Build da extensão Chrome
├── 📄 package.json                   # Dependências e scripts
├── 📄 tailwind.config.js             # Configuração Tailwind
├── 📄 tsconfig.json                  # Configuração TypeScript
└── 📄 README.md                      # Este arquivo
```

## 🛠️ Ferramentas Disponíveis

### 📝 Summarizer

- **Função**: Resumir textos longos em pontos principais
- **Recursos**:
  - Estilos: conciso, detalhado, tópicos
  - Controle de comprimento máximo
  - Métricas de compressão
- **Hook**: `useSummarizer`

### 💬 PromptBox

- **Função**: Interação multimodal com IA usando texto e imagens
- **Recursos**:
  - Entrada de texto e upload de imagem
  - Detecção automática de tipo de entrada (texto, imagem, ou ambos)
  - Configuração de idioma da resposta
  - Controle de criatividade (temperature)
  - Preview de imagem antes do envio
  - Exemplos de prompts integrados
  - Contador de caracteres
  - Tooltips com dicas de uso
- **Hook**: `usePromptApi`

#### Exemplo de Uso do PromptBox:

```typescript
import { PromptBox } from '@/components/PromptBox'

function MyPage() {
  return (
    <div>
      <PromptBox className="max-w-4xl mx-auto" />
    </div>
  )
}
```

#### Funcionalidades Multimodais:

- **Apenas Texto**: Perguntas, explicações, escrita criativa, análise
- **Apenas Imagem**: Descrição, análise, explicação de imagens
- **Texto + Imagem**: Análise complexa combinando ambos os tipos
- **Exemplos**: "Descreva esta foto", "Escreva uma história sobre esta imagem", "Analise os dados neste gráfico"

### 🌐 Translator

- **Função**: Tradução entre múltiplos idiomas usando IA
- **Recursos**:
  - Suporte a 8 idiomas (Português, Inglês, Espanhol, Francês, Alemão, Italiano, Japonês, Chinês)
  - Detecção automática do idioma de origem
  - Preservação de formatação original
  - Controle de estilo de tradução (literal vs natural)
  - Métricas detalhadas (tempo de processamento, tokens utilizados)
  - Validação inteligente de entrada
- **Hook**: `useTranslator`

#### Exemplo de Uso do TranslatorTool:

```typescript
import { TranslatorTool } from '@/components/TranslatorTool'

function MyPage() {
  return (
    <div>
      <TranslatorTool className="max-w-4xl mx-auto" />
    </div>
  )
}
```

#### Funcionalidades de Tradução:

- **Detecção Automática**: IA identifica automaticamente o idioma de origem
- **Preservação de Formato**: Mantém estrutura de parágrafos e formatação
- **Estilo Configurável**: Ajuste entre tradução literal e natural
- **Múltiplos Idiomas**: Suporte completo a 8 idiomas principais
- **Métricas em Tempo Real**: Tempo de processamento e uso de tokens

### ✏️ Proofreader

- **Função**: Correção automática de erros gramaticais e ortográficos
- **Recursos**:
  - Suporte a 8 idiomas (Português, Inglês, Espanhol, Francês, Alemão, Italiano, Japonês, Chinês)
  - Modo correção automática ou listagem de sugestões
  - Detecção de erros: gramática, ortografia, pontuação, estilo, clareza
  - Explicações detalhadas para cada correção
  - Métricas de confiança e tempo de processamento
  - Validação inteligente de entrada
- **Hook**: `useProofreader`

#### Exemplo de Uso do ProofreaderTool:

```typescript
import { ProofreaderTool } from '@/components/ProofreaderTool'

function MyPage() {
  return (
    <div>
      <ProofreaderTool className="max-w-4xl mx-auto" />
    </div>
  )
}
```

#### Funcionalidades de Correção:

- **Correção Automática**: Aplica correções automaticamente ao texto
- **Sugestões Detalhadas**: Lista explicações para cada correção feita
- **Tipos de Erro**: Gramática, ortografia, pontuação, estilo, clareza
- **Múltiplos Idiomas**: Suporte completo a 8 idiomas principais
- **Métricas em Tempo Real**: Contagem de correções e tempo de processamento

### ✍️ Writer & Rewriter

- **Função**: Geração e reescrita de conteúdo com IA
- **Recursos**:
  - Suporte a 8 idiomas (Português, Inglês, Espanhol, Francês, Alemão, Italiano, Japonês, Chinês)
  - 10 tipos de transformação: Writer, Rewriter, Bullet Points, Simplificação, Email Formal/Casual, Resumo, Expansão, Estilo Acadêmico, Escrita Criativa
  - Controle de criatividade e comprimento desejado
  - 4 estilos de escrita: fácil, detalhado, profissional, conciso
  - Métricas detalhadas (tokens, tempo, ratio de comprimento)
  - Validação inteligente de entrada
- **Hook**: `useWriterRewriter`

#### Exemplo de Uso do WriterRewriterTool:

```typescript
import { WriterRewriterTool } from '@/components/WriterRewriterTool'

function MyPage() {
  return (
    <div>
      <WriterRewriterTool className="max-w-4xl mx-auto" />
    </div>
  )
}
```

#### Funcionalidades de Transformação:

- **Writer**: Cria conteúdo completamente novo baseado no tema original
- **Rewriter**: Melhora texto existente preservando ideias principais
- **Conversão de Formato**: Transforma em emails, bullet points, resumos
- **Adaptação de Estilo**: Ajusta tom para diferentes audiências
- **Controle de Comprimento**: Expande ou condensa conteúdo conforme necessário

### ♿ Accessibility Settings

- **Função**: Configurações avançadas de acessibilidade
- **Recursos**:
  - **Tamanho da fonte**: Slider de 80% a 200% com preview imediato
  - **Contraste**: Normal e alto contraste para melhor visibilidade
  - **Esquemas de cores**: 6 opções (padrão, azul, verde, roxo, laranja, personalizado)
  - **Cores personalizadas**: Seletor de cores para primária, secundária, fundo e texto
  - **Espaçamento**: Normal e extra para facilitar navegação
  - **Tipos de fonte**: Regular e dyslexia-friendly (OpenDyslexic)
  - **Modo escuro/claro**: Alternância automática
  - **Navegação por teclado**: Suporte aprimorado
  - **Movimento reduzido**: Minimiza animações
  - **Otimização para screen reader**: Melhor compatibilidade
- **Hook**: `useAccessibilitySettings`

#### Exemplo de Uso do AccessibilitySettings:

```typescript
import { AccessibilitySettings } from '@/components/AccessibilitySettings'

function SettingsPage() {
  return (
    <div>
      <AccessibilitySettings className="max-w-4xl mx-auto" />
    </div>
  )
}
```

#### Funcionalidades de Acessibilidade:

- **Persistência**: Todas as configurações são salvas automaticamente no localStorage
- **Aplicação dinâmica**: Mudanças são aplicadas imediatamente ao documento
- **Preview em tempo real**: Visualização instantânea das alterações
- **Reset para padrão**: Botão para restaurar configurações originais
- **Mensagens de confirmação**: Feedback visual quando configurações são salvas
- **Acessibilidade máxima**: Labels, navegação por teclado, screen reader friendly

### 🎯 Interactive Onboarding & Tour

- **Função**: Sistema de onboarding interativo e tooltips educacionais
- **Recursos**:
  - **Tour passo-a-passo**: Guia interativo pelas principais ferramentas
  - **Modal de boas-vindas**: Apresentação inicial para novos usuários
  - **Tooltips contextuais**: Botões de ajuda (?) em cada ferramenta
  - **Progresso salvo**: Estado do tour persistido no localStorage
  - **Navegação por teclado**: Suporte completo para acessibilidade
  - **Reiniciar tour**: Opção nas configurações para refazer o tour
- **Hook**: `useOnboarding`

#### Exemplo de Uso do OnboardingModal:

```typescript
import { OnboardingModal } from '@/components/OnboardingModal'
import { useOnboarding } from '@/hooks/useOnboarding'

function HomePage() {
  const { state, startOnboarding } = useOnboarding()

  useEffect(() => {
    if (!state.isCompleted && !state.isActive) {
      startOnboarding()
    }
  }, [state.isCompleted, state.isActive, startOnboarding])

  return (
    <div>
      <OnboardingModal />
      {/* Rest of your page content */}
    </div>
  )
}
```

#### Funcionalidades do Sistema de Onboarding:

- **Tour automático**: Inicia automaticamente para novos usuários
- **8 etapas guiadas**: Welcome, Summarizer, PromptBox, Translator, Proofreader, Writer/Rewriter, Accessibility Settings, Completion
- **Navegação flexível**: Avançar, voltar, pular ou completar
- **Tooltips contextuais**: Ajuda específica para cada ferramenta
- **Persistência**: Progresso salvo no localStorage
- **Acessibilidade**: Suporte completo para screen readers e navegação por teclado

## 📚 API Reference

### Chrome AI APIs

O projeto integra com as seguintes APIs do Google Generative AI:

#### Documentação Oficial

- **[Google AI Studio](https://makersuite.google.com/)** - Interface principal
- **[Generative AI SDK](https://ai.google.dev/docs)** - Documentação técnica
- **[Gemini API Reference](https://ai.google.dev/docs/gemini_api_overview)** - Referência da API
- **[Multimodal Guide](https://ai.google.dev/docs/multimodal)** - Guia multimodal

#### Endpoints Utilizados

```typescript
// Modelo principal
model: 'gemini-1.5-flash'

// Configurações de geração
generationConfig: {
  temperature: 0.7,        // Criatividade (0.0 - 1.0)
  maxOutputTokens: 2048,   // Máximo de tokens
  topP: 0.8,              // Nucleus sampling
  topK: 40                 // Top-k sampling
}
```

#### Exemplo de Uso

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

const result = await model.generateContent([
  { text: 'Seu prompt aqui' },
  { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
])
```

## ♿ Acessibilidade

### Recursos Implementados

#### Design Inclusivo

- ✅ **Alto contraste** configurável
- ✅ **Navegação por teclado** completa
- ✅ **Suporte a leitores de tela** com ARIA labels
- ✅ **Textos alternativos** para imagens
- ✅ **Foco visível** em todos os elementos interativos

#### Personalização

- ✅ **Tamanho de fonte** ajustável (pequeno, médio, grande, extra grande)
- ✅ **Esquemas de cores** (claro, escuro, automático)
- ✅ **Redução de movimento** opcional
- ✅ **Configurações persistentes** no localStorage

#### Padrões Seguidos

- **[WCAG 2.1 AA](https://www.w3.org/WAI/WCAG21/quickref/)** - Diretrizes de acessibilidade
- **[ARIA](https://www.w3.org/WAI/ARIA/apg/)** - Atributos para tecnologias assistivas
- **[Semantic HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)** - HTML semântico

### Testes de Acessibilidade

```bash
# Instalar ferramentas de teste
npm install --save-dev @axe-core/react

# Executar testes de acessibilidade
npm run test:a11y
```

## 📜 Scripts

### Desenvolvimento

```bash
npm run dev          # Executar em modo desenvolvimento
npm run build        # Build de produção
npm run start        # Executar build de produção
```

### Qualidade de Código

```bash
npm run lint         # Executar ESLint
npm run format       # Formatar código com Prettier
npm run type-check   # Verificar tipos TypeScript
```

### Extensão Chrome

```bash
npm run ext:build    # Build da extensão
npm run ext:dev      # Desenvolvimento da extensão
npm run ext:watch    # Watch mode para extensão
```

## 🤝 Contribuição

### Como Contribuir

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. **Abra** um Pull Request

### Diretrizes de Contribuição

- **Código**: Siga os padrões ESLint e Prettier configurados
- **Commits**: Use mensagens descritivas em português
- **Testes**: Adicione testes para novas funcionalidades
- **Acessibilidade**: Mantenha os padrões de acessibilidade
- **Documentação**: Atualize a documentação quando necessário

### Reportar Bugs

Use o [sistema de issues](https://github.com/seu-usuario/accessibility-booster/issues) para reportar bugs. Inclua:

- Descrição detalhada do problema
- Passos para reproduzir
- Screenshots (se aplicável)
- Informações do ambiente (navegador, OS, etc.)

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **[Google AI](https://ai.google.dev/)** - Por fornecer as APIs de IA
- **[Next.js Team](https://nextjs.org/)** - Pelo excelente framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Pelo sistema de design
- **Comunidade de Acessibilidade** - Pelas diretrizes e padrões

## 📞 Suporte

- **Documentação**: [Wiki do projeto](https://github.com/seu-usuario/accessibility-booster/wiki)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/accessibility-booster/issues)
- **Discussões**: [GitHub Discussions](https://github.com/seu-usuario/accessibility-booster/discussions)
- **Email**: suporte@accessibilitybooster.com

---

<div align="center">
  <p>Feito com ❤️ para melhorar a acessibilidade digital</p>
  <p>
    <a href="#accessibility-booster-">⬆️ Voltar ao topo</a>
  </p>
</div>
