import { useState, useCallback } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

export interface PromptOptions {
  language?: string
  temperature?: number
  maxOutputTokens?: number
  topP?: number
  topK?: number
}

export interface PromptResult {
  text: string
  usageMetadata?: {
    promptTokenCount: number
    candidatesTokenCount: number
    totalTokenCount: number
  }
  finishReason?: string
}

export interface PromptInput {
  text?: string
  image?: File
}

export function usePromptApi() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PromptResult | null>(null)

  const getApiKey = useCallback(() => {
    // Try environment variable first
    if (
      typeof window !== 'undefined' &&
      process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY
    ) {
      return process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY
    }

    // Fallback to localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('apiKey')
    }

    return null
  }, [])

  const convertFileToGenerativePart = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const submitPrompt = useCallback(
    async (
      input: PromptInput,
      options: PromptOptions = {}
    ): Promise<PromptResult> => {
      setIsLoading(true)
      setError(null)
      setResult(null)

      try {
        // Validate input
        if (!input.text?.trim() && !input.image) {
          throw new Error('Please provide either text or an image (or both).')
        }

        // Get API key
        const apiKey = getApiKey()

        if (!apiKey) {
          throw new Error(
            'API key not found. Please configure your Google Generative AI API key in settings or environment variables.'
          )
        }

        // Initialize Google Generative AI
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          generationConfig: {
            temperature: options.temperature || 0.7,
            maxOutputTokens: options.maxOutputTokens || 2048,
            topP: options.topP || 0.8,
            topK: options.topK || 40,
          },
        })

        // Prepare content parts
        const parts: any[] = []

        // Add text if provided
        if (input.text?.trim()) {
          parts.push({ text: input.text.trim() })
        }

        // Add image if provided
        if (input.image) {
          const imageBase64 = await convertFileToGenerativePart(input.image)
          parts.push({
            inlineData: {
              data: imageBase64,
              mimeType: input.image.type,
            },
          })
        }

        // Generate content
        const result = await model.generateContent(parts)
        const response = await result.response
        const text = response.text().trim()

        const promptResult: PromptResult = {
          text,
          usageMetadata: result.response.usageMetadata,
          finishReason: result.response.candidates?.[0]?.finishReason,
        }

        setResult(promptResult)
        return promptResult
      } catch (err) {
        let errorMessage = 'Unknown error occurred while processing prompt'

        if (err instanceof Error) {
          errorMessage = err.message
        } else if (typeof err === 'string') {
          errorMessage = err
        }

        setError(errorMessage)
        throw new Error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [getApiKey]
  )

  const clearResult = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return {
    submitPrompt,
    isLoading,
    error,
    result,
    clearResult,
  }
}

