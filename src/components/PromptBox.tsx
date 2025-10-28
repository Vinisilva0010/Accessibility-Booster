import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { usePromptApi, PromptInput, PromptOptions } from '@/hooks/usePromptApi'
import {
  ContextualTooltip,
  TOOLTIP_CONTENT,
} from '@/components/ContextualTooltip'

interface PromptBoxProps {
  className?: string
}

export function PromptBox({ className = '' }: PromptBoxProps) {
  const [text, setText] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [language, setLanguage] = useState('English')
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2048)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const { submitPrompt, isLoading, error, result, clearResult } = usePromptApi()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image too large. Maximum size: 10MB')
      return
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      alert(`Unsupported file type. Allowed types: ${allowedTypes.join(', ')}`)
      return
    }

    setImage(file)

    // Create preview
    const reader = new FileReader()
    reader.onload = e => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (!text.trim() && !image) {
      alert('Please provide either text or an image (or both).')
      return
    }

    const input: PromptInput = {
      text: text.trim() || undefined,
      image: image || undefined,
    }

    const options: PromptOptions = {
      language,
      temperature,
      maxOutputTokens: maxTokens,
    }

    try {
      await submitPrompt(input, options)
    } catch (err) {
      console.error('Error submitting prompt:', err)
    }
  }

  const handleClear = () => {
    setText('')
    setImage(null)
    setImagePreview(null)
    clearResult()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleLoadExample = (exampleType: 'text' | 'image' | 'multimodal') => {
    switch (exampleType) {
      case 'text':
        setText(
          'Explain the concept of artificial intelligence in simple terms.'
        )
        break
      case 'image':
        setText(
          'Describe what you see in this image and explain its significance.'
        )
        break
      case 'multimodal':
        setText(
          'Analyze this image and explain how it relates to modern technology trends.'
        )
        break
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit()
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              Chrome AI Prompt Box
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Interact with multimodal AI using text and images. Send prompts
              and get intelligent responses.
            </p>
          </div>
          <ContextualTooltip {...TOOLTIP_CONTENT.promptBox}>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50"
              aria-label="Show help for Prompt Box tool"
            >
              <span className="text-lg">?</span>
            </button>
          </ContextualTooltip>
        </div>
      </div>

      {/* Input Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="space-y-4">
          {/* Text Input */}
          <div>
            <label
              htmlFor="prompt-text"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Text Prompt:
            </label>
            <textarea
              id="prompt-text"
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter your prompt here... (e.g., 'Explain this image', 'Write a story about...', 'Analyze the data in this chart')"
              className="h-32 w-full resize-none rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              disabled={isLoading}
              aria-describedby="prompt-help"
            />
            <div className="mt-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{text.length} characters</span>
              <span className="text-xs">
                Tip: Use Ctrl+Enter to submit quickly
              </span>
            </div>
            <div
              id="prompt-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              You can ask questions, request explanations, creative writing,
              analysis, or any other task.
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image-upload"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Image (Optional):
            </label>
            <div className="flex items-center space-x-4">
              <input
                ref={fileInputRef}
                type="file"
                id="image-upload"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageChange}
                className="hidden"
                disabled={isLoading}
                aria-describedby="image-help"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                aria-label="Select image file"
              >
                📷 Select Image
              </button>
              {image && (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {image.name} ({(image.size / 1024 / 1024).toFixed(2)}MB)
                </span>
              )}
            </div>
            <div
              id="image-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              Upload images for analysis, description, or multimodal prompts.
              Max size: 10MB
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-3">
                <Image
                  src={imagePreview}
                  alt="Preview of uploaded image"
                  width={300}
                  height={200}
                  className="max-h-48 max-w-xs rounded-md border border-gray-300 dark:border-gray-600"
                />
                <button
                  onClick={() => {
                    setImage(null)
                    setImagePreview(null)
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ''
                    }
                  }}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  aria-label="Remove uploaded image"
                >
                  Remove image
                </button>
              </div>
            )}
          </div>

          {/* Example Prompts */}
          <div className="rounded-md border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <h4 className="mb-2 text-sm font-medium text-blue-800 dark:text-blue-200">
              💡 Example Prompts:
            </h4>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              <button
                onClick={() => handleLoadExample('text')}
                disabled={isLoading}
                className="rounded-md bg-blue-100 px-3 py-2 text-left text-sm text-blue-700 hover:bg-blue-200 disabled:opacity-50 dark:bg-blue-800 dark:text-blue-200 dark:hover:bg-blue-700"
              >
                <strong>Text Only:</strong> Explain AI concepts
              </button>
              <button
                onClick={() => handleLoadExample('image')}
                disabled={isLoading}
                className="rounded-md bg-blue-100 px-3 py-2 text-left text-sm text-blue-700 hover:bg-blue-200 disabled:opacity-50 dark:bg-blue-800 dark:text-blue-200 dark:hover:bg-blue-700"
              >
                <strong>Image Only:</strong> Describe this image
              </button>
              <button
                onClick={() => handleLoadExample('multimodal')}
                disabled={isLoading}
                className="rounded-md bg-blue-100 px-3 py-2 text-left text-sm text-blue-700 hover:bg-blue-200 disabled:opacity-50 dark:bg-blue-800 dark:text-blue-200 dark:hover:bg-blue-700"
              >
                <strong>Multimodal:</strong> Analyze image + text
              </button>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label
                htmlFor="language"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Response Language:
              </label>
              <select
                id="language"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              >
                <option value="English">English</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="temperature"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Creativity (0.0 - 1.0):
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
                <span>Creative</span>
              </div>
              <div
                id="temperature-help"
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                Lower values = more consistent, Higher values = more creative
              </div>
            </div>

            <div>
              <label
                htmlFor="max-tokens"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Max Response Length:
              </label>
              <select
                id="max-tokens"
                value={maxTokens}
                onChange={e => setMaxTokens(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              >
                <option value={512}>Short (512 tokens)</option>
                <option value={1024}>Medium (1024 tokens)</option>
                <option value={2048}>Long (2048 tokens)</option>
                <option value={4096}>Very Long (4096 tokens)</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={isLoading || (!text.trim() && !image)}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
              aria-label="Submit prompt to AI"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Submit Prompt
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
                Error:
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
              Processing your prompt with Chrome AI...
            </p>
          </div>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="space-y-4">
          <div className="rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm dark:border-green-800 dark:bg-green-900/20">
            <h3 className="mb-4 text-lg font-semibold text-green-800 dark:text-green-200">
              🤖 AI Response:
            </h3>
            <div className="whitespace-pre-wrap text-green-700 dark:text-green-300">
              {result.text}
            </div>
          </div>

          {/* Usage Metadata */}
          {result.usageMetadata && (
            <div className="rounded-md border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <h4 className="mb-2 font-medium text-blue-800 dark:text-blue-200">
                API Usage Statistics
              </h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-700 dark:text-blue-300">
                    Prompt Tokens:
                  </span>
                  <span className="ml-1 text-blue-600 dark:text-blue-400">
                    {result.usageMetadata.promptTokenCount}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-blue-700 dark:text-blue-300">
                    Response Tokens:
                  </span>
                  <span className="ml-1 text-blue-600 dark:text-blue-400">
                    {result.usageMetadata.candidatesTokenCount}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-blue-700 dark:text-blue-300">
                    Total Tokens:
                  </span>
                  <span className="ml-1 text-blue-600 dark:text-blue-400">
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
          💡 Multimodal Interaction Tips:
        </h4>
        <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
          <li>
            • <strong>Text only:</strong> Ask questions, request explanations,
            creative writing, or analysis
          </li>
          <li>
            • <strong>Image only:</strong> Upload images and ask AI to describe,
            analyze, or explain them
          </li>
          <li>
            • <strong>Text + Image:</strong> Combine both for complex analysis
            (e.g., &quot;Explain this chart for beginners&quot;)
          </li>
          <li>
            • <strong>Examples:</strong> &quot;Describe this photo&quot;,
            &quot;Write a story about this image&quot;, &quot;Analyze the data
            in this graph&quot;
          </li>
          <li>
            • <strong>Accessibility:</strong> All responses are screen reader
            friendly with proper contrast ratios
          </li>
        </ul>
      </div>
    </div>
  )
}
