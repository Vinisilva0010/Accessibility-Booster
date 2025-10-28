import { useState, useCallback } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

export interface PromptOptions {
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

export interface MultimodalInput {
  text?: string
  image?: File
}

export function useMultimodalPrompt() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PromptResult | null>(null)

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

  const generatePrompt = useCallback(
    async (
      input: MultimodalInput,
      options: PromptOptions = {}
    ): Promise<PromptResult> => {
      setIsLoading(true)
      setError(null)
      setResult(null)

      try {
        // Get API key from localStorage
        const apiKey =
          typeof window !== 'undefined' ? localStorage.getItem('apiKey') : null

        if (!apiKey) {
          throw new Error(
            'API key not found. Please configure your Chrome AI API key in settings.'
          )
        }

        if (!input.text && !input.image) {
          throw new Error('Please provide either text or image input.')
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
        if (input.text) {
          parts.push({ text: input.text })
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

        const promptResult: PromptResult = {
          text: response.text(),
          usageMetadata: result.response.usageMetadata,
          finishReason: result.response.candidates?.[0]?.finishReason,
        }

        setResult(promptResult)
        return promptResult
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erro desconhecido ao processar prompt'
        setError(errorMessage)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const clearResult = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return {
    generatePrompt,
    isLoading,
    error,
    result,
    clearResult,
  }
}

