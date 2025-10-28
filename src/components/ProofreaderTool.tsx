import React, { useState } from 'react'
import {
  useProofreader,
  ProofreaderRequest,
  ProofreaderOptions,
} from '@/hooks/useProofreader'
import { ApiKeyInstructions } from '@/components/ApiKeyInstructions'

interface ProofreaderToolProps {
  className?: string
}

export function ProofreaderTool({ className = '' }: ProofreaderToolProps) {
  const [text, setText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('Portuguese')
  const [autoCorrect, setAutoCorrect] = useState(true)
  const [includeSuggestions, setIncludeSuggestions] = useState(true)
  const [temperature, setTemperature] = useState(0.2)

  const { proofread, isLoading, error, result, clearResult } = useProofreader()

  // Check if API key is available
  const hasApiKey = () => {
    if (typeof window === 'undefined') return false

    const envKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY
    const storedKey = localStorage.getItem('apiKey')

    return (
      (envKey && envKey.trim() !== '') || (storedKey && storedKey.trim() !== '')
    )
  }

  const languages = [
    'Portuguese',
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Japanese',
    'Chinese',
  ]

  const handleProofread = async () => {
    if (!text.trim()) {
      alert('Please enter text to proofread.')
      return
    }

    const options: ProofreaderOptions = {
      targetLanguage,
      autoCorrect,
      includeSuggestions,
      temperature,
    }

    const request: ProofreaderRequest = {
      text: text.trim(),
      options,
    }

    try {
      await proofread(request)
    } catch (err) {
      console.error('Error proofreading text:', err)
    }
  }

  const handleClear = () => {
    setText('')
    clearResult()
  }

  const handleLoadExample = () => {
    const exampleText = `Olá, espero que você esteja bem. Eu escrevi este texto para testar o corretor de texto. Há alguns erros propositais aqui para demonstração.

Por exemplo, esta frase tem um erro de gramática: "Eu gosto muito de comer pizza, mas eu não gosto de comer hambúrguer." Também há alguns problemas de pontuação e clareza.

O objetivo é mostrar como a ferramenta pode identificar e corrigir esses tipos de problemas automaticamente.`

    setText(exampleText)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleProofread()
    }
  }

  const getSuggestionTypeColor = (type: string) => {
    const colors = {
      grammar: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      spelling: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      punctuation:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      style:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      clarity:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    }
    return colors[type as keyof typeof colors] || colors.grammar
  }

  const getSuggestionTypeIcon = (type: string) => {
    const icons = {
      grammar: '📝',
      spelling: '🔤',
      punctuation: '❗',
      style: '✨',
      clarity: '💡',
    }
    return icons[type as keyof typeof icons] || icons.grammar
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Chrome AI Proofreader
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Instantly review and correct texts, emails, articles, and code with
          advanced AI-powered grammar and style checking.
        </p>
      </div>

      {/* API Key Instructions */}
      {!hasApiKey() && <ApiKeyInstructions />}

      {/* Input Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="space-y-4">
          {/* Text Input */}
          <div>
            <label
              htmlFor="proofreader-text"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Text to Proofread:
            </label>
            <textarea
              id="proofreader-text"
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter the text you want to proofread and correct..."
              className="h-40 w-full resize-none rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              disabled={isLoading}
              aria-describedby="proofreader-help"
            />
            <div className="mt-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{text.length} characters</span>
              <div className="flex gap-2">
                <button
                  onClick={handleLoadExample}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  disabled={isLoading}
                >
                  Load Example
                </button>
                <span className="text-xs">
                  Tip: Use Ctrl+Enter to proofread quickly
                </span>
              </div>
            </div>
            <div
              id="proofreader-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              Review texts instantly for grammar, spelling, punctuation, style,
              and clarity improvements.
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <label
              htmlFor="target-language"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Target Language:
            </label>
            <select
              id="target-language"
              value={targetLanguage}
              onChange={e => setTargetLanguage(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
              aria-describedby="language-help"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <div
              id="language-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              Select the language for grammar and style checking
            </div>
          </div>

          {/* Mode Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={autoCorrect}
                  onChange={e => setAutoCorrect(e.target.checked)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  disabled={isLoading}
                  aria-describedby="auto-correct-help"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Auto-correct text
                </span>
              </label>
              <div
                id="auto-correct-help"
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                Automatically apply corrections to the text
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeSuggestions}
                  onChange={e => setIncludeSuggestions(e.target.checked)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  disabled={isLoading}
                  aria-describedby="suggestions-help"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Include detailed suggestions
                </span>
              </label>
              <div
                id="suggestions-help"
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                Show explanations for each correction made
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div>
            <label
              htmlFor="temperature"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Correction Style (0.0 - 1.0):
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
              aria-describedby="temperature-help"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Conservative</span>
              <span className="font-medium">{temperature}</span>
              <span>Creative</span>
            </div>
            <div
              id="temperature-help"
              className="text-xs text-gray-500 dark:text-gray-400"
            >
              Lower values = conservative corrections, Higher values = creative
              improvements
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleProofread}
              disabled={isLoading || !text.trim()}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
              aria-label="Proofread text"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Proofreading...
                </>
              ) : (
                <>
                  <span>✏️</span>
                  Proofread Text
                </>
              )}
            </button>

            <button
              onClick={handleClear}
              disabled={isLoading}
              className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 disabled:opacity-50 dark:bg-gray-600 dark:hover:bg-gray-700"
              aria-label="Clear all inputs and results"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 text-red-600 dark:text-red-400">⚠️</div>
            <div>
              <p className="font-medium text-red-800 dark:text-red-200">
                Proofreading Error:
              </p>
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent dark:border-blue-400"></div>
            <p className="text-blue-800 dark:text-blue-200">
              Processing proofreading with Chrome AI...
            </p>
          </div>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="space-y-4">
          {/* Corrected Text */}
          {autoCorrect && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm dark:border-green-800 dark:bg-green-900/20">
              <h3 className="mb-4 text-lg font-semibold text-green-800 dark:text-green-200">
                ✏️ Corrected Text:
              </h3>
              <div className="whitespace-pre-wrap text-green-700 dark:text-green-300">
                {result.correctedText}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {includeSuggestions && result.suggestions.length > 0 && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm dark:border-blue-800 dark:bg-blue-900/20">
              <h3 className="mb-4 text-lg font-semibold text-blue-800 dark:text-blue-200">
                💡 Corrections Made:
              </h3>
              <div className="space-y-3">
                {result.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="rounded-md border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-800"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-lg">
                        {getSuggestionTypeIcon(suggestion.type)}
                      </span>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${getSuggestionTypeColor(
                          suggestion.type
                        )}`}
                      >
                        {suggestion.type.charAt(0).toUpperCase() +
                          suggestion.type.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.round(suggestion.confidence * 100)}% confidence
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Original:
                        </span>
                        <span className="ml-2 text-sm text-red-600 dark:text-red-400">
                          {suggestion.originalText}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Corrected:
                        </span>
                        <span className="ml-2 text-sm text-green-600 dark:text-green-400">
                          {suggestion.correctedText}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Explanation:
                        </span>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          {suggestion.explanation}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metrics */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
              <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Original Text
              </h4>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result.originalLength}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                words
              </div>
            </div>
            <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
              <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Corrected Text
              </h4>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result.correctedLength}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                words
              </div>
            </div>
            <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
              <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Corrections
              </h4>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result.correctionsCount}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                made
              </div>
            </div>
            <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
              <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Language
              </h4>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {result.language}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                checked
              </div>
            </div>
          </div>

          {/* Usage Metadata */}
          {result.usageMetadata && (
            <div className="rounded-md border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-900/20">
              <h4 className="mb-2 font-medium text-purple-800 dark:text-purple-200">
                API Usage Statistics
              </h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-purple-700 dark:text-purple-300">
                    Prompt Tokens:
                  </span>
                  <span className="ml-1 text-purple-600 dark:text-purple-400">
                    {result.usageMetadata.promptTokenCount}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-purple-700 dark:text-purple-300">
                    Response Tokens:
                  </span>
                  <span className="ml-1 text-purple-600 dark:text-purple-400">
                    {result.usageMetadata.candidatesTokenCount}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-purple-700 dark:text-purple-300">
                    Total Tokens:
                  </span>
                  <span className="ml-1 text-purple-600 dark:text-purple-400">
                    {result.usageMetadata.totalTokenCount}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Processing Time */}
          {result.processingTime && (
            <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Processing Time:</span>{' '}
                {result.processingTime}ms
              </p>
            </div>
          )}
        </div>
      )}

      {/* Usage Instructions */}
      <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
        <h4 className="mb-2 font-medium text-yellow-800 dark:text-yellow-200">
          💡 Proofreading Tips:
        </h4>
        <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
          <li>
            • <strong>Auto-correct:</strong> Automatically apply corrections for
            faster workflow
          </li>
          <li>
            • <strong>Detailed suggestions:</strong> See explanations for each
            correction to learn and improve
          </li>
          <li>
            • <strong>Correction types:</strong> Grammar, spelling, punctuation,
            style, and clarity improvements
          </li>
          <li>
            • <strong>Supported languages:</strong> Portuguese, English,
            Spanish, French, German, Italian, Japanese, Chinese
          </li>
          <li>
            • <strong>Best practices:</strong> Use for emails, articles,
            reports, and any text that needs professional polish
          </li>
        </ul>
      </div>
    </div>
  )
}
