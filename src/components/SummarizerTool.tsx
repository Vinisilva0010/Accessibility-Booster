import React, { useState } from 'react'
import { useSummarizer, SummarizerOptions } from '@/hooks/useSummarizer'
import {
  ContextualTooltip,
  TOOLTIP_CONTENT,
} from '@/components/ContextualTooltip'

export function SummarizerTool() {
  const [text, setText] = useState('')
  const [maxLength, setMaxLength] = useState(200)
  const [style, setStyle] = useState<'brief' | 'detailed' | 'bullet-points'>(
    'brief'
  )
  const [language, setLanguage] = useState('português')
  const [temperature, setTemperature] = useState(0.3)

  const { summarize, isLoading, error, result, clearResult } = useSummarizer()

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert('Por favor, digite um texto para resumir.')
      return
    }

    const options: SummarizerOptions = {
      maxLength,
      style,
      language,
      temperature,
    }

    try {
      await summarize(text, options)
    } catch (err) {
      console.error('Erro ao resumir:', err)
    }
  }

  const handleClear = () => {
    setText('')
    clearResult()
  }

  const handleLoadExample = () => {
    const exampleText = `A inteligência artificial (IA) é uma área da ciência da computação que se dedica ao desenvolvimento de sistemas capazes de realizar tarefas que normalmente requerem inteligência humana. Esses sistemas podem incluir reconhecimento de voz, tomada de decisões, tradução entre idiomas e reconhecimento visual.

A IA pode ser classificada em diferentes tipos, incluindo IA fraca (ou estreita), que é projetada para realizar uma tarefa específica, e IA forte (ou geral), que possui a capacidade de entender, aprender e aplicar conhecimento em uma ampla gama de tarefas, similar à inteligência humana.

As aplicações da IA são vastas e incluem assistentes virtuais, veículos autônomos, diagnósticos médicos, sistemas de recomendação, processamento de linguagem natural e muito mais. Com o avanço da tecnologia, a IA está se tornando cada vez mais integrada em nossas vidas diárias, transformando indústrias e criando novas oportunidades de inovação.

No entanto, o desenvolvimento da IA também levanta questões importantes sobre ética, privacidade, segurança e o impacto no mercado de trabalho. É essencial que continuemos a desenvolver essas tecnologias de forma responsável, considerando tanto os benefícios quanto os desafios que elas apresentam.`

    setText(exampleText)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Chrome AI Summarizer
            </h2>
            <p className="text-gray-600">
              Resuma textos longos usando inteligência artificial do Google
              Generative AI
            </p>
          </div>
          <ContextualTooltip {...TOOLTIP_CONTENT.summarizer}>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Show help for Summarizer tool"
            >
              <span className="text-lg">?</span>
            </button>
          </ContextualTooltip>
        </div>
      </div>

      {/* Input Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {/* Text Input */}
          <div>
            <label
              htmlFor="text-input"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Texto para resumir:
            </label>
            <textarea
              id="text-input"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Digite ou cole o texto que deseja resumir..."
              className="h-40 w-full resize-none rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>{text.length} caracteres</span>
              <button
                onClick={handleLoadExample}
                className="text-blue-600 hover:text-blue-700"
                disabled={isLoading}
              >
                Carregar exemplo
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label
                htmlFor="max-length"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Comprimento máximo:
              </label>
              <input
                id="max-length"
                type="number"
                value={maxLength}
                onChange={e => setMaxLength(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="50"
                max="1000"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="style"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Estilo:
              </label>
              <select
                id="style"
                value={style}
                onChange={e => setStyle(e.target.value as any)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                <option value="brief">Conciso</option>
                <option value="detailed">Detalhado</option>
                <option value="bullet-points">Tópicos</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="language"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Idioma:
              </label>
              <select
                id="language"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                <option value="português">Português</option>
                <option value="inglês">Inglês</option>
                <option value="espanhol">Espanhol</option>
                <option value="francês">Francês</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="temperature"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Criatividade (0.0 - 1.0):
              </label>
              <input
                id="temperature"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={e => setTemperature(Number(e.target.value))}
                className="w-full"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-600">{temperature}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSummarize}
              disabled={isLoading || !text.trim()}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Resumindo...
                </>
              ) : (
                <>
                  <span>📝</span>
                  Resumir Texto
                </>
              )}
            </button>

            <button
              onClick={handleClear}
              disabled={isLoading}
              className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 disabled:opacity-50"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 text-red-600">⚠️</div>
            <div>
              <p className="font-medium text-red-800">Erro:</p>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            <p className="text-blue-800">Processando resumo com Chrome AI...</p>
          </div>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="space-y-4">
          <div className="rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-green-800">
              📄 Resumo Gerado:
            </h3>
            <div className="whitespace-pre-wrap text-green-700">
              {result.summary}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-md bg-gray-50 p-4">
              <h4 className="mb-2 font-medium text-gray-700">Texto Original</h4>
              <div className="text-2xl font-bold text-gray-900">
                {result.originalLength}
              </div>
              <div className="text-sm text-gray-600">palavras</div>
            </div>
            <div className="rounded-md bg-gray-50 p-4">
              <h4 className="mb-2 font-medium text-gray-700">Resumo</h4>
              <div className="text-2xl font-bold text-gray-900">
                {result.summaryLength}
              </div>
              <div className="text-sm text-gray-600">palavras</div>
            </div>
            <div className="rounded-md bg-gray-50 p-4">
              <h4 className="mb-2 font-medium text-gray-700">Compressão</h4>
              <div className="text-2xl font-bold text-gray-900">
                {result.compressionRatio}%
              </div>
              <div className="text-sm text-gray-600">redução</div>
            </div>
          </div>

          {/* Usage Metadata */}
          {result.usageMetadata && (
            <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
              <h4 className="mb-2 font-medium text-blue-800">Uso da API</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-700">
                    Tokens do Prompt:
                  </span>
                  <span className="ml-1 text-blue-600">
                    {result.usageMetadata.promptTokenCount}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-blue-700">
                    Tokens da Resposta:
                  </span>
                  <span className="ml-1 text-blue-600">
                    {result.usageMetadata.candidatesTokenCount}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Total:</span>
                  <span className="ml-1 text-blue-600">
                    {result.usageMetadata.totalTokenCount}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Usage Instructions */}
      <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
        <h4 className="mb-2 font-medium text-yellow-800">💡 Dicas de Uso:</h4>
        <ul className="space-y-1 text-sm text-yellow-700">
          <li>
            • <strong>Conciso:</strong> Ideal para textos longos que precisam
            ser resumidos rapidamente
          </li>
          <li>
            • <strong>Detalhado:</strong> Mantém mais contexto e informações
            importantes
          </li>
          <li>
            • <strong>Tópicos:</strong> Organiza informações em pontos
            principais
          </li>
          <li>
            • <strong>Criatividade baixa (0.0-0.3):</strong> Resumos mais
            consistentes e objetivos
          </li>
          <li>
            • <strong>Criatividade alta (0.7-1.0):</strong> Resumos mais
            criativos e variados
          </li>
        </ul>
      </div>
    </div>
  )
}
