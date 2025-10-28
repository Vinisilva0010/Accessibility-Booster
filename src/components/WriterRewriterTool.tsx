import React, { useState } from 'react'
import {
  useWriterRewriter,
  WriterRewriterRequest,
  WriterRewriterOptions,
} from '@/hooks/useWriterRewriter'

interface WriterRewriterToolProps {
  className?: string
}

export function WriterRewriterTool({
  className = '',
}: WriterRewriterToolProps) {
  const [text, setText] = useState('')
  const [transformationType, setTransformationType] = useState('rewriter')
  const [targetLanguage, setTargetLanguage] = useState('Portuguese')
  const [creativity, setCreativity] = useState(0.7)
  const [desiredLength, setDesiredLength] = useState<
    'short' | 'medium' | 'long' | 'original'
  >('original')
  const [style, setStyle] = useState<
    'easy' | 'detailed' | 'professional' | 'concise'
  >('professional')
  const [temperature, setTemperature] = useState(0.7)

  const { writeRewrite, isLoading, error, result, clearResult } =
    useWriterRewriter()

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

  const transformationTypes = [
    {
      value: 'writer',
      label: 'Writer - Create New Text',
      description:
        'Generate completely new content based on the original theme',
      example:
        'Original: "Meeting notes" → New creative article about productivity',
    },
    {
      value: 'rewriter',
      label: 'Rewriter - Improve Original',
      description: 'Rewrite the original text to improve clarity and flow',
      example: 'Original: "Bad text" → Improved: "Clear, engaging text"',
    },
    {
      value: 'bullet-points',
      label: 'Bullet Points',
      description: 'Convert text into organized bullet points',
      example: 'Original paragraph → • Point 1 • Point 2 • Point 3',
    },
    {
      value: 'simplify',
      label: 'Simplify for Easy Reading',
      description: 'Make text easier to understand with simpler language',
      example: 'Complex text → Simple, clear explanations',
    },
    {
      value: 'email-formal',
      label: 'Formal Email',
      description: 'Transform into a professional email format',
      example: 'Content → "Dear [Name], I hope this email finds you well..."',
    },
    {
      value: 'email-casual',
      label: 'Casual Email',
      description: 'Transform into a friendly, informal email',
      example: 'Content → "Hi there! Hope you\'re doing great..."',
    },
    {
      value: 'summary',
      label: 'Summary',
      description: 'Create a concise summary of the main points',
      example: 'Long text → Brief overview of key information',
    },
    {
      value: 'expand',
      label: 'Expand with Details',
      description: 'Add more details and explanations',
      example: 'Short text → Detailed, comprehensive version',
    },
    {
      value: 'academic',
      label: 'Academic Style',
      description: 'Rewrite in scholarly, formal academic tone',
      example: 'Informal text → Research paper style',
    },
    {
      value: 'creative',
      label: 'Creative Writing',
      description: 'Transform into engaging, creative narrative',
      example: 'Plain text → Vivid, compelling story',
    },
  ]

  const handleTransform = async () => {
    if (!text.trim()) {
      alert('Please enter text to transform.')
      return
    }

    const options: WriterRewriterOptions = {
      transformationType,
      targetLanguage,
      creativity,
      desiredLength,
      style,
      temperature,
    }

    const request: WriterRewriterRequest = {
      text: text.trim(),
      options,
    }

    try {
      await writeRewrite(request)
    } catch (err) {
      console.error('Error transforming text:', err)
    }
  }

  const handleClear = () => {
    setText('')
    clearResult()
  }

  const handleLoadExample = () => {
    const exampleText = `A inteligência artificial está mudando rapidamente o mundo dos negócios. Muitas empresas estão usando IA para automatizar processos, melhorar a eficiência e reduzir custos. No entanto, também há preocupações sobre o impacto no emprego e na privacidade.

A IA pode ajudar a tomar decisões mais rápidas e precisas, mas também pode criar dependência excessiva na tecnologia. É importante encontrar um equilíbrio entre os benefícios e os riscos.`

    setText(exampleText)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleTransform()
    }
  }

  const selectedTransformation = transformationTypes.find(
    t => t.value === transformationType
  )

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Chrome AI Writer & Rewriter
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Transform and rewrite text with AI-powered writing tools. Create new
          content, improve existing text, or convert to different formats.
        </p>
      </div>

      {/* Input Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="space-y-4">
          {/* Text Input */}
          <div>
            <label
              htmlFor="writer-text"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Text to Transform:
            </label>
            <textarea
              id="writer-text"
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter the text you want to transform or rewrite..."
              className="h-40 w-full resize-none rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              disabled={isLoading}
              aria-describedby="writer-help"
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
                  Tip: Use Ctrl+Enter to transform quickly
                </span>
              </div>
            </div>
            <div
              id="writer-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              Transform texts, articles, emails, or any content into different
              formats and styles.
            </div>
          </div>

          {/* Transformation Type */}
          <div>
            <label
              htmlFor="transformation-type"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Transformation Type:
            </label>
            <select
              id="transformation-type"
              value={transformationType}
              onChange={e => setTransformationType(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
              aria-describedby="transformation-help"
            >
              {transformationTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {selectedTransformation && (
              <div className="mt-2 rounded-md bg-blue-50 p-3 dark:bg-blue-900/20">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  {selectedTransformation.description}
                </p>
                <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">
                  Example: {selectedTransformation.example}
                </p>
              </div>
            )}
            <div
              id="transformation-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              Choose how you want to transform the text
            </div>
          </div>

          {/* Language and Style */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                Language for the output text
              </div>
            </div>

            <div>
              <label
                htmlFor="style"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Writing Style:
              </label>
              <select
                id="style"
                value={style}
                onChange={e => setStyle(e.target.value as any)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
                aria-describedby="style-help"
              >
                <option value="easy">Easy Reading</option>
                <option value="detailed">Detailed</option>
                <option value="professional">Professional</option>
                <option value="concise">Concise</option>
              </select>
              <div
                id="style-help"
                className="mt-1 text-xs text-gray-500 dark:text-gray-400"
              >
                Tone and complexity level
              </div>
            </div>
          </div>

          {/* Length and Creativity */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="desired-length"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Desired Length:
              </label>
              <select
                id="desired-length"
                value={desiredLength}
                onChange={e => setDesiredLength(e.target.value as any)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
                aria-describedby="length-help"
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
                <option value="original">Original Length</option>
              </select>
              <div
                id="length-help"
                className="mt-1 text-xs text-gray-500 dark:text-gray-400"
              >
                Target length for the output
              </div>
            </div>

            <div>
              <label
                htmlFor="creativity"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Creativity Level (0.0 - 1.0):
              </label>
              <input
                id="creativity"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={creativity}
                onChange={e => setCreativity(Number(e.target.value))}
                className="w-full"
                disabled={isLoading}
                aria-describedby="creativity-help"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Conservative</span>
                <span className="font-medium">{creativity}</span>
                <span>Creative</span>
              </div>
              <div
                id="creativity-help"
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                Lower = conservative, Higher = more creative
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div>
            <label
              htmlFor="temperature"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              AI Temperature (0.0 - 1.0):
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
              <span>Focused</span>
              <span className="font-medium">{temperature}</span>
              <span>Varied</span>
            </div>
            <div
              id="temperature-help"
              className="text-xs text-gray-500 dark:text-gray-400"
            >
              Controls randomness in AI responses
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleTransform}
              disabled={isLoading || !text.trim()}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
              aria-label="Transform text"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Transforming...
                </>
              ) : (
                <>
                  <span>✍️</span>
                  Transform Text
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
                Transformation Error:
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
              Processing transformation with Chrome AI...
            </p>
          </div>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="space-y-4">
          <div className="rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm dark:border-green-800 dark:bg-green-900/20">
            <h3 className="mb-4 text-lg font-semibold text-green-800 dark:text-green-200">
              ✍️ Transformed Text:
            </h3>
            <div className="whitespace-pre-wrap text-green-700 dark:text-green-300">
              {result.generatedText}
            </div>
          </div>

          {/* Transformation Info */}
          <div className="rounded-md border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <h4 className="mb-2 font-medium text-blue-800 dark:text-blue-200">
              Transformation Details
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div>
                <span className="font-medium text-blue-700 dark:text-blue-300">
                  Type:
                </span>
                <span className="ml-1 text-blue-600 dark:text-blue-400">
                  {result.transformationType}
                </span>
              </div>
              <div>
                <span className="font-medium text-blue-700 dark:text-blue-300">
                  Language:
                </span>
                <span className="ml-1 text-blue-600 dark:text-blue-400">
                  {result.targetLanguage}
                </span>
              </div>
              <div>
                <span className="font-medium text-blue-700 dark:text-blue-300">
                  Style:
                </span>
                <span className="ml-1 text-blue-600 dark:text-blue-400">
                  {result.style}
                </span>
              </div>
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
                Generated Text
              </h4>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {result.generatedLength}
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
                {result.lengthRatio}%
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
        </div>
      )}

      {/* Usage Instructions */}
      <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
        <h4 className="mb-2 font-medium text-yellow-800 dark:text-yellow-200">
          💡 Writing & Rewriting Tips:
        </h4>
        <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
          <li>
            • <strong>Writer:</strong> Create completely new content based on
            your original theme
          </li>
          <li>
            • <strong>Rewriter:</strong> Improve existing text while preserving
            the main ideas
          </li>
          <li>
            • <strong>Format conversion:</strong> Transform text into emails,
            bullet points, summaries, etc.
          </li>
          <li>
            • <strong>Style adaptation:</strong> Adjust tone for different
            audiences and purposes
          </li>
          <li>
            • <strong>Length control:</strong> Expand or condense content as
            needed
          </li>
        </ul>
      </div>
    </div>
  )
}

