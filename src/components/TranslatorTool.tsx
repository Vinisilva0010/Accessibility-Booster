import React, { useState } from 'react'
import {
  useTranslator,
  TranslationRequest,
  TranslationOptions,
} from '@/hooks/useTranslator'

interface TranslatorToolProps {
  className?: string
}

export function TranslatorTool({ className = '' }: TranslatorToolProps) {
  const [text, setText] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState('Portuguese')
  const [targetLanguage, setTargetLanguage] = useState('English')
  const [autoDetect, setAutoDetect] = useState(false)
  const [preserveFormatting, setPreserveFormatting] = useState(true)
  const [temperature, setTemperature] = useState(0.3)

  const { translate, isLoading, error, result, clearResult } = useTranslator()

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

  const handleTranslate = async () => {
    if (!text.trim()) {
      alert('Please enter text to translate.')
      return
    }

    if (!autoDetect && sourceLanguage === targetLanguage) {
      alert('Source and target languages cannot be the same.')
      return
    }

    const options: TranslationOptions = {
      sourceLanguage: autoDetect ? undefined : sourceLanguage,
      targetLanguage,
      autoDetect,
      preserveFormatting,
      temperature,
    }

    const request: TranslationRequest = {
      text: text.trim(),
      options,
    }

    try {
      await translate(request)
    } catch (err) {
      console.error('Error translating text:', err)
    }
  }

  const handleClear = () => {
    setText('')
    clearResult()
  }

  const handleLoadExample = () => {
    const exampleText = `A inteligência artificial está revolucionando a forma como trabalhamos e vivemos. Esta tecnologia permite que máquinas aprendam e tomem decisões de forma autônoma, criando novas oportunidades em diversos setores da economia.

Com o avanço da IA, vemos aplicações em áreas como medicina, transporte, educação e entretenimento. É importante entender tanto os benefícios quanto os desafios que essa tecnologia apresenta para nossa sociedade.`

    setText(exampleText)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleTranslate()
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Chrome AI Translator
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Translate text between multiple languages using advanced AI
          technology. Supports automatic language detection and preserves
          formatting.
        </p>
      </div>

      {/* Input Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="space-y-4">
          {/* Text Input */}
          <div>
            <label
              htmlFor="translation-text"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Text to Translate:
            </label>
            <textarea
              id="translation-text"
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter the text you want to translate..."
              className="h-40 w-full resize-none rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              disabled={isLoading}
              aria-describedby="translation-help"
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
                  Tip: Use Ctrl+Enter to translate quickly
                </span>
              </div>
            </div>
            <div
              id="translation-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              Translate texts, articles, messages, or entire documents with high
              accuracy and natural language flow.
            </div>
          </div>

          {/* Language Selection */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="source-language"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Source Language:
              </label>
              <select
                id="source-language"
                value={sourceLanguage}
                onChange={e => setSourceLanguage(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                disabled={isLoading || autoDetect}
                aria-describedby="source-help"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <div
                id="source-help"
                className="mt-1 text-xs text-gray-500 dark:text-gray-400"
              >
                {autoDetect
                  ? 'Auto-detection enabled'
                  : 'Select the source language'}
              </div>
            </div>

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
                aria-describedby="target-help"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <div
                id="target-help"
                className="mt-1 text-xs text-gray-500 dark:text-gray-400"
              >
                Select the target language for translation
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={autoDetect}
                  onChange={e => setAutoDetect(e.target.checked)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  disabled={isLoading}
                  aria-describedby="auto-detect-help"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Auto-detect source language
                </span>
              </label>
              <div
                id="auto-detect-help"
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                Let AI automatically detect the source language
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={preserveFormatting}
                  onChange={e => setPreserveFormatting(e.target.checked)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  disabled={isLoading}
                  aria-describedby="formatting-help"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Preserve formatting
                </span>
              </label>
              <div
                id="formatting-help"
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                Maintain original paragraph structure and formatting
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div>
            <label
              htmlFor="temperature"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Translation Style (0.0 - 1.0):
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
              <span>Literal</span>
              <span className="font-medium">{temperature}</span>
              <span>Natural</span>
            </div>
            <div
              id="temperature-help"
              className="text-xs text-gray-500 dark:text-gray-400"
            >
              Lower values = more literal translation, Higher values = more
              natural
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleTranslate}
              disabled={
                isLoading ||
                !text.trim() ||
                (!autoDetect && sourceLanguage === targetLanguage)
              }
              className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
              aria-label="Translate text"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Translating...
                </>
              ) : (
                <>
                  <span>🌐</span>
                  Translate Text
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
                Translation Error:
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
              Processing translation with Chrome AI...
            </p>
          </div>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="space-y-4">
          <div className="rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm dark:border-green-800 dark:bg-green-900/20">
            <h3 className="mb-4 text-lg font-semibold text-green-800 dark:text-green-200">
              🌐 Translation Result:
            </h3>
            <div className="whitespace-pre-wrap text-green-700 dark:text-green-300">
              {result.translatedText}
            </div>
          </div>

          {/* Translation Info */}
          <div className="rounded-md border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <h4 className="mb-2 font-medium text-blue-800 dark:text-blue-200">
              Translation Details
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div>
                <span className="font-medium text-blue-700 dark:text-blue-300">
                  From:
                </span>
                <span className="ml-1 text-blue-600 dark:text-blue-400">
                  {result.sourceLanguage}
                </span>
              </div>
              <div>
                <span className="font-medium text-blue-700 dark:text-blue-300">
                  To:
                </span>
                <span className="ml-1 text-blue-600 dark:text-blue-400">
                  {result.targetLanguage}
                </span>
              </div>
              {result.detectedLanguage && (
                <div>
                  <span className="font-medium text-blue-700 dark:text-blue-300">
                    Detected:
                  </span>
                  <span className="ml-1 text-blue-600 dark:text-blue-400">
                    {result.detectedLanguage}
                  </span>
                </div>
              )}
              {result.processingTime && (
                <div>
                  <span className="font-medium text-blue-700 dark:text-blue-300">
                    Time:
                  </span>
                  <span className="ml-1 text-blue-600 dark:text-blue-400">
                    {result.processingTime}ms
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                Translated Text
              </h4>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result.translatedLength}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                words
              </div>
            </div>
            <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
              <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Length Ratio
              </h4>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(
                  (result.translatedLength / result.originalLength) * 100
                )}
                %
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                of original
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

          {/* Finish Reason */}
          {result.finishReason && (
            <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Status:</span>{' '}
                {result.finishReason}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Usage Instructions */}
      <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
        <h4 className="mb-2 font-medium text-yellow-800 dark:text-yellow-200">
          💡 Translation Tips:
        </h4>
        <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
          <li>
            • <strong>Auto-detect:</strong> Let AI automatically identify the
            source language for faster workflow
          </li>
          <li>
            • <strong>Preserve formatting:</strong> Maintain paragraph structure
            and formatting in the translated text
          </li>
          <li>
            • <strong>Translation style:</strong> Adjust between literal and
            natural translations based on your needs
          </li>
          <li>
            • <strong>Supported languages:</strong> Portuguese, English,
            Spanish, French, German, Italian, Japanese, Chinese
          </li>
          <li>
            • <strong>Best practices:</strong> Use clear, well-structured text
            for optimal translation quality
          </li>
        </ul>
      </div>
    </div>
  )
}

