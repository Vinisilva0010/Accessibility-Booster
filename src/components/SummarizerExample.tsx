import React, { useState } from 'react'
import { useSummarizer } from '@/hooks/useSummarizer'

export function SummarizerExample() {
  const [text, setText] = useState('')
  const [maxLength, setMaxLength] = useState(200)
  const [style, setStyle] = useState<'brief' | 'detailed' | 'bullet-points'>(
    'brief'
  )

  const { summarize, isLoading, error, result, clearResult } = useSummarizer()

  const handleSummarize = async () => {
    if (!text.trim()) return

    try {
      await summarize(text, {
        maxLength,
        style,
        language: 'português',
      })
    } catch (err) {
      console.error('Erro ao resumir:', err)
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h2 className="text-2xl font-bold text-gray-800">Chrome AI Summarizer</h2>

      {/* Input Section */}
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Texto para resumir:
          </label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Digite ou cole o texto que deseja resumir..."
            className="h-32 w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Comprimento máximo:
            </label>
            <input
              type="number"
              value={maxLength}
              onChange={e => setMaxLength(Number(e.target.value))}
              className="w-24 rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
              min="50"
              max="1000"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Estilo:
            </label>
            <select
              value={style}
              onChange={e => setStyle(e.target.value as any)}
              className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="brief">Conciso</option>
              <option value="detailed">Detalhado</option>
              <option value="bullet-points">Tópicos</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSummarize}
            disabled={isLoading || !text.trim()}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Resumindo...' : 'Resumir'}
          </button>

          {result && (
            <button
              onClick={clearResult}
              className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <p className="font-medium text-red-800">Erro:</p>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
          <p className="text-blue-800">Processando resumo...</p>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="space-y-4">
          <div className="rounded-md border border-green-200 bg-green-50 p-4">
            <h3 className="mb-2 text-lg font-semibold text-green-800">
              Resumo:
            </h3>
            <p className="whitespace-pre-wrap text-green-700">
              {result.summary}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="rounded-md bg-gray-50 p-3">
              <p className="font-medium text-gray-700">Texto original:</p>
              <p className="text-gray-600">{result.originalLength} palavras</p>
            </div>
            <div className="rounded-md bg-gray-50 p-3">
              <p className="font-medium text-gray-700">Resumo:</p>
              <p className="text-gray-600">{result.summaryLength} palavras</p>
            </div>
            <div className="rounded-md bg-gray-50 p-3">
              <p className="font-medium text-gray-700">Compressão:</p>
              <p className="text-gray-600">{result.compressionRatio}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

